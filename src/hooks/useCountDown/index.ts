import moment from 'moment';
import { useEffect, useState } from 'react';
import useLatest from '../useLatest';

export type TDate = Date | number | string | undefined;

export type Options = {
    targetDate?: TDate; // 目标时间，单位为毫秒
    interval?: number; // 间隔时间
    onEnd?: () => void; // 倒计时结束回调
};

export interface FormattedRes {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

const calcLeft = (t?: TDate) => {
    if (!t) {
        return 0;
    }
    const left = moment(t).valueOf() - new Date().getTime();
    if (left < 0) {
        return 0;
    }
    return left;
};

const parseMs = (milliseconds: number): FormattedRes => {
    return {
        days: moment(milliseconds).days(),
        hours: moment(milliseconds).hours(),
        minutes: moment(milliseconds).minutes(),
        seconds: moment(milliseconds).seconds(),
        milliseconds: moment(milliseconds).milliseconds(),
    };
};

/**
 * @description 倒计时
 */

const useCountdown = (options?: Options) => {
    const { targetDate, interval = 1000, onEnd } = options || {};

    const [countdown, setCountdown] = useState(() => calcLeft(targetDate));

    const onEndRef = useLatest(onEnd);

    useEffect(() => {
        if (!targetDate) {
            setCountdown(0);
            return;
        }

        // 立即执行一次
        setCountdown(calcLeft(targetDate));

        const timer = setInterval(() => {
            const targetLeft = calcLeft(targetDate);
            setCountdown(targetLeft);
            if (targetLeft === 0) {
                clearInterval(timer);
                onEndRef.current?.();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [targetDate, interval, onEndRef]);

    return parseMs(countdown);
};

export default useCountdown;

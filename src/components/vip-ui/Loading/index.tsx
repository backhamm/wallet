import React, { useRef, forwardRef, useImperativeHandle, Ref } from 'react';
import classNames from 'classnames';
import { LoadingProps, LoadingRef } from '@/types/vip-ui/loading';
import './index.scoped.scss';

const Loading = forwardRef((props: LoadingProps, ref: Ref<LoadingRef>) => {
    const domRef = useRef<HTMLDivElement | null>(null);
    const {
        stroke = 2,
        color,
        duration = 1500,
        style,
        className,
        size = 16,
        radius = 12,
        text,
    } = props;

    const circlePos = 0.5 * stroke + radius;
    const circleSize = radius * 2 + stroke;
    const halfCircle = Math.PI * radius;

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const renderArc = () => {
        return (
            <svg viewBox={`0 0 ${circleSize} ${circleSize}`}>
                <circle
                    className="arc-bg"
                    cx={circlePos}
                    cy={circlePos}
                    r={radius}
                    strokeWidth={stroke}
                    fill="none"
                />
                <circle
                    className="arc-line"
                    cx={circlePos}
                    cy={circlePos}
                    r={radius}
                    style={{ stroke: color }}
                    strokeWidth={stroke}
                    strokeDashoffset={halfCircle * 0.5}
                    strokeDasharray={`${halfCircle * 0.5} ${halfCircle * 1.5}`}
                    fill="none"
                    {...{ strokeLinecap: 'round' }}
                />
            </svg>
        );
    };

    const getLoadingStyle = (): React.CSSProperties => {
        return {
            display: 'inline-block',
            width: size + 'px',
            height: size + 'px',
            animationDuration: `${duration}ms`,
            ...(style || {}),
        };
    };

    return (
        <div className="flex-center-center flex-col">
            <div
                className={classNames(className, 'arc')}
                style={getLoadingStyle()}
                ref={domRef}
            >
                {renderArc()}
            </div>
            {text && (
                <div className="mt-8px text-baseSize text-primaryColor">
                    {text}
                </div>
            )}
        </div>
    );
});

export default Loading;

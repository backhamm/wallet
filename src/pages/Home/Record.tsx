import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

type BalanceProps = {
    data: any;
};
type TradeObviousProps = {
    data: any;
};
type StartProps = {
    data: any;
};

const RecordList: (acIndex: number) => JSX.Element = (acIndex) => {
    const { t } = useTranslation();
    const currency = ['BTC', 'CNY', 'ETH', 'HKD', 'KRW', 'PHP', 'TRB'];
    const recordItem = (i) => {
        return `flex-between-center h-74px leading-17px ${
            !i ? '' : 'border-t-1px border-solid border-[#282829]'
        }`;
    };

    const Balance: FC<BalanceProps> = (props) => {
        const { data } = props;
        return (
            <>
                <div>
                    <div className="flex items-center">
                        <i className={`icon-${data} w-24px h-24px mr-13px`} />
                        {data}
                    </div>
                    <div className="mt-6px text-success">
                        {t('home.record.available')}：23123342.12
                    </div>
                </div>
                <div>
                    <div>{t('home.record.total')}：5464613.146</div>
                    <div className="mt-9px text-error">
                        {t('home.record.freeze')}：5464613.146
                    </div>
                </div>
            </>
        );
    };

    const TradeObvious: FC<TradeObviousProps> = (props) => {
        const { data } = props;
        const type = data === 'HKD' ? 'down' : 'up';
        return (
            <>
                <div>
                    <i className={`icon-${data} w-26px h-26px mb-3px`} />
                    <div>{data}</div>
                </div>
                <div className="flex-1 pl-10px">
                    <div className="h-26px leading-26px mb-3px">
                        {t('home.record.balance')}：5464613.146
                    </div>
                    <div className="text-assistColor1">2023-02-27 12:23:45</div>
                </div>
                <div className={`text-${data === 'HKD' ? 'error' : 'success'}`}>
                    <div className="flex justify-end items-center h-26px leading-26px mb-3px">
                        <i className={`icon-${type} w-16px h-16px mr-7px`} />
                        {t(`home.record.${type}`)}
                    </div>
                    <div>+2345.324</div>
                </div>
                <i className="icon-arrow w-6px h-14px ml-9px" />
            </>
        );
    };

    const Start: FC<StartProps> = (props) => {
        const { data } = props;
        return (
            <>
                <div>
                    <i className={`icon-${data} w-26px h-26px mb-3px`} />
                    <div>{data}</div>
                </div>
                <div className="flex-1 pl-10px">
                    <div className=" h-26px leading-26px mb-3px">
                        {t(
                            `home.record.${
                                data === 'HKD' ? 'ordinary' : 'service'
                            }`,
                        )}
                    </div>
                    <div className="text-assistColor1">2023-02-27 12:23:45</div>
                </div>
                <div className={`text-${data === 'HKD' ? 'error' : 'success'}`}>
                    <div className="flex justify-end items-center h-26px leading-26px mb-3px">
                        {t('home.record.countUpAndDown')}
                    </div>
                    <div>+2345.324</div>
                </div>
                <i className="icon-arrow w-6px h-14px ml-9px" />
            </>
        );
    };

    return (
        <>
            {currency.map((el, i) => (
                <div key={i} className={recordItem(i)}>
                    {
                        [
                            <Balance key="Balance" data={el} />,
                            <TradeObvious key="TradeObvious" data={el} />,
                            <Start key="Start" data={el} />,
                        ][acIndex]
                    }
                </div>
            ))}
        </>
    );
};

const Record: FC = () => {
    const [acIndex, setAcIndex] = useState(0);
    const { t } = useTranslation();
    const recordArr: Array<string> = Object.keys(
        t('home.record.tab', { returnObjects: true }),
    );

    return (
        <>
            <div className="sticky z-10 top-0 h-45px pt-15px bg-baseColor">
                <div className="relative flex justify-around items-center text-14px leading-20px">
                    {recordArr.map((el: string, i: number) => {
                        return (
                            <span
                                key={el}
                                className={`${
                                    i === acIndex
                                        ? 'text-baseColor'
                                        : 'text-assistColor1'
                                }`}
                                onClick={() => setAcIndex(i)}
                            >
                                {t(`home.record.tab.${el}`)}
                            </span>
                        );
                    })}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: `${100 / recordArr.length}%`,
                            x: (100 / recordArr.length) * acIndex + 'vw',
                        }}
                        className={`absolute left-0 -bottom-8px`}
                    >
                        <div className="bg-primaryColor w-22px h-2px m-auto" />
                    </motion.div>
                </div>
            </div>
            <div className="overflow-hidden mt-20px px-16px rounded-20px bg-assistColor2">
                <AnimatePresence>
                    <motion.div
                        key={acIndex}
                        initial={{ opacity: 0, y: '20vw' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-20vw' }}
                        transition={{ duration: 0.2 }}
                    >
                        {RecordList(acIndex)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
};

export default Record;

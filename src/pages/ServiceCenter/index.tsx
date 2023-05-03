import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ServiceCenter: FC = () => {
    const [acIndex, setAcIndex] = useState(0);
    const { t } = useTranslation();
    const navList = Object.keys(t('service.nav', { returnObjects: true }));
    const serviceList: any[][] = t('service.serviceList', {
        returnObjects: true,
    });

    return (
        <div className="pt-20px px-10px pb-34px text-primaryColor">
            <div className="flex-between-center h-100px px-20px rounded-10px bg-assistColor3 bg-opacity-80">
                {navList.map((el, i) => {
                    return (
                        <div
                            key={el}
                            className="w-60px text-center"
                            onClick={() => setAcIndex(i)}
                        >
                            <img
                                src={require(`@/assets/images/service/${el}-${
                                    acIndex === i ? 1 : 0
                                }.png`)}
                                alt=""
                            />
                            <div
                                className={`mt-6px ${
                                    acIndex !== i && 'text-[#796C4E]'
                                }`}
                            >
                                {t(`service.nav.${el}.title`)}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="px-10px">
                <div className="flex-between-center mt-20px mb-15px leading-20px">
                    <span className="text-lgSize">{t('service.call')}</span>
                    <div className="flex items-center text-baseColor">
                        <i className="icon-call w-14px h-14px mr-4px" />
                        {t(`service.nav.${navList[acIndex]}.phone`)}
                    </div>
                </div>
                {serviceList[acIndex].map(
                    (el: string | { [key: string]: string }, i: number) => {
                        return (
                            <div
                                key={i}
                                className="h-100px mb-15px p-1px"
                                style={{
                                    background: `url(${require(`@/assets/images/service/${navList[acIndex]}${i}.png`)}) no-repeat center/100% 100%`,
                                }}
                            >
                                <div
                                    className="w-138px h-30px leading-30px text-center rounded-tl-8px rounded-br-10px"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(90deg, #2D2D2D 0%, #474747 100%)',
                                    }}
                                >
                                    {typeof el === 'string'
                                        ? `${t('service.call')}/${t(
                                              'service.copy',
                                          )}`
                                        : el.subTitle}
                                </div>
                                <div
                                    className={`flex items-center ml-20px mb-5px text-assistColor2 text-lgSize ${
                                        typeof el === 'string'
                                            ? 'mt-25px'
                                            : 'mt-13px'
                                    }`}
                                >
                                    {typeof el === 'string' ? el : el?.title}
                                    <i className="ml-7px icon-arrow2 w-6px h-10px" />
                                </div>
                                {typeof el !== 'string' && (
                                    <div className="ml-20px text-baseColor">
                                        {el.url}
                                    </div>
                                )}
                            </div>
                        );
                    },
                )}
            </div>
            <div className="text-center text-assistColor1">
                {t('service.tips')}
            </div>
        </div>
    );
};

export default ServiceCenter;

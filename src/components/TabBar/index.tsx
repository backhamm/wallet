import React, { FC, useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
type FooterProps = {};

const Footer: FC<FooterProps> = (props) => {
    const [acIndex, setAcIndex] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const tabArr: Array<string> = Object.keys(
        t('home.footer', { returnObjects: true }),
    );

    const routerArr = useMemo(() => ['/home', '/testDemo'], []);

    const handleClick = (i: number) => {
        navigate(routerArr[i] || '/home');
    };

    useEffect(() => {
        setAcIndex(routerArr.indexOf(location.pathname));
    }, [location.pathname, routerArr]);

    return (
        <div className="flex-between-center h-60px bg-assistColor2 rounded-t-20px">
            {tabArr.map((el: string, i: number) => (
                <div
                    key={el}
                    className={`flex-center-center flex-col  flex-1 transition-all ${
                        el === 'games'
                            ? 'h-75px -mt-24px relative z-30'
                            : 'h-full'
                    }`}
                    onClick={() => handleClick(i)}
                >
                    {el === 'games' ? (
                        <i className={'icon-games w-44px h-44px'} />
                    ) : (
                        <i
                            className={`w-22px h-22px icon-${el}${
                                acIndex === i ? 1 : 0
                            }`}
                        />
                    )}
                    <span
                        className={`mt-7px ${
                            acIndex === i || el === 'games'
                                ? 'text-assistColor2'
                                : 'text-assistColor3'
                        }`}
                    >
                        {t(`home.footer.${el}`)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Footer;

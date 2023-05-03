import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { pxToVw } from '@/config/pxtovw';
import { bounceList } from '@/common/motion';

interface NavListProps {
    navArr: Array<string>;
    className: string;
    size?: number;
}
const NavList: FC<NavListProps> = (props) => {
    const { navArr, className, size = 40 } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleClick = (type: string) => {
        switch (type) {
            case 'serviceCenter':
                return navigate(`/${type}`);
        }
    };

    return (
        <motion.ul
            variants={bounceList.container}
            initial="hidden"
            animate="visible"
            className={`flex items-center bg-assistColor1 ${className}`}
        >
            {navArr.map((el) => {
                return (
                    <motion.li
                        key={el}
                        variants={bounceList.item}
                        className="flex flex-col items-center w-1/4"
                        onClick={() => handleClick(el)}
                    >
                        <i
                            className={`icon-${el}`}
                            style={{
                                width: `${pxToVw(size)}`,
                                height: `${pxToVw(size)}`,
                            }}
                        />
                        <span
                            className={`mt-6px ${
                                size === 40
                                    ? 'text-primaryColor'
                                    : 'text-assistColor2'
                            }`}
                        >
                            {t(`home.nav.${el}`)}
                        </span>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
};

export default NavList;

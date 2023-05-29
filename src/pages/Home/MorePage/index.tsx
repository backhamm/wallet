import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { bounceList, toLeftList } from '@/common/motion';

const MorePage: FC = () => {
    const { t } = useTranslation();
    const moreList: { titleArr: string[]; itemArr: string[][] } = t(
        'home.more',
        { returnObjects: true },
    );

    const soonArr = ['2-1'];

    return (
        <div className="p-20px">
            {moreList?.itemArr.map((item: string[], i) => {
                return (
                    <div key={i} className="mb-35px">
                        <div className="mb-10px text-lgSize">
                            {moreList.titleArr[i]}
                        </div>
                        <motion.ul
                            variants={toLeftList.container}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center flex-wrap gap-x-18px gap-y-10px"
                        >
                            {item.map((el, index) => {
                                return (
                                    <motion.li
                                        key={el}
                                        variants={bounceList.item}
                                        className="relative w-70px h-70px text-primaryColor rounded-12px text-center bg-assistColor3"
                                    >
                                        <i
                                            className={`w-34px h-34px mt-7px mb-5px icon-more${i}-${index}`}
                                        />
                                        <div>{el}</div>
                                        {soonArr.includes(i + '-' + index) && (
                                            <div className="absolute inset-0 flex-center-center rounded-12px text-baseColor bg-assistColor3 opacity-80">
                                                {t('home.soon')}
                                            </div>
                                        )}
                                    </motion.li>
                                );
                            })}
                        </motion.ul>
                    </div>
                );
            })}
        </div>
    );
};

export default MorePage;

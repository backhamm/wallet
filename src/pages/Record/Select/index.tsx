import React, { FC, useEffect, useState } from 'react';
import { Modal } from '@/components/vip-ui';

interface SelectProps {
    value: string | number;
    list: { label: string; value: string | number }[];
    onChange: (val: string | number) => void;
    className?: string;
    title?: string;
}

const Select: FC<SelectProps> = ({
    value,
    list,
    className,
    onChange,
    title,
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        !value && onChange(list[0]?.value);
    }, [list, onChange, value]);

    return (
        <div className={`inline-block text-primaryColor ${className}`}>
            {list.length ? (
                <div
                    className="flex-between-center"
                    onClick={() => setVisible(true)}
                >
                    <span>{list.find((el) => el.value === value)?.label}</span>
                    <i className="w-9px h-6px ml-5px -mt-3px icon-selectArrow" />
                </div>
            ) : (
                <></>
            )}
            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                className="leading-40px text-lgSize text-center rounded-8px bg-gradient-to-r from-[#fdefd4] to-[#ffe4b0]"
                title={title}
            >
                {list.map((el) => (
                    <div
                        key={el.value}
                        className="h-40px"
                        onClick={() => {
                            setVisible(false);
                            onChange(el.value);
                        }}
                    >
                        {el.label}
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default Select;

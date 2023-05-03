import React, { forwardRef, useRef, useImperativeHandle, Ref } from 'react';
import classNames from 'classnames';
import { EmptyProps, EmptyRef } from '@/types/vip-ui/empty';
import empty from '@/assets/images/icon/empty.svg';

const Empty = forwardRef((props: EmptyProps, ref: Ref<EmptyRef>) => {
    const { icon, description = '暂无数据', className, style } = props;
    const domRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <div
            className={classNames(className, 'flex-center-center flex-col')}
            style={style}
            ref={domRef}
        >
            {icon || <img src={empty} alt="" className="w-[30px]" />}
            <span className="text-[14px] text-center mt-[20px]">
                {description}
            </span>
        </div>
    );
});

export default Empty;
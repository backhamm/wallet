import React, { forwardRef, useRef, useImperativeHandle, Ref } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { EmptyProps, EmptyRef } from '@/types/vip-ui/empty';

const Empty = forwardRef((props: EmptyProps, ref: Ref<EmptyRef>) => {
    const { t } = useTranslation();
    const { icon, description, className, style } = props;
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
            {icon || <i className="w-212px h-146px icon-empty" />}
            <span className="text-center mt-20px text-assistColor1">
                {description || t('record.nodata')}
            </span>
        </div>
    );
});

export default Empty;

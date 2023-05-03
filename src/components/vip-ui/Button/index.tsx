import React, {
    PropsWithChildren,
    forwardRef,
    Ref,
    useRef,
    useImperativeHandle,
} from 'react';
import classNames from 'classnames';
import { ButtonProps, ButtonRef } from '@/types/vip-ui/button';
import { Loading } from '@/components/vip-ui';

const Button = forwardRef(
    (props: PropsWithChildren<ButtonProps>, ref: Ref<ButtonRef>) => {
        const {
            loading = false,
            disabled = false,
            disableWhenLoading = true,
            icon,
            showTextWhenLoading = true,
            style = {},
            className = '',
            children = null,
            loadingIcon,
            onClick,
            onClickDisabled,
            coverIconWhenLoading = true,
        } = props;
        const domRef = useRef<HTMLButtonElement | null>(null);

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        const renderIcon = () => {
            if (coverIconWhenLoading) {
                return loading ? null : icon;
            }
            return icon;
        };

        return (
            <button
                type="button"
                ref={domRef}
                style={style}
                className={classNames(
                    className,
                    { 'bg-gradientR opacity-50': disabled },
                    'flex-center-center w-full text-lgSize rounded-[8px] bg-gradientR h-[44px]',
                )}
                onClick={
                    disabled || (loading && disableWhenLoading)
                        ? onClickDisabled
                        : onClick
                }
                disabled={disabled}
            >
                {icon || loading ? (
                    <div>
                        {renderIcon()}
                        {loading &&
                            (loadingIcon === void 0 ? (
                                <Loading />
                            ) : (
                                loadingIcon
                            ))}
                    </div>
                ) : null}
                {(!loading || (loading && showTextWhenLoading)) && children ? (
                    <div>{children}</div>
                ) : null}
            </button>
        );
    },
);

export default Button;

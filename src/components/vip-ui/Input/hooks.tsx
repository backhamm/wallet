import React, { useState, ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { nextTick, isAndroid } from '@/utils/tools';
import { BasicInputProps } from '@/types/vip-ui/input';

export type InputEleType = HTMLInputElement | HTMLTextAreaElement;

const ActiveIconMap = {
    user: require('@/assets/images/icon/form/user.png'),
    userActive: require('@/assets/images/icon/form/user-active.png'),
    lock: require('@/assets/images/icon/form/lock.png'),
    lockActive: require('@/assets/images/icon/form/lock-active.png'),
    unsee: require('@/assets/images/icon/form/unsee.png'),
    unseeActive: require('@/assets/images/icon/form/unsee-active.png'),
    see: require('@/assets/images/icon/form/see.png'),
    seeActive: require('@/assets/images/icon/form/see-active.png'),
    close: require('@/assets/images/icon/form/close.png'),
    closeActive: require('@/assets/images/icon/form/close-active.png'),
};

const NormalIconMap = {
    unsee: require('@/assets/images/icon/form/unsee-normal.png'),
    see: require('@/assets/images/icon/form/see-normal.png'),
    close: require('@/assets/images/icon/form/close-normal.png'),
};

export function useInputLogic(
    props: BasicInputProps<InputEleType>,
    inputRef: React.MutableRefObject<InputEleType | null>,
) {
    const {
        value,
        defaultValue,
        validator,
        onChange,
        onInput,
        className,
        style,
        type = 'text',
        styleType = 'normal',
        blurBeforeFocus,
        onKeyDown,
        onPressEnter,
        onFocus,
        onBlur,
        onClick,
        prefixIocn,
        isClear = true,
        onClear,
        autoFocus,
    } = props;
    const [inputValue, setInputValue] = useState(value || defaultValue || '');
    const [isFocusing, setIsFocusing] = useState(false);
    const [inputType, serInputType] = useState(type);
    const shouldPreventEvent = useRef(false);
    const wrapRef = useRef<HTMLDivElement | null>(null);

    // 自动聚焦
    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                inputRef.current && inputRef.current.focus();
            }, 200);
        }
    }, [autoFocus, inputRef]);

    function changeValue(nowValue: string, callback = () => {}) {
        if (nowValue && validator) {
            if (typeof validator === 'function') {
                if (!validator(nowValue)) {
                    return;
                }
            } else if (!validator.test(nowValue)) {
                return;
            }
        }

        setInputValue(nowValue);
        callback();
    }

    function handleChange(e: React.ChangeEvent<InputEleType>) {
        const newValue = e.target.value;
        changeValue(newValue, () => {
            onChange && onChange(e, newValue);
        });
    }

    function handleInput(e: any) {
        const newValue = e.target.value;
        changeValue(newValue, () => {
            onInput && onInput(e, newValue);
        });
    }

    function handleKeyDown(e: React.KeyboardEvent<InputEleType>) {
        if (e.keyCode === 13) {
            onPressEnter && onPressEnter(e);
        }
        onKeyDown && onKeyDown(e);
    }

    function handleFocus(e: React.FocusEvent<InputEleType>) {
        nextTick(() => {
            if (shouldPreventEvent.current) {
                shouldPreventEvent.current = false;
                return;
            }
            setIsFocusing(true);

            onFocus && onFocus(e);
        });
    }

    function handleBlur(e: React.FocusEvent<InputEleType>) {
        nextTick(() => {
            if (shouldPreventEvent.current) {
                return;
            }
            setIsFocusing(false);

            onBlur && onBlur(e);
        });
    }

    function handleClick(e: React.MouseEvent<InputEleType>) {
        // 安卓才会有键盘切换不过来的问题，ios不开启此项，因为blur之后不能再自动focus
        if (blurBeforeFocus && isAndroid() && !isFocusing) {
            inputRef.current && inputRef.current.blur();
            nextTick(() => {
                inputRef.current && inputRef.current.focus();
            });
        } else {
            inputRef.current && inputRef.current.focus();
        }
        onClick && onClick(e);
    }

    function handleClear(e) {
        changeValue('', () => {
            onClear && onClear(e);
            onInput && onInput(e, '');
            if (isFocusing) {
                inputRef.current && inputRef.current.focus();
            }
        });
    }

    //处理光标
    const inpitFocusing = () => {
        serInputType(inputType === 'password' ? 'text' : 'password');
        if (isFocusing) {
            if (inputRef.current) {
                inputRef.current.focus();
                setTimeout(() => {
                    inputRef.current.selectionEnd = inputValue.length;
                    inputRef.current.selectionStart = inputValue.length;
                }, 0);
            }
        }
    };

    // 处理前缀icon
    const PrefixNode = () => {
        switch (styleType) {
            case 'normal':
                return prefixIocn ? (
                    <img
                        src={NormalIconMap[prefixIocn]}
                        className="w-[22px] h-[22px]"
                    />
                ) : null;
            case 'active':
                const url =
                    isFocusing || inputValue
                        ? ActiveIconMap[prefixIocn + 'Active']
                        : ActiveIconMap[prefixIocn];

                return prefixIocn ? (
                    <img src={url} className="w-[22px] h-[22px]" />
                ) : null;
        }
    };

    // 处理后缀password icon
    const SuffixNode = () => {
        const acticeSeeIcon = () => {
            return isFocusing || inputValue
                ? ActiveIconMap.unseeActive
                : ActiveIconMap.unsee;
        };
        const activeUnseeIcon = () => {
            return isFocusing || inputValue
                ? ActiveIconMap.seeActive
                : ActiveIconMap.see;
        };
        switch (styleType) {
            case 'normal':
                return (
                    type === 'password' && (
                        <img
                            src={
                                inputType === 'password'
                                    ? NormalIconMap.unsee
                                    : NormalIconMap.see
                            }
                            className="w-[16px] h-[10px]  mr-[10px]"
                            onClick={() => {
                                inpitFocusing();
                            }}
                        />
                    )
                );

            case 'active':
                return (
                    type === 'password' && (
                        <img
                            src={
                                inputType === 'password'
                                    ? acticeSeeIcon()
                                    : activeUnseeIcon()
                            }
                            className="w-[16px] h-[10px] mr-[10px]"
                            onClick={() => {
                                inpitFocusing();
                            }}
                        />
                    )
                );
        }
    };

    // 处理clear icon
    const ClearNode = () => {
        switch (styleType) {
            case 'normal':
                return (
                    <img
                        onClick={handleClear}
                        src={NormalIconMap.close}
                        className="w-[14px] h-[14px]"
                    ></img>
                );
            case 'active':
                const url =
                    isFocusing || inputValue
                        ? ActiveIconMap.closeActive
                        : ActiveIconMap.close;

                return (
                    <img
                        onClick={handleClear}
                        src={url}
                        className="w-[14px] h-[14px]"
                    />
                );
        }
    };

    // 处理input border,字体,背景
    const InputStyle = () => {
        const active = {
            'bg-assistColor3 border-assistColor1 border border-solid text-primaryColor':
                inputValue || isFocusing,
            'bg-assistColor3 border-primaryColor border border-solid text-assistColor4':
                !inputValue && !isFocusing,
        };

        const normal = {
            'text-baseColor': true,
        };
        const InputMap = {
            active,
            normal,
        };
        return InputMap[styleType];
    };

    function renderWrapper(children: ReactNode) {
        return (
            <div
                className="w-full h-full flex-center-center"
                style={style}
                ref={wrapRef}
            >
                <div
                    className={classNames(
                        className,
                        'w-full h-[44px]  flex-center-center p-[10px]',
                        InputStyle(),
                    )}
                >
                    {<PrefixNode></PrefixNode>}
                    {children}
                    {<SuffixNode></SuffixNode>}
                    {isClear && inputValue && <ClearNode></ClearNode>}
                </div>
            </div>
        );
    }
    return {
        inputValue,
        handleChange,
        handleInput,
        handleKeyDown,
        handleFocus,
        handleBlur,
        handleClick,
        renderWrapper,
        wrapRef,
        inputType,
    };
}

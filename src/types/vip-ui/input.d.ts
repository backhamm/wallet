import React from 'react';

export interface BasicInputProps<T = HTMLInputElement> {
    /**
     * 输入框的id
     */
    id?: string;
    /**
     * 输入框的name
     */
    name?: string;
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 风格场景
     */
    styleType?: 'active' | 'normal';
    /**
     * 输入框类型
     */
    type?: string;
    /**
     * 绑定值，传入即受控
     */
    value?: string;
    /**
     * 默认值
     */
    defaultValue?: string;
    /**
     * 最大输入长度
     */
    maxLength?: number;
    /**
     * 占位文本
     */
    placeholder?: string;
    /**
     * 是否只读
     */
    readOnly?: boolean;
    /**
     * 是否自动获取焦点
     */
    autoFocus?: boolean;

    /**
     * 正则验证，不符合验证的不允许输入
     */
    validator?: RegExp | ((value: string) => boolean);

    /**
     * 在聚焦之前blur
     */
    blurBeforeFocus?: boolean;

    /**
     * input前缀的图标
     */
    prefixIcon?: 'user' | 'lock' | 'code';

    /**
     * input前缀的dom
     */
    prefixDom?: React.ReactNode;

    /**
     * input后缀的dom
     */
    suffixDom?: React.ReactNode;

    /**
     * input后缀的dom
     */
    height?: number;

    /**
     * 清除按钮类型
     */
    isClear?: boolean;

    /**
     * 按下清除按钮回调
     */
    onClear?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;

    /**
     * 数据改变时触发（失去焦点时）
     */
    onChange?: (e: React.ChangeEvent<T>, value: string) => void;
    /**
     * 数据改变时触发
     */
    onInput?: (e: React.ChangeEvent<T>, value: string) => void;
    /**
     * 输入框聚焦时触发
     */
    onFocus?: (e: React.FocusEvent<T>) => void;
    /**
     * 输入框失去焦点时触发
     */
    onBlur?: (e: React.FocusEvent<T>) => void;
    /**
     * 点击输入框事件
     */
    onClick?: (e: React.MouseEvent<T>) => void;
    /**
     * 原生的keyup事件
     */
    onKeyUp?: (e: React.KeyboardEvent<T>) => void;
    /** 原生的keydown事件
     */
    onKeyDown?: (e: React.KeyboardEvent<T>) => void;
    /**
     * 原生的keypress事件
     */
    onKeyPress?: (e: React.KeyboardEvent<T>) => void;
    /**
     * 按下回车键时触发
     */
    onPressEnter?: (e: React.KeyboardEvent<T>) => void;
}

export interface InputProps extends BasicInputProps {
    /**
     * 输入框dom自定义类名
     */
    inputClass?: string;
    /**
     * 输入框dom自定义样式
     */
    inputStyle?: React.CSSProperties;
    /**
     * 其他未列出的原生属性，优先级低于已列出的组件属性
     */
    nativeProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export interface InputRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 原生输入框 DOM
     */
    input: HTMLInputElement | null;
}

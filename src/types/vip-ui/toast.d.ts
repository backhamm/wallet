import { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warn' | 'info';
export interface ToastProps {
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 提示内容
     */
    content: ReactNode;
    /**
     * 自动关闭的延时（单位: ms），设置为0则不会自动关闭
     */
    duration?: number;
    /**
     * 关闭函数
     */
    close?: () => void;
    /**
     * 关闭后的回调函数
     */
    onClose?: () => void;
    /**
     * 是否显示toast
     */
    visible?: boolean;
    /**
     * toast展示信息类型，不同类型对应不同图标，info表示纯文字信息无图标
     */
    type?: ToastType;
}

export interface ToastRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLDivElement | null;
}

export interface ButtonProps {
    /**
     * 是否处于加载中状态
     * @default false
     */
    loading?: boolean;

    /**
     * 按钮宽度
     */
    width?: string;

    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;

    /**
     * 图标名，传入Icon组件
     */
    icon?: React.ReactNode;

    /**
     * 加载中是否展示文字
     * @default true
     */
    showTextWhenLoading?: boolean;

    /**
     * 自定义样式
     */
    style?: React.CSSProperties;

    /**
     * 自定义类名
     */
    className?: string;

    /**
     * 加载图标，传入Icon组件
     */
    loadingIcon?: string | React.ReactNode;

    /**
     * 点击按钮的回调函数
     */
    onClick?: (e: React.MouseEvent) => void;

    /**
     * 禁用状态下点击按钮的回调函数
     */
    onClickDisabled?: (e: React.MouseEvent) => void;

    /**
     * 加载中是否禁用按钮操作
     * @default true
     */
    disableWhenLoading?: boolean;

    /**
     * 加载中是否覆盖Icon
     * @default true
     */
    coverIconWhenLoading?: boolean;
}

export interface ButtonRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLButtonElement | null;
}

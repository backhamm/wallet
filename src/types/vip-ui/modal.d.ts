export interface ModalProps {
    /**
     * 控制显示隐藏
     */
    visible: boolean;
    /**
     * 取消回调
     */
    onCancel: () => void;
    /**
     * 标题
     */
    title?: string;
    /**
     * 不需要footer
     * @default false
     */
    noFooter?: boolean;
    /**
     * 确认回调
     */
    onConfirm?: () => void;
    /**
     * 类名
     */
    className?: string;
}

export interface ModalRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLDivElement | null;
}

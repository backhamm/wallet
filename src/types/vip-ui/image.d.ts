export type ImageStatus = 'loading' | 'loaded' | 'init' | 'error';

export interface ImageProps {
    /**
     * 自定义样式
     */
    style?: CSSProperties;
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * img类名
     */
    imgClass?: string;
    /**
     * 指定图片状态
     */
    status?: ImageStatus;
    /**
     * 图片链接
     */
    src: string;
    /**
     * 替代文本
     */
    alt?: string;

    /**
     * 图片填充模式
     */
    fit?: 'contain' | 'cover' | 'fill' | 'none';
    /**
     * 自定义展示加载中内容
     */
    loadingArea?: ReactNode;
    /**
     * 自定义展示加载失败内容
     */
    errorArea?: ReactNode;
    /**
     * 是否展示图片加载中提示
     */
    showLoading?: boolean;
    /**
     * 是否展示图片加载失败提示，
     *  */
    showError?: boolean;

    /**
     * 失败时自动重试次数
     */
    retryTime?: number;

    /**
     * img标签原生属性，优先级低于单独设置
     */
    nativeProps?: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >;
    /**
     * 切换status时触发的回调
     */
    onChange?: (status: string) => void;
    /**
     * 点击图片时触发的回调
     */
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 图片加载完毕时触发的回调
     */
    onLoad?: (e: Event, image: HTMLImageElement) => void;
    /**
     * 图片加载失败时触发的回调
     */
    onError?: (e: string | Event) => void;
}

export interface ImageRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 原生图片元素 DOM
     */
    image: HTMLImageElement | null;
    /**
     * 手动重试图片加载
     */
    retry: () => void;
}

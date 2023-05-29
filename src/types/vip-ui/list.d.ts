import { CSSProperties, ReactNode } from 'React';

export type ListStatus = 'loading' | 'nomore' | 'error' | 'default';

export interface ListProps {
    /**
     * 自定义样式
     */
    style?: CSSProperties;
    /**
     * 自定义类名
     */
    className?: string;

    /**
     * 获取数据
     */
    getData: () => void | Promise<any>;

    /**
     * 数据是否正在加载中
     */
    isLoading: boolean;

    /**
     * 是否还有更多内容
     */
    hasMore: boolean;

    /**
     * 是否加载失败
     */
    isError;

    /**
     * 滚动到离列表底部多远的位置触发getData
     */
    threshold?: number;

    /**
     * 节流粒度
     */
    throttle?: number;

    /**
     * 加载中状态下的内容
     */
    loadingArea?: ReactNode;

    /**
     * 无更多数据状态下的内容
     */
    noMoreArea?: ReactNode;

    /**
     * 加载失败状态下的内容
     */
    errorArea?: ReactNode;

    /**
     * 待计算滚动容器的元素,外层的父级需要有高度，滚动事件才可以生效
     */
    getScrollContainer: () => HTMLElement;

    /**
     * 组件被点击时回调
     */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    /**
     * 滚动到(底部 - threshold)距离时触发
     */
    onEndReached?: () => void;
    /**
     * 是否显示空状态
     */
    showEmpty?: boolean;
}

export interface ListRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLDivElement | null;
}

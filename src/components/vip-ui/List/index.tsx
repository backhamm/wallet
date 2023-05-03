import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useEffect,
    useCallback,
    useState,
    PropsWithChildren,
} from 'react';
import { throttle as lodashThrottle } from 'lodash';
import classNames from 'classnames';
import { ListStatus, ListProps, ListRef } from '@/types/vip-ui/list';
import { useMemoizedFn, useLatest } from '@/hooks';

const List = forwardRef(
    (props: PropsWithChildren<ListProps>, ref: Ref<ListRef>) => {
        const {
            className = '',
            style,
            threshold = 100,
            throttle = 200,
            getData,
            isLoading,
            isError,
            hasMore,
            loadingArea,
            noMoreArea,
            errorArea,
            getScrollContainer,
            onClick,
            onEndReached,
            children,
        } = props;
        const domRef = useRef<HTMLDivElement | null>(null);
        const [nowStatus, setNowStatus] = useState<ListStatus>('loading');
        const getDataRun = useMemoizedFn(getData);
        const lastScrollEndRef = useLatest(false);

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        //设置父元素的样式
        const setParentElementStyle = useCallback(() => {
            const scrollDomRef = getScrollContainer() as HTMLElement;

            scrollDomRef.style.width = '100%';
            scrollDomRef.style.height = '100%';
            scrollDomRef.style.overflow = 'auto';
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        // 检查是否到底
        const checkIsEnd = () => {
            const scrollTop = getScrollContainer()?.scrollTop ?? 0;
            const scrollHeight = getScrollContainer()?.scrollHeight ?? 0;
            const clientHeight = getScrollContainer()?.clientHeight ?? 0;
            return scrollHeight - scrollTop - clientHeight <= threshold;
        };

        const handleContainerScroll = useCallback(() => {
            if (checkIsEnd()) {
                onEndReached && onEndReached();
                //上一次的请求没有成功，不再请求

                if (
                    hasMore &&
                    !lastScrollEndRef.current &&
                    !isLoading &&
                    !isError
                ) {
                    removeScrollListener();
                    lastScrollEndRef.current = true;
                    getDataRun();
                } else {
                    lastScrollEndRef.current = false;
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [getData, onEndReached, threshold]);

        const scrollFunc = throttle
            ? lodashThrottle(handleContainerScroll, throttle)
            : handleContainerScroll;

        //添加滚动监听
        const addScrollListener = useCallback(() => {
            const scrollDomRef = getScrollContainer();
            scrollDomRef?.addEventListener('scroll', scrollFunc);
        }, [getScrollContainer, scrollFunc]);

        // 移除滚动监听
        const removeScrollListener = useCallback(() => {
            const scrollDomRef = getScrollContainer();
            scrollDomRef?.removeEventListener('scroll', scrollFunc);
        }, [getScrollContainer, scrollFunc]);

        useEffect(() => {
            addScrollListener();
            return () => {
                removeScrollListener();
            };
        }, [addScrollListener, removeScrollListener]);

        useEffect(() => {
            if (hasMore && !isLoading && !isError) {
                addScrollListener();
            }
        }, [addScrollListener, hasMore, isLoading, isError]);

        // 初始化请求,设置父元素样式
        useEffect(() => {
            getDataRun();
            setParentElementStyle();
        }, [getDataRun, setParentElementStyle]);

        // 加载状态
        useEffect(() => {
            if (!hasMore) {
                setNowStatus('nomore');
            }
            if (isLoading) {
                setNowStatus('loading');
            }
            if (isError) {
                setNowStatus('error');
            }
        }, [hasMore, isLoading, isError]);

        const handleClick = (
            e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        ) => {
            onClick && onClick(e);
        };

        const handleErrorClick = () => {
            getDataRun();
        };

        const renderArea = () => {
            switch (nowStatus) {
                case 'loading':
                    return loadingArea === void 0 ? (
                        <div>正在努力加载中...</div>
                    ) : (
                        loadingArea
                    );
                case 'nomore':
                    return noMoreArea === void 0 ? (
                        <div>没有更多数据了</div>
                    ) : (
                        noMoreArea
                    );
                case 'error':
                    return errorArea === void 0 ? (
                        <div onClick={handleErrorClick}>
                            加载失败,点击重新加载
                        </div>
                    ) : (
                        errorArea
                    );
                default:
                    return null;
            }
        };

        return (
            <div
                className={classNames(
                    className,
                    'w-full h-auto pt-[10px] pb-[40px]',
                )}
                ref={domRef}
                onClick={handleClick}
                style={style}
            >
                {children}
                {renderArea()}
            </div>
        );
    },
);

export default List;

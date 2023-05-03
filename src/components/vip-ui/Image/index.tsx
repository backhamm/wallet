import React, {
    useState,
    forwardRef,
    Ref,
    useImperativeHandle,
    useRef,
    useEffect,
    CSSProperties,
    useMemo,
    Fragment,
} from 'react';
import classNames from 'classnames';
import LazyLoad from 'react-lazy-load';
import { ImageProps, ImageRef, ImageStatus } from '@/types/vip-ui/image';
import { nextTick } from '@/utils/tools';
import { Loading } from '@/components/vip-ui';
import imageError from '@/assets/images/icon/image-error.svg';
import { pxToVw } from '@/config/pxtovw';

export const BaseImage = forwardRef((props: ImageProps, ref: Ref<ImageRef>) => {
    const [imageStatus, setImageStatus] = useState<ImageStatus>('init');
    const imageRef = useRef<HTMLDivElement | null>(null);
    const imageDomRef = useRef<HTMLImageElement | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const retryCountRef = useRef(0);

    const {
        style,
        className,
        status,
        src,
        alt = '',
        fit = 'cover',
        loadingArea,
        errorArea,
        showLoading = true,
        showError = true,
        retryTime = 0,
        nativeProps = {},
        onChange,
        onClick,
        onLoad,
        onError,
    } = props;

    const validStatus = status === undefined ? imageStatus : status;

    const attrs = useMemo(() => {
        const imageStyle: CSSProperties = {
            objectFit: fit === 'none' ? undefined : fit,
        };

        return {
            alt,
            src,
            style: imageStyle,
            className: className,
        };
    }, [alt, className, fit, src]);

    // 如果图片加载失败，重新加载图片
    function retry() {
        loadImage(true);
    }

    useImperativeHandle(ref, () => ({
        dom: wrapRef.current,
        image: imageDomRef.current,
        retry, //把retry方法暴露出去
    }));

    useEffect(() => {
        retryCountRef.current = 0;
        loadImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attrs]);

    function changeStatus(newStatus: ImageStatus) {
        setImageStatus(newStatus);
        onChange && onChange(newStatus);
    }

    function replaceChild(newChild: HTMLElement) {
        const dom = imageRef.current;
        if (!dom) {
            return;
        }
        if (dom.children && dom.children.length) {
            dom.replaceChild(newChild, dom.children[0]);
        } else {
            dom.appendChild(newChild);
        }
    }

    function loadImage(isFromRetry?: boolean) {
        changeStatus('loading');
        const image = new Image();
        Object.keys(nativeProps).forEach((key) => {
            image[key] = nativeProps[key];
        });
        image.className = attrs.className;
        Object.keys(attrs.style).forEach((key: string) => {
            image.style[key] = attrs.style[key];
        });
        // 如果图片已经加载过，则直接显示图片
        image.onload = (evt) => {
            imageDomRef.current = image;
            changeStatus('loaded');
            replaceChild(image);
            onLoad && onLoad(evt, image);
        };

        image.onerror = (evt) => {
            if (isFromRetry || retryCountRef.current >= retryTime) {
                changeStatus('error');
                const placeholder = document.createElement('div');
                replaceChild(placeholder);
                onError && onError(evt);
            } else {
                retryCountRef.current += 1;
                loadImage();
            }
        };
        nextTick(() => {
            image.src = attrs.src;
            image.alt = attrs.alt;
        });
    }

    function handleStaticImageError(
        e: React.SyntheticEvent<HTMLImageElement, Event>,
    ) {
        const evt = e.nativeEvent;
        if (retryCountRef.current >= retryTime) {
            onError && onError(evt);
        } else {
            retryCountRef.current += 1;
        }
    }

    return (
        <div
            className={classNames(className, 'relative')}
            style={style}
            ref={wrapRef}
        >
            <div
                className={classNames(
                    'w-full h-full absolute top-0 left-0 bottom-0 right-0 z-1',
                    { opacity: validStatus === 'loaded' ? 1 : 0 },
                )}
                onClick={onClick}
                ref={imageRef}
            >
                <img
                    {...nativeProps}
                    {...attrs}
                    ref={imageDomRef}
                    onLoad={(e) =>
                        onLoad && onLoad(e.nativeEvent, imageDomRef.current!)
                    }
                    onError={handleStaticImageError}
                />
            </div>
            {showLoading && validStatus === 'loading' ? (
                <div className="w-full h-full bg-[#f7f8fa] absolute top-0 left-0 bottom-0 right-0 overflow-hidden flex-center-center flex-col z-10">
                    {loadingArea || (
                        <div className="bg-[rgba(0,0,0,0.5)] w-full h-full flex-center-center flex-col">
                            <Loading
                                className="loading-icon"
                                radius={11}
                                stroke={3}
                            />
                        </div>
                    )}
                </div>
            ) : null}
            {showError && validStatus === 'error' ? (
                <div
                    className="w-full h-full bg-[#f7f8fa] absolute overflow-hidden top-0 left-0 bottom-0 right-0  flex-center-center flex-col z-10"
                    onClick={(e) => {
                        e.stopPropagation();
                        retry();
                    }}
                >
                    {errorArea || (
                        <div className="flex-center-center flex-col">
                            <img src={imageError} alt="" className="w-[40px]" />
                            <span className="text-[14px] text-[#ccc] mt-[10px]">
                                图片加载失败
                            </span>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
});

const ImageComponent = forwardRef((props: ImageProps, ref: Ref<ImageRef>) => {
    const { width, height } = props;
    const [visbile, setVisbile] = useState(false);
    return (
        <LazyLoad
            width={pxToVw(width)}
            height={pxToVw(height)}
            onContentVisible={() => {
                setVisbile(true);
            }}
        >
            {visbile ? (
                <BaseImage {...props} ref={ref} />
            ) : (
                <Fragment></Fragment>
            )}
        </LazyLoad>
    );
});

export default ImageComponent;

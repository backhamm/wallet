import React, {
    PropsWithChildren,
    useRef,
    forwardRef,
    useImperativeHandle,
    Ref,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ModalProps, ModalRef } from '@/types/vip-ui/modal';
import { useOverFlowScroll } from '@/hooks';
import { Button } from '@/components/vip-ui';

const Modal = forwardRef(
    (props: PropsWithChildren<ModalProps>, ref: Ref<ModalRef>) => {
        const domRef = useRef<HTMLDivElement | null>(null);
        const { t } = useTranslation();
        const {
            visible,
            onCancel,
            onConfirm,
            title,
            confirmBtn,
            confirmText,
            cancelBtn,
            cancelText,
            className,
            children,
            motionType = 'scale',
            width = 'w-267px',
            clickExternal = true,
        } = props;

        const motionObj = {
            scale: {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
            },
            x: {
                initial: { opacity: 0, x: '100vw' },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: '100vw' },
            },
        };

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        useOverFlowScroll('html', visible);

        return ReactDOM.createPortal(
            <AnimatePresence>
                {visible && (
                    <div
                        className="fixed inset-0 z-9999 flex-center-center flex-col bg-[rgba(0,0,0,0.5)]"
                        ref={domRef}
                        onClick={() => clickExternal && onCancel()}
                    >
                        <motion.div
                            initial={motionObj[motionType].initial}
                            animate={motionObj[motionType].animate}
                            exit={motionObj[motionType].exit}
                            transition={{ duration: 0.2 }}
                            className={`${width} m-auto ${className}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {title && (
                                <>
                                    <div className="pt-5px leading-40px text-lgSize">
                                        {title}
                                    </div>
                                    <div className="w-170px h-1px m-auto bg-gradient-to-r from-[#E2BD79] via-[#E5C07D] to-[#E2BD79] to-opacity-0 from-opacity-0" />
                                </>
                            )}
                            {children}
                            <div className="flex-center-center leading-36px">
                                {(confirmBtn || confirmText) && (
                                    <Button
                                        onClick={onConfirm}
                                        className="min-w-123px w-auto h-36px mt-13px mb-18px px-16px rounded-8px bg-gradient-to-br from-[#EACB90] via-[#DFB975] to-[#DFB975] cursor-pointer"
                                    >
                                        {confirmText || t('modal.confirm')}
                                    </Button>
                                )}
                                {(cancelBtn || cancelText) && (
                                    <Button onClick={onCancel}>
                                        {cancelText || t('modal.cancel')}
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>,
            document.getElementById('root'),
        );
    },
);

export default Modal;

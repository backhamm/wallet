import React, {
    PropsWithChildren,
    useRef,
    forwardRef,
    useImperativeHandle,
    Ref,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { ModalProps, ModalRef } from '@/types/vip-ui/modal';
import { useOverFlowScroll } from '@/hooks';

const Modal = forwardRef(
    (props: PropsWithChildren<ModalProps>, ref: Ref<ModalRef>) => {
        const domRef = useRef<HTMLDivElement | null>(null);
        const {
            visible,
            onCancel,
            onConfirm,
            title,
            noFooter = false,
            className,
            children,
        } = props;

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        useOverFlowScroll('html', visible);

        return ReactDOM.createPortal(
            <AnimatePresence>
                {visible && (
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0 z-9999 flex-center-center flex-col bg-[rgba(0,0,0,0.5)]"
                        ref={domRef}
                        onClick={onCancel}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className={`w-267px m-auto text-center bg-[#fff] rounded-8px ${className}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {title && <div>{title}</div>}
                            {children}
                            {!noFooter && (
                                <div>
                                    <button
                                        className="mr-8"
                                        onClick={onConfirm}
                                    >
                                        confirm
                                    </button>
                                    <button onClick={onCancel}>cancel</button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>,
            document.getElementById('root'),
        );
    },
);

export default Modal;

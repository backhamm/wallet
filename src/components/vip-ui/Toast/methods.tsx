import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { unmountComponentAtNode } from 'react-dom';

export interface ToastBaseProps {
    onClose?: () => void;
    duration?: number;
    content?: React.ReactNode;
    type?: string;
}

export function toast<P extends ToastBaseProps>(
    Component: FC<P>,
    type?: string,
) {
    return (originConfig: string | P) => {
        const config =
            typeof originConfig === 'string'
                ? ({
                      content: originConfig,
                      type: 'info',
                  } as P)
                : originConfig;

        if (type !== void 0) {
            config.type = type;
        }

        const div = document.createElement('div');
        document.body.appendChild(div);
        const root = createRoot(div);

        function destroy() {
            const { onClose } = config;
            onClose && onClose();
            root.unmount();
            unmountComponentAtNode(div);
            document.body.removeChild(div);
        }

        const dynamicProps = {
            ...config,
            onClose: destroy,
            close,
            visible: true,
        };

        root.render(<Component {...dynamicProps}></Component>);

        function close() {
            dynamicProps.visible = false;
            root.render(<Component {...dynamicProps}></Component>);
        }
    };
}

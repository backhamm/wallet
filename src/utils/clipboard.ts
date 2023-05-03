/**
 * @description: 复制 ;
 */

import { MouseEvent } from 'react';
import Clipboard from 'clipboard';
import { t } from 'i18next';
import { Toast } from '@/components/vip-ui';

//如果是svg元素请在外边包一层div，svg元素添加样式 pointerEvents: 'none',
export const clipboardSuccess = () =>
    Toast.toast({ content: t('common.copySuc') });

export const clipboardError = () =>
    Toast.toast({ content: t('common.copyErr') });

export const handleClipboard = (text: string, event: MouseEvent) => {
    const clipboard = new Clipboard(event.target as Element, {
        text: () => text,
    });
    clipboard.on('success', () => {
        clipboardSuccess();
        clipboard.destroy();
    });
    clipboard.on('error', () => {
        clipboardError();
        clipboard.destroy();
    });
    (clipboard as any).onClick(event);
};

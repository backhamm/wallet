import React from 'react';
import ReactDOM from 'react-dom/client';
import { delay } from 'lodash';
import { Toast } from '@/components/vip-ui';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import '@/locales'; //国际化
import './assets/css/base.css';
import './assets/scss/global.scss';
import './assets/scss/windicss.scss';
import './virtual:windi.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

serviceWorkerRegistration.register({
    onSuccess: (registration, installingWorker) => {
        console.log('registration', registration);
        console.log('installingWorker', installingWorker);
        console.log('PWA 安装成功!');
    },
    onUpdate: (registration, installingWorker) => {
        console.log('registration', registration);
        console.log('installingWorker', installingWorker);
        // 手动强制更新一下
        installingWorker.postMessage({ action: 'skipWaiting' });
        registration.update();

        Toast.info({
            content: '应用发现新版本，正在更新中...',
            onClose: () => {
                installingWorker.postMessage({ action: 'skipWaiting' });
            },
        });
        delay(() => {
            window.location.reload();
        }, 500);
    },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

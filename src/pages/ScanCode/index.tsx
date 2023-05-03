import React, { FC, useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const ScanCode: FC = () => {
    const [url, setUrl] = useState('');
    useEffect(() => {
        const html5Qrcode = new Html5Qrcode('scanContent');
        html5Qrcode
            .start(
                { facingMode: 'environment' },
                { fps: 10 },
                (decodedText: string) => {
                    setUrl(decodedText);
                },
                () => {},
            )
            .catch(() => {});
    }, []);

    return (
        <div className="relative h-full text-baseColor">
            <div id="scanContent" className="h-full m-auto" />
            <div className="absolute bottom-50px text-center">url: {url}</div>
        </div>
    );
};

export default ScanCode;

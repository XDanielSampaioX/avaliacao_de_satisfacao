// components/DeviceIdentifier.js
import FingerprintJS from 'fingerprintjs2';
import { useEffect, useState } from 'react';

export default function DeviceIdentifier() {
    const [deviceId, setDeviceId] = useState('');

    useEffect(() => {
        FingerprintJS.get((components) => {
            const values = components.map((component) => component.value);
            const deviceIdentifier = FingerprintJS.x64hash128(values.join(''), 31);
            setDeviceId(deviceIdentifier);
        });
    }, []);

    return (
        <div>
            <p>Device Identifier: {deviceId}</p>
        </div>
    );
}

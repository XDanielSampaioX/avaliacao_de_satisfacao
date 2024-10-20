// app/api/get-device/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const userAgent = req.headers.get('user-agent') || 'User-Agent não encontrado';
    
    return NextResponse.json({ userAgent });
}

// client-side code to generate device ID using FingerprintJS
import FingerprintJS from '@fingerprintjs/fingerprintjs';

async function getDeviceId() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const deviceId = result.visitorId; // identificador do dispositivo
    console.log("Device ID:", deviceId);
    return deviceId;
}

getDeviceId();

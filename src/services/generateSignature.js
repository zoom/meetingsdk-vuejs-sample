import * as KJUR from 'jsrsasign';

function generateSignature(data) {
    let signature = '';
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    const oHeader = { alg: 'HS256', typ: 'JWT' }
    const oPayload = {
        sdkKey: process.env.VUE_APP_ZOOM_SDK_KEY,
        mn: data.meetingNumber,
        role: data.role,
        iat: iat,
        exp: exp,
        appKey: process.env.VUE_APP_ZOOM_SDK_KEY,
        tokenExp: iat + 60 * 60 * 2
    }

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);

    signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.VUE_APP_ZOOM_SDK_SECRET)

    return signature;
}

export default generateSignature;
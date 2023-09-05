export let visitorId: string | undefined;

// @ts-ignore
const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3').then((FingerprintJS) => FingerprintJS.load());

export const initFingerPrint = async (): Promise<void> => {
    visitorId = await fpPromise
        .then((fp) => fp.get())
        .then((result) => {
            // console.log(result);
            return result.visitorId;
        });
};

export const test = () => {
    console.log('test');
};

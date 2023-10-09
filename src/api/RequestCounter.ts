import { AuthService } from './AuthService';

export class RequestCounter {
    static key: string = 'requestCount';

    constructor() {}

    static isLimitExceeded(): boolean {
        if (!AuthService.isExpiredToken()) {
            return false;
        }

        // ToDo: We gonna force to user auth immediately.
        //  there is a dirty hack, because we don't have time and this code should be refactored.
        return true;
        //
        // const count = localStorage.getItem(RequestCounter.key);
        // if (count === null) {
        //     return false;
        // }
        // return parseInt(count) > 5;
    }

    static increment(): void {
        const count = localStorage.getItem(RequestCounter.key);
        const newCount = count === null ? 1 : Number(count) + 1;
        localStorage.setItem(RequestCounter.key, newCount.toString());
    }
}

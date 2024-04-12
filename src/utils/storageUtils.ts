interface CachedData<T> {
    data: T;
    timestamp: number;
}

export function setSessionStorage<T>(key: string, data: T) {
    const cachedData: CachedData<T> = {
        data,
        timestamp: Date.now()
    };
    sessionStorage.setItem(key, JSON.stringify(cachedData));
}

export function getSessionStorage<T>(key: string, maxAge: number): T | null {
    const cachedDataString = sessionStorage.getItem(key);
    if (!cachedDataString) return null;

    const cachedData: CachedData<T> = JSON.parse(cachedDataString);
    const age = Date.now() - cachedData.timestamp;
    if (age > maxAge) {
        sessionStorage.removeItem(key);
        return null;
    }

    return cachedData.data;
}

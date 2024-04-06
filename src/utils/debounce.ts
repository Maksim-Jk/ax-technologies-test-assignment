export function debounce(func: Function, delay: number): Function {
    let timer: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

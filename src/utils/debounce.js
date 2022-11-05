export function debounce(fn,delay) {
    let timeout = null;
    return function () {
        // 如果事件再次触发就清除定时器，重新计时
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}

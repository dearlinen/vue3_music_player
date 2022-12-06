import {getFlagCache, setFlagCache} from "utils/stroageController.js";

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

export function throttle(fn,delay) {
    let flag = null; // 通过闭包保存一个标记
    return function () {
        if (flag) return; // 当定时器没有执行的时候标记永远是null
        flag = setTimeout(() => {
            fn.apply(this, arguments);
            // 最后在setTimeout执行完毕后再把标记设置为null(关键)
            // 表示可以执行下一次循环了。
            flag = null;
        }, delay);
    };
}

export function throttleByFlag(fn,mark) {
    let flag = getFlagCache()
    if (flag===mark) return
    fn.apply(this, arguments);
    setFlagCache(mark)
}
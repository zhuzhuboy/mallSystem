// 防抖，高阶函数
export function debounce(func, duration) {
  let timer;
  // 返回的函数
  return function (...args) {
    // 利用产生的闭包判断是否清除定时器
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this,args)
      timer = null;
    }, duration);

  }
}

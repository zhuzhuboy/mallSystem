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
      func.apply(this, args)
      timer = null;
    }, duration);

  }
}


export var checkUser = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("用户名不能为空"));
  }
  setTimeout(() => {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!uPattern.test(value)) {
      callback(new Error("请输入4-16位数字字母组下划线组成的用户名"));
    }
    callback();
  }, 100);
};
// 验证密码，自定义验证
export var checkPassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("密码不能为空"));
  }
  setTimeout(() => {
    var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    if (!pPattern.test(value)) {
      callback(new Error("最少6位，包括大写字母，数字，特殊字符"));
    }
    callback();
  }, 100);
};
// 验证邮箱，自定义验证
export var checkEmail = (rule, value, callback) => {
  // 可以为空
  if (!value) {
    return callback();
  }
  setTimeout(() => {
    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!ePattern.test(value)) {
      callback(new Error("请输入正确邮箱格式"));
    }
    callback();
  }, 100);
};
// 验证手机，自定义验证
export var checkPhone = (rule, value, callback) => {
  // 可以为空
  if (!value) {
    return callback();
  }
  setTimeout(() => {
    var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (!mPattern.test(value)) {
      callback(new Error("请输入正确手机格式"));
    }
    callback();
  }, 100);
};

// 验证角色名称，自定义验证
export var checkNick = (rule, value, callback) => {
  // 可以为空
  if (!value) {
    return callback(new Error("密码不能为空"));
  }
  setTimeout(() => {
    var mPattern = /^[\u4E00-\u9FA5-\w]{2,6}$/;
    if (!mPattern.test(value)) {
      callback(new Error("请输入正确角色名称"));
    }
    callback();
  }, 100);
};

// 验证描述，自定义验证
export var checkDesc = (rule, value, callback) => {
  // 可以为空
  if (!value) {
    return callback(new Error("描述不能为空"));
  }
  setTimeout(() => {
    var mPattern = /^[\u4E00-\u9FA5-\w]{2,12}$/;
    if (!mPattern.test(value)) {
      callback(new Error("请输入正确格式"));
    }
    callback();
  }, 100);
};

// 验证名称，自定义验证
export var checkName = (rule, value, callback) => {
  // 可以为空
  if (!value) {
    return callback(new Error("名称不能为空"));
  }
  setTimeout(() => {
    var mPattern = /^[\u4E00-\u9FA5-\w]{2,12}$/;
    if (!mPattern.test(value)) {
      callback(new Error("请输入正确格式"));
    }
    callback();
  }, 100);
};
// 请求数据
/**
 * @param requestAPI 请求API
 * @param option 请求API所需要的参数
 * @param successStatus 请求成功的状态码
 * @param sucCB 成功回调函数
 * @param failCB 失败回调函数
 *  */
export async function requestValidate(requestAPI, option, successStatus, sucCB, failCB) {

  // 得到请求结果
  let result = await requestAPI(option);
  // 请求结果状态码是规定的状态码执行回调函数
  if (result.meta.status === successStatus) {
    sucCB(result)
  } else {
    if(typeof failCB === 'function'){
      failCB(result)
    }else{
      return new Error('请求出错了')
    }
  }
}

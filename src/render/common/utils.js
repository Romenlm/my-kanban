import _ from "lodash";

/**
 * 生成uuid
 * @param {*} len 长度
 * @param {*} radix
 * @param {*} placeholder 占位符
 * @param {*} splitDigit
 */
const uuid = function (len = 8, radix = 10, placeholder, splitDigit = 6) {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  let i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    if (placeholder) {
      let index = splitDigit;
      while (index < uuid.length) {
        uuid.splice(index + index / splitDigit - 1, 0, placeholder);
        index += splitDigit;
      }
    }
  } else {
    // rfc4122, version 4 form
    let r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join("");
};

/**
 * 时间格式化
 * @param date 时间
 * @returns {string} 返回yyyy-mm-dd 时间格式
 */
const formatDates = (date) => {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  return `${y}-${m}-${d}`;
};
/**
 * 在页面储存数据，非vuex
 * @param key
 * @param params
 * @param location
 */
const setData = function (key, params, location = "sessionStorage") {
  let state = JSON.parse(window[location].getItem("state") || "{}");
  if (state && _.isObject(state)) {
    state = _.merge(state, { [key]: params });
  }

  window[location].setItem("state", JSON.stringify(state));
};
/**
 * 提取数据
 * @param key
 * @param location
 */
const getData = function (key, location = "sessionStorage") {
  try {
    const state = JSON.parse(window[location].getItem("state"));
    return state[key];
  } catch (e) {
    return null;
  }
};

export default {
  uuid,
  setData,
  getData,
};

export { uuid, formatDates };

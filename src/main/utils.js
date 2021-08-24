//检测文件或者文件夹存在 nodeJS
import fs from "fs";
import path from "path";
import { EXISTS } from "./confing";

/**
 * 判断一个文件夹是否存在
 * @param path 文件夹路径
 * @returns {boolean} 返回是否存在文件夹
 */
const fsExistsSync = (path) => {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * 将任务写入文件中
 * @param fileName 文件名称
 * @param data 文件内容
 * @returns {{msg: string, code: string}|{msg: string, code: string}} 返回提示
 */
const setFile = (fileName, data) => {
  let dirPath = global.savePath
  let dir = path.resolve(dirPath,EXISTS);
  const stat = fsExistsSync(dir);
  let obj;
  try {
    let filePath = path.resolve(dirPath, EXISTS + "/" + fileName);
    if (stat) {
      fs.writeFileSync(filePath, data);
    } else {
      // 表示没有文件夹就新建一个
      fs.mkdirSync(dir);
      fs.writeFileSync(filePath, data);
    }
    obj = {
      code: "000000",
      msg: "新建成功",
    };
  } catch (e) {
    obj = {
      code: "000001",
      msg: "新建失败",
    };
  }

  return obj;
};
export { fsExistsSync, setFile };

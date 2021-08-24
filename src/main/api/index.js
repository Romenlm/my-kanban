import fs from "fs";
import path from "path";
import Store from "electron-store";
import {
  EXISTS,
  NEWT_ASK,
  UNDERWAY_TASK,
  COMPLETE_TASK,
  HISTORY_TASK,
} from "../confing";
const getUsername = (event, tag) => {
  event.sender.send(tag, "成功返回");
};

/**
 * 刚开始时加载的数据
 */
const getTask = (event, tag) => {
  let newTask = "[]";
  let underwayTask = "[]";
  let completeTask = "[]";
  let dir = global.savePath;
  let newTaskFilePath = path.resolve(dir, EXISTS + "/" + NEWT_ASK);
  let underwayTaskFilePath = path.resolve(dir, EXISTS + "/" + UNDERWAY_TASK);
  let completeTaskFilePath = path.resolve(dir, EXISTS + "/" + COMPLETE_TASK);
  try {
    newTask = fs.readFileSync(newTaskFilePath, { encoding: "utf-8" });
  } catch (e) {
    newTask = "[]";
  }

  try {
    underwayTask = fs.readFileSync(underwayTaskFilePath, { encoding: "utf-8" });
  } catch (e) {
    underwayTask = "[]";
  }
  try {
    completeTask = fs.readFileSync(completeTaskFilePath, { encoding: "utf-8" });
  } catch (e) {
    completeTask = "[]";
  }

  let obj = {
    newTask,
    underwayTask,
    completeTask,
  };
  event.sender.send(tag, obj);
};

/**
 * 获取历史记录
 * @param event
 * @param tag
 */
const getHistoryTask = (event, tag) => {
  let history = "[]";
  let dir = global.savePath;
  let historyFilePath = path.resolve(dir, EXISTS + "/" + HISTORY_TASK);
  try {
    history = fs.readFileSync(historyFilePath, { encoding: "utf-8" });
  } catch (e) {
    history = "[]";
  }
  let obj = {
    history,
  };
  event.sender.send(tag, obj);
};

export default {
  getUsername,
  getTask,
  getHistoryTask,
  // openDir,
};

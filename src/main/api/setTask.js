import { setFile } from "../utils";
import { NEWT_ASK, UNDERWAY_TASK, COMPLETE_TASK, HISTORY_TASK } from "../confing";
/**
 * 将新建的数据写入到本地文件中
 * @param event 事件
 * @param tag tag标签
 * @param data 页面传过来的数据
 */
const setNewTask = (event, tag, data) => {
  let obj = setFile(NEWT_ASK, data);
  event.sender.send(tag, obj);
};
const setUnderwayTask = (event, tag, data) => {
  let obj = setFile(UNDERWAY_TASK, data);
  event.sender.send(tag, obj);
};

const setCompleteTask = (event, tag, data) => {
  let obj = setFile(COMPLETE_TASK, data);
  event.sender.send(tag, obj);
};

// 设置历史记录
const setHistoryTask = (event, tag, data) => {
  let obj = setFile(HISTORY_TASK, data);
  event.sender.send(tag, obj);
};
export default {
  setNewTask,
  setUnderwayTask,
  setCompleteTask,
  setHistoryTask
};

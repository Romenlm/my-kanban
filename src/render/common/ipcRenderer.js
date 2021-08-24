import { uuid } from "./utils";

const renderer = function (name, data = null) {
  return new Promise((resolve, reject) => {
    try {
      let id = uuid(32, 16);
      let prams = {
        id: id,
        name: name,
        data: data,
      };
      window.ipcRenderer.send("event-api", prams); //给主进程发送消息“ping”
      window.ipcRenderer.on(name + "-" + id, (event, arg) => {
        // 接收到Main进程返回的消息
        resolve(arg);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default renderer;

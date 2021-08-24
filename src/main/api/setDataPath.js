import Store from "electron-store";
const { dialog } = require("electron");
const store = new Store();
const getDataPath = (event, tag) => {
  let savePath = store.get("savePath");
  if (savePath) {
    global.savePath = savePath;
  }
  event.sender.send(tag, savePath);
};

const setSavePath = (event, tag, data) => {
  store.set("savePath", data);
  let str = store.get("savePath");
  if (str) {
    global.savePath = str;
  }
  event.sender.send(tag, str);
};

const openDir = (event, tag) => {
  dialog.showOpenDialog({ properties: ["openDirectory"] }).then((res) => {
    event.sender.send(tag, res);
  });
};
export default { getDataPath, setSavePath, openDir };

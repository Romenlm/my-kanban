import api from "./api";
import set from "./api/setTask";
import setData from './api/setDataPath'
export default {
  ...api,
  ...set,
  ...setData,
};

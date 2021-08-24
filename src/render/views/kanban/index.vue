<template>
  <div class="kanban">
    <div class="kanban-nav-box">
      <span class="add-btn" @click="addTask">新增</span>
    </div>
    <div class="kanban-main-box" v-if="isLoad">
      <div class="kanban-item" v-for="item of list" :key="item.key">
        <div class="task-header">{{ item.title }}</div>
        <div class="task-content">
          <drag-component
            v-model:value="item.list"
            :type="item.key"
          ></drag-component>
        </div>
      </div>
    </div>
    <add-task-dialog
      v-model:value="addDialog"
      @ok="createTask"
    ></add-task-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import DragComponent from "./DragComponent";
import { Button, notification } from "ant-design-vue";
import AddTaskDialog from "../../components/AddTaskDialog";
import renderer from "@common/ipcRenderer";
export default {
  name: "kanban",
  components: {
    DragComponent,
    AddTaskDialog,
    [Button.name]: Button,
  },
  setup() {
    // let savePath = localStorage.getItem('save-path');
    let isLoad = ref(false);
    const list = reactive([
      {
        title: "未开始",
        key: "new_task",
        list: [],
      },
      {
        title: "进行中",
        key: "underway_task",
        list: [],
      },
      {
        title: "完成",
        key: "complete_task",
        list: [],
      },
    ]);
    /**
     * 获取到初始数据
     */
    renderer("getTask").then((res) => {
      list[0].list = JSON.parse(res.newTask);
      list[1].list = JSON.parse(res.underwayTask);
      list[2].list = JSON.parse(res.completeTask);
      isLoad.value = true;
    });

    let addDialog = ref(false);
    // 点击新增是执行弹框
    const addTask = () => {
      addDialog.value = true;
    };
    /**
     * 创建任务,点击时在数组中添加一条数据，并写到本地文件中
     * @param value 弹框传回的数据
     */
    const createTask = (value) => {
      list[0].list.push(value);
      const str = JSON.stringify(list[0].list);
      renderer("setNewTask", str).then((res) => {
        if (res.code !== "000000") {
          notification.warning({
            message: "新建失败",
            description: "新建任务失败，请重试！",
          });
        } else {
          addDialog.value = false;
        }
      });
    };
    return {
      isLoad,
      list,
      addTask,
      addDialog,
      createTask,
    };
  },
};
</script>

<style scoped lang="less">
.kanban {
  width: 100%;
  height: 100%;
  .kanban-nav-box {
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 4px;
    .add-btn {
      display: inline-block;
      width: 60px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      border-radius: 4px;
      /*background-color: #f4f6f9;*/
      box-shadow: 0 2px 2px 3px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
  .kanban-main-box {
    height: calc(100% - 80px);
    display: flex;
    justify-content: space-between;
    .kanban-item {
      height: 100%;
      width: 32%;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 1);
      .task-header {
        height: 50px;
        font-size: 18px;
        text-align: center;
        font-weight: bold;
        line-height: 50px;
        padding-left: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .task-content {
        height: calc(100% - 50px);
        overflow-y: auto;
        padding: 10px 16px;
      }
    }
  }
}
</style>

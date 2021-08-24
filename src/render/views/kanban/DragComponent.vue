<template>
  <draggable
    class="draggable-box"
    :list="listData"
    item-key="id"
    group="kanban"
    tag="transition-group"
    @add="add"
    @end="end"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: 'flip-list',
    }"
  >
    <template #item="{ element }">
      <task-item
        :data="element"
        :type="type"
        @close="
          () => {
            close(element);
          }
        "
        @edit="
          () => {
            editor(element);
          }
        "
        @delete="
          () => {
            deleteBtn(element);
          }
        "
      ></task-item>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import TaskItem from "./TaskItem";
import { reactive, watch } from "vue";
import { notification, Modal } from "ant-design-vue";
import renderer from "@common/ipcRenderer";
import { formatDates } from "../../common/utils";
import moment from "moment";
export default {
  name: "DragComponent",
  components: {
    draggable,
    TaskItem,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    // 双向绑定初始值为传递进来的数据
    let listData = reactive(props.value);
    watch(
      () => props.value,
      (newVal) => {
        listData = newVal;
      },
      { immediate: true }
    );
    watch(listData, (newVal) => {
      context.emit("input", newVal);
    });
    // 拖拽到某一个任务项时将数据存储起来
    const add = (item) => {
      let index = item.newIndex;
      listData[index].endDate = formatDates(new Date());
      if (props.type === "underway_task") {
        listData[index].status = "2";
        listData[index].startDate = moment(new Date(), "YYYY-MM-DD");
        setRender("setUnderwayTask", listData);
      } else if (props.type === "complete_task") {
        listData[index].status = "3";
        listData[index].endDate = moment(new Date(), "YYYY-MM-DD");
        setRender("setCompleteTask", listData);
      } else {
        listData[index].status = "1";
        setRender("setNewTask", listData);
      }
    };

    const end = () => {
      if (props.type === "underway_task") {
        setRender("setUnderwayTask", listData);
      } else if (props.type === "complete_task") {
        setRender("setCompleteTask", listData);
      } else {
        setRender("setNewTask", listData);
      }
    };

    const setRender = (name, list) => {
      let str = JSON.stringify(list);
      renderer(name, str).then((res) => {
        if (res.code !== "000000") {
          notification.warning({
            message: "数据存储失败",
            description: "你的数据存储失败，请重试！",
          });
        }
      });
    };

    const close = (el) => {
      Modal.confirm({
        title: "关闭任务",
        content: "你确定是否要关闭任务，关闭后在历史记录中可看到！",
        okText: "关闭",
        cancelText: "取消",
        onOk: () => {
          renderer("getHistoryTask").then((res) => {
            let history = JSON.parse(res.history);
            history.push(el);
            let dataObj = JSON.stringify(history);
            renderer("setHistoryTask", dataObj).then((res) => {
              if (res.code !== "000000") {
                notification.warning({
                  message: "数据存储失败",
                  description: "你的数据存储失败，请重试！",
                });
              } else {
                let len = listData.length;
                for (let i = 0; i < len; i++) {
                  if (el.id === listData[i].id) {
                    listData.splice(i, 1);
                    break;
                  }
                }
                setRender("setCompleteTask", listData);
              }
            });
          });
        },
      });
    };

    const editor = (el) => {
      console.log("点击编辑按钮");
      console.log(el);
    };
    const deleteBtn = (el) => {
      Modal.confirm({
        title: "删除",
        content: "你是否确定删除这条任务！",
        okText: "删除",
        cancelText: "取消",
        onOk: () => {
          let len = listData.length;
          for (let i = 0; i < len; i++) {
            if (el.id === listData[i].id) {
              listData.splice(i, 1);
              break;
            }
          }
          if (props.type === "underway_task") {
            setRender("setUnderwayTask", listData);
          } else if (props.type === "complete_task") {
            setRender("setCompleteTask", listData);
          } else {
            setRender("setNewTask", listData);
          }
        },
      });
    };
    return {
      listData,
      add,
      close,
      editor,
      deleteBtn,
      end,
    };
  },
};
</script>

<style scoped lang="less">
.draggable-box {
  width: 100%;
  padding: 0 0 100px 0;
}
</style>
<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>

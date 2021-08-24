<template>
  <div class="task-item-box">
    <div class="title-box">
      <span
        class="level-box"
        :class="{
          'level-1': data.level === 1,
          'level-2': data.level === 2,
          'level-3': data.level === 3,
        }"
      >
        {{ data.level }}
      </span>
      <span class="title-content"
        >{{ data.name }}<span v-if="remain < 0">{{ titleTip }}</span></span
      >
      <span class="close-btn" @click="close" v-if="type === 'complete_task'">
        <CloseOutlined />
      </span>
    </div>
    <div class="desc-box">{{ data.desc }}</div>
    <div class="footer-box">
      <div class="footer-left">
        <div>预计完成时间: {{ getDate() }}</div>
        <div v-if="type !== 'new_task'">开始执行时间: {{ getStartDate() }}</div>
      </div>
      <div class="footer-right">
        <a-tooltip placement="bottom">
          <template #title>
            <span>详情</span>
          </template>
          <span @click="detail"><FileTextOutlined /></span>
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template #title>
            <span>修改</span>
          </template>
          <span @click="edit"><EditOutlined /></span>
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template #title>
            <span>删除</span>
          </template>
          <span @click="deleteBtn"><DeleteOutlined /></span>
        </a-tooltip>
      </div>
    </div>
    <a-modal v-model:visible="detailVisible" title="任务详情">
      <div class="task-detail">
        <detail :data="data" :type="type" :remain="remain"></detail>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons-vue";
import {Tooltip, Modal} from "ant-design-vue";
import Detail from "../../components/Detail";
import { formatDates } from "../../common/utils";
import { ref } from "vue";
export default {
  name: "TaskItem",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "",
    },
  },
  components: {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    FileTextOutlined,
    [Tooltip.name]: Tooltip,
    [Modal.name]: Modal,
    Detail,
  },
  setup(props, context) {
    let detailVisible = ref(false);

    const startDate = new Date(props.data.startDate).getTime();
    const predict = formatDates(new Date(props.data.predictDate));
    const predictDate = new Date(predict).getTime();
    let remain = predictDate - startDate;
    let titleTip = ref("");
    titleTip.value = remain < 0 ? "超时" : "";
    /**
     * 关闭按钮,并将任务存入历史记录中
     */
    const close = () => {
      context.emit("close");
    };

    /**
     * 编辑按钮
     */
    const edit = () => {
      context.emit("edit");
    };
    /**
     * 删除按钮
     */
    const deleteBtn = () => {
      context.emit("delete");
    };

    /**
     * 点击详情
     */
    const detail = () => {
      detailVisible.value = true;
    };

    const getDate = () => {
      return formatDates(new Date(props.data.predictDate));
    };
    const getStartDate = () => {
      return formatDates(new Date(props.data.startDate));
    };
    return {
      close,
      edit,
      deleteBtn,
      getDate,
      getStartDate,
      detail,
      detailVisible,
      remain,
      titleTip,
    };
  },
};
</script>

<style scoped lang="less">
.task-item-box {
  height: 160px;
  box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.1);
  margin-top: 16px;
  border-radius: 5px;
  padding: 10px;
  cursor: move;
  .title-box {
    height: 40px;
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    .level-box {
      height: 20px;
      width: 20px;
      text-align: center;
      border-radius: 15px;
      font-size: 14px;
      margin-top: 2px;
      margin-right: 6px;
      color: #fff;
      &.level-1 {
        background-color: #f64e4e;
      }
      &.level-2 {
        background-color: #ea880e;
      }
      &.level-3 {
        background-color: #0386f8;
      }
    }
    .title-content {
      width: 0;
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      span {
        display: inline-block;
        height: 14px;
        width: 26px;
        font-size: 10px;
        text-align: center;
        line-height: 14px;
        color: #f64e4e;
        border: 1px solid #f64e4e;
        margin-left: 2px;
        margin-top: 8px;
        position: absolute;
      }
    }
    .close-btn {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 10px;
      background-color: #f0ad20;
      font-size: 6px;
      line-height: 12px;
      text-align: center;
      &:hover {
        cursor: pointer;
        color: #fff;
      }
    }
  }

  .desc-box {
    height: 56px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    /*white-space: nowrap;*/
  }

  .footer-box {
    margin-top: 10px;
    height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer-left {
      width: 60%;
      height: 100%;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      div {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #999;
      }
    }
    .footer-right {
      width: 40%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        height: 26px;
        width: 26px;
        color: #999;
        text-align: center;
        line-height: 32px;
        margin-right: 10px;
        border-radius: 30px;
        background-color: #fff;
        box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
        &:hover {
          color: #0386f8;
          cursor: pointer;
          box-shadow: 0 1px 2px 1px #0386f8;
        }
      }
    }
  }

  .task-detail {
    height: 600px;
  }
}
</style>

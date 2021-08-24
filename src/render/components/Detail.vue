<template>
  <div class="detail">
    <div class="task-title">
      <span
        class="level-box"
        :class="{
          'level-1': data.level === 1,
          'level-2': data.level === 2,
          'level-3': data.level === 3,
        }"
        >{{ data.level }}
      </span>
      {{ data.name }}
    </div>
    <div class="detail-desc">
      <span class="label-title">描述：</span><span>{{ data.desc }}</span>
    </div>
    <div class="detail-item">
      <span class="label-title">开始执行时间:</span
      ><span>{{ data.startDate }}</span>
    </div>
    <div class="detail-item">
      <span class="label-title">预计完成时间:</span>
      <span>{{ predict }}</span>
    </div>
    <div class="detail-item" v-if="type === 'complete_task'">
      <span class="label-title">结束任务时间:</span>
      <span>{{ data.end }}</span>
    </div>
    <div class="detail-item">
      <span class="label-title">任务等级:</span><span>{{ data.level }}</span>
    </div>
    <div class="detail-item">
      <span class="label-title">任务状态:</span><span :class="{'time-out': remain < 0 || data.status ==='1' }">{{ status() }}</span>
    </div>
  </div>
</template>

<script>
import { formatDates } from "../common/utils";
export default {
  name: "detail",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "",
    },
    remain: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    const predict = formatDates(new Date(props.data.predictDate));

    const status = () => {
      let str = "";
      if (props.remain >= 0) {
        if (props.data.status === "1") {
          str = "未开始";
        } else if (props.data.status === "2") {
          str = "进行中";
        } else {
          str = "完成";
        }
      } else {
        str = "已超时";
      }

      return str;
    };
    return {
      status,
      predict,
    };
  },
};
</script>

<style scoped lang="less">
.detail {
  height: 100%;
  width: 100%;

  .task-title {
    height: 40px;
    font-size: 20px;
    display: flex;
    color: #0386f8;
    .level-box {
      height: 20px;
      width: 20px;
      text-align: center;
      border-radius: 15px;
      font-size: 14px;
      margin-top: 4px;
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
  }

  .detail-desc {
    min-height: 40px;
    display: flex;
    align-items: center;
    span {
      &:last-child {
        width: 0;
        flex-grow: 1;
        padding: 5px 10px;
        /*border: 1px solid rgba(0, 0, 0, 0.06);*/
        border-radius: 4px;
      }
    }
  }

  .detail-item {
    height: 40px;
    display: flex;
    align-items: center;
    span {
      &:last-child {
        padding: 0 10px;
      }
    }
    .time-out{
      color: #f60404;
    }
  }

  .label-title {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
  }
}
</style>

<template>
  <div class="history-page">
    <div class="task-history-title">任务历史记录</div>
    <div class="table-box" v-if="isLoading">
      <a-table
        :dataSource="list.list"
        :columns="columns"
        :scroll="{ y: 'calc(100vh - 200px)' }"
        :pagination="pagination"
      >
        <template #startDate="{ text }">
          {{ getDateFormat(text) }}
        </template>
        <template #endDate="{ text }">
          {{ getDateFormat(text) }}
        </template>
        <template #level="{ text }">
          <span
            class="level-box"
            :class="{
              'level-1': text === 1,
              'level-2': text === 2,
              'level-3': text === 3,
            }"
          >
            {{ text }}
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import renderer from "@common/ipcRenderer";
import { reactive, ref } from "vue";
import { Table } from "ant-design-vue";
import { formatDates } from "../../common/utils";
export default {
  name: "history",
  components: {
    [Table.name]: Table,
  },
  setup() {
    const list = reactive({
      list: [],
    });
    let isLoading = ref(false);
    renderer("getHistoryTask").then((res) => {
      list.list = JSON.parse(res.history);
      list.list.forEach((item) => {
        item.key = item.id;
      });
      isLoading.value = true;
    });

    const getDateFormat = (text) => {
      return formatDates(new Date(text));
    };

    return {
      list,
      isLoading,
      getDateFormat,
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          width: 200,
        },
        {
          title: "级别",
          dataIndex: "level",
          key: "level",
          width: 80,
          slots: {
            customRender: "level",
          },
        },
        {
          title: "描述",
          dataIndex: "desc",
          key: "desc",
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
          key: "createDate",
          width: 120,
        },
        {
          title: "开始时间",
          dataIndex: "startDate",
          key: "startDate",
          width: 120,
          slots: {
            customRender: "startDate",
          },
        },

        {
          title: "结束时间",
          dataIndex: "endDate",
          key: "endDate",
          width: 120,
          slots: {
            customRender: "endDate",
          },
        },
      ],
      pagination: {
        pageSize: 12,
      },
    };
  },
};
</script>

<style scoped lang="less">
.history-page {
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  .task-history-title {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background-color: #fff;
    padding: 0 10px;
  }
  .table-box {
    height: calc(100% - 50px);
    overflow: hidden;
    padding: 10px 10px;
    .level-box {
      display: inline-block;
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border-radius: 13px;
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

  .table-box /deep/ .ant-table-tbody {
    height: calc(100vh - 229px);
    overflow: auto;
  }
}
</style>

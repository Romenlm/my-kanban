<template>
  <div class="kanban-set">
    <a-tabs default-active-key="1" @change="selectTab">
      <a-tab-pane v-for="item of tabList.list" :key="item.key" :tab="item.name">
        <set-save-path></set-save-path>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import SetSavePath from "./SetSavePath";
import { reactive } from "vue";
import { Tabs } from "ant-design-vue";
export default {
  name: "Index",
  components: {
    SetSavePath,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
  },
  setup() {
    const tabList = reactive({
      list: [
        {
          key: "tab_set_path",
          name: "数据存储",
        },
      ],
    });
    const selectTab = (value) => {
      console.log(value);
    };

    return {
      selectTab,
      tabList,
    };
  },
};
</script>

<style scoped lang="less">
.kanban-set {
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
}
</style>

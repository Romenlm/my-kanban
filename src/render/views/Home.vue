<template>
  <div class="home">
    <aside :style="{ width: menuWidth + 'px' }">
      <div class="log-box">
        <div class="log-content">
          <img src="../assets/images/log.jpg" />
        </div>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="height"
        :inline-collapsed="collapsed"
        @click="selectItem"
      >
        <template v-for="item in list" :key="item.key">
          <a-menu-item>
            <template #icon>
              <ReadOutlined v-if="item.key === 'kanban-history'" style="font-size: 20px"/>
              <SnippetsOutlined v-if="item.key === 'my-kanban'" style="font-size: 20px"/>
              <SettingOutlined v-if="item.key === 'kanban-set'" style="font-size: 20px"/>
<!--              <PieChartOutlined v-if="item.key === 'my-kanban'" style="font-size: 20px"/>-->
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
      </a-menu>
      <div
        @click="toggleCollapsed"
        class="show-hidden-btn"
      >
        <div class="top-icon"></div>
        <div class="center-btn">
          <LeftOutlined :style="{transform: collapsed?'rotate(-180deg)':'rotate(0deg)',transition:'transform .6s linear'}"/>
        </div>
        <div class="bottom-icon"></div>
      </div>

    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { Button, Menu } from "ant-design-vue";
import {
  // PieChartOutlined,
  SnippetsOutlined,
  ReadOutlined,
  LeftOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
const list = [
  {
    key: "my-kanban",
    title: "任务看板",
  },
  {
    key: "kanban-history",
    title: "历史记录",
  },
  {
    key: "kanban-set",
    title: "设置",
  },
  // {
  //   key: "kanban-calendar",
  //   title: "个人日历",
  // },
];
export default {
  name: "Home",
  components: {
    // PieChartOutlined,
    SnippetsOutlined,
    // MenuUnfoldOutlined,
    LeftOutlined,
    ReadOutlined,
    SettingOutlined,
    [Button.name]: Button,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
  },
  setup() {
    const state = reactive({
      selectedKeys: ["my-kanban"],
    });
    const router = useRouter();
    const collapsed = ref(false);
    const menuWidth = ref(200);
    // 路由跳转
    const selectItem = (value) => {
      if (value.key === "my-kanban") {
        router.push("/kanban");
      } else if (value.key === "kanban-history") {
        router.push("/kanban-history");
      } else if(value.key === 'kanban-set'){
        console.log('000000000000')
        router.push("/kanban-set");
      }
    };
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
      if (collapsed.value) {
        menuWidth.value = 80;
      } else {
        menuWidth.value = 200;
      }
    };
    return {
      ...toRefs(state),
      list,
      menuWidth,
      collapsed,
      selectItem,
      toggleCollapsed,
    };
  },
};
</script>

<style scoped lang="less">
.home {
  height: 100%;
  /*background-color: #42b983;*/
  display: flex;

  aside {
    width: 200px;
    height: 100%;
    background-color: #ffffff;
    position: relative;
    transition: width 0.2s linear;
    .log-box {
      height: 100px;
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .log-content {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
          height: 50px;
          width: 50px;
        }
      }
    }
    .show-hidden-btn{
      transition: all .3s linear;
      position: absolute;
      right: -4px;
      top: 46%;
      width: 10px;
      height: 60px;
      &:hover{
        cursor: pointer;
      }
      .top-icon{
        width: 0;
        height: 0;
        border-bottom: 14px solid #fff;
        border-right: 14px solid transparent;
      }
      .center-btn{
        height: 40px;
        width: 14px;
        background-color: #fff;
        line-height: 40px;
        text-align: center;
        font-size: 10px;
        color: #8a8c8e;
      }
      .bottom-icon{
        width: 0;
        height: 0;
        border-top: 14px solid #fff;
        border-right: 14px solid transparent;
      }
    }
  }
  main {
    width: 0;
    flex-grow: 1;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 10px 10px;
  }
}
</style>

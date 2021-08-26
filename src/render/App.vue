<template>
  <template v-if="isPath">
    <router-view />
  </template>
  <a-modal v-model:visible="visible" title="选择数据存储位置" @ok="handleOk">
    <div>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
        <a-form-item ref="path" label="选择路径" name="path">
          <a-input v-model:value="formState.path">
            <template #suffix>
              <a-tooltip title="选择存储位置">
                <FolderOutlined @click="selectSavePath" />
              </a-tooltip>
            </template>
          </a-input>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
import renderer from "@common/ipcRenderer";
import { reactive, ref } from "vue";
import { FolderOutlined } from "@ant-design/icons-vue";
import { Modal, Form, Input, message } from "ant-design-vue";
export default {
  name: "App",
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    FolderOutlined,
  },
  setup() {
    let isPath = ref("");
    let visible = ref(false);
    const formState = reactive({
      path: "",
    });
    renderer("getDataPath").then((res) => {
      if (!res) {
        visible.value = true;
      } else {
        isPath.value = res;
      }
    });
    const selectSavePath = () => {
      renderer("openDir").then((res) => {
        if (res) {
          formState.path = res.filePaths[0];
        }
      });
    };
    const handleOk = () => {
      if (formState.path) {
        renderer("setSavePath", formState.path).then((res) => {
          if (res) {
            message.success("设置成功");
          } else {
            message.warning("设置失败");
          }
        });
        visible.value = false;
        isPath.value = true;
      } else {
        message.warning("请选择数据存储位置");
      }
    };

    return {
      isPath,
      visible,
      handleOk,
      formState,
      selectSavePath,
    };
  },
};
</script>

<style lang="less">
html,
body {
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
  background-color: #f4f6f9;
}
</style>
<style>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>

<template>
  <div class="save-path-page">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item ref="path" label="选择路径" name="path">
        <a-input v-model:value="formState.path" disabled>
          <template #suffix>
            <a-tooltip title="选择存储位置">
              <FolderOutlined @click="selectSavePath" />
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
    </a-form>
    <a-button type="primary" class="save-btn" @click="handleOk">保存</a-button>
  </div>
</template>

<script>
import renderer from "@common/ipcRenderer";
import { reactive } from "vue";
import { FolderOutlined } from "@ant-design/icons-vue";
import { Form, Input, message, Button } from "ant-design-vue";
export default {
  name: "SetSavePath",
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Button.name]: Button,
    FolderOutlined,
  },
  setup() {
    const formState = reactive({
      path: "",
    });
    renderer("getDataPath").then((res) => {
      if (res) {
        formState.path = res;
      }
    });
    const selectSavePath = () => {
      renderer("openDir").then((res) => {
        if (res.filePaths.length>0) {
          formState.path = res.filePaths[0];
        }
      });
    };
    /**
     * 点击确定后保存的按钮
     */
    const handleOk = () => {
      if (formState.path) {
        renderer("setSavePath", formState.path).then((res) => {
          if (res) {
            message.success("设置成功");
          } else {
            message.warning("设置失败");
          }
        });
      } else {
        message.warning("请选择数据存储位置");
      }
    };

    return {
      handleOk,
      formState,
      selectSavePath,
    };
  },
};
</script>

<style scoped lang="less">
.save-path-page {
  padding: 40px 40px;
  .save-btn{
    margin-left: 100px;
  }
}
</style>

<template>
  <a-modal v-model:visible="visible" :footer="null" @ok="handleOk">
    <div class="header-title">新建任务</div>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item ref="name" label="任务名称" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item ref="desc" label="任务描述" name="desc">
        <a-input v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item label="任务等级" name="level">
        <a-select
          v-model:value="formState.level"
          style="width: 100%"
          @change="handleChange"
        >
          <a-select-option :value="1">1</a-select-option>
          <a-select-option :value="2">2</a-select-option>
          <a-select-option :value="3">3</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item ref="predictDate" label="预计完成时间" name="predictDate">
        <a-date-picker v-model:value="formState.predictDate" style="width: 100%"/>
      </a-form-item>
    </a-form>
    <div class="footer-btn">
      <a-button class="btn" @click="close">取消</a-button>
      <a-button type="primary" class="btn" @click="handleOk">确认</a-button>
    </div>
  </a-modal>
</template>

<script>
import { Modal, Form, Input, Select, Button, DatePicker } from "ant-design-vue";
import { reactive, ref, watch } from "vue";
import { formatDates, uuid } from "../common/utils";
import moment from "moment";
export default {
  name: "AddTaskDialog",
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Select.name]: Select,
    [Select.Option.displayName]: Select.Option,
    [Button.name]: Button,
    [DatePicker.name]: DatePicker,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const formRef = ref();
    const formState = reactive({
      name: "",
      desc: "",
      level: 1,
      predictDate: moment(new Date(), "YYYY-MM-DD"),
    });
    const levelList = reactive([1, 2, 3]);
    const rules = {
      name: [
        {
          required: true,
          message: "任务名称不能为空",
          trigger: "blur",
        },
      ],
      desc: [
        {
          required: true,
          message: "任务描述不能为空",
          trigger: "blur",
        },
      ],
    };
    let visible = ref(props.value);
    watch(visible, (val) => {
      context.emit("update:value", val);
    });
    watch(
      () => props.value,
      (val) => {
        visible.value = val;
        formState.name = "";
        formState.desc = "";
      }
    );

    /**
     * 点击确定按钮
     */
    const handleOk = () => {
      formRef.value
        .validate()
        .then(() => {
          let obj = {
            name: formState.name,
            level: formState.level,
            desc: formState.desc,
            startDate: formatDates(new Date()),
            createDate: formatDates(new Date()),
            status: "1", // 表示状态，1未开始任务，2表示进行中，3表示完成
            predictDate: formState.predictDate,
            endDate: "",
            id: uuid(32, 16),
          };
          context.emit("ok", obj);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    /**
     * 点击取消按钮
     */
    const close = () => {
      visible.value = false;
    };
    return {
      formState,
      visible,
      handleOk,
      formRef,
      rules,
      levelList,
      close,
    };
  },
};
</script>

<style scoped lang="less">
.header-title {
  height: 40px;
  /*line-height: 40px;*/
  font-size: 16px;
  font-weight: bold;
}
.footer-btn {
  display: flex;
  justify-content: center;
  .btn {
    margin: 0 20px;
  }
}
</style>

<template>
  <div class="command-design">
    <CommandDesign :componentList="componentList" v-model="formData" @getData="handleGetData" />
    <div style="margin-top: 20px">
      <a-button @click="getFormData">获取表单数据</a-button>
      <a-button @click="resetFormData" style="margin-left: 10px">重置表单数据</a-button>
    </div>
    <div style="margin-top: 20px">
      <pre>{{ JSON.stringify(formData) }}</pre>
    </div>
  </div>
</template>

<script>
import CommandDesign from '@alitojs/command-design';
import { componentList } from './CompJson';
export default {
  name: 'CommandDesignPage',
  components: {
    CommandDesign
  },
  data() {
    return {
      componentList: [],
      formData: {
        top: [],
        bottom: [],
        left: [],
        right: []
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.componentList = componentList;
    }, 500);
  },
  methods: {
    handleGetData(data) {
      console.log('获取到的表单数据:', data);
    },
    getFormData() {
      console.log('当前表单数据:', this.formData);
      this.$message.success('表单数据已输出到控制台');
    },
    resetFormData() {
      this.formData = {
        top: [],
        bottom: [],
        left: [],
        right: []
      };
      this.$message.success('表单数据已重置');
    }
  }
};
</script>

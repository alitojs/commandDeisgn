<template>
  <div class="command-design-content">
    <CdComp class="cd-left" />
    <CdView class="cd-view" v-model="formData" @getData="handleGetData" @component-select="handleComponentSelect" />
    <CdAttribute class="cd-right" :selectedComponent="selectedComponent" @attribute-change="handleAttributeChange" />
  </div>
</template>

<script>
import CdComp from './CdComp.vue';
import CdView from './CdView.vue';
import CdAttribute from './CdAttribute.vue';
export default {
  name: 'CommandDesign',
  components: {
    CdComp,
    CdView,
    CdAttribute
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['getData'],
  data() {
    return {
      formData: this.value,
      selectedComponent: null
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.formData = newVal;
      },
      deep: true,
      immediate: true
    },
    formData: {
      handler(newVal) {
        this.$emit('input', newVal);
      },
      deep: true
    }
  },
  methods: {
    handleGetData(data) {
      this.$emit('getData', data);
    },

    handleComponentSelect(component) {
      this.selectedComponent = component;
      console.log('选中组件:', component);
    },

    handleAttributeChange({ component, attributes }) {
      // 更新组件属性
      Object.assign(component, attributes);
      console.log('属性更新:', component, attributes);

      // 触发数据更新 - 使用 Vue.set 确保响应式更新
      this.$set(this.formData, 'updated', Date.now());

      // 通知父组件数据已更新
      this.$emit('input', this.formData);
    }
  }
};
</script>

<style scoped lang="less">
.command-design-content {
  width: 100%;
  display: flex;
  padding: 20px;
  background: #fafafa;
  min-height: 750px;
  .cd-left {
    width: 270px;
    box-shadow: 0 0 1px 1px #ccc;
  }
  .cd-view {
    flex: 1;
    box-shadow: 0 0 1px 1px #ccc;
    margin: 0 8px;
  }
  .cd-right {
    width: 270px;
    box-shadow: 0 0 1px 1px #ccc;
  }
}
</style>

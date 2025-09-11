<template>
  <div class="command-design-content">
    <CdComp class="cd-left" />
    <CdView class="cd-view" v-model="formData" @getData="handleGetData" />
    <CdAttribute class="cd-right" />
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
      formData: this.value
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
  min-height: 70vh;
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

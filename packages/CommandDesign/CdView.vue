<template>
  <div class="cd-view-style">
    <div class="cd-view-content">
      <div class="cd-top">
        <DragReceive v-model="compFormObj.top" @change="updateData" />
      </div>
      <div class="cd-bottom">
        <DragReceive v-model="compFormObj.bottom" @change="updateData" />
      </div>
      <div class="cd-left">
        <DragReceive v-model="compFormObj.left" multiple direction="vertical" @change="updateData" />
      </div>
      <div class="cd-right">
        <DragReceive v-model="compFormObj.right" multiple direction="vertical" @change="updateData" />
      </div>
    </div>
  </div>
</template>

<script>
import DragReceive from './DragReceive';
export default {
  name: 'CdView',
  components: { DragReceive },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['getData'],
  computed: {
    compFormObj: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    updateData() {
      this.$emit('input', this.compFormObj);
    },
    getData() {
      console.log(this.compFormObj);
      this.$emit('getData', this.compFormObj);
    }
  }
};
</script>

<style lang="less" scoped>
.cd-view-style {
  padding: 10px;

  .cd-view-content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cd-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .cd-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .cd-left {
    position: absolute;
    top: 80px;
    bottom: 80px;
    left: 0;
  }
  .cd-right {
    position: absolute;
    top: 80px;
    bottom: 80px;
    right: 0;
  }
}
</style>

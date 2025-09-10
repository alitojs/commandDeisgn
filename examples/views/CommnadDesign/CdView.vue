<template>
  <div class="cd-view-style">
    <div class="cd-view-content">
      <div class="cd-top">
        <DragReceive v-model="compFormObj.top" />
      </div>
      <div class="cd-bottom">
        <DragReceive v-model="compFormObj.bottom" />
      </div>
      <div class="cd-left">
        <DragReceive v-model="compFormObj.left" multiple direction="vertical" />
      </div>
      <div class="cd-right">
        <DragReceive v-model="compFormObj.right" multiple direction="vertical" />
      </div>
    </div>
    <a-button @click="getData">获取数据</a-button>
  </div>
</template>

<script>
import DragReceive from './DragReceive';
export default {
  name: 'CdView',
  components: { DragReceive },
  data() {
    return { compFormObj: {} };
  },
  methods: {
    getData() {
      console.log(this.compFormObj);
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

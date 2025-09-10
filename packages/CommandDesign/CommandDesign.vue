<template>
  <div class="command-design-content">
    <CdComp class="cd-left" />
    <CdView class="cd-view" />
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

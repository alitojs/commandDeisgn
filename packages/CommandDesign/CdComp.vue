<template>
  <div class="cd-comp-style">
    <a-tabs v-model="activeTab">
      <a-tab-pane key="1" tab="组件库">
        <a-collapse v-model="activeCollapse">
          <a-collapse-panel key="1" v-for="item in componentListData" :header="item.name" :key="item.id">
            <collapse-item :components="item.components" />
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CollapseItem from './CollapseItem';
export default {
  name: 'CdComp',
  components: {
    CollapseItem
  },
  inject: ['componentList'],
  computed: {
    componentListData() {
      return this.componentList ? this.componentList() : [];
    }
  },
  data() {
    return {
      activeTab: '1', // 激活的 tab
      activeCollapse: [] //激活的面板
    };
  }
};
</script>

<style scoped lang="less">
.cd-comp-style {
  /deep/.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 6px 16px 6px 40px !important;
  }
  /deep/.ant-collapse-content-box {
    padding: 8px;
  }
}
</style>

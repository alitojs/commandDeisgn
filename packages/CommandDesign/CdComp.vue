<template>
  <div class="cd-comp-style">
    <a-tabs v-model="activeTab">
      <a-tab-pane key="1" tab="组件库">
        <a-collapse v-model="activeCollapse">
          <a-collapse-panel key="1" v-for="item in componentList" :header="item.name" :key="item.id">
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
  data() {
    return {
      activeTab: '1', // 激活的 tab
      activeCollapse: [], //激活的面板
      // 组件库数据
      componentList: [
        {
          key: '1',
          name: '头部组件',
          components: [
            { id: 1, name: '头部1', type: 'headerOne' },
            { id: 2, name: '头部2', type: 'headerTwo' },
            { id: 3, name: '头部3', type: 'headerThree' }
          ]
        },
        {
          key: '2',
          name: '列组件',
          components: [
            { id: 13, name: '列1', type: 'columnOne' },
            { id: 17, name: '列2', type: 'columnTwo' }
          ]
        },
        {
          key: '3',
          name: '底部组件',
          components: [
            { id: 14, name: '底部1', type: 'bottomOne' },
            { id: 15, name: '底部2', type: 'bottomTwo' },
            { id: 16, name: '底部3', type: 'bottomThree' }
          ]
        }
      ]
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

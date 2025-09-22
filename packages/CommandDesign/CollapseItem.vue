<template>
  <div class="collapse-item-style">
    <draggable
      tag="ul"
      class="collapse-item-draggable"
      :value="components"
      v-bind="{
        group: { name: 'form-draggable', pull: 'clone', put: false },
        sort: false,
        animation: 180,
        ghostClass: 'moving'
      }">
      <div
        class="collapse-item"
        v-for="item in components"
        :key="item.id"
        :data-drag-data="JSON.stringify(item)"
        draggable="true"
        @dragstart="handleDragStart($event, item)">
        <div>{{ item.label }}</div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'CollapseItem',
  components: {
    draggable
  },

  props: {
    components: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleDragStart(event, item) {
      // 设置拖拽数据到 dataTransfer
      event.dataTransfer.setData('text/plain', JSON.stringify(item));
      event.dataTransfer.effectAllowed = 'copy';

      console.log('拖拽开始，数据:', item);
    }
  }
};
</script>

<style scoped lang="less">
.collapse-item-style {
  .collapse-item-draggable {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4px;
    padding-left: 0;
  }

  .collapse-item {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      border: 1px solid #1890ff;
      box-shadow: 0 2px 6px #1890ff;
    }
  }
}
</style>

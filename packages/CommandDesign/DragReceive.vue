<template>
  <div class="drag-receive-style">
    <draggable
      tag="div"
      class="drag-receive-container"
      :list="mergedValue"
      v-bind="{
        group: { name: 'form-draggable', pull: false, put: true },
        sort: true,
        animation: 180,
        ghostClass: 'moving',
        chosenClass: 'chosen',
        dragClass: 'drag',
        filter: '.remove-btn',
        preventOnFilter: false
      }"
      :clone="handleClone"
      @change="handleChange"
      :style="{
        'flex-direction': direction == 'horizontal' ? 'column' : 'row'
      }">
      <div
        class="dropped-item"
        v-for="(item, index) in mergedValue"
        :key="(item && item.id) || index"
        :class="{ selected: selectedItem === item }"
        @click="selectItem(item)">
        <div class="item-content">
          <div class="item-display">
            <!-- 如果有图片URL，显示图片 -->
            <!-- 优先使用 options.imageUrl，如果没有则使用根级别的 imageUrl -->
            <div v-if="item && getImageUrl(item)" class="item-image">
              <img :src="getImageUrl(item)" :alt="item.label || '组件图片'" @error="handleImageError" @load="handleImageLoad" />
            </div>
            <!-- 显示文字标签 -->
            <span class="item-name" :style="{ display: item && getImageUrl(item) ? 'none' : 'block' }">
              {{ (item && item.label) || '未知组件' }}
            </span>
          </div>
          <button class="remove-btn" @click.stop.prevent="removeItem(index)" type="button">×</button>
        </div>
      </div>
      <div v-if="mergedValue.length === 0" class="empty-placeholder">{{ placeholder }}</div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'DragReceive',
  components: {
    draggable
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '拖拽组件到这里'
    },
    direction: {
      type: 'horizontal' | 'vertical',
      default: 'horizontal'
    }
  },
  computed: {
    mergedValue: {
      get() {
        return this.value || [];
      },
      set(val) {
        this.$emit('change', val);
      }
    }
  },
  data() {
    return {
      selectedItem: null
    };
  },
  methods: {
    handleClone(original) {
      console.log('handleClone 接收到的 original:', original);

      // 确保 original 有正确的数据结构
      if (!original || typeof original !== 'object') {
        console.warn('handleClone: original 数据无效', original);
        return {
          id: this.generateUniqueId(),
          label: '未知组件',
          type: 'unknown'
        };
      }

      // 确保 original 有必要的属性
      if (!original.id && !original.label) {
        console.warn('handleClone: original 缺少必要属性', original);
        return {
          id: this.generateUniqueId(),
          label: original.name || '未知组件',
          type: original.type || 'unknown'
        };
      }

      // 使用 vuedraggable 的 clone，统一生成我们需要的数据结构
      const clonedItem = {
        ...original,
        id: this.generateUniqueId(),
        originalId: original.id,
        label: original.label || original.name || '未知组件'
      };

      console.log('handleClone 生成的克隆数据:', clonedItem);
      return clonedItem;
    },
    // 保证在 non-multiple 模式下，长度不超过 1
    ensureLengthLimit(list) {
      if (!this.multiple && list.length > 1) {
        return [list[list.length - 1]];
      }
      return list;
    },

    handleChange(evt) {
      console.log('handleChange 事件:', evt);
      console.log('当前 mergedValue:', this.mergedValue);

      // 统一处理 add/update/remove
      const { added, moved, removed } = evt;

      if (added) {
        console.log('添加事件:', added);
        const newIndex = added.newIndex;
        let next = [...this.mergedValue];

        console.log('添加前的数组:', next);
        console.log('新添加的项:', next[newIndex]);

        // 检查新添加的项是否有效
        const newItem = next[newIndex];
        if (!newItem || typeof newItem !== 'object') {
          console.warn('添加的项无效，跳过:', newItem);
          return;
        }

        if (!this.multiple) {
          // 单选：只保留当前项
          this.mergedValue = [newItem];
        } else {
          // 多选：由 clone 已生成规范对象，通常无需额外处理；仅做长度限制
          this.mergedValue = this.ensureLengthLimit(next);
        }

        console.log('添加后的 mergedValue:', this.mergedValue);
        this.$emit('component-added', this.mergedValue[newIndex] || this.mergedValue[0], newIndex);
        return;
      }

      if (moved) {
        // 排序已经由 :list 完成，这里只透传事件
        this.$emit('components-updated', this.mergedValue);
        return;
      }

      if (removed) {
        const oldIndex = removed.oldIndex;
        const next = [...this.mergedValue];
        const removedItem = next.splice(oldIndex, 1)[0];
        this.mergedValue = this.ensureLengthLimit(next);
        this.$emit('component-removed', removedItem, oldIndex);
      }
    },

    getDraggedData(evt) {
      // 从拖拽事件中获取数据
      // 这里需要根据实际的拖拽数据传递方式来实现
      // 通常数据会通过 dataTransfer 或者其他方式传递

      // 方法1: 通过 dataTransfer
      if (evt.originalEvent && evt.originalEvent.dataTransfer) {
        try {
          const data = evt.originalEvent.dataTransfer.getData('text/plain');
          return data ? JSON.parse(data) : null;
        } catch (e) {
          console.warn('解析拖拽数据失败:', e);
        }
      }

      // 方法2: 通过拖拽元素的属性
      const draggedElement = evt.item;
      if (draggedElement && draggedElement.dataset) {
        try {
          const data = draggedElement.dataset.dragData;
          return data ? JSON.parse(data) : null;
        } catch (e) {
          console.warn('从元素属性解析拖拽数据失败:', e);
        }
      }

      // 方法3: 模拟数据（用于测试）
      return {
        id: 'temp-' + Date.now(),
        name: '拖拽的组件',
        type: 'component'
      };
    },

    generateUniqueId() {
      return 'dropped-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    },

    removeItem(index) {
      const next = [...this.mergedValue];
      const removedItem = next.splice(index, 1)[0];
      this.mergedValue = this.ensureLengthLimit(next);
      console.log('手动移除组件:', removedItem);
      this.$emit('component-removed', removedItem, index);
    },

    // 清空所有拖拽的组件
    clearAll() {
      this.mergedValue = [];
      this.$emit('components-cleared');
    },

    // 获取当前所有拖拽的组件
    getDroppedComponents() {
      return this.mergedValue;
    },

    // 选中组件
    selectItem(item) {
      this.selectedItem = item;
      this.$emit('component-select', item);
      console.log('选中组件:', item);
    },

    // 图片加载错误处理
    handleImageError(event) {
      console.warn('图片加载失败:', event.target.src);
      // 隐藏图片，显示文字标签
      const imgContainer = event.target.closest('.item-image');
      if (imgContainer) {
        imgContainer.style.display = 'none';
        // 显示文字标签
        const itemContent = event.target.closest('.item-content');
        const itemName = itemContent.querySelector('.item-name');
        if (itemName) {
          itemName.style.display = 'block';
        }
      }
    },

    // 图片加载成功处理
    handleImageLoad(event) {
      console.log('图片加载成功:', event.target.src);
    },

    // 获取图片URL，imageUrl 只在 JSON 中定义，不在 options 中
    getImageUrl(item) {
      if (!item) return null;
      return item.imageUrl || null;
    }
  }
};
</script>

<style scoped lang="less">
.drag-receive-style {
  width: 100%;
  height: 100%;
  .drag-receive-container {
    border: 2px dashed #d9d9d9;
    border-radius: 8px;
    padding: 16px;
    background-color: #fafafa;
    transition: all 0.3s ease;
    display: flex;
    width: 100%;
    height: 100%;

    &:hover {
      border-color: #1890ff;
      background-color: #f0f8ff;
    }

    // 拖拽时的样式
    &.sortable-drag-over {
      border-color: #1890ff;
      background-color: #e6f7ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  .dropped-item {
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 100%;
    // max-width: 150px;

    &:last-child {
      margin-bottom: 0;
    }

    &.selected {
      .item-content {
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        background-color: #f0f8ff;
      }
    }

    &:hover {
      .item-content {
        border-color: #40a9ff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }

    .item-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      // min-height: 60px;
      height: 100%;
      position: relative;

      &:hover {
        border-color: #1890ff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      }

      .item-display {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        height: 100%;
      }

      .item-image {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
        }
      }

      .item-name {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }

      .remove-btn {
        width: 20px;
        height: 20px;
        border: none;
        background-color: #ff4d4f;
        color: white;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        position: absolute;
        right: 4px;
        top: 4px;

        &:hover {
          background-color: #ff7875;
          transform: scale(1.1);
        }

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  .empty-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
    font-size: 14px;
    border: 2px dashed #d9d9d9;
    border-radius: 4px;
    background-color: #fafafa;
    transition: all 0.3s ease;
    width: 100%;
    padding: 6px;

    &:hover {
      color: #1890ff;
      border-color: #1890ff;
      background-color: #f0f8ff;
    }
  }
}
</style>

<style>
/* 全局拖拽样式 */
.moving {
  opacity: 0.5;
  transform: rotate(5deg);
}

.chosen {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.drag {
  opacity: 0.8;
  transform: rotate(3deg);
}
</style>

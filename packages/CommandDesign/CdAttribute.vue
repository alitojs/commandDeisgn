<template>
  <div class="cd-attribute">
    <div class="attribute-header">
      <h3>属性配置</h3>
    </div>

    <div class="attribute-content" v-if="selectedComponent">
      <div class="component-info">
        <p>
          <strong>组件名称：</strong>
          {{ selectedComponent.label || selectedComponent.name }}
        </p>
      </div>

      <a-divider />

      <div class="attribute-form">
        <a-form :model="attributeForm" layout="vertical">
          <AttributeInput
            v-model="attributeForm.pcUrl"
            label="PC端路径"
            placeholder="请输入PC端相对路径，如：/home"
            @change="handleAttributeChange" />

          <!-- 可以根据组件类型动态添加更多属性 -->
          <template v-if="selectedComponent.type === 'image'">
            <AttributeInput
              v-model="attributeForm.alt"
              label="图片描述"
              placeholder="请输入图片描述"
              @change="handleAttributeChange" />
            <AttributeInput
              v-model="attributeForm.width"
              label="宽度"
              placeholder="请输入宽度，如：100px"
              @change="handleAttributeChange" />
            <AttributeInput
              v-model="attributeForm.height"
              label="高度"
              placeholder="请输入高度，如：100px"
              @change="handleAttributeChange" />
          </template>
        </a-form>
      </div>
    </div>

    <div class="no-selection" v-else>
      <a-empty description="请选择一个组件进行配置" />
    </div>
  </div>
</template>

<script>
import { AttributeInput } from '../Attribute';

export default {
  name: 'CdAttribute',
  components: {
    AttributeInput
  },
  props: {
    selectedComponent: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      attributeForm: {
        pcUrl: '',
        alt: '',
        width: '',
        height: ''
      }
    };
  },
  watch: {
    selectedComponent: {
      handler(newComponent) {
        if (newComponent) {
          this.loadComponentAttributes(newComponent);
        } else {
          this.resetForm();
        }
      },
      immediate: true
    }
  },
  methods: {
    loadComponentAttributes(component) {
      // 加载组件的属性配置
      this.attributeForm = {
        pcUrl: component.pcUrl || '',
        alt: component.alt || '',
        width: component.width || '',
        height: component.height || ''
      };
    },

    handleAttributeChange(value) {
      // 属性变化时，通知父组件更新
      this.$emit('attribute-change', {
        component: this.selectedComponent,
        attributes: { ...this.attributeForm }
      });
    },

    resetForm() {
      this.attributeForm = {
        pcUrl: '',
        alt: '',
        width: '',
        height: ''
      };
    }
  }
};
</script>

<style lang="less" scoped>
.cd-attribute {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;

  .attribute-header {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    background: #fafafa;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
  }

  .attribute-content {
    padding: 16px;
    height: calc(100% - 65px);
    overflow-y: auto;

    .component-info {
      margin-bottom: 16px;

      p {
        margin: 8px 0;
        font-size: 14px;
        color: #666;

        strong {
          color: #333;
        }
      }
    }

    .attribute-form {
      .ant-form {
        .ant-form-item {
          margin-bottom: 16px;
        }
      }
    }
  }

  .no-selection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 65px);
    padding: 20px;
  }
}
</style>

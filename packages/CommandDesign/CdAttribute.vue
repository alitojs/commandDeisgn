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
          <!-- PC端路径始终显示 -->
          <AttributeInput
            v-model="attributeForm.pcUrl"
            label="PC端路径"
            placeholder="请输入PC端相对路径，如：/home"
            @change="handleAttributeChange" />

          <!-- 根据 options 动态渲染属性 -->
          <!-- width 属性 -->
          <AttributeInput
            v-if="hasOption('width')"
            v-model="attributeForm.width"
            label="宽度"
            placeholder="请输入宽度"
            @change="handleAttributeChange" />

          <!-- height 属性 -->
          <AttributeInput
            v-if="hasOption('height')"
            v-model="attributeForm.height"
            label="高度"
            placeholder="请输入高度"
            @change="handleAttributeChange" />

          <!-- 其他类型的属性组件，后续扩展 -->
          <!-- 例如：<AttributeSelect v-if="hasOption('color')" label="颜色" /> -->
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
        pcUrl: ''
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
      // 加载组件的属性配置，所有属性值都从 options 中读取
      const form = {
        pcUrl: ''
      };

      // 从 options 中加载所有属性值（排除 imageUrl，因为它是 JSON 中写死的，不需要配置）
      if (component.options && typeof component.options === 'object') {
        Object.keys(component.options).forEach((key) => {
          // 跳过 imageUrl，它不在配置面板中
          if (key !== 'imageUrl') {
            form[key] = component.options[key] || '';
          }
        });
      }

      // pcUrl 也存储在 options 中
      if (component.options && component.options.pcUrl !== undefined) {
        form.pcUrl = component.options.pcUrl || '';
      }

      this.attributeForm = form;
    },

    handleAttributeChange(value) {
      // 属性变化时，通知父组件更新
      // 所有属性值都应该存储在 options 中（排除 imageUrl，它是 JSON 中写死的）
      const options = { ...this.attributeForm };
      // 确保不会包含 imageUrl
      delete options.imageUrl;

      this.$emit('attribute-change', {
        component: this.selectedComponent,
        options
      });
    },

    resetForm() {
      this.attributeForm = {
        pcUrl: ''
      };
    },

    // 判断 options 中是否有指定的 key
    hasOption(key) {
      if (!this.selectedComponent || !this.selectedComponent.options) {
        return false;
      }
      const options = this.selectedComponent.options;
      return typeof options === 'object' && key in options;
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

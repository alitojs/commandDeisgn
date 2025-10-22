<template>
  <div class="attribute-input">
    <a-form-item :label="label" :required="required">
      <a-input v-model="inputValue" :placeholder="placeholder" @change="handleChange" :disabled="disabled" />
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: 'AttributeInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: '标签'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    }
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      this.inputValue = value;
      this.$emit('input', value);
      this.$emit('change', value);
    }
  }
};
</script>

<style lang="less" scoped>
.attribute-input {
  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-form-item-label {
    font-weight: 500;
    color: #333;
  }
}
</style>

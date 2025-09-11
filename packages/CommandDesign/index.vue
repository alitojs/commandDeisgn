<template>
  <div class="command-design">
    <CommandDesign v-model="formData" @getData="handleGetData" />
  </div>
</template>

<script>
import CommandDesign from './CommandDesign';
export default {
  name: 'CommandDesignWrapper',
  provide() {
    return {
      componentList: () => this.componentList
    };
  },
  emits: ['getData'],
  props: {
    componentList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    CommandDesign
  },
  data() {
    return {
      formData: this.value
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.formData = newVal;
      },
      deep: true,
      immediate: true
    },
    formData: {
      handler(newVal) {
        this.$emit('input', newVal);
      },
      deep: true
    }
  },
  methods: {
    handleGetData(data) {
      this.$emit('getData', data);
    }
  },
  mounted() {}
};
</script>

<template>
  <div class="ean-ui">11123</div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      mode: "inline",
      theme: "light",
    };
  },
  methods: {
    changeMode(checked) {
      this.mode = checked ? "vertical" : "inline";
    },
    changeTheme(checked) {
      this.theme = checked ? "dark" : "light";
    },
  },
};
</script>

<style scoped lang="less">
.ean-ui {
  .ean-ui-content {
    display: flex;
  }
}
</style>

<template>
  <div class="ean-ui">
    <div class="ean-ui-content">
      <div class="">
        <a-menu
          style="width: 256px"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
        >
          <a-menu-item key="1">
            <a-icon type="mail" />
            Navigation One
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="calendar" />
            Navigation Two
          </a-menu-item>
        </a-menu>
      </div>
      <div><router-view/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less">
.ean-ui {
  .ean-ui-content {
    display: flex;
  }
}
</style>

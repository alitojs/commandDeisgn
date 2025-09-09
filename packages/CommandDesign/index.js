import test from './CommandDesign.vue';
test.install = function (Vue) {
  Vue.component(test.name, test);
};
export default test;

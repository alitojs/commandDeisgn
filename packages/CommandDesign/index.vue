<template>
  <div class="command-design">
    <CommandDesign />
  </div>
</template>

<script>
import CommandDesign from './CommandDesign';
export default {
  name: 'CommandDesignWrapper',
  // provide() {
  //   return {
  //     componentList: this.componentList
  //   };
  // },
  components: {
    CommandDesign
  },
  data() {
    return {
      componentList: []
    };
  },
  mounted() {}
};
</script>

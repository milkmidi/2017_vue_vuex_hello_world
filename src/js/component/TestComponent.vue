<script>
export default {
  name: 'test-component',
  data: () => ({
    message: '我是訊息',
    myVar: 'TestScene',
  }),
  methods: {
    clickHandler() {
    },
  },
};
</script>
<template lang="pug" >
  .test-root
    h1 Vue template
    h2 {{myVar}}
    .box(v-demo:foo.a.b="message") box
</template>
<style lang="stylus">
  .test-root
    border 2px solid black
</style>

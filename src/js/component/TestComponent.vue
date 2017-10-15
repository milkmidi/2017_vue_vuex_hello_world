<template lang="pug" >
  .test-root
    h1 hi TestScene 12
    button(@click="clickHandler") TestSceneButton
    h2 {{myVar}}
</template>

<script>


export default {
  name: 'test-component',
  data: () => ({
    myVar: 'TestScene',
  }),
  methods: {
    clickHandler() {
      console.log(this.$options.name);
    },
  },
};
</script>

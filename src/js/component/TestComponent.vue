<template lang="pug">
  .test-root
    h1 hi TestScene 2
    button(@click="clickHandler") TestSceneButton
    h2 {{myVar}}
</template>

<script>


export default {
  data: () => ({
    myVar: 'TestScene',
  }),
  methods: {
    clickHandler() {
      console.log('123');
    },
  },
};
</script>

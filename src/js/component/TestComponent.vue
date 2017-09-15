<template lang="pug">
  .test-root
    h1 TestScene
    h2 {{myVar}}
</template>

<script>
export default {
  data() {
    return {
      myVar: 'TestScene',
    };
  },
};
</script>

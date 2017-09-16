<template lang="pug">
  .test-scene-root
    TestComponent
    TestJSXComponent
</template>

<script>
import TestComponent from '../../component/TestComponent.vue';
import TestJSXComponent from '../../component/TestJSXComponent.vue';

export default {
  components: {
    TestComponent,
    TestJSXComponent,
  },
};
</script>

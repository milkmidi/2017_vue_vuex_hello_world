<template lang="pug">
  .test-container-root
    h1 9527
    input(v-model="name")
    p {{name}}
    InnerComponent(:name="name")
    Component2(:name="name" v-if="name!=''")
</template>

<script>

const InnerComponent = ({ props }) => (
  <div class="inner-component">{props.name}</div>
);

const Component2 = {
  props: ['name'],
  mounted() {
    console.log('mounted');
  },
  render() {
    console.log('render');
    return (
      <div class="component-2">component-2 {this.name}</div>
    );
  },
};


export default {
  data() {
    return {
      name: '',
    };
  },
  components: {
    InnerComponent,
    Component2,
  },
};
</script>

<style lang="stylus">
  .inner-component
    background red
</style>


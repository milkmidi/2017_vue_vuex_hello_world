<style lang="stylus"></style>

<template lang="pug">
.vue-class-root
  h1 hi
  p {{valueName}}
  p {{stateUserName}}
  p {{stateCount}}
  button(@click="click") click
  button(@click="mutationCount") click
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, Mutation } from 'vuex-class';

@Component
export default class VueClass extends Vue {
  valueName = '1';

  @Getter('userName')stateUserName;
  @Getter('count') stateCount;


  mounted() {
    console.log('mounted');
  }

  @Mutation('mutationCount')
  mutationCount() {

  }

  click() {
    this.valueName = Date.now().toString();
  }
}
</script>
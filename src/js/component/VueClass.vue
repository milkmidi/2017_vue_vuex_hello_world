<style lang="stylus"></style>


<template lang="pug">
.vue-class-root
  h1 hi
  p valueName:{{valueName}}
  p stateUserName:{{stateUserName}}
  p count:{{stateCount}}
  .row
    .col
      button.btn.btn-primary(@click="click") setValueName
    .col
      button.btn.btn-primary(@click="mutationCount(3)") mutationCount
    .col
      button.btn.btn-primary(@click="actionCount") actionCount
</template>


<script>
import Vue from 'vue';
import { createDecorator } from 'vue-class-component';
import { Getter, Mutation, Action } from 'vuex-class';
import { Component, Inject, Model, Prop, Watch } from 'vue-property-decorator';

export const NoCache = createDecorator((options, key) => {
  console.log(options);
  options.computed[key].cache = false;
});

@Component
export default class VueClass extends Vue {
  name = 'vueClassNAme';
  valueName = '1';

  @Getter('userName') stateUserName;
  @Getter('count') stateCount;


  @Mutation('mutationCount')
  mutationCount() {}

  @Action('count')
  actionCount() {}


  mounted() {
    console.log('mounted');
  }

  @NoCache
  get random() {
    return Math.random();
  }

  @Watch('valueName')
  onChildChanged(value, oldVal) {
    console.log(value);
  }


  click() {
    this.valueName = Date.now().toString();
  }
}
</script>
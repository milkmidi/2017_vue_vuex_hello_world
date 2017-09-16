<style lang="stylus" src="entry.styl"></style>

<template lang="pug">
#app.app
  Loading
  .container
    Navigation
    transition(name="fade" mode="out-in")
      router-view

</template>

<script>

import Loading from './Loading.vue';
import Navigation from './Navigation.vue';


export default {
  data() {
    return {
    };
  },
  components: {
    Loading,
    Navigation,
  },
};
</script>


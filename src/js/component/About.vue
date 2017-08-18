<style></style>

<template lang="pug">
.about-root
  h1 about
  p {{userName}}
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['userName']),
  },
};
</script>
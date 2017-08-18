<style></style>

<template lang="pug">
nav.navbar.navbar-toggleable-md.navbar-light.bg-faded
  router-link.navbar-brand.mb-0(to='/') milkmidi vuex {{count}}
  button.navbar-toggler.navbar-toggler-right.collapsed(type='button', data-toggle='collapse', data-target='#navbarCollapse', aria-controls='navbarCollapse', aria-expanded='false', aria-label='Toggle navigation')
    span.navbar-toggler-icon

  .navbar-collapse.collapse#navbarCollapse
    ul.navbar-nav.mr-auto
      li.nav-item
        router-link.nav-link(to='/about') About
      ul.navbar-nav.navbar-right
        li.nav-item
          span.navbar-text {{userName}}
        li.nav-item
          router-link.btn.btn-outline-success.navbar-btn(to="/login") {{loginLabel}}
</template>

<script>
import { mapGetters } from 'vuex';

export default{
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['userName', 'isLogin', 'count']),
    loginLabel() {
      return this.isLogin ? 'logout' : 'login';
    },
  },
};
</script>
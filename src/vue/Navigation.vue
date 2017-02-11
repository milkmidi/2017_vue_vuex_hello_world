<style></style>

<template lang="pug">
nav.navbar.navbar-toggleable-md.navbar-light.bg-faded
    h1.navbar-brand.mb-0(href='#') milkmidi vuex
    .navbar-collapse.collapse
        ul.navbar-nav.mr-auto
            li.nav-item
                router-link.nav-link(to="/index") Home
            li.nav-item
                router-link.nav-link(to='/about') About
        ul.navbar-nav.navbar-right
            li.nav-item
                span.navbar-text {{userName}}
            li.nav-item
                router-link.btn.btn-outline-success.navbar-btn(to="/login") {{loginLabel}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default{
	className:"Navigation.vue",
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters(['userName', 'isLogin']),
        loginLabel(){
            return this.isLogin ? "logout" : "login"
        }
    },
    methods:{

    },
    mounted(){

    },
    destroyed(){

    },
    components:{

    }
}
</script>
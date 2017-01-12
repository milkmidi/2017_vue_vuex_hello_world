<style lang="sass" src="navigation.scss"></style>

<template>

<div class="navigation-root">
    <div class="logo"></div>
    <router-link to="/index">index</router-link>
    <router-link to="/Child">child</router-link>
    <router-link to="/youtube">YoutubeDemo</router-link>
    <p>{{count}}</p>
</div>

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
        ...mapGetters(['count'])
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
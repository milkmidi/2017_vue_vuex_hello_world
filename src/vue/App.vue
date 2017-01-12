<style lang="sass" src="entry.scss">
</style>

<template>

<div id="app">

    <loading></loading>
    <navigation></navigation>
    <warning-footer></warning-footer>
    <p>appData:{{appData}}</p>
    <main>
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transitoin>
    </main>


</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
export default {
    className: "App.vue",
    // props:["appData"],
    data() {
        return {
        }
    },
    computed: {
    },
    methods:{
        ...mapActions(['showLoading']),
    },
    mounted(){
        setTimeout(()=>{
            this.showLoading(false);
        } ,1000);

    },
    components:{
        'loading':require('Loading'),
        'navigation': require('Navigation'),
        'warning-footer':require("WarningFooter")
    }
}
</script>


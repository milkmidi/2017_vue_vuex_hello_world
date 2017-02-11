<style lang="stylus" src="entry.styl">
</style>

<template lang="pug">

#app.app
    Loading
    .container
        Navigation
        transition(name="fade" mode="out-in")
            router-view
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loading from './Loading';
import Navigation from "./Navigation";
export default {
    data() {
        return {
        }
    },
    methods:{
        ...mapActions(['showLoading']),
    },
    mounted(){      
    },
    components:{
        Loading,
        Navigation,
    }
}
</script>


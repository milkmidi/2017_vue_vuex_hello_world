<style>
</style>

<template lang="pug">
.root
    .page-header    
        h1 Index Page
            small Subtext for header
    .jumbotron
        h1.display-3 Hello vuex
        p.lead ...
        p.lead
            a.btn.btn-primary.btn-lg Learn More

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default{
	className:"Index.vue",
    data(){
        return {

        }
    },
    computed:{
        // ...mapGetters(['count'])
    },
    methods:{
        ...mapActions(['showLoading','count'])
    },
    mounted(){

    },
    destroyed(){

    },
    components:{
    }
}
</script>
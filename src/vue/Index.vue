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
            a.btn.btn-primary.btn-lg(@click="clickHandler") Learn More

</template>

<script>
import { mapGetters, mapActions , mapMutations } from 'vuex';
export default{
	className:"Index.vue",
    data(){
        return {

        }
    },
    computed:{
    },
    methods:{
        ...mapActions(['showLoading']),
        ...mapMutations(['count']),       
        clickHandler(){
            this.count();
        } 
    },
    mounted(){
        console.log( 123 );
        console.log( this.$store );
    },
    destroyed(){

    },
    components:{
    }
}
</script>
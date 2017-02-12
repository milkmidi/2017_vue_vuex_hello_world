<style lang="stylus" scoped>
.index_box
    background green
</style>

<template lang="pug">
.index-root
    .page-header
        h1 Index Page
            small Subtext for header
    .jumbotron
        h1.display-3 Hello vuex
        p.lead
            .box BOX
        p.lead
            .box.index_box BOX
        p.lead
            button.btn.btn-primary.btn-lg(@click="clickHandler") Learn More

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
    },
    destroyed(){

    },
    components:{
    }
}
</script>
<style lang="sass">
.flex{
    display:flex;
}
.sprite_wrap .retina{
    border:1px solid black;
}
.sprite_wrap .autosize{
    border:2px solid red;
}

</style>

<template>

<div class="index-root">

    <h1>Index</h1>
    <button @click="count(10)">Add Count</button>
    <div class="flex">display:flex</div>
    <div class="sprite_wrap">
        <div class="sprite sample1"></div>
        <div class="sprite sample1 retina"></div>
        <div class="sprite sample1 autosize"></div>
        <br>

        <div class="sprite sample2"></div>
        <div class="sprite sample2 retina"></div>
        <div class="sprite sample2 autosize"></div>

        <br>
        <div class="sprite company_text"></div>
        <div class="sprite company_text retina"></div>
        <div class="sprite company_text autosize"></div>

        <br>
        <div class="sprite brand_text"></div>
        <div class="sprite brand_text retina"></div>
        <div class="sprite brand_text autosize"></div>
    </div>
</div>

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
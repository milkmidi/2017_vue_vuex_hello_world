<style lang="stylus"></style>

<template lang="pug">

.login-root
    .page-header    
        h1 Index Page
            small Subtext for header
    .card
        .card-block
            .card-title
                h1 login
            .form-group
                label Email
                input.form-control(type="email" , v-model="email") 
            .form-group
                label Password
                input.form-control(type="password" , v-model="password") 
            button.btn.btn-primary(@click="submitHandler") Submit
</template>

<script>
export default{
    data(){
        return {
            email:"",
            password:"",
        }
    },
    methods:{
        ...Vuex.mapActions(['showLoading','login']),
        async submitHandler(){
            var email = this.email;
            var password = this.password;
            var res = await this.login({email,password});
            // console.log( res );
            if( res.status === 'ok'){
                // console.log(  );
                var redirect = this.$route.query.redirect || "/";
                console.log( redirect );
                this.$router.replace(redirect);
            }

        }
    }
}
</script>
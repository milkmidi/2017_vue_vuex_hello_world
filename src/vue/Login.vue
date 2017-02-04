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
                input.form-control(type="email") 
            .form-group
                label Password
                input.form-control(type="password") 
            button.btn.btn-primary Submit
</template>

<script>
export default{

}
</script>
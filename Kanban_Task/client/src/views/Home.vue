<template>
    <div>
        <Login  ></Login>
        <Register></Register>
    </div>
  
</template>

<script>
import Login from './Login'
import Register from './Register'
export default {
    data(){
        return {
            access_token:localStorage.access_token
        }
    },
    components:{
        Login,
        Register
    },
    methods:{
        
    }
}
</script>

<style>

</style>
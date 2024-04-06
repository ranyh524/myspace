<script setup>
import LayoutBace from '@/components/LayoutBace.vue'
import { useStore } from 'vuex';
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router';


const router = useRouter();

const username = ref('')
const password = ref('')
const password_confirm = ref('')


const register = () => {
    axios.post('https://app165.acapp.acwing.com.cn/myspace/user/',
        {
            username:username.value,
            password:password.value,
            password_confirm:password_confirm.value
        },
        {
            headers:{
                'Content-Type':'application/json'
            }
        }
    ).then(res => {
        console.log(username.value+"  "+password.value+"  "+password_confirm.value)
        if(res.data.result==="success"){
            console.log(res.data.result),
            alert('注册成功'),
            router.push({name:'login'})
        }else{
            console.log(res.data.result)
            alert(res.data.result)
        }
    })
    
}

</script>

<template>
    <LayoutBace>
        <form @submit.prevent="register">
            <div class="row justify-content-center">
                <div class="col-3">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3">
                        <label for="password_confirm" class="form-label">确认密码</label>
                        <input v-model="password_confirm" type="password" class="form-control" id="exampleInputPassword2">
                    </div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </div>
            </div>
        </form>
    </LayoutBace>
</template>
<style scoped>
</style>
<script setup>
import LayoutBace from '@/components/LayoutBace.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
// import router from '@/router';
import { useRouter } from 'vue-router';
const router = useRouter();

const store = useStore();
const username = ref('');
const password = ref('');
const err_message = ref('');

const login = () => {
    store.dispatch('user/login', {
        username: username.value,
        password: password.value,
        success(){
            router.push({name:'home'})
        },
        error(){
            err_message.value = '用户名或密码错误'
            //console.log(err_message.value);
        }
    },
    )
}
</script>

<template>
    <LayoutBace>
        <form @submit.prevent="login">
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
                    <div class="error-message">{{err_message}}</div>
                    <button type="submit" class="btn btn-primary">登录</button>
                </div>
            </div>
        </form>
    </LayoutBace>
</template>
<style scoped>
.error-message{
    color: red;
}
</style>
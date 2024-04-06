<script setup>
import LayoutBace from '@/components/LayoutBace.vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const users = ref([])
const router = useRouter()

axios.get('https://app165.acapp.acwing.com.cn/myspace/userlist/') 
    .then(res =>{
        users.value = res.data
    } )
    .catch(err => console.log(err));

const openprofile=(id)=>{
    router.push({name:'userprofile',params:{userId:id}})//此处传的形参如果和router中定义的userId一样，则这个params中只写userId
}

</script>

<template>
    <LayoutBace>
        <div class="card" v-for ="user in users" :key="user.id" @click="openprofile(user.id)">
            <div class="row">
                <div class="col-1">
                    <img class="img-fluid" :src="user.photo" alt="头像">
                </div>
                <div class="col-11">
                    <div class="username">{{user.username}}</div>
                    <div class="fans">粉丝：{{ user.followerCount }}</div>
                    
                </div>
            </div>
        </div>
    </LayoutBace>
</template>


<style scoped>
.img-fluid{
    border-radius: 50%;
}
.username{
    font-weight: bold
}
.fans{
    color: gray
}
.card{
    margin-top: 10px;
    cursor: pointer;
}
.card:hover{
    box-shadow: 2px 2px 10px lightgray;
    transform:500ms;
}

</style>
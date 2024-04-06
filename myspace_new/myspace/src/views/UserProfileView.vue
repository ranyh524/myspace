<!-- 个人中心模块 -->
<script setup>
import LayoutBace from '@/components/LayoutBace.vue'
import UserProfileInfo from '@/components/UserProfileInfo.vue'
import UserProfilePost from '@/components/UserProfilePost.vue'
import UserProfileWriter from '@/components/UserProfileWriter.vue'
import axios from 'axios'
import { ref } from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

//使用route获取参数
const route = useRoute()
const userId  = parseInt(route.params.userId)
// console.log(userId);
const store = useStore()
const user = ref({})
const posts = ref({})

//传递参数userid使用axios获取用户信息
axios.get('https://app165.acapp.acwing.com.cn/myspace/getinfo/',
    {
        params:{
            user_id:userId,
        },
        headers:{
            'Authorization':'Bearer ' + store.state.user.access,
            'Content-Type':'application/json'
        }
    },
).then((res)=>{
    //console.log(res.data);
    // user.value = res.data
    user.value.id = res.data.id;
    user.value.username= res.data.username;
    user.value.photo = res.data.photo;
    user.value.followerCount = res.data.followerCount;
    user.value.is_followed = res.data.is_followed;

}).catch((err)=>{
    console.log(err);
})

//获取用户发表的帖子
axios.get('https://app165.acapp.acwing.com.cn/myspace/post/',
    {
        params:{
            user_id:userId,
        },
        headers:{
            'Authorization':'Bearer ' + store.state.user.access,
            'Content-Type':'application/json'
        }
    }
).then((res)=>{
    console.log(res);
    posts.value = res.data
}).catch((err)=>{
    console.log(err);
})


//父组件向子组件传值采用props，子组件向父组件传值采用emit


const push = (text)=>{
    posts.value.push({
        id:posts.value.length+1,
        userId:1,
        content:text
    })
}

//也就是当子组件触发了follow（左边）事件后，父组件就会触发follow（右边）函数
const follow = ()=>{
    user.value.is_followed=true;
    user.value.followerCount++;
}

const unfollow = ()=>{
    user.value.is_followed=false;
    user.value.followerCount--;
}

const is_me = ()=>{
    //console.log(route.params.userId);
    if(route.params.userId == store.state.user.id){
        return true
    }else {
        return false
    }
}
//console.log(is_me());

</script>

<template>
    <LayoutBace>
        <div class="row">
            <div class="col-3">
                <UserProfileInfo :user="user" @follow="follow" @unfollow="unfollow"/>
                <UserProfileWriter v-if="is_me()"  @pushpost="push" />
            </div>
            <div class="col-9">
                <UserProfilePost :posts="posts"/>
            </div>
        </div>
    </LayoutBace>
</template>
<style scoped>
</style>
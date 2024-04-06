<!-- 个人信息展示模块 -->
<script setup>
import { computed } from 'vue'

//接受父组件传递的数据
const props = defineProps({
    user:{
        type:Object,
        required:true
    }
})



//子组件向父组件传递数据，实现修改父组件中is_followed的值
const emit = defineEmits(['follow','unfollow'])
const follow = ()=>{
    emit('follow')
}
const unfollow = ()=>{
    emit('unfollow')
}


//计算属性
// const userallname = computed(()=>props.user.lastName+props.user.firstName)

</script>

<template>

    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img class="img-fluid" :src="user.photo" alt="头像">
                </div>
                <div class="col-9">
                    <div class="username">{{user.username}}</div>
                    <div class="fans">粉丝：{{ user.followerCount }}</div>
                    <button type="button" @click="follow" v-if="!user.is_followed" class="btn btn-primary btn-sm">+关注</button>
                    <button type="button" @click="unfollow" v-if="user.is_followed"  class="btn btn-primary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped>
.img-fluid{
    border-radius: 50%;
}
.username{
    font-size: 20px;
    font-weight: bold;
}
.fans{
    font-size: 15px;
}


</style>
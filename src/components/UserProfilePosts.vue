
<template>
    <div class="card">
        <div class="card-body">
            <!-- 会复制三遍div -->
            <div v-for="post in posts.posts" :key="post.id">
                <!-- 将内容放到小卡片 -->
                <div class="card single-post">
                    <div class="card-body">
                        {{post.content}}
                        <button @click="delete_a_post(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
//每个人发的贴子

import {computed} from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';

export default{
    name:"UserProfilePosts",
    props:{
        posts:{
            type: Object,
            required:true,
        },
        user:{
            type:Object,
            required:true,
        }
    },
    setup(props,context){
        const store = useStore();
        let is_me=computed(()=> store.state.user.id === props.user.id);

        const delete_a_post = post_id=>{
            $.ajax({
                url:"https://app165.acapp.acwing.com.cn/myspace/post/",
                type:"DELETE",
                data:{
                    post_id:post_id,
                },
                headers:{
                    'Authorization':"Bearer " + store.state.user.access,
                },
                success(resp){
                    if(resp.result === "success"){
                        context.emit('delete_a_post',post_id);
                    }
                }
            });
             
        }
        return {
            is_me,
            delete_a_post,
        }
    }

    
}
</script>

<style scoped>

    .single-post{
        margin-bottom: 10px;
    }
    button{
        float:right;
    }

</style>

<!-- 发帖模块 -->
<template>
    <div class="card edit-field">
        <div class="card-body">
            <label for="edit-post" class="form-label">编辑帖子</label>
            <!-- 使用v-可以将div内的内容绑定，如下就将textarea的内容将content绑定 -->
            <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
            <button @click="post_a_post" type="button" class="btn btn-primary btn-sm">发帖</button>
        </div>
    </div>
    
</template> 

<script>
    import {ref} from 'vue';
    import $ from 'jquery'
    import { useStore } from 'vuex';
    export default{
        name:"UserProfileWrite",
        setup(props,context){
            const store = useStore();
            //获取编辑区(textarea)的内容
            let content = ref('');

            const post_a_post=()=>{
                //console.log(content.value);//取得ref的值必须用value
                //使用context.emit调用父组件绑定的函数
                $.ajax({
                    url:"https://app165.acapp.acwing.com.cn/myspace/post/",
                    type:"POST",
                    data:{
                        content:content.value,
                    },
                    headers:{
                        'Authorization':"Bearer " + store.state.user.access,
                    },
                    success(resp){
                        if(resp.result==="success"){
                            context.emit('post_a_post',content.value);
                            content.value=""; 
                        }
                    }
                });
                
            };

            return {
                content,
                post_a_post,
            }
        }
    }

</script>

<style scoped>
    .edit-field{
        margin-top: 20px;
    }
    button{
        margin-top:10px;
    }

</style>

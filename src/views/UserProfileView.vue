<template>
    <ContentBase>
      <div class="row">
        <div class="col-3">
          <!-- 给子组件传递信息时要用v-bind绑定 -->
          <!-- 子组件给父组件传值时要触发父组件绑定的函数 -->
          <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user" />
          <UserProfileWrite v-if="is_me" @post_a_post="post_a_post" />
        
        </div>
        <div class="col-9">
          <UserProfilePosts :user = "user" :posts = "posts" @delete_a_post="delete_a_post"/>
        </div>
      </div>
    </ContentBase>
  </template>
  
  <script>
    import ContentBase from '../components/ContentBase';
    import UserProfileInfo from '../components/UserProfileInfo';
    import UserProfilePosts from '../components/UserProfilePosts';
    import UserProfileWrite from '../components/UserProfileWrite'
    import {reactive} from 'vue';
    //使用useRouter获取链接的参数
    import {useRoute} from 'vue-router';
    import $ from 'jquery';
    import { useStore } from 'vuex';
    import { computed } from 'vue';
  
  //每个组件都会导出一个对象
  export default {
    name: 'UserProfileView',
    //在template里面会用到的组件
    components: {
    ContentBase,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileWrite
},
  //定义三个子模块需要交互用的数据
    setup() {
      const store = useStore();
      const router = useRoute();
      const userId = parseInt(router.params.userId);

      //因为页面当前用户信息不会变，所以使用只能接收对象的reactive
      const user = reactive({
      });

      //帖子列表
      const posts = reactive({
      })

      $.ajax({
        url:"https://app165.acapp.acwing.com.cn/myspace/getinfo/",
        type:"GET",
        data:{
          user_id : userId,
        },
        headers:{
          'Authorization':"Bearer " + store.state.user.access,
        },
        success(resp){
          user.id = resp.id;
          user.username = resp.username;
          user.photo = resp.photo;
          user.followerCount = resp.followerCount;
          user.is_followed = resp.is_followed;
        }

      });

      $.ajax({
        url:"https://app165.acapp.acwing.com.cn/myspace/post/",
        type:"GET",
        data:{
          user_id : userId,
        },
        headers:{
          'Authorization':"Bearer " + store.state.user.access,
        },
        success(resp){
          posts.count = resp.length;
          posts.posts = resp;
        }

      });

      //关注
      const follow=()=>{
        if(user.is_followed) return ;
        user.is_followed = true;
        user.followerCount++;
      };

      //取消关注
      const unfollow=()=>{
        if(!user.is_followed) return ;
        user.is_followed = false;
        user.followerCount--;
      };

      //发表一个帖子
      const post_a_post=content=>{
        posts.count++;
        posts.posts.unshift({
          id:posts.count,
          userId:2,
          content:content,
        })
      };

      //删除一个帖子
      const delete_a_post=post_id=>{
        posts.posts = posts.posts.filter(post=>post.id !==post_id);
        posts.count = posts.posts.length;

      }

      const is_me = computed(()=>userId === store.state.user.id);

      return {
        user,//key和value一样的时候可以简写为一个值
        follow,
        unfollow,
        posts,
        post_a_post,
        is_me,
        delete_a_post,
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
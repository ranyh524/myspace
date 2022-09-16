<template>
    <ContentBase>
      <!-- 每个用户都是一张卡片 -->
        <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
          <div class="card-body">
            <!-- 左边是用户头像，右边是信息 -->
            <div class="row">
              <div class="col-1">
                <!-- 当在src前面使用v-bind时src里面就不是普通字符串而回取值 -->
                <!-- img-fluid：div越大图像越大 -->
                <img class="img-fluid" :src="user.photo" alt="">
              </div>
              <div class="col-11">
                <div class="username">{{ user.username }}</div>
                <div class="follower-count">{{user.followerCount}}</div>
              </div>
            </div>
          </div>
        </div>
    </ContentBase>
</template>
  
  <script>
import ContentBase from '../components/ContentBase.vue';
import $ from 'jquery';
import { ref } from 'vue';
import router from '@/router/index';
import { useStore } from 'vuex';

  
  //每个组件都会导出一个对象
  export default {
    name: 'UserListView',
    //在template里面会用到的组件
    components: {
      ContentBase,
    },
      setup(){
        const store = useStore();
        let users = ref([]);

    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type: "get",
      success(resp) {
        users.value = resp;
        console.log(users.value);
      }
    });

    //点击用户列表跳转到用户动态
    //userId是参数
    const open_user_profile = userId=>{
      if(store.state.user.is_login){
        router.push({
          name:"userprofile",
          params:{
            userId
          }
        })
      }else{
        router.push({
          name:"login"
        });
      }
    }
    

        return {
          users,
          open_user_profile
        };

      }
  }
  </script>
  
  <style scoped>
    .img-fluid{
      border-radius: 50%;
    }
    .username{
      font-weight: bold;
      height: 50%;
    }
    .follower-count{
      font-size: 12px;
      color: gray;
      height:50%;
    }
    .card{
      margin-bottom: 10px;
      cursor:pointer;
    }
    .card:hover{
      box-shadow: 2px 2px 10px lightgrey;
      transition: 500ms;
    }
  </style>
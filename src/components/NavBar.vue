<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <router-link a class="navbar-brand" :to="{name:'home',params:{}}">Myspace</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link"  :to="{name:'home',params:{}}">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'userlist',params:{}}">好友列表</router-link>
        </li>
      </ul>

      <ul class="navbar-nav" v-if="!$store.state.user.is_login">
        <li class="nav-item">
          <router-link class="nav-link"  :to="{name:'login',params:{}}">登录</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'register',params:{}}">注册</router-link>
        </li>       
      </ul>

      <ul class="navbar-nav" v-else>
        <li class="nav-item">
          <router-link class="nav-link"  :to="{name:'userprofile',params:{userId:$store.state.user.id}}">{{$store.state.user.username}}</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor:pointer" @click="logout">退出</a>
        </li>       
      </ul> 
      
    </div>
  </div>
</nav>
    
</template>

<script>
  import { useStore } from 'vuex';

    export default{
        name : "NavBar",
        //清空jwt
        setup(){
          const store = useStore();
          const logout=()=>{
            //调用store.mutations里面函数使用store.commit，调用actions使用dispatch
            store.commit('logout');
          };
          return {
            logout,
          }
        }
    }

</script>

<style scoped>

</style>

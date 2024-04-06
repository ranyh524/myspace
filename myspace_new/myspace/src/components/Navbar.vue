<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <router-link class="navbar-brand" to="/">我的空间</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/userlist">好友列表</router-link>
        </li>
        <!-- <li class="nav-item">
          此处的userId应该是动态获取的{{userId}}
          <router-link class="nav-link" :to="{name:'userprofile',params:{userId:1}}" >用户动态</router-link>
        </li> -->
      </ul>
      <span class="navbar-text">
        <!-- 没有登陆时的导航栏 -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!store.state.user.is_login">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/login">登录</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">注册</router-link>
        </li>
      </ul>
      <!-- 登陆后的导航栏 -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{name:'userprofile',params:{userId:store.state.user?.id}}">{{store.state.user?.username}}</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout" style="cursor: pointer;">退出</a>
        </li>
      </ul>
      </span>
    </div>
  </div>
</nav>
</template>


<script  setup>
import { useStore } from 'vuex';
const store = useStore();
const logout = ()=>{
  //清除token以达到推出登录的目的
  store.commit('user/logout')
}


</script>

<style scoped>


</style>
import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListView from '@/views/UserListView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFindView from '@/views/NotFindView.vue'
import { useStore } from 'vuex'

const routes = [
  {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        requireAuth:true
      }
  },

  {
    path:'/userlist',
    name:'userlist',
    component: UserListView,
    meta:{
      requireAuth:true
    }
    // beforeEnter(to,from,next){
    //   const store = useStore()
    //   if(store.state.user.is_login){
    //     next()
    //   }else{
    //     next({name:'login'})
    //   }
    // }
  },
  {
    path:'/userprofile/:userId',
    name:'userprofile',
    component:UserProfileView,
    meta:{
      requireAuth:true
    }
    
  },
  {
    path:'/login',
    name:'login',
    component:LoginView,
    meta:{
      requireAuth:false
    }
  },
  {
    path:'/register',
    name:'register',
    component:RegisterView,
    meta:{
      requireAuth:false
    }
  },
  {
    path:'/404',
    name:'404',
    component:NotFindView
  },
  {
    path:'/:pathMatch(.*)*',
    redirect:'/404'
  }

]

const router= createRouter({
  history: createWebHistory(),
  routes:routes
})


router.beforeEach((to, from, next) => {
  const store = useStore();
  if(to.meta.requireAuth&&!store.state.user.is_login){
    next('/login');
    
  }else{
    next()
  }
})


export default router

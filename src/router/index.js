import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListView from '../views/UserListView';
import LoginView from '../views/LoginView';
import UserProfileView from '../views/UserProfileView';
import NotFoundView from '../views/NotFoundView';
import RegisterView from '../views/RegisterView';

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/userlist/',
        name: 'userlist',
        component: UserListView
    }, {
        //:表示链接后面有参数
        path: '/userprofile/:userId/',
        name: 'userprofile',
        component: UserProfileView
    }, {
        path: '/login/',
        name: 'login',
        component: LoginView
    }, {
        path: '/register/',
        name: 'register',
        component: RegisterView
    }, {
        path: '/404/',
        name: '404',
        component: NotFoundView
    },
    {
        path: '/:catchAll(.*)',
        redirect: "/404/"
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
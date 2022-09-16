//store index.js是vuex创建的全局唯一变量
import { createStore } from 'vuex'
import ModuleUser from './user'

export default createStore({
    //state存储所有数据
    state: {},
    //当想要获取state里面数据并且不能直接获取而需要计算之后才能获取的是
    getters: {},
    //对state的直接修改
    mutations: {},
    //定义对state的各种操作
    actions: {},
    //将state进行分割
    modules: {
        user: ModuleUser,
    }
});
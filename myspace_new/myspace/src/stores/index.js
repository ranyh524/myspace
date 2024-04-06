import { createStore } from "vuex";
import moduleUser from "@/stores/users.js";

export default createStore({
    //用于定义全局变量
    state: {
    },
    //用于计算state的值只能读取不能修改
    getters: {
    },
    //对state进行修改，可以调用这个函数，不能执行异步操作
    mutations: {
    },
    //定义对state的各种操作，但是不能直接对state进行修改
    actions: {
    },
    //当states中的state很多的时候进行分割
    modules: {
        user:moduleUser,
    }
    
})
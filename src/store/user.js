import $ from 'jquery';
import { jwtDecode } from 'jwt-decode';
//用户的所有信息

const ModuleUser = {
    //state存储所有数据
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "",
        refresh: "",
        is_login: false,
    },
    //当想要获取state里面数据并且不能直接获取而需要计算之后才能获取的是
    getters: {},
    //对state的直接修改
    mutations: {
        updataUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        updataAccess(state, access) {
            state.access = access;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = 0;
            state.access = "";
            state.refresh = "";
            state.is_login = false;
        }
    },
    //定义对state的各种操作
    actions: {
        //context是传一些api,data是自己传的
        login(context, data) {
            //获取token
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "POST",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    const { access, refresh } = resp;
                    //解码
                    const access_obj = jwtDecode(access);

                    //一个周期函数使得token过期的时候每隔五分钟更新
                    setInterval(() => {
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "POST",
                            data: {
                                refresh,
                            },
                            success(resp) {
                                context.commit("updataAccess", resp.access);
                            }
                        });
                    }, 4.5 * 60 * 1000);
                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "GET",
                        data: {
                            user_id: access_obj.user_id,
                        },
                        //jwt验证
                        headers: {
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            //第一个参数传的是mutations里面的函数名，第二个是要传的数
                            context.commit("updataUser", {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            data.success();
                        },

                    })
                },
                error() {
                    data.error();
                }
            });
        },

    },
    //将state进行分割
    modules: {}
};

export default ModuleUser;
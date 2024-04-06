import { useStore } from 'vuex'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'
const moduleUser = {
    namespaced: true,
    state: {
        id:0,
        username:'',
        followerCount:0,//粉丝数
        photo:'',
        access:'',
        refresh:'',
        is_login:false
    },

    getters: {

    },
    actions: {
        //axios请求数据，带参数Authorization以获取token
        //实现login函数
        login(context,user){
            //获取token
            axios.post('https://app165.acapp.acwing.com.cn/api/token/',
            {
                username:user.username,
                password:user.password
            },
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        
        ).then((res)=>{
            //console.log(res)
            //获取jwt
            context.state.access = res.data.access,
            context.state.refresh = res.data.refresh
            const access_obj =  jwtDecode (context.state.access)
            context.state.id = access_obj.user_id
            //console.log(access_obj)
            //然后根据获取的jwt，将jwt添加到Authorization中获取用户信息
            axios.get('https://app165.acapp.acwing.com.cn/myspace/getinfo/',
            {
                params:{
                    user_id:context.state.id,
                },
                headers:{
                    'Authorization': "Bearer " + context.state.access,
                    'Content-Type': 'application/json'
                }
            }
            ).then((res)=>{
                    //console.log(res)
                    context.commit('updataUser',res.data)
                    //console.log(context.state.is_login);
                    user.success();
                }).catch((err)=>{
                    console.log('获取用户信息失败')
                    
                })
            }).catch((err)=>{
            //console.log('登录失败')
            user.error();
        }
        )
        }
        
    },
    mutations: {
        //修改state
        updataUser(state,user){
            //state.userId = user.userId,
            state.username = user.username,
            state.followerCount = user.followerCount,
            state.photo = user.photo,
            state.is_followed = user.is_followed
            state.is_login=true
        },
        logout(state,user){
            state.id=0,
            state.username='',
            state.followerCount=0,
            state.photo='',
            state.access='',
            state.refresh='',
            state.is_login=false,
            console.log('退出登录')
        }
    },
}

export default moduleUser;
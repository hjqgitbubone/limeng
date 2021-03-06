import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    userLogout:{},
    menus:[]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      //去重
     // state.permissions = [...new Set(permissions)]

    },
    SET_MENUS: (state, menus) => {
      sessionStorage.setItem('addRouters',JSON.stringify(menus))
      state.menus = menus
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log(userInfo);
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          console.log(res);
          if(res.status===200){
            if(userInfo.rememberMe){
              localStorage.setItem('userInfo',JSON.stringify(userInfo))
            }
          }
          localStorage.setItem('zhi',JSON.stringify([...new Set(res.data.unique_auth)]))
          setToken(res.data.token)
          commit('SET_TOKEN', res.data.token)
          commit('SET_PERMISSIONS',res.data.unique_auth)
          commit('SET_MENUS', res.data.menus)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = user.avatar == "" ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  },
      namespaced:true 
}

export default user

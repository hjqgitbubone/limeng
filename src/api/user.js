import request from "@/utils/request";
export const get_jnotice=(params={})=>{
    return request({
        url:'adminapi/user/user_group/list',
        method:"get",
        params
    })
}


export const listMenus = (params) =>{
    return request({
        url:'/adminapi/user/user',
        method:'get',
        params
    })
}


export const get_userList = (params) => {
   return request({
       url:'/adminapi/user/user_level/vip_list',
       method:'',
       params
   })

}

export const get_userType=(params={})=>{
    return request({
        url:'/adminapi/user/user_label',
        method:"get",
        params
    })
}

 
 export const get_user=(params={})=>{
    return request({
        url:'/adminapi/user/user',
        method:"get",
        params
    })
}

export const edit_user=(id)=>{
    return request({
        url:`/adminapi/user/user/${id}/edit`,
        method:"get",
    })
}

export const edit_formList=(data)=>{
    console.log(data);
    return request({
        url:`/adminapi/user/user/${data.uid}`,
        method:"put",
        data
    })
}

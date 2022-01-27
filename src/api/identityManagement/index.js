import request from '@/utils/request'
//身份管理总数据
export const getIdList = (params={}) => {
  return request({
    url: '/adminapi/setting/role',
    method: 'get',
    params
  })
}

//身份管理状态切换
export const getCutStatusList = (data={}) => {
    console.log('cut',data)
    return request({
      url: `/adminapi/setting/role/set_status/${data.id}/${data.status}`,
      method: 'put',
      data
    })
  }
  //添加数据tree数据
  export const getAddList = (params={}) => {
    return request({
      url: '/adminapi/setting/role/create',
      method: 'get',
      params
    })
  }

  //添加中的开启关闭接口
  export const getAddCutList = (data={}) => {
    return request({
      url: `/adminapi/setting/role/0`,
      method: 'post',
      data
    })
  }

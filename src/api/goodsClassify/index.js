
import request from '@/utils/request'

//分类数据
export const getList = (params) => {
  return request({
    url: '/adminapi/product/category',
    method: 'get',
    params
  })
}


//添加分类
export const getAddList = (data={}) => {
  return request({
    url: '/adminapi/product/category',
    method: 'post',
    data
  })
}

//添加父级数据
export const getDad = () => {
  return request({
    url: '/adminapi/product/category/create',
    method: 'get'
  })
}
//分类编辑hh
export const getEditFn = (data={}) => {
  console.log(data)
  let ids = data.id
  return request({
    url: `/adminapi/product/category/${ids}`,
    method: 'put',
    data
  })
}
//分类删除
export const getDeltFn = (data={}) => {
  console.log(data)
  let ids = data.id
  return request({
    url: `/adminapi/product/category/${ids}`,
    method: 'delete',
    data
  })
}
//分类状态
export const getCutStatusFn = (data={}) => {
  console.log('cut',data)
  return request({
    url: `/adminapi/product/category/set_show/${data.id}/${data.is_show}`,
    method: 'put',
    data
  })
}
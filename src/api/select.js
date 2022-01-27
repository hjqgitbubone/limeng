
import request from '@/utils/request'

// headr
export const getHead = () => {
  return request({
    url: '/adminapi/product/product/type_header',
    method: 'get'
  })
}
//首页数据
export const getList = (params={}) => {
  return request({
    url: '/adminapi/product/product',
    method: 'get',
    params
  })
}
//状态
export const cutList = (data={}) =>{
  return request({
      url:`adminapi/product/product/set_show/${data.id}/${data.is_show}`,
      method:'put',
      data
  })
}

//分类数据
export const getYunfei = () =>{
  return request({
      url:"adminapi/product/product/get_template",
      method:'get'
  })
}
// 下拉分类
export const selectFn = () => {
  return request({
    url: '/adminapi/product/category/tree/1',
    method: 'get'
  })
}
//删除接口
export const asyncDelList = (data={}) =>{
  let ids = data.id
  return request({
      url:`/adminapi/product/product/${ids}`,
      method:'delete',
  })
}
//添加
export const asyncAddList = (data={}) =>{
  //let ids = data.id?data.id:0
  return request({
      url:"/adminapi/product/product/0",
      method:'post',
      data
  })
}
//编辑
export const asyncEditList = (data={}) =>{
  return request({
      url:`/adminapi/product/product/${data.id}`,
      method:'post',
      data
  })
}
//导出
export const exportList = (params={}) =>{
  return request({
      url:"/adminapi/export/storeProduct",
      method:'get',
      params
  })
}
//多张图片上传 接口

export const exportImageAll= (params={}) =>{
  return request({
      url:"/adminapi/file/file",
      method:'get',
      params
  })
}
// 多张图片上传接口删除
export function DelImgFn(data) {
  return request({
    url: `/adminapi/file/file/delete`,
    method: "post",
    data: {
      ids: data,
    },
  });
}
//Echart
export function proxyFn(){
  return request({
      url:"/myapi/api.php?flag=getEchartsData",
      method:'get',
  })
}


export function proxyFirstFn(){
  return request({
      url:"/myapi/echartsApi.php?flag=getProductData",
      method:'get',
  })
}
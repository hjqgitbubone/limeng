import request from '@/utils/request'
//评论列表
export const getCommentList = (params={}) => {
  return request({
    url: '/adminapi/product/reply',
    method: 'get',
    params
  })
}
//评论删除
export const getCommentDelList = (data={}) => {
  console.log(data);
    return request({
      url: `adminapi/product/reply/${data.id}`,
      method: 'delete',
      data
    })
  }
  //第一个小遮罩层的分类下标
  export const maskSelectList = (params) => {
    return request({
      url:"adminapi/product/category/tree/1",
        method:"get",
        params
    })
  }
  //第二个小遮罩层的table下数据
export const maskOneTableList = (params)=>{
    return request({
        url:"adminapi/product/product/list",
        method:"get",
        params
    })
}
//第二个小遮罩层的table下数据虚拟评论的添加
export const maskOneAddTableList = (data)=>{
  return request({
      url:"adminapi/product/reply/save_fictitious_reply.html",
      method:"post",
      data
  })
}
//回复Api
export const replyapi = (params)=>{//虚拟评论的添加
  return request({
      url:`adminapi/product/reply/set_reply/${params.id}`,
      method:"put",
      params
  })
}
import request from '@/utils/request'

//订单type数据
export const getorderType = (params) => {
    return request({
      url: '/adminapi/order/chart',
      method: 'get',
      params
    })
  }
  
  //订单数据
  export const getorderList = (params) => {
    console.log(params);
    return request({
      url: '/adminapi/order/list',
      method: 'get',
      params
    })
  }
   //订单数据状态
   export const getorderListStatus = (params) => {
     console.log(params);
    return request({
      url: '/adminapi/order/chart',
      method: 'get',
      params
    })
  }
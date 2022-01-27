import request from "@/utils/request";

// 获取路由
export const getRouters = () => {
  return request({
    url: "/getRouters",
    method: "get",
  });
};
// 获取当前分类
export const getcategory = () => {
  return request({
    url: "/adminapi/product/category/tree/1",
    method: "get",
  });
};
export const gettype_header = () => {
  return request({
    url: "/adminapi/product/product/type_header",
    method: "get",
  });
};
//商品列表
export const getproduct = (params) => {
  return request({
    url: "/adminapi/product/product",
    method: "get",
    params,
  });
};
//运费模板
export const gettemplate = () => {
  return request({
    url: "adminapi/product/product/get_template",
    method: "get",
  });
};
//商品分类模板
export const getCategory = () => {
  return request({
    url: `adminapi/product/category/tree/1`,
    method: "get",
  });
};
//商品添加
export const addList = (data) => {
  console.log(data);
  let ids = data.id ? data.id : 0;
  return request({
    url: `/adminapi/product/product/${ids}`,
    data,
    method: "post",
  });
};
//商品状态接口
export const isshowFns = (data) => {
  console.log(data);
  return request({
    url: `adminapi/product/product/set_show/${data.id}/${data.is_show}`,
    method: "put",
  });
};
//删除功能
export const dataDel = (data) => {
  return request({
    url: `/adminapi/product/product/${data}`,
    method: "delete",
    data,
  });
};
export const getProductFn = (params) => {
  return request({
    url: `adminapi/export/storeProduct`,
    method: "get",
    params,
  });
};
//编辑信息处理
export const dataEditInfo = (data) => {
  return request({
    url: `/adminapi/product/product/${data}`,
    method: "get",
  });
};
// adminapi/export/storeCombination
// 删除
export function Del(data) {
  return request({
    url: `/adminapi/file/file/delete`,
    method: "post",
    data: {
      ids: data,
    },
  });
}
// 添加上传商品图
export function File(params) {
  return request({
    url: `/adminapi/file/file?pid=0&page=${params.page}&limit=${params.limit}`,
    method: "get",
  });
}
//规格
export function get_rule(params) {
  return request({
    url: `/adminapi/product/product/get_rule`,
    method: "get",
  });
}

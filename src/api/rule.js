import request from "@/utils/request";
export function get_rules(params) {
  return request({
    method: "get",
    url: "adminapi/product/product/rule",
    params,
  });
}

export function get_delete(params) {
  return request({
    method: "DELETE",
    url: "adminapi/product/product/rule/delete",
    params,
  });
}

export function get_ruleId(params) {
  return request({
    method: "get",
    url: "adminapi/product/product/rule/" + params,
  });
}

export function get_ruleEdit(data) {
  console.log(data, "编辑接口");
  return request({
    method: "post",
    url: "/adminapi/product/product/rule/" + data.id,
    data,
  });
}
export function get_ruleAdd(data) {
  console.log(data, "添加接口");
  return request({
    method: "post",
    url: "/adminapi/product/product/rule/0",
    data,
  });
}

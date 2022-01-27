import { constantRoutes } from "@/router";
import { getRouters } from "@/api/menu";
import Layout from "@/layout/index";
import ParentView from "@/components/ParentView";
import InnerLink from "@/layout/components/InnerLink";

const permission = {
  state: {
    routerFlag: false,
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
  },
  mutations: {
    SET_ROUTER_FLAF:(state,flag)=>{
      state.routerFlag=flag
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes);
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      // 顶部导航菜单默认添加统计报表栏指向首页
      const index = [
        {
          path: "index",
          meta: { title: "统计报表", icon: "dashboard" },
        },
      ];
      state.topbarRouters = routes.concat(index);
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes;
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }, menus) {
      return new Promise((resolve) => {
        // 向后端请求路由数据
        filterAddComponents(menus);
        const sdata = JSON.parse(JSON.stringify(menus));
        const rdata = JSON.parse(JSON.stringify(menus));
        const sidebarRoutes = menus;
        const rewriteRoutes = menus;
        rewriteRoutes.push({ path: "*", redirect: "/404", hidden: true });
        commit("SET_ROUTES", rewriteRoutes);
        commit("SET_ROUTER_FLAF", true);
        commit("SET_SIDEBAR_ROUTERS", menus);
        commit("SET_DEFAULT_ROUTES", sidebarRoutes);
        commit("SET_TOPBAR_ROUTES", sidebarRoutes);
        resolve(rewriteRoutes);
      });
    },
  },
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(menus, flag = 0) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else if (route.component === "ParentView") {
        route.component = ParentView;
      } else if (route.component === "InnerLink") {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route["children"];
      delete route["redirect"];
    }
    return true;
  });
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView" && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + "/" + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + "/" + el.path;
    }
    children = children.concat(el);
  });
  return children;
};

function filterAddComponents(menus, flag = 0) {
  for (let item of menus) {
    item.meta = { icon: "checkbox", title: item.title };
    item.path = item.path.slice(6);
    if (flag) {
      if (item.children && item.children.length > 0) {
        item.component = ParentView;
      } else {
        item.component = loadView(item.path);
      }
    } else {
      item.component = Layout;
    }
    if (item.children && item.children.length > 0) {
      filterAddComponents(item.children, 1);
    }
  }
}
export const loadView = (view) => {
  if (process.env.NODE_ENV === "development") {
    return (resolve) => require([`@/views${view}`], resolve);
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views${view}`);
  }
};

export default permission;

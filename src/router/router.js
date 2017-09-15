import Vue from "vue";
import Router from "vue-router";
import store from "@/vuex/";
import common from "@/utils/common";

import {
  Login,
  Index,
  Trends,
  TrendsNews,
  PersonInfo,
  ModulePage,
  Project,
  ProjectManage,
  DemandManage,
  NewsIndex,
  NewsList,
  NewsDetail,
  WorkIndex,
  WorkList,
  WorkDetail,
  Attendance,
  AttendanceReport,
  AttendanceDepartmentReport,
  AttendanceSetting,
  Affairs,
  AffairsContact,
  AffairsAttendance,
  Organize,
  OrganizePerson,
  OrganizeRole,
  OrganizeMenu,
  Contract,
  ContractManage,
  ContractSetting
} from "./index";

Vue.use(Router);

let contractManage = [
  {
    //合同管理模块
    path: "manage",
    name: "contractManage",
    component: ContractManage,
    meta: { title: "合同管理" }
  },
  {
    path: "setting",
    name: "contractSetting",
    component: ContractSetting,
    meta: { title: "合同设置" }
  }
];

let attendanceManage = [
  {
    //考勤管理模块
    path: "report",
    name: "attendanceReport",
    component: AttendanceReport,
    meta: { title: "考勤报表" }
  },
  {
    path: "setting",
    name: "setting",
    component: AttendanceSetting,
    meta: { title: "考勤设置" }
  },
  {
    path: "department",
    name: "department",
    component: AttendanceDepartmentReport,
    meta: { title: "部门考勤报表" }
  }
];

let organizeManage = [
  {
    //组织架构管理模块
    path: "personManage",
    name: "personManage",
    component: OrganizePerson,
    meta: { title: "组织架构管理" }
  },
  {
    path: "rolesManage",
    name: "rolesManage",
    component: OrganizeRole,
    meta: { title: "角色管理" }
  },
  {
    path: "menuManage",
    name: "menuManage",
    component: OrganizeMenu,
    meta: { title: "菜单管理" }
  }
];

let affairsManage = [
  {
    //人事管理模块
    path: "contacts",
    name: "affairsContact",
    component: AffairsContact,
    meta: { title: "通讯录" }
  },
  {
    path: "attendance",
    name: "affairsAttendance",
    component: AffairsAttendance,
    meta: { title: "我的考勤" }
  }
];

let projectManage = [
  {
    //项目管理模块
    path: "manage",
    name: "projectManage",
    component: ProjectManage,
    meta: { title: "项目管理" }
  },
  {
    path: "demand",
    name: "demandManage",
    component: DemandManage,
    meta: { title: "需求管理" }
  }
];

let newsPublish = [
  {
    //新闻公告
    path: "list",
    name: "newsList",
    component: NewsList,
    meta: { title: "新闻列表" }
  },
  {
    path: "detail",
    name: "newsDetail",
    component: NewsDetail,
    meta: { title: "新闻详情" }
  }
];

let newsManage = [  //OA首页管理
  {
    //新闻公告管理
    path: "newsManage",
    name: "trendsNews",
    component: TrendsNews,
    meta: { title: "新闻公告管理" }
  }
];

let workOrder = [
  {
    //工单中心
    path: "list",
    name: "workList",
    component: WorkList,
    meta: { title: "工单中心列表" }
  },
  {
    path: "detail",
    name: "workDetail",
    component: WorkDetail,
    meta: { title: "工单中心详情" }
  }
];
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { title: "登录" }
    },
    {
      path: "/news",
      name: "news",
      component: NewsIndex,
      meta: { title: "企业动态" },
      children: newsPublish
    },
    {
      path: "/work",
      name: "work",
      component: WorkIndex,
      meta: { title: "我的工作台" },
      children: workOrder
    },
    {
      path: "/person",
      name: "person",
      component: PersonInfo,
      meta: { title: "个人信息" }
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      meta: { title: "首页" }
    },

    {
      path: "/modulePage",
      name: "modulePage",
      component: ModulePage,
      children: [
        {
          path: "/trends",
          name: "trends",
          component: Trends,
          children: newsManage
        },
        {
          path: "/project",
          name: "project",
          component: Project,
          children: projectManage
        },
        {
          path: "/attendance",
          name: "attendance",
          component: Attendance,
          children: attendanceManage
        },
        {
          path: "/affairs",
          name: "affairs",
          component: Affairs,
          children: affairsManage
        },
        {
          path: "/organize",
          name: "organize",
          component: Organize,
          children: organizeManage
        },
        {
          path: "/contract",
          name: "contract",
          component: Contract,
          children: contractManage
        }
      ]
    }
  ]
});

router.beforeEach(({ meta, path }, from, next) => {
  if (path !== "/" && !store.state.authorization) {
    console.log("没有权限...");
    return next({ path: "/" });
  }
  if (path === "/" && store.state.authorization) {
    console.log("已经登录....");
    return next({ path: "/index" });
  }
  document.title = `${meta.title ? meta.title : ""} - 亿车科技EAP`;
  next();
});

export default router;

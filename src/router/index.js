import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/management', // 企业管理路由
    component: Layout,
    name: 'management',
    redirect: 'noredirect',
    meta: {
      title: 'management',
      icon: 'component'
    },
    children: [/* {
      path: 'organizational', // 组织架构路由
      component: () => import('@/views/management/organizational'),
      name: 'organizational',
      meta: {
        title: 'organizational',
        icon: 'peoples'
      }
    }, */
      {
        path: 'organizational', // 组织架构路由
        component: () => import('@/views/management/EOS'),
        name: 'organizational',
        meta: {
          title: 'organizational',
          icon: 'peoples'
        }
      }, {
        path: 'permissionGroup', // 权限组路由
        component: () => import('@/views/management/permissionGroup'),
        name: 'permissionGroup',
        meta: { title: 'permissionGroup', icon: 'guide', noCache: true }
      }, /* {
        path: 'user',
        component: () => import('@/views/management/user'),
        name: 'usetNnme',
        meta: {
          title: 'usetNnme',
          icon: 'user'
        }
      }, */ {
        path: 'position',
        component: () => import('@/views/management/corporatePosts'),
        name: 'position',
        meta: {
          title: 'position',
          icon: 'documentation'
          // if do not set roles, means: this page does not require permission
        }
      }/* , {
        path: 'customerSupports',
        component: () => import('@/views/management/customerSupports'),
        name: 'customerSupports',
        meta: {
          title: 'customerSupports',
          icon: 'eye'
        }
      } */]
  },
  { // 客户
    path: '/customer',
    component: Layout,
    redirect: 'noredirect',
    name: 'customer',
    meta: {
      title: 'customer',
      icon: 'people'
    },
    children: [{ // 私海
      path: 'privateSea', component: () => import('@/views/customer/privateSea/index'),
      name: 'privateSea',
      meta: {
        title: 'privateSea'
      }
    }, { // 我的成单客户
      path: 'privateSea1',
      component: () => import('@/views/customer/MySingleCustomer'),
      name: 'MySingleCustomer',
      meta: {
        title: 'MySingleCustomer'
      }
    }, { // 新增客户
      path: 'newCustomers',
      component: () => import('@/views/customer/newCustomers'),
      name: 'newCustomers',
      meta: {
        title: 'newCustomers'
      }
    }, { // 检索客户
      path: 'retrievingCustomers',
      component: () => import('@/views/customer/retrievingCustomers'),
      name: 'retrievingCustomers',
      meta: {
        title: 'retrievingCustomers'
      }
    }, {
      path: 'highSeas',
      component: () => import('@/views/customer/highSeas'),
      name: 'highSeas',
      meta: {
        title: 'highSeas'
      }
    }, {
      path: 'openPool',
      component: () => import('@/views/customer/openPool'),
      name: 'openPool',
      meta: {
        title: 'openPool'
      }
    }]
  },
  //  销售管理
  {
    path: '/salesManagement',
    component: Layout,
    redirect: 'noredirect',
    name: 'salesManagement',
    meta: {
      title: 'salesManagement',
      icon: 'chart'
    },
    children: [{
      path: 'subordinateCustomers',
      component: () => import('@/views/salesManagement/subordinateCustomers'),
      name: 'subordinateCustomers',
      meta: {
        title: 'SubordinateCustomers',
        noCache: true
      }
    }, {
      path: 'subordinateSingleCustomer',
      component: () => import('@/views/salesManagement/subordinateSingleCustomer'),
      name: 'subordinateSingleCustomer',
      meta: {
        title: 'SubordinateSingleCustomer',
        noCache: true
      }
    }, {
      path: 'rationale',
      component: () => import('@/views/salesManagement/rationale'),
      name: 'rationale',
      meta: {
        title: 'Rationale',
        noCache: true
      }
    }]
  },
  {
    path: '/business',
    component: Layout,
    redirect: 'noredirect',
    name: 'business',
    meta: {
      title: 'business',
      icon: 'chart'
    },
    children: [{
      path: 'returnDeclaration',
      component: () => import('@/views/business/returnDeclaration'),
      name: 'returnDeclaration',
      meta: {
        title: 'returnDeclaration',
        noCache: true
      }
    }, {
      path: 'reviewAndApproval',
      component: () => import('@/views/business/reviewAndApproval'),
      name: 'reviewAndApproval',
      meta: {
        title: 'reviewAndApproval',
        noCache: true
      }
    }, {
      path: 'reviewAndApprovalRecord',
      component: () => import('@/views/business/reviewAndApprovalRecord'),
      name: 'reviewAndApprovalRecord',
      meta: {
        title: 'reviewAndApprovalRecord',
        noCache: true
      }
    }, {
      path: 'contract',
      component: () => import('@/views/business/contract'),
      name: 'contract',
      meta: {
        title: 'contract',
        noCache: true
      }
    }, {
      path: 'contractApproval',
      component: () => import('@/views/business/contractApproval'),
      name: 'contractApproval',
      meta: {
        title: 'contractApproval',
        noCache: true
      }
    }, {
      path: 'contractApprovalRecord',
      component: () => import('@/views/business/contractApprovalRecord'),
      name: 'contractApprovalRecord',
      meta: {
        title: 'contractApprovalRecord',
        noCache: true
      }
    }]
  },
  {
    path: '/productList',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/productList/enterpriseProduct'),
      name: 'productList',
      meta: {
        title: 'productList',
        icon: 'tab'
      }
    }]
  },
  // 企业设置
  {
    path: '/enterprise',
    component: Layout,
    redirect: '/enterprise/enterprise',
    name: 'enterprise',
    meta: {
      title: 'enterprise',
      icon: 'table'
    },
    children: [
      {
        path: 'customer',
        component: () => import('@/views/enterprise/customer/setIndex'),
        name: 'customer',
        meta: {
          title: 'enterprise_customer'
        }
      },
      {
        path: 'followUpMethod',
        component: () => import('@/views/enterprise/followUpMethod'),
        name: 'followUpMethod',
        meta: {
          title: 'followUpMethod'
        }
      },
      {
        path: 'protection',
        component: () => import('@/views/enterprise/protection'),
        name: 'protection',
        meta: {
          title: 'protection'
        }
      },
      {
        path: 'contractSetting',
        component: () => import('@/views/enterprise/contractSet.vue'),
        name: 'contractSetting',
        meta: {
          title: 'contractSetting'
        }
      },
      {
        path: 'productSetting',
        component: () => import('@/views/enterprise/productSet.vue'),
        name: 'productSetting',
        meta: {
          title: 'productSetting'
        }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     { path: 'create', component: () => import('@/views/example/create'), name: 'createArticle', meta: { title: 'createArticle', icon: 'edit' }},
  //     { path: 'edit/:id(\\d+)', component: () => import('@/views/example/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
  //     { path: 'list', component: () => import('@/views/example/list'), name: 'articleList', meta: { title: 'articleList', icon: 'list' }}
  //   ]
  // },
  //
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
  //     { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{ path: 'log', component: () => import('@/views/errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  // },
  //
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     { path: 'export-excel', component: () => import('@/views/excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
  //     { path: 'export-selected-excel', component: () => import('@/views/excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
  //     { path: 'upload-excel', component: () => import('@/views/excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [{ path: 'download', component: () => import('@/views/zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  // },

  {
    path: '/querySetup',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'index',
      component: () => import('@/views/querySetup/index'),
      name: 'querySetup',
      meta: {
        title: 'querySetup',
        icon: 'theme'
      }
    }]
  },
  {
    path: '/test',
    component: Layout,
    redirect: 'noredirect',
    name: 'test',
    meta: {
      title: 'test',
      icon: 'table'
    },
    children: [{
      path: 'treeselect',
      component: () => import('@/components/treeselect/index'),
      name: 'treeselect',
      meta: {
        title: 'treeselect',
        icon: 'component',
        noCache: true
      }
    }]
  },
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{ path: 'index', component: () => import('@/views/clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  // },
  //
  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [{ path: 'index', component: () => import('@/views/i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

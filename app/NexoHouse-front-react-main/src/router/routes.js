const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/administracion/usuarios',
        component: () => import('pages/Users.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/discipulado',
        component: () => import('src/pages/discipulado/Index.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/discipulado/:id',
        component: () => import('src/pages/discipulado/Detail.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/discipulado/:id/:cell',
        component: () => import('src/pages/discipulado/Cell.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/evangelizar',
        component: () => import('src/pages/Evangelizar.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/consolidacion',
        component: () => import('src/pages/Consolidacion.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/plantillas',
        component: () => import('src/pages/plantillas/Index.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/iglesias',
        component: () => import('src/pages/Churchs.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/perfil',
        component: () => import('src/pages/Perfil.vue')
        // meta: { permission: 1 }
      },
      {
        path: '/administrador/usuarios',
        component: () => import('pages/admin/users/Users.vue')
        // meta: { permission: 1 }
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  /*   {
    name: 'register',
    path: '/registro',
    component: () => import('pages/Register.vue')
  }, */

  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

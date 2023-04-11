import Vue from 'vue'
import VueRouter from 'vue-router'
/* import store from '../store/generals'
import {
  Notify
} from 'quasar' */

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function () {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  /* Router.beforeEach((to, from, next) => {
    if (to.meta.permission) {
      const can = store.getters.can()(to.meta.permission)
      if (!can) {
        Notify.create({
          message: 'Ruta no encontrada. Inicia sesión nuevamente',
          color: 'black'
        })
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  }) */

  return Router
}

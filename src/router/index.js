import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import AuthService from '@/shared/services/auth.service'

Vue.use(VueRouter)

const authService = AuthService()
const router = new VueRouter({ mode: 'history', routes })

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    return next('/')
  }

  next()
})
export default router

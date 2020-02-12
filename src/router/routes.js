import LoginComponent from '@/components/login'
import HomeComponent from '@/components/home'

const routes = [
  {
    path: '/',
    component: LoginComponent
  },
  {
    path: '/home',
    name: 'home',
    component: HomeComponent,
    meta: { requiresAuth: true, requireRedirect: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routes

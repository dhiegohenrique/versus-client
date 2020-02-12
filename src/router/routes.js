import LoginComponent from '@/components/login'
import HomeComponent from '@/components/home'

const routes = [
  {
    path: '/',
    component: LoginComponent
  },
  {
    path: '/home',
    component: HomeComponent
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routes

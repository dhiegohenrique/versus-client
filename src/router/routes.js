import HomeComponent from '@/components/home'
import HomeLoggedComponent from '@/components/home-logged'

const routes = [
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/logged',
    component: HomeLoggedComponent
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routes

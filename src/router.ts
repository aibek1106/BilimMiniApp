import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import RegisterView from './views/RegisterView.vue'
import TestsView from './views/TestsView.vue'
import AchievementsView from './views/AchievementsView.vue'
import ProfileView from './views/ProfileView.vue'
import TestView from './views/TestView.vue'
import ResultsView from './views/ResultsView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/tests' },
  { path: '/register', component: RegisterView },
  { path: '/tests', component: TestsView },
  { path: '/achievements', component: AchievementsView },
  { path: '/profile', component: ProfileView },
  { path: '/test/:id', component: TestView },
  { path: '/results/:id', component: ResultsView }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const registered = !!localStorage.getItem('userName')
  if (!registered && to.path !== '/register') {
    next('/register')
  } else {
    next()
  }
})

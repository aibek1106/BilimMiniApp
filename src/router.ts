import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import RegisterView from './views/RegisterView.vue'
import TestsView from './views/TestsView.vue'
import AchievementsView from './views/AchievementsView.vue'
import ProfileView from './views/ProfileView.vue'
import TestView from './views/TestView.vue'
import ResultsView from './views/ResultsView.vue'
import { userExists } from './api'
import { getTelegramUser } from './telegram'

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

router.beforeEach(async (to, _from, next) => {
  let registered = localStorage.getItem('registered') === '1'
  if (!registered) {
    const user = getTelegramUser()
    if (user) {
      try {
        const exists = await userExists(user.id)
        if (exists) {
          localStorage.setItem('registered', '1')
          registered = true
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
  if (!registered && to.path !== '/register') {
    next('/register')
  } else {
    next()
  }
})

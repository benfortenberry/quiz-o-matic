import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Quiz from '@/components/Quiz'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Quiz',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/Results',
      name: 'Results',
      component: Results
    }
  ]
})

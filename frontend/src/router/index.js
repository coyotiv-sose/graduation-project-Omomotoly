import { createRouter, createWebHistory } from 'vue-router'
import ConferencesView from '../views/ConferencesView.vue'
import HomeView from '../views/HomeView.vue'
import ExampleView from '../views/ExampleView.vue'
import ConferenceView from '../views/ConferenceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/conferences',
      name: 'conferences',
      component: ConferencesView
    },
    {
      path: '/conferences/:id',
      name: 'conference',
      component: ConferenceView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/example',
      name: 'example',
      // route level code-splitting
      // this generates a separate chunk (Example.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ExampleView.vue')
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (Users.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (Users.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (Users.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (Users.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignupView.vue')
    }
  ]
})

export default router

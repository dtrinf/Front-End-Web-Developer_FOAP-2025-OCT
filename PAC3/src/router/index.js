import { createRouter, createWebHistory } from 'vue-router'
import CardsView from '../views/CardsView.vue'
import CharacterView from '../views/CharacterView.vue'
import CombatView from '@/views/CombatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CardsView,
    },
    {
      path: '/character/:charId',
      name: 'character',
      props: true,
      component: CharacterView,
    },
    {
      path: '/combat',
      name: 'combat',
      component: CombatView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {

    }
  ],
})

export default router

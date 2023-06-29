import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Inbox'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/gender-predictor',
    component: () => import ('../views/GenderPrediction.vue')
  },
  {
    path: '/age-predictor',
    component: () => import ('../views/AgePrediction.vue')
  },
  {
    path: '/university-list',
    component: () => import ('../views/UniversityList.vue')
  },
  {
    path: '/weather',
    component: () => import ('../views/ClimaRD.vue')
  },
  {
    path: '/about',
    component: () => import ('../views/About.vue')
  },
  {
    path: '/medioambiente.rd',
    component: () => import ('../views/WordpressPage.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/products' },
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'products/create', component: () => import('pages/ProductCreate.vue') },
      { path: 'products/:id/edit', component: () => import('pages/ProductEdit.vue') },
      {
        path: ':catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});

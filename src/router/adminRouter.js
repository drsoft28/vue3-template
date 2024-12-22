import AdminTheme from '@/layouts/vuetify/IndexTheme.vue'
export default [
  {
    path: '/admin',
    component: AdminTheme,
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        alias: [''],
        meta: { auth: true },
      },
      {
        path: 'test',
        name: 'admin.test',
        component: () => import('@/views/admin/TestView.vue'),
        meta: { auth: true },
      },
    ],
  },
]

import Vue from 'vue';
import VueRouter from 'vue-router';
import VendingMachineView from '../views/VendingMachineView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'VendingMachine',
    component: VendingMachineView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

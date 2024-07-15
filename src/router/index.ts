import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import ReserveView from '../views/ReserveView.vue';
// import PaymentView from '../views/PaymentView.vue';

const routes = [
  { path: "/", name: "Home", component: HomeView },
  //   { path: '/reserve', name: 'Reserve', component: ReserveView },
  //   { path: '/payment', name: 'Payment', component: PaymentView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa Bootstrap JS
import "bootstrap";
import Toast, { POSITION } from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT, // Uso de POSITION.TOP_RIGHT en lugar de 'top-right'
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
};

const app = createApp(App)

app.use(router);
app.use(createPinia())
app.use(Toast, options);

app.mount('#app')

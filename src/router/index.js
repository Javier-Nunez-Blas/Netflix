import { createRouter, createWebHistory } from 'vue-router';

// Importa tus componentes
import LoginForm from '@/components/LoginForm'; 
import MyHomeMain from '@/components/MyHomeMain';
import InfoContenido from '@/components/InfoContenido'; 

// Define las rutas
const routes = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/myHomeMain',
    name: 'MyHomeMain',
    component: MyHomeMain
  },
  {
    path: '/infoContenido',
    name: 'InfoContenido',
    component: InfoContenido
  },

];

const router = createRouter({
  history: createWebHistory(), 
  routes 
});

export default router;

import { Routes } from '@angular/router';
import { ConfiguracionPage } from './paginas/configuracion/configuracion.page';
import { GestionCitasPage } from './paginas/gestion-citas/gestion-citas.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'gestion-citas',
    loadComponent: () => import('./paginas/gestion-citas/gestion-citas.page').then(m => m.GestionCitasPage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./paginas/configuracion/configuracion.page').then(m => m.ConfiguracionPage)
  },
];

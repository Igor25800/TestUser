import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home//home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'user/:id',
    loadComponent: () => import('./pages/user/user.component').then((c) => c.UserComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

import { Route } from '@angular/router';
 
export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-routing-module').then(m => m.LoginRoutingModule),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@erp-frontend/home').then((m) => m.HomeComponent),
  },
  {
    path: 'sidebar',
    loadComponent: () =>
      import('@erp-frontend/sidebar').then((m) => m.SidebarComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
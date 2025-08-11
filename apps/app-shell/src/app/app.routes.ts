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
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
    path: 'header',
    loadComponent: () =>
    import('@erp-frontend/header').then((m) => m.HeaderComponent),
    }

];

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-routing-module').then(m => m.LoginRoutingModule),
  },
  {
    path: '',
    // component: MainLayoutComponent,
    children: [
      { path: 'home', loadComponent: () => import('@erp-frontend/home').then(m => m.HomeComponent) },
      { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
      { path: 'header', loadComponent: () => import('@erp-frontend/header').then(m => m.HeaderComponent) },
    ]
  },
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'footer',
      loadComponent: () =>
        import('@erp-frontend/footer').then((m) => m.FooterComponent),
    }

];

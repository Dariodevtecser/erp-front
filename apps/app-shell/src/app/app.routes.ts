import { Route } from '@angular/router';
import { MainLayoutComponent } from '../app/main-layout/main-layout.component';
import { LoginComponent } from './login/login/login.component';


export const appRoutes: Route[] = [
  {
    path: '', component: LoginComponent
  },
  {

    path: 'app',

    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('@erp-frontend/home').then(m => m.HomeComponent) },
      { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
      { path: 'header', loadComponent: () => import('@erp-frontend/header').then(m => m.HeaderComponent) },
      { path: 'sidebar', loadComponent: () => import('../../../../libs/src/lib/sidebar/sidebar.component').then(m => m.SidebarComponent) },
      { path: 'footer', loadComponent: () => import('@erp-frontend/footer').then(m => m.FooterComponent) },

      { 
        path: 'admin', 
        loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
        children: [
          {
            path: '',
            loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
          },
          {
            path: 'create',
            loadComponent: () => import('./admin/create-user/create-user.component').then(m => m.CreateUserComponent)
          }
        ]
      },


      { path: 'super-admin', loadChildren: () => import('./superAdmin/super-admin.module').then(m => m.SuperAdminModule) },
    ]

  },
  {
      path: '**',
      redirectTo: '',
      pathMatch: 'full',
    },
];

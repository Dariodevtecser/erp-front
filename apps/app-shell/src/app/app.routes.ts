import { Route } from '@angular/router';
import { MainLayoutComponent } from '../app/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../../../libs/src/lib/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '', component: LoginComponent
  },
  {

    path: 'app', component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('@erp-frontend/home').then(m => m.HomeComponent), canActivate: [AuthGuard], data: { roles: ['Usuario'] } },
      { path: 'budget', loadComponent: () => import('./budget/budget.component').then(m => m.BudgetComponent),
        children: [
          { path: 'macroprocesses/budget-accounts', loadComponent: () => import('../app/budget/macroprocesses/budget-accounts/budget-accounts.component').then(m => m.BudgetAccountsComponent) }
        ]
       },
      { path: 'header', loadComponent: () => import('@erp-frontend/header').then(m => m.HeaderComponent) },
      { path: 'sidebar', loadComponent: () => import('../../../../libs/src/lib/sidebar/sidebar.component').then(m => m.SidebarComponent) },
      { path: 'footer', loadComponent: () => import('@erp-frontend/footer').then(m => m.FooterComponent) },
  { path: 'super-admin', loadComponent: () => import('./superAdmin/super-admin.component').then(m => m.SuperAdminComponent), canActivate: [AuthGuard], data: { roles: ['Super_Administrador'] },
        children: [
          { path: '',loadComponent: () => import('./superAdmin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
          { path: 'createSuperAdmin', loadComponent: () => import('./superAdmin/create-user/create-user.component').then(m => m.CreateUserComponent) },
          { path: 'edit/:id', loadComponent: () => import('./superAdmin/edit-user/edit-user.component').then(m => m.EditUserComponent) }
        ]
      },
      { 
        path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard], data: { roles: ['Administrador'] },
        children: [
          { path: '', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
          { path: 'createAdmin', loadComponent: () => import('./admin/create-user/create-user.component').then(m => m.CreateUserComponent) },
          { path: 'permissions', loadComponent: () => import('../../../../libs/src/lib/permissions/permissions.component').then(m => m.PermissionsComponent) }
        ]
      },
    ]
  },
  {
      path: '**',
      redirectTo: '',
      pathMatch: 'full',
    },
];

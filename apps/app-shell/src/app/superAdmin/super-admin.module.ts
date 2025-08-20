import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminComponent } from './super-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SuperAdminRoutingModule } from './super-admin-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    SuperAdminComponent,
    DashboardComponent,
    EditUserComponent,
    CreateUserComponent,
    SuperAdminRoutingModule
  ],
  exports: []
})
export class SuperAdminModule {}
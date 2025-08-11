import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BudgetAccountsComponent } from './budget-accounts/budget-accounts.component';
import { MacroprocessesRoutingModule } from './macroprocesses-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MacroprocessesRoutingModule,
    BudgetAccountsComponent
  ]
})
export class MacroprocessesModule { }
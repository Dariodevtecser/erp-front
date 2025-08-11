import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BudgetComponent } from './budget.component';
import { BudgetRoutingModule } from './budget-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    BudgetRoutingModule,
    BudgetComponent
  ]
})
export class BudgetModule { }

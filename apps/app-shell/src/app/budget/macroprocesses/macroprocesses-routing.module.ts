import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MacroprocessesComponent } from './macroprocesses.component';
import { BudgetAccountsComponent } from './budget-accounts/budget-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: MacroprocessesComponent,
    children: [
      { path: 'budget-accounts', component: BudgetAccountsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MacroprocessesRoutingModule {}

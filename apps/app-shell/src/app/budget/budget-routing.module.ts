import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetAccountsComponent } from './macroprocesses/budget-accounts/budget-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetAccountsComponent,
    children: [
        {
            path: 'macroprocesses',
            loadChildren: () => import('./macroprocesses/macroprocesses.module').then(m => m.MacroprocessesModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }

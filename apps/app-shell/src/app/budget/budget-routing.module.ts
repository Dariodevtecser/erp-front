import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetComponent,
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

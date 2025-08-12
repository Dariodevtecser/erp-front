import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '@erp-frontend/sidebar';

export interface BudgetAccount {
  id: string;
  vigencia: number;
  tipoPresupuesto: string;
  unidadEjecutora: string;
  tipoCuenta: 'ingreso' | 'gasto';
  rubro: string;
  nombre: string;
  codigo: string;
  nivel: string;
  tipoRenta: string;
  grupoRenta: string;
  codigoHomologado: string;
  sf: string;
  codigoProducto: string;
  activo: boolean;
  fechaCreacion: string;
  fechaModificacion: string;
  usuarioModificacion: string;
}

const BUDGET_ACCOUNTS_MOCK: BudgetAccount[] = [
  {
    id: '1',
    vigencia: 2025,
    tipoPresupuesto: 'Ingresos',
    unidadEjecutora: 'Secretaría de Hacienda',
    tipoCuenta: 'ingreso',
    rubro: '1',
    nombre: 'Ingresos',
    codigo: '1',
    nivel: '1',
    tipoRenta: '1',
    grupoRenta: '2025',
    codigoHomologado: '1001',
    sf: '1',
    codigoProducto: '1',
    activo: true,
    fechaCreacion: '2025-01-01',
    fechaModificacion: '2025-01-01',
    usuarioModificacion: 'admin',
  },
  {
    id: '2',
    vigencia: 2025,
    tipoPresupuesto: 'Ingresos',
    unidadEjecutora: 'Secretaría de Hacienda',
    tipoCuenta: 'ingreso',
    rubro: '1.0',
    nombre: 'Disponibilidad Inicial',
    codigo: '1.0',
    nivel: '2',
    tipoRenta: '2',
    grupoRenta: '20242',
    codigoHomologado: '1002',
    sf: '2',
    codigoProducto: '2',
    activo: true,
    fechaCreacion: '2025-01-01',
    fechaModificacion: '2025-01-01',
    usuarioModificacion: 'admin',
  }
  // ...agrega más registros según el mockup
];

@Component({
  selector: 'app-budget-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './budget-accounts.component.html',
  styleUrls: ['./budget-accounts.component.scss']
})
export class BudgetAccountsComponent {
  accounts: BudgetAccount[] = BUDGET_ACCOUNTS_MOCK;
  filteredAccounts: BudgetAccount[] = [...BUDGET_ACCOUNTS_MOCK];
  search = '';
  vigencia = 2025;
  tipoPresupuesto = '';
  unidadEjecutora = '';
  tipoCuenta = '';

  // Métodos para filtro y búsqueda se agregarán después
  onAddAccount() {
    // Aquí se abrirá el modal/wizard de creación de cuenta
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent {
  breadcrumbs = ['Crear usuario', 'Permisos'];
  permisos = [
    { nombre: 'Cuentas De Presupuesto', ver: false, editar: false, imprimir: false, todos: false },
    { nombre: 'Solicitudes de Disponibilidad', ver: false, editar: false, imprimir: false, todos: false },
    { nombre: 'Registros Presupuestales', ver: false, editar: false, imprimir: false, todos: false },
    { nombre: 'Modificaciones al Presupuesto', ver: false, editar: false, imprimir: false, todos: false },
    { nombre: 'Reservas Presupuestales', ver: false, editar: false, imprimir: false, todos: false },
    { nombre: 'Catalogo Presupuestal', ver: false, editar: false, imprimir: false, todos: false }
  ];
}
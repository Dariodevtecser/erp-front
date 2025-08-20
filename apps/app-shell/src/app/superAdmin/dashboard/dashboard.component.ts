import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  usuarios = [
    { cedula: '2283666152', nombre: 'Nestor Ocampo', correo: 'ejemplo@gmail.com', rol: 'Administrador', cargo: 'Diseñador', activo: true },
    { cedula: '2283666152', nombre: 'Laura Ruiz', correo: 'ejemplo@gmail.com', rol: 'Administrador', cargo: 'Desarrollador', activo: true },
    { cedula: '2283666152', nombre: 'Bárbara Navarro', correo: 'ejemplo@gmail.com', rol: 'Administrador', cargo: 'Analista contable', activo: true },
    { cedula: '2283666152', nombre: 'Luis Hernández', correo: 'ejemplo@gmail.com', rol: 'Administrador', cargo: 'Analista contable', activo: true },
    { cedula: '2283666152', nombre: 'Laura Ruiz', correo: 'ejemplo@gmail.com', rol: 'Usuario', cargo: 'Desarrollador', activo: true },
    { cedula: '2283666152', nombre: 'Luis Hernández', correo: 'ejemplo@gmail.com', rol: 'Usuario', cargo: 'Analista contable', activo: true },
    { cedula: '2283666152', nombre: 'Nestor Ocampo', correo: 'ejemplo@gmail.com', rol: 'Usuario', cargo: 'Usuario', activo: true },
    { cedula: '2283666152', nombre: 'Laura Ruiz', correo: 'ejemplo@gmail.com', rol: 'Usuario', cargo: 'Analista contable', activo: true }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  crearUsuario() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  editarUsuario(id: string) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }
}
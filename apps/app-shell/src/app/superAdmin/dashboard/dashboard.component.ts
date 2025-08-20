import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../../../../../libs/src/lib/models/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  selectedUser: any = null;

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
  
  abrirModalDesactivar(usuario: any) {
    this.selectedUser = usuario;
    this.modalTitle = 'Desactivar usuario';
    this.modalMessage = '¿Está seguro de realizar la desactivación de usuario?';
    this.showModal = true;
  }

  abrirModalActivar(usuario: any) {
    this.selectedUser = usuario;
    this.modalTitle = 'Activar usuario';
    this.modalMessage = '¿Está seguro de realizar la activación de usuario?';
    this.showModal = true;
  }

  onConfirm() {
  if (this.modalTitle === 'Desactivar usuario') {
    this.selectedUser.activo = false;
  } else if (this.modalTitle === 'Activar usuario') {
    this.selectedUser.activo = true;
  }
  this.showModal = false;
}

  onCancel() {
    this.showModal = false;
  }

  onClose() {
    this.showModal = false;
  }
}
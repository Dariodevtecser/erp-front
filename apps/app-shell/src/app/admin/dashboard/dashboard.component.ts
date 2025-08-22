// apps/app/src/app/admin/dashboard/dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../../../../../libs/src/lib/modals/modal.component';
import { User } from '../../../../../../libs/src/lib/models/user-admin.model';
import Swal from 'sweetalert2';

// Importa el servicio desde libs (igual que haces con ModalComponent)
import { AdminService } from '../../../../../../libs/src/lib/services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  selectedUser: any = null;

  // ahora viene del API:
  usuarios: User[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  private cargarUsuarios(): void {
    this.loading = true;
    this.errorMsg = '';

    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.usuarios = users;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'No se pudieron cargar los usuarios.';
        console.error('Dashboard -> cargarUsuarios error:', err);
        this.loading = false;
      }
    });
  }

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

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  constructor(private router: Router) {}

  crearUsuario() {
    // Lógica para crear usuario
    this.router.navigate(['../']);
  }
}
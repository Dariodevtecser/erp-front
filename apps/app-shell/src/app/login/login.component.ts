import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router){}

  login(){
    if(this.username === 'superadmin' && this.password === '12345'){
      this.router.navigate(['/app/super-admin']);
      Swal.fire({
        icon: 'success',
        title: 'Datos correctos',
        text: 'Bienvenido al ERP',
        showCloseButton: true
      });
    } else if(this.username === 'admin' &&  this.password === '12345'){
      this.router.navigate(['/app/admin']);
      Swal.fire({
        icon: 'success',
        title: 'Datos correctos',
        text: 'Bienvenido Administrador',
        showCloseButton: true
      });
    } else if(this.username === 'user1' && this.password === '12345'){
      this.router.navigate(['/app/home']);
      Swal.fire({
        icon: 'success',
        title: 'Datos correctos',
        text: 'Bienvenido Usuario 1',
        showCloseButton: true
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        text: 'Por favor revisa que las credenciales coincidan',
        showCloseButton: true
      });
    }
  }

}

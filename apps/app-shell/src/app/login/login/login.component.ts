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
    } else {
      // alert('Usuario o contraseña incorrectos');
      Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        text: 'Por favor revisa que las credenciales coincidan',
        showCloseButton: true
      });
    }
  }

}

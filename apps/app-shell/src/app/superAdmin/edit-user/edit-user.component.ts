import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  userId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  guardarCambios() {
    // Lógica para guardar cambios del usuario
    this.router.navigate(['../']);
  }
}
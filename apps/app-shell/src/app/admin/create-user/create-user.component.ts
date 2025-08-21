import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userForm: FormGroup;

  // Paso actual del formulario (para el stepper)
  currentStep: number = 1;

  // Tipos de documento disponibles
  documentTypes = ['Cédula', 'Pasaporte', 'Cédula de extranjería', 'Otro'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      dependency: ['', Validators.required]
    });
  }

  // Avanzar al siguiente paso
  goNext() {
    if (this.currentStep < 2) { // ajusta si en el futuro hay más pasos
      this.currentStep++;
    }
  }

  // Retroceder al paso anterior
  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Ir a un paso específico (si quieres saltar en la barra de progreso)
  goToStep(step: number) {
    this.currentStep = step;
  }

  // Enviar formulario
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Usuario creado:', this.userForm.value);
      // Aquí llamarías a tu servicio de backend
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  // Cancelar acción
  onCancel() {
    console.log('Acción cancelada');
    this.userForm.reset();
    this.currentStep = 1; // reiniciamos al paso inicial
  }
}

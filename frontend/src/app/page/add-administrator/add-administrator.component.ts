import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Admin } from '../../models/admin.model';
import { AdminService } from '../../services/admin.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-add-administrator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-administrator.component.html',
  styleUrl: './add-administrator.component.css'
})
export class AddAdministratorComponent {
  adminForm: FormGroup;

  constructor(private adminservice: AdminService) {
    this.adminForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(): void {
    if (!this.adminForm.valid) {
      console.error("Error en el formulario")
      return;
    };

    const newAdmin: Admin = {
      name: this.adminForm.value.name,
      email: this.adminForm.value.email,
      password: this.adminForm.value.password,
    };

    this.adminservice.registerAdmin(newAdmin).subscribe({
      next: () => {
        console.log('Registro del admin exitoso');
        this.adminForm.reset();
      },
      error: (error) => {
        console.log('Error en el registro del Admin:', error);
      },
    });
  }

  customEmailValidator(email: string): boolean {
    const emailControl = this.adminForm.get('email');
    if (!emailControl) {
      console.error('No se pudo obtener el control de correo electrónico');
      return false;
    }

    const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    if (!isValid) {
      emailControl.setErrors({ 'email': true });
      return false;
    }
    return true;
  }

  passwordValidator(): void {
    const passwordControl = this.adminForm.get('password');
    const confirmPasswordControl = this.adminForm.get('confirmPassword');


    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ 'passwordMismatch': true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }

    if (passwordControl?.value.length < 8) {
      passwordControl?.setErrors({ 'minlength': true });
    } else {
      passwordControl?.setErrors(null);
    }
  }
}

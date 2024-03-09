import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {
  teacherForm: FormGroup;
  registrationSuccess = false;

  constructor(private teacherService : TeacherService) {
    this.teacherForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',Validators.required),
      age: new FormControl('', Validators.required),
      maritalStatus: new FormControl('', Validators.required),
      citizenshipCard: new FormControl('',Validators.required),
    });
  }

  ngOnInit():void{
    this.registrationSuccess = false
  }

  onSubmit(): void {
    if (!this.teacherForm.valid) {
      console.error("Error en el formulario")
      return;
    }
    
    const newTeacher: Teacher = {
      name: this.teacherForm.value.name,
      email: this.teacherForm.value.email,
      password: this.teacherForm.value.password,
      age: this.teacherForm.value.age,
      maritalStatus: this.teacherForm.value.maritalStatus,
      citizenshipCard: this.teacherForm.value.citizenshipCard,
    };

    this.teacherService.registerTeacher(newTeacher).subscribe({
      next: response =>{
        console.log('Registro exitoso:', response);
        this.registrationSuccess = true
        this.teacherForm.reset()
        setTimeout(() => {
          this.registrationSuccess = false;
        }, 3000);
      },
      error: error =>{
        console.log('Error en el registro de teacher:', error)
      }
    });
  }

  customEmailValidator(email: string): boolean {
    const emailControl = this.teacherForm.get('email');
  
    if (!emailControl) {
      console.error('No se pudo obtener el control de correo electrónico.');
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
    const passwordControl = this.teacherForm.get('password');
    const confirmPasswordControl = this.teacherForm.get('confirmPassword');
  
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

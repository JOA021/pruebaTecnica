import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { student } from '../../models/student.model';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  studentForm: FormGroup;
  registrationSuccess = false;

  constructor(private studentService : StudentService) {
    this.studentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
      age: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      identityCard: new FormControl('',Validators.required),
    });
  }

  ngOnInit():void{
    this.registrationSuccess = false
  }

  onSubmit(): void {
    if (!this.studentForm.valid) {
      console.error("Error en el formulario")
      return;
    }
    
    const newStudent: student = {
      name: this.studentForm.value.name,
      email: this.studentForm.value.email,
      password: this.studentForm.value.password,
      age: this.studentForm.value.age,
      grade: this.studentForm.value.grade,
      identityCard: this.studentForm.value.identityCard,
    };

    this.studentService.registerTeacher(newStudent).subscribe({
      next: response =>{
        console.log('Registro exitoso:', response);
        this.registrationSuccess = true
        this.studentForm.reset()
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
    const emailControl = this.studentForm.get('email');
  
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
    const passwordControl = this.studentForm.get('password');
    const confirmPasswordControl = this.studentForm.get('confirmPassword');
  
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

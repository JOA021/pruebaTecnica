import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { AdminService } from '../../services/admin.service';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      rol: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const { rol, email, password } = formValue;

      switch (rol) {
        case '1':
          this.adminService.loginAdmin({ email, password }).subscribe({
            next: result => {
              this.handleLoginResult(result)
            },
            error: error => { this.handleError(error) }
          });
          break;
        case '2':
          this.teacherService.loginTeacher({ email, password }).subscribe({
            next: result => {
              this.handleLoginResult(result)
            },
            error: error => { this.handleError(error) }
          });
          break;
        case '3':
          this.studentService.loginStudent({ email, password }).subscribe({
            next: result => {
              this.handleLoginResult(result)
            },
            error: error => { this.handleError(error) }
          });
          break;
        default:
          console.error('Rol no válido');
      }
    } else {
      console.error('Error en el ingreso');
    }
  }

  private handleLoginResult(result: { token: string, userType: string, teacherId?: string} | { error: string }): void {
    if ('token' in result && 'userType' in result) {
      const token = result.token as string;
      const usertype = result.userType as string;
      
      switch (usertype) {
        case 'admin':
          this.adminService.saveToken(token);
          break;
        case 'teacher':
          this.teacherService.saveToken(token);
          this.teacherService.saveTeacherId(result.teacherId);
          break;
        case 'student':
          this.studentService.saveToken(token);
          break;
        default:
          console.error('Tipo de usuario no válido:', usertype);
          return;
      }

      this.router.navigate([`/${result.userType}`]);
    } else {
      console.error('Error en el inicio de sesión:', result.error || 'Error desconocido');
      // Puedes manejar el error aquí según tus necesidades
    }
  }

  private handleError(error: any): void {
    console.error('Error en el inicio de sesión:', error);
    // Puedes manejar el error aquí según tus necesidades
  }
}
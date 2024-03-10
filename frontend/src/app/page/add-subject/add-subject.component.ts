import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css'
})
export class AddSubjectComponent {
  addSubjectForm: FormGroup;

  constructor(private teacherService: TeacherService) {
    this.addSubjectForm = new FormGroup({
      nameSubject: new FormControl('', Validators.required),
      gradeSubject: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.addSubjectForm.valid) {
      console.error("Error en el formulario");
      return;
    }

    const teacherId = this.teacherService.getTeacherId();

    if (!teacherId) {
      console.error('ID del profesor no obtenido');
      return;
    }

    const newSubject = {
      nameSubject: this.addSubjectForm.value.nameSubject,
      gradeSubject: this.addSubjectForm.value.gradeSubject,
    };

    this.teacherService.createSubject(teacherId, newSubject).subscribe({
      next: () => {
        console.log('Registro de materia exitoso');
        this.addSubjectForm.reset();
      },
      error: (error) => {
        console.log('Error al crear materia:', error);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent {
  subjects: any[] = [];

  constructor(private teacherService: TeacherService, private studentService: StudentService) { }

  ngOnInit(): void {
    // Obtén el grado almacenado en el servicio de estudiante
    const studentGrade = this.studentService.getStudentGrade();

    if (!studentGrade) {
      console.error('Grado del estudiante no obtenido');
      return;
    }
    
    this.loadSubjectsByGrade(studentGrade);
  }

  loadSubjectsByGrade(grade: string): void {
    this.teacherService.obtainSubjectsByGrade(grade).subscribe({
      next: (subjects: any[]) => {
        this.subjects = subjects;
      },
      error: (error) => {
        console.error('Error al obtener las materias por grado:', error);
      },
    });
  }
}



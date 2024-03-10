import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-page',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './teacher-page.component.html',
  styleUrl: './teacher-page.component.css'
})
export class TeacherPageComponent {
  subjects: any[] = []; 

  constructor(private teacherService: TeacherService) { }

  
  ngOnInit(): void {
    const teacherId = this.teacherService.getTeacherId();
  
    if (!teacherId) {
      console.error('ID del profesor no obtenido');
      return;
    }
  
    this.loadSubjects(teacherId);
  }
  loadSubjects(teacherId: string): void {
    this.teacherService.obtainSubjects(teacherId).subscribe({
      next: (subjects: any[]) => {
        this.subjects = subjects;
      },
      error: (error) => {
        console.error('Error al obtener las materias:', error.message || error);
      },
    });
  }
}

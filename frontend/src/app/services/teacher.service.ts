import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Teacher } from '../models/teacher.model';


@Injectable({
  providedIn: 'root',
})

export class TeacherService {
  private apiUrl = 'http://localhost:3000/teacher';
  tokenName = 'TOKEN';
  private teacherId: string | undefined = undefined;
  private teacherIdKey = 'TEACHER_ID';

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerTeacher(teacher: Teacher): Observable<any> {
    return this.http.post(`${this.apiUrl}/singupTeacher`, teacher).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  loginTeacher(credentials: { email: string; password: string }): Observable<{ token: string, userType: string, teacherId: string } | { error: string }> {
    return this.http.post<{ token: string, userType: string, teacherId: string }>(`${this.apiUrl}/loginTeacher`, credentials, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  getTeacher(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getTeacher`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  createSubject(teacherId: string, subjectData: { nameSubject: string; gradeSubject: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/createSubject/${teacherId}`, subjectData, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  obtainSubjects(teacherId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubjects/${teacherId}`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud al obtener las materias:', error);
        return throwError(() => error);
      })
    );
  }


  obtainSubjectsByGrade(grade: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubjectsByGrade/${grade}`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud al obtener las materias por grado:', error);
        return throwError(() => error);
      })
    );
  }



  // Otros  
  saveToken(token: string, teacherId?: string): void {
    const dataToStore = { token, userType: 'teacher', teacherId };
    localStorage.setItem(this.tokenName, JSON.stringify(dataToStore));
  }

  saveTeacherId(id: string | undefined): void {
    this.teacherId = id || ''; 
    localStorage.setItem(this.teacherIdKey, this.teacherId);
  }

  getTeacherId(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.teacherIdKey);
    } else {
      console.error('localStorage is not defined.');
      return null;
    }
  }
}
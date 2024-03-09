import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Teacher } from '../models/teacher.model';


@Injectable({
    providedIn: 'root',
  })

export class TeacherService{
    private apiUrl = 'http://localhost:3000/teacher';
    tokenName = 'TOKEN';

    constructor(private http: HttpClient ) {}

    headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });

    registerTeacher( teacher: Teacher): Observable<any> {
      return this.http.post(`${this.apiUrl}/singupTeacher`, teacher).pipe(
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
    }

    loginTeacher(credentials: { email: string; password: string }): Observable<{ token: string, userType: string } | { error: string }> {
      return this.http.post<{ token: string, userType: string }>(`${this.apiUrl}/loginTeacher`, credentials, {
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
    }

    saveToken(token: string): void {
      if (token) {
          localStorage.setItem(this.tokenName, token);
      } else {
          localStorage.removeItem(this.tokenName);
      }
  }
}

  
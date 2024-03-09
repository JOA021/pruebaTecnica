import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { student } from '../models/student.model';


@Injectable({
    providedIn: 'root',
  })

export class StudentService{
    private apiUrl = 'http://localhost:3000/student';
    tokenName = 'TOKEN';

    constructor(private http: HttpClient ) {}

    headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });

    registerStudent(student: student): Observable<any> {
      return this.http.post(`${this.apiUrl}/singupStudent`, student).pipe(
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError(() => error);
        })
      );
    }

    loginStudent(credentials: { email: string; password: string }): Observable<{ token: string, userType: string } | { error: string }> {
      return this.http.post<{ token: string, userType: string }>(`${this.apiUrl}/loginStudent`, credentials, {
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Admin } from '../models/admin.model';

@Injectable({
    providedIn: 'root'
})

export class AdminService{
    apiUrl = "http://localhost:3000/admin"
    tokenName = 'TOKEN';

    constructor(private http: HttpClient){}

    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
      });

    registerAdmin( admin : Admin): Observable <any>{
        return this.http.post(`${this.apiUrl}/singupAdmin`, admin).pipe(
            catchError((error) => {
              console.error('Error en la solicitud:', error);
              return throwError(() => error);
            })
        );
    }

    loginAdmin(credentials: { email: string; password: string }): Observable<{ token: string, userType: string } | { error: string }> {
      return this.http.post<{ token: string, userType: string }>(`${this.apiUrl}/loginAdmin`, credentials, {
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
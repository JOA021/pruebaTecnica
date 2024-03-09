import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { student } from '../models/student.model';


@Injectable({
    providedIn: 'root',
  })

export class StudentService{
    private apiUrl = 'http://localhost:3000/student';

    constructor(private http: HttpClient ) {}

    registerTeacher( student : student): Observable<any> {
      return this.http.post(`${this.apiUrl}/singupStudent`, student);
    }
}
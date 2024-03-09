import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';


@Injectable({
    providedIn: 'root',
  })

export class TeacherService{
    private apiUrl = 'http://localhost:3000/teacher';

    constructor(private http: HttpClient ) {}

    registerTeacher( teacher: Teacher): Observable<any> {
      return this.http.post(`${this.apiUrl}/singupTeacher`, teacher);
    }
}

  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
    providedIn: 'root'
})

export class AdminService{
    apiUrl = "http://localhost:3000/admin"

    constructor(private http: HttpClient){}

    registerAdmin( admin : Admin): Observable <any>{
        return this.http.post(`${this.apiUrl}/singupAdmin`, admin)
    }
}
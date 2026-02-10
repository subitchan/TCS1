import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployerProfile } from '../classes/employer-profile';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerProfileService {
  private baseUrl = `${environment.apiUrl}/employer`;

  constructor(private http: HttpClient) {}

  // 🔹 Add new employer
  addEmployer(employer: EmployerProfile): Observable<EmployerProfile> {
    return this.http.post<EmployerProfile>(`${this.baseUrl}/add`, employer);
  }

  // 🔹 Get all employers
  getAllEmployers(): Observable<EmployerProfile[]> {
    return this.http.get<EmployerProfile[]>(`${this.baseUrl}/all`);
  }

  // 🔹 Get employer by ID
  getEmployerById(id: number): Observable<EmployerProfile> {
    return this.http.get<EmployerProfile>(`${this.baseUrl}/get/${id}`);
  }

  // 🔹 Update employer by ID
  updateEmployer(id: number, updatedEmployer: EmployerProfile): Observable<string> {
    return this.http.put(`${this.baseUrl}/update/${id}`, updatedEmployer, {
      responseType: 'text'
    });
  }
}

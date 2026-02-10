// src/app/service/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../classes/auth';
import { User } from '../classes/user';
import { EmployerProfile } from '../classes/employer-profile';
import { JobSeeker } from '../classes/job-seeker';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(authData: Auth): Observable<{ token: string; role: string }> {
          console.log(environment.apiUrl)

    return this.http.post<{ token: string; role: string }>(
      `${this.baseUrl}/login`,
      authData
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

   addEmployer(employer: EmployerProfile): Observable<EmployerProfile> {
      return this.http.post<EmployerProfile>(`${this.baseUrl}/addEmployer`, employer);
    }

    // ✅ Add Job Seeker Profile
      addJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
        return this.http.post<JobSeeker>(`${this.baseUrl}/addJobSeeker`, jobSeeker);
      }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    // Optionally store role in localStorage after login
    return localStorage.getItem('role');
  }

  setUserRole(role: string) {
    localStorage.setItem('role', role);
  }
}

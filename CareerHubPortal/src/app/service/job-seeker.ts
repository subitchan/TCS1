import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { JobSeeker } from 'CareerHubPortal/src/app/classes/jobSeeker';
import { JobSeeker } from '../classes/job-seeker';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {
  private baseUrl = `${environment.apiUrl}/jobSeeker`;

  constructor(private http: HttpClient) {}

  // ✅ Add Job Seeker Profile
  addJobSeeker(jobSeeker: JobSeeker): Observable<JobSeeker> {
    return this.http.post<JobSeeker>(`${this.baseUrl}/addJobSeeker`, jobSeeker);
  }

  // GET /searchByJobSeekerName?name=...
  searchByName(name: string): Observable<JobSeeker[]> {
      console.log(environment.apiUrl)
    return this.http.get<JobSeeker[]>(`${this.baseUrl}/searchByJobSeekerName`, {
      params: { name }
    });
  
  }

  // GET /searchById/{id}
  getJobSeekerById(id: number): Observable<JobSeeker> {
    return this.http.get<JobSeeker>(`${this.baseUrl}/searchById/${id}`);
  }

  // PUT /updateJobSeeker/{id}
  updateJobSeeker(id: number, profile: JobSeeker): Observable<string> {
    return this.http.put(`${this.baseUrl}/updateJobSeeker/${id}`, profile, {
      responseType: 'text' // since backend returns plain text
    });
  }

  getJobSeekerIdByName(name: string): Observable<number> {
    //const params = new HttpParams().set('name', name);
    return this.http.get<number>(`${this.baseUrl}/JobSeekerIdByName`, { params: { name } });
  }
}

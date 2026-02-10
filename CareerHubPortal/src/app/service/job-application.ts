import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobApplication } from '../classes/job-application';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private baseUrl = `${environment.apiUrl}/jobApplication`;

  constructor(private http: HttpClient) {}

  applyToJob(jobId: number, profileId: number, resumeId: number): Observable<JobApplication> 
  {
    const params = new HttpParams()
      .set('jobId', jobId.toString())
      .set('profileId', profileId.toString())
      .set('resumeId', resumeId.toString());
    return this.http.post<JobApplication>(`${this.baseUrl}/apply`, null, { params });
  }

  checkIfAlreadyApplied(jobId: number, profileId: number): Observable<boolean> 
   {
     const params = { jobId: jobId.toString(), profileId: profileId.toString() };
     return this.http.get<boolean>(`${this.baseUrl}/check`, { params });
   }
  
  getApplicationsByProfile(profileId: number): Observable<JobApplication[]> 
   {
     return this.http.get<JobApplication[]>(`${this.baseUrl}/byProfile/${profileId}`);
   }

 getApplicationsByEmployerId(employerId: number): Observable<JobApplication[]>
  {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/byEmployer/${employerId}`);
  }

  // ✅ Update application status
  updateApplicationStatus(applicationId: number, status: string): Observable<string> {
  const params = new HttpParams().set('status', status);
  return this.http.put(`${this.baseUrl}/status/${applicationId}`, null, { params, responseType: 'text' });
}
}

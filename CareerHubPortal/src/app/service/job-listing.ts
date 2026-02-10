import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobListing } from '../classes/job-listing'; 
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class JobListingService {
  private baseUrl = `${environment.apiUrl}/jobListing`;

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<JobListing[]> {
    return this.http.get<JobListing[]>(`${this.baseUrl}/all`);
  }

  getJobsByEmployer(employerId: number): Observable<JobListing[]> {
    return this.http.get<JobListing[]>(`${this.baseUrl}/byEmployer/${employerId}`);
  }

  searchJobs(keyword: string): Observable<JobListing[]> {
    return this.http.get<JobListing[]>(`${this.baseUrl}/search`, {
      params: { keyword }
    });
  }

  getJobById(jobId: number): Observable<JobListing> {
    return this.http.get<JobListing>(`${this.baseUrl}/${jobId}`);
  }

  createJob(job: JobListing): Observable<JobListing> {
    return this.http.post<JobListing>(`${this.baseUrl}/create`, job);
  }

  updateJob(jobId: number, updatedJob: JobListing): Observable<JobListing> {
    return this.http.put<JobListing>(`${this.baseUrl}/update/${jobId}`, updatedJob);
  }

  deleteJob(jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${jobId}`);
  }
}

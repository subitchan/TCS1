import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resume } from '../classes/resume';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private baseUrl =`${environment.apiUrl}/resume`;

  constructor(private http: HttpClient) {}

  // Upload resume
  uploadResume(file: File): Observable<Resume> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Resume>(`${this.baseUrl}/upload`, formData);
  }

  // Download resume by ID
  downloadResume(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      responseType: 'blob'
    });
  }

  // Update resume
  updateResume(resumeId: number, newFile: File): Observable<Resume> {
    const formData = new FormData();
    formData.append('file', newFile);
    return this.http.put<Resume>(`${this.baseUrl}/update/${resumeId}`, formData);
  }
}

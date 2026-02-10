import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../../classes/job-application';
import { JobApplicationService } from '../../service/job-application';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeService } from '../../service/resume';

@Component({
  selector: 'app-employer-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employer-applications.html',
  styleUrl: './employer-applications.css'
})
export class EmployerApplications implements OnInit {

  applications: JobApplication[] = [];

  unifiedSearch = '';          // name / skill
  jobIdFilter: number | null = null;
  statusFilter: '' | 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED' = '';

  constructor(
    private jobApplicationService: JobApplicationService,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('employerId');
    if (!storedId) {
      console.error('No employerId found in localStorage.');
      return;
    }
    const employerId = +storedId;
    this.jobApplicationService.getApplicationsByEmployerId(employerId).subscribe({
      next: apps => (this.applications = apps),
      error: err => console.error('Error fetching applications:', err)
    });
  }

  download(resumeId: number, fileName: string): void {
    this.resumeService.downloadResume(resumeId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  updateStatus(applicationId: number, newStatus: string): void {
    this.jobApplicationService.updateApplicationStatus(applicationId, newStatus).subscribe({
      next: message => {
        alert(message);
        const app = this.applications.find(a => a.applicationId === applicationId);
        if (app) app.applicationStatus = newStatus as any;
      },
      error: err => {
        console.error('Failed to update status', err);
        alert('Error updating status.');
      }
    });
  }

  /** 🔍 Combined filtering logic */
  get filteredApplications(): JobApplication[] {
    const search = this.unifiedSearch.toLowerCase().trim();

    return this.applications.filter(app => {
      // --- name / skill ---
      const name = app.jobSeeker?.fullName?.toLowerCase() || '';
      const skills = (app.jobSeeker?.skills || '')
        .split(',')
        .map(s => s.trim().toLowerCase());
      const searchMatch =
        !search || name.includes(search) || skills.some(s => s.includes(search));

      // --- job ID ---
      const jobIdMatch =
        this.jobIdFilter === null || app.job.jobId === this.jobIdFilter;

      // --- status ---
      const statusMatch =
        !this.statusFilter || app.applicationStatus === this.statusFilter;

      return searchMatch && jobIdMatch && statusMatch;
    });
  }
}

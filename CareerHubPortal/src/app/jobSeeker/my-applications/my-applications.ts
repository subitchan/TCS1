import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobApplication } from '../../classes/job-application';
import { JobApplicationService } from '../../service/job-application';
import { ResumeService } from '../../service/resume';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css'
})
export class MyApplications implements OnInit {

  /** --- State --- */
  applications: JobApplication[] = [];
  profileId!: number;

  /** Search + status filter */
  searchQuery: string = '';
  selectedStatus: string = 'ALL';

  constructor(
    private jobApplicationService: JobApplicationService,
    private resumeService: ResumeService
  ) {}

  /* -------------------- Life‑cycle -------------------- */
  ngOnInit(): void {
    const storedId = localStorage.getItem('profileId');
    if (!storedId) return;

    this.profileId = +storedId;

    this.jobApplicationService
      .getApplicationsByProfile(this.profileId)
      .subscribe({
        next: apps => (this.applications = apps),
        error: err => console.error('Failed to fetch applications', err)
      });
  }

  /* -------------------- Helpers -------------------- */
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

  /** Filtered list used by the template */
  get filteredApplications(): JobApplication[] {
    const statusFiltered = this.applications.filter(app =>
      this.selectedStatus === 'ALL' ||
      app.applicationStatus === this.selectedStatus
    );

    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return statusFiltered;

    return statusFiltered.filter(app =>
      app.job.employer.companyName.toLowerCase().includes(q) ||
      app.job.location.toLowerCase().includes(q) ||
      app.job.salaryRange.toLowerCase().includes(q)
    );
  }
}

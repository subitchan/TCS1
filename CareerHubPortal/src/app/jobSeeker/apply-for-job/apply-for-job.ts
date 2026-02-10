import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from '../../service/job-application';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../service/resume';

@Component({
  selector: 'app-apply-for-job',
  imports: [CommonModule,FormsModule],
  templateUrl: './apply-for-job.html',
  styleUrl: './apply-for-job.css'
})
export class ApplyForJob implements OnInit {
  jobId!: number;
  profileId!: number;
  resumeId!: number;
  statusMessage = '';
  uploadMessage = '';

  constructor(
    private route: ActivatedRoute,
    private jobApplicationService: JobApplicationService,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    const jobIdParam = this.route.snapshot.paramMap.get('jobId');
    if (jobIdParam) {
      this.jobId = +jobIdParam;
    }

    const profileIdStr = localStorage.getItem('profileId');
    if (profileIdStr) {
      this.profileId = +profileIdStr;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file: File = input.files[0];

    this.uploadMessage = 'Uploading...';

    this.resumeService.uploadResume(file).subscribe({
      next: (resume) => {
        this.resumeId = resume.resumeId!;
        this.uploadMessage = `Uploaded: ${resume.resumeFilename}`;
      },
      error: (error) => {
        console.error(error);
        this.uploadMessage = 'Failed to upload resume.';
      }
    });
  }

  applyNow(): void {
    if (!this.jobId || !this.profileId || !this.resumeId) {
      this.statusMessage = 'All fields are required.';
      return;
    }

    this.jobApplicationService.applyToJob(this.jobId, this.profileId, this.resumeId)
      .subscribe({
        next: (response) => {
          this.statusMessage = `Application submitted with ID: ${response.applicationId}`;
        },
        error: (error) => {
          console.error(error);
          this.statusMessage = 'Failed to apply.';
        }
      });
  }
}
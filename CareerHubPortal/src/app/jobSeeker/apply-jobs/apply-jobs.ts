import { Component, OnInit } from '@angular/core';
import { JobListing } from '../../classes/job-listing';
//import { JobListing } from 'src/app/classes/job-listing'; 
import { JobListingService } from '../../service/job-listing';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { JobApplicationService } from '../../service/job-application';
import { FormsModule } from '@angular/forms';
//import { JobListingService } from 'src/app/service/job-listing.service';

@Component({
  selector: 'app-apply-jobs',
  templateUrl: './apply-jobs.html',
  imports: [CommonModule,RouterModule,FormsModule],
  styleUrls: ['./apply-jobs.css']
})
export class ApplyJobs implements OnInit {

  jobList: JobListing[] = [];
  appliedMap: Map<number, boolean> = new Map(); // ✅ jobId -> true/false
  profileId!: number;

  constructor(
    private jobListingService: JobListingService,
    private jobApplicationService: JobApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedProfileId = localStorage.getItem('profileId');
    if (storedProfileId) {
      this.profileId = +storedProfileId;
    }

    this.getAllJobs();
  }

  getAllJobs(): void {
    this.jobListingService.getAllJobs().subscribe({
      next: (jobs) => {
        this.jobList = jobs;

        // 🔁 After loading jobs, check application status for each
        this.jobList.forEach(job => {
          this.jobApplicationService
            .checkIfAlreadyApplied(job.jobId!, this.profileId)
            .subscribe(applied => {
              this.appliedMap.set(job.jobId!, applied);
            });
        });
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  applyToJob(jobId: number): void {
    this.router.navigate(['jobSeeker/apply', jobId]);
  }

  hasApplied(jobId: number): boolean {
    return this.appliedMap.get(jobId) ?? false;
  }

//   searchText: string = '';

// filteredJobs(): JobListing[] {
//   if (!this.searchText.trim()) return this.jobList;

//   const search = this.searchText.toLowerCase();
//   return this.jobList.filter(job =>
//     job.jobTitle?.toLowerCase().includes(search) ||
//     job.skillsRequired?.toLowerCase().includes(search)
//   );
// }


searchText: string = '';
selectedCompany: string = '';
minSalary: number | null = null;
maxSalary: number | null = null;

get uniqueCompanies(): string[] {
  const companies = this.jobList.map(job => job.employer.companyName);
  return Array.from(new Set(companies));
}


filteredJobs(): JobListing[] {
  return this.jobList.filter(job => {
    const titleMatch = job.jobTitle?.toLowerCase().includes(this.searchText.toLowerCase());
    const skillMatch = job.skillsRequired?.toLowerCase().includes(this.searchText.toLowerCase());

    const companyMatch = this.selectedCompany
      ? job.employer.companyName === this.selectedCompany
      : true;

    const min = this.extractMinSalary(job.salaryRange);
    const max = this.extractMaxSalary(job.salaryRange);

    const salaryMatch =
      (this.minSalary === null || min >= this.minSalary) &&
      (this.maxSalary === null || max <= this.maxSalary);

    return (titleMatch || skillMatch) && companyMatch && salaryMatch;
  });
}

extractMinSalary(salaryRange: string): number {
  // Extracts the first number from "5-10 LPA"
  const match = salaryRange.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

extractMaxSalary(salaryRange: string): number {
  // Extracts the second number from "5-10 LPA"
  const match = salaryRange.match(/-(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}



}

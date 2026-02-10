import { Component } from '@angular/core';
import { JobListing } from '../../classes/job-listing';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { JobListingService } from '../../service/job-listing';
import { UserService } from '../../service/user';

@Component({
  selector: 'app-post-job',
  imports: [ReactiveFormsModule],
  templateUrl: './post-job.html',
  styleUrl: './post-job.css'
})
export class PostJob {
   username: string = '';
  employerId!: number;
  jobForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobService: JobListingService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';

 this.jobForm = this.fb.group({
  jobTitle: ['', Validators.required],
  jobDescription: ['', Validators.required],
  location: ['', Validators.required],
  salaryRange: ['', Validators.required],
  skillsRequired: ['', Validators.required]
});


    // Fetch employer ID from username
    this.userService.getUserIdByUsername(this.username).subscribe(id => {
      this.employerId = id;
    });
  }

  postJob(): void {
  const newJob: JobListing = {
    employer: {
      employerId: this.employerId   
    },
    ...this.jobForm.value
  };

  this.jobService.createJob(newJob).subscribe({
    next: () => alert('Job posted successfully!'),
    error: err => {
      console.error(err);
      alert('Failed to post job.');
    }
  });
}


}

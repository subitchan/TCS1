import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSeeker } from '../../classes/job-seeker';
import { JobSeekerService } from '../../service/job-seeker';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user';
import { AuthService } from '../../service/auth';
// import { JobSeekerService } from 'src/app/service/jobSeeker';
// import { JobSeeker } from 'src/app/classes/jobSeeker';
import { CareerChatbotComponent } from '../career-chatbot-component/career-chatbot-component';

@Component({
  selector: 'app-job-seeker-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule,CareerChatbotComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})


export class JobSeekerDashboardComponent implements OnInit {
  username!: string;
  profileId!: number;
  profile: JobSeeker = {} as JobSeeker;

  constructor(
    private jobSeekerService: JobSeekerService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';

    this.userService.getUserIdByUsername(this.username).subscribe(id => {
      this.profileId = id;
      localStorage.setItem('profileId', String(this.profileId));

      this.jobSeekerService.getJobSeekerById(this.profileId).subscribe(user => {
        this.profile = user;
      });
    });
  }

  logout(): void {
    this.authService.logout(); // Clears token
    this.router.navigate(['AuthDashboard/login']); // Redirect to login
  }
}

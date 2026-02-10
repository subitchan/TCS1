import { Component } from '@angular/core';

import { AuthService } from '../../service/auth';
import { JobSeekerService } from '../../service/job-seeker';
import { JobSeeker } from '../../classes/job-seeker';
import { UserService } from '../../service/user';

@Component({
  selector: 'app-view-me',
  imports: [],
  templateUrl: './view-me.html',
  styleUrl: './view-me.css'
})
export class ViewMe  {

  username!:string
   profileId!:number
  profile:JobSeeker ={} as JobSeeker;

  constructor
  (private authService:AuthService,
    private jobSeekerService:JobSeekerService,
    private userService:UserService)
  {
   
  }

 ngOnInit(): void {
  this.username = localStorage.getItem('username') ?? '';

  this.userService.getUserIdByUsername(this.username).subscribe(id => {
    this.profileId = id;

    // ✅ Only now that profileId is ready, fetch job seeker profile
    this.jobSeekerService.getJobSeekerById(this.profileId).subscribe(user => {
      this.profile = user;
    });

    // ✅ Optional debug alert after profileId is assigned
   // alert(this.profileId);
  });
}


}

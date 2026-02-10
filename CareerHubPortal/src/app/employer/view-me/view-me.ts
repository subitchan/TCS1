import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';
import { EmployerProfileService } from '../../service/employer-profile';
import { UserService } from '../../service/user';
import { EmployerProfile } from '../../classes/employer-profile';

@Component({
  selector: 'app-view-me',
  imports: [],
  templateUrl: './view-me.html',
  styleUrl: './view-me.css'
})
export class EmployerViewMe {

  profile: EmployerProfile = {} as EmployerProfile;  // declare and initializes the profile 

  username!:string
     profileId!:number
    // profile!:EmployerProfile
  
    constructor
    (private authService:AuthService,
      private employerService:EmployerProfileService,
      private userService:UserService)
    {
     
    }
  
   ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';
  
    this.userService.getUserIdByUsername(this.username).subscribe(id => {
      this.profileId = id;
  
      // ✅ Only now that profileId is ready, fetch job seeker profile
      this.employerService.getEmployerById(this.profileId).subscribe(user => {
        this.profile = user;
      });
  
      // ✅ Optional debug alert after profileId is assigned
     // alert(this.profileId);
    });
  }

}

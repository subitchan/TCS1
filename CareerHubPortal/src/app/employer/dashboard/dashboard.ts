import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user';
import { EmployerProfileService } from '../../service/employer-profile';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class EmployerDashboard implements OnInit {

  username: string = '';
  employerId!: number;
  employerName!:String;

  constructor(private userService: UserService,private employerService:EmployerProfileService) {}

  ngOnInit(): void {
    // 🔐 Get username from localStorage
    this.username = localStorage.getItem('username') ?? '';

  // 🔁 Fetch employerId using username and store it
this.userService.getUserIdByUsername(this.username).subscribe({
  next: (id) => {
    this.employerId = id;
    localStorage.setItem('employerId', id.toString()); // ✅ Store in localStorage

    // 🔁 Now fetch the employer profile using the ID
    this.employerService.getEmployerById(id).subscribe({
      next: (employer) => {
        this.employerName = employer.companyName; // ✅ Set company name
      },
      error: (err) => {
        console.error('Failed to fetch employer profile', err);
      }
    });
  },
  error: (err) => {
    console.error('Failed to fetch employerId', err);
  }
});


  }

  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('employerId');
  localStorage.removeItem('role');
  window.location.href = 'AuthDashboard/login'; 
}

}

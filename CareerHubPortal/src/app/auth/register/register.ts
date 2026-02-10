import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { JobSeeker } from '../../classes/job-seeker';
import { EmployerProfile } from '../../classes/employer-profile';
import { UserService } from '../../service/user';
import { JobSeekerService } from '../../service/job-seeker';
import { EmployerProfileService } from '../../service/employer-profile';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register implements OnInit {
  showPassword: boolean = false;

  user: User = {
    username: '',
    password: '',
    email: '',
    role: 'JOB_SEEKER'
  };

 jobSeeker: JobSeeker = {
  fullName: '',
  email: '',
  phone: '',
  education: '',
  skills: ''
};

employer: EmployerProfile = {
  companyName: '',
  companyWebsite: '',
  contactEmail: ''
};

  message: string = '';

  constructor(
    private authService: AuthService,
  
    private route:Router
  ) {}

  register() {
    this.authService.addUser(this.user).subscribe({
      next: (createdUser) => {
        if (this.user.role === 'JOB_SEEKER') {
          this.jobSeeker.profileId = createdUser.userId!;
          this.authService.addJobSeeker(this.jobSeeker).subscribe({
            next: () => {
              this.message = 'Job Seeker registered successfully!';
              alert(this.message);
              this.route.navigate(["AuthDashboard/login"]);
              
            },
            error: () => {this.message = 'Failed to register job seeker.';alert(this.message)}
          });
        } else if (this.user.role === 'EMPLOYER') {
          this.employer.employerId = createdUser.userId!;
          this.authService.addEmployer(this.employer).subscribe({
            next: () => {this.message = 'Employer registered successfully!';alert(this.message);this.route.navigate(["AuthDashboard/login"]);},
            error: () => {this.message = 'Failed to register employer.';alert(this.message)}
          });
        }
      },
      error: () => this.message = 'User registration failed.'
    });
  }


  strengthPercent = 0;            // 0‑100
strengthLabel  = '';            // Weak / Medium / …
strengthClass  = '';            // CSS class for colour

// individual requirement flags
  reqLen     = false; reqUpper   = false; reqLower   = false; reqNumber  = false; reqSpecial = false;  showReqs = false; 

private scorePassword(pw: string): number {
  let score = 0;
  if (pw.length >= 8)                   score += 1, this.reqLen = true;     else this.reqLen = false;
  if (/[A-Z]/.test(pw))                 score += 1, this.reqUpper = true;   else this.reqUpper = false;
  if (/[a-z]/.test(pw))                 score += 1, this.reqLower = true;   else this.reqLower = false;
  if (/\d/.test(pw))                    score += 1, this.reqNumber = true;  else this.reqNumber = false;
  if (/[^A-Za-z0-9]/.test(pw))          score += 1, this.reqSpecial = true; else this.reqSpecial = false;
  return score;   // 0 – 5
}

evaluatePassword(): void {
  const pw = this.user.password || '';
  const score = this.scorePassword(pw);

  // map score ➜ percent + label/colour
  const map = [
    { pct:  0, lbl: '',            cls: ''           },
    { pct: 20, lbl: 'Weak',        cls: 'weak'       },
    { pct: 40, lbl: 'Fair',        cls: 'fair'       },
    { pct: 60, lbl: 'Medium',      cls: 'medium'     },
    { pct: 80, lbl: 'Strong',      cls: 'strong'     },
    { pct:100, lbl: 'Very Strong', cls: 'vstrong'    }
  ];
  const m = map[score];
  this.strengthPercent = m.pct;
  this.strengthLabel   = m.lbl;
  this.strengthClass   = m.cls;
}

ngOnInit() {
  document.addEventListener('click', e => {
    if (!(e.target as HTMLElement).closest('.pw-wrapper')) {
      this.showReqs = false;
    }
  });
}


}


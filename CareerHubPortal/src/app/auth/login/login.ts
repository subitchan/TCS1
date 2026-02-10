import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 onSubmit(): void {
  if (this.loginForm.invalid) return;

  const username = this.loginForm.value.username;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      this.authService.setToken(res.token);
      this.authService.setUserRole(res.role);

      // ✅ Store username for later
      localStorage.setItem('username', username);

      if (res.role === 'JOB_SEEKER') {
       // alert("job");
        this.router.navigate(['jobSeeker/dashboard']);
      } else if (res.role === 'EMPLOYER') {
        this.router.navigate(['employer/dashboard']);
      }
    },
    error: (err) => {
      console.error('Login failed', err);
      alert('Invalid username or password');
    }
  });
}

showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

}

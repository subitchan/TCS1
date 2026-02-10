import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JobSeekerService } from '../../service/job-seeker';
import { UserService } from '../../service/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-me',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './update-me.html',
  styleUrl: './update-me.css'
})
export class UpdateMe implements OnInit {
  profileForm: FormGroup;
  userId!: number;
  username!: string;

  constructor(
    private fb: FormBuilder,
    private jobSeekerService: JobSeekerService,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      education: ['', Validators.required],
      skills: ['']
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';
    this.userService.getUserIdByUsername(this.username).subscribe(id => {
      this.userId = id;
      this.jobSeekerService.getJobSeekerById(this.userId).subscribe(profile => {
        this.profileForm.patchValue(profile);
      });
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    this.jobSeekerService.updateJobSeeker(this.userId, this.profileForm.value).subscribe({
      next: () => alert("Profile updated successfully!"),
      error: err => console.error('Update failed:', err)
    });
  }

  addCommaToSkills(event: Event): void {
    event.preventDefault();
    const keyboardEvent = event as KeyboardEvent;
    const control = this.profileForm.get('skills');
    if (!control) return;

    const value = (control.value || '').trim();
    if (value && !value.endsWith(',')) {
      control.setValue(value + ', ');
    }
  }
}

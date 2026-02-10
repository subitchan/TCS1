import { Component, OnInit } from '@angular/core';
import { EmployerProfile } from '../../classes/employer-profile';
import { EmployerProfileService } from '../../service/employer-profile';
import { UserService } from '../../service/user';
import { FormBuilder, FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-me',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-me.html',
  styleUrls: ['./update-me.css']
})
export class EmployerUpdateMe implements OnInit {
  username: string = '';
  employerId!: number;
  employerForm!: FormGroup;

  constructor(
    private employerService: EmployerProfileService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';

    // Initialize form with validators
  this.employerForm = this.fb.group({
  companyName: ['', Validators.required],
  companyWebsite: ['', Validators.required],
  contactEmail: ['', [Validators.required, Validators.email]]
});


    // Get employer ID from username and fetch profile
    this.userService.getUserIdByUsername(this.username).subscribe(id => {
      this.employerId = id;

       this.employerService.getEmployerById(this.employerId).subscribe(profile => {
        this.employerForm.patchValue(profile);
      });
    
    });
  }

  updateProfile(): void {
    if (this.employerForm.invalid) return;

    const updatedProfile: EmployerProfile = this.employerForm.value;

    this.employerService.updateEmployer(this.employerId, updatedProfile).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: err => {
        alert('Error updating profile');
        console.error(err);
      }
    });
  }
}

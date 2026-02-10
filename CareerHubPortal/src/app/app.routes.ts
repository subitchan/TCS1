import { Routes } from '@angular/router';
import { JobSeekerDashboardComponent } from './jobSeeker/dashboard/dashboard';
import { LoginComponent } from './auth/login/login';
import { ViewMe } from './jobSeeker/view-me/view-me';
import { UpdateMe } from './jobSeeker/update-me/update-me';
import { ApplyJobs } from './jobSeeker/apply-jobs/apply-jobs'; // ⬅️ Import this
import { EmployerDashboard } from './employer/dashboard/dashboard';
import { EmployerViewMe } from './employer/view-me/view-me';
import { EmployerUpdateMe } from './employer/update-me/update-me';
import { PostJob } from './employer/post-job/post-job';
import { ApplyForJob } from './jobSeeker/apply-for-job/apply-for-job';
import { MyApplications } from './jobSeeker/my-applications/my-applications';
import { EmployerApplications } from './employer/employer-applications/employer-applications';
import { AuthDashboard } from './auth/dashboard/dashboard';
import { Register } from './auth/register/register';
import { CareerChatbotComponent } from './jobSeeker/career-chatbot-component/career-chatbot-component';


export const routes: Routes = [
  { path: '', redirectTo: 'AuthDashboard', pathMatch: 'full' },
  { path: 'AuthDashboard', component: AuthDashboard, 
    children:[
      { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
    { path: 'register', component: Register, data: { animation: 'RegisterPage' } }
    ]
  },
  {
    path: 'jobSeeker/dashboard',
    component: JobSeekerDashboardComponent,
    children: [
      { path: 'view-me', component: ViewMe },
      { path: 'update-me', component: UpdateMe },
      { path: 'apply-jobs', component: ApplyJobs },
      { path: 'my-applications', component: MyApplications },
      { path: 'ai-chat', component: CareerChatbotComponent }
    ]
  },

  {
  path: 'employer/dashboard',
  component: EmployerDashboard,
  children: [
    { path: 'view-me', component: EmployerViewMe },
    { path: 'update-me', component: EmployerUpdateMe },
    { path: 'post-job', component: PostJob},
    {path: 'employer-applications',component:EmployerApplications}
  ]
  },
  { path: 'jobSeeker/apply/:jobId', component: ApplyForJob}
];

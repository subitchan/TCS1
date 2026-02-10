import { EmployerProfile } from "./employer-profile";

export class JobListing {
  jobId!: number;
  jobTitle!: string;
  jobDescription!: string;
  location!: string;
  salaryRange!: string;
  skillsRequired!: string;
  employer!: EmployerProfile; // nested object

  isRemote(): boolean {
    return this.location?.toLowerCase() === 'remote';
  }
}

import { JobListing } from "./job-listing";
import { JobSeeker } from "./job-seeker";
import { Resume } from "./resume";

export class JobApplication {
     applicationId?: number;
   job!: JobListing;
  resume!: Resume;
  jobSeeker!: JobSeeker;
  applicationStatus?: string;
}

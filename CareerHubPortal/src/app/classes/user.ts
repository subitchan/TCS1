export class User {
  userId?: number;              // Optional for new user creation
  username!: string;
  password!: string;
  email!: string;
  role!: 'JOB_SEEKER' | 'EMPLOYER';
}
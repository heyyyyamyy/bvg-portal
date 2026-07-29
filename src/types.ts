export type ApplicationStage = 
  | 'Application Submitted'
  | 'HR Screening'
  | 'Technical Round 1'
  | 'Technical Round 2'
  | 'Salary Discussion'
  | 'Appointment Letter'
  | 'Background Verification Started'
  | 'Background Verification Completed'
  | 'Offer Letter Released'
  | 'Onboarding'
  | 'Joined';

export const APPLICATION_STAGES: ApplicationStage[] = [
  'Application Submitted',
  'HR Screening',
  'Technical Round 1',
  'Technical Round 2',
  'Salary Discussion',
  'Appointment Letter',
  'Background Verification Started',
  'Background Verification Completed',
  'Offer Letter Released',
  'Onboarding',
  'Joined'
];

export interface Candidate {
  id: string;
  name: string;
  email: string;
  mobile: string;
  totalExperience: string;
  currentDesignation: string;
  currentDepartment: string;
  currentSalary: string;
  currentLocation: string;
  designationAppliedFor: string;
  offeredDepartment: string;
  salaryOffered: string;
  expectedLocation: string;
  
  currentStage: ApplicationStage;
  remarks: string;
  
  username?: string;
  password?: string;
  
  createdAt: string;
}

export interface User {
  id: string;
  role: 'admin' | 'candidate';
  username: string;
  candidateId?: string;
}

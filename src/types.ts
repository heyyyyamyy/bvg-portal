export type ApplicationStage = 
  | 'Level 1 Screening'
  | 'Level 2 Technical Interview'
  | 'Salary Discussion'
  | 'Appointment Letter Issued'
  | 'Background Verification In Progress'
  | 'Background Verification Completed'
  | 'Offer Letter Issued'
  | 'Onboarding'
  | 'Joined';

export const APPLICATION_STAGES: ApplicationStage[] = [
  'Level 1 Screening',
  'Level 2 Technical Interview',
  'Salary Discussion',
  'Appointment Letter Issued',
  'Background Verification In Progress',
  'Background Verification Completed',
  'Offer Letter Issued',
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

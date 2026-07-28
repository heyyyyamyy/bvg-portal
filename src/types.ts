export type CheckStatus = 'Pending' | 'In Progress' | 'Verified' | 'Rejected';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joiningDate: string;
  employmentHistoryStatus: CheckStatus;
  criminalBackgroundStatus: CheckStatus;
  overallStatus: CheckStatus;
  createdAt: string;
}

export interface User {
  id: string;
  role: 'admin' | 'candidate';
  email: string;
  candidateId?: string; // If role is candidate, links to their data
}

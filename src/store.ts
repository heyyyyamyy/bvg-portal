import { Candidate } from './types';

const STORAGE_KEY = 'ats_candidates';

const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    mobile: '555-0101',
    totalExperience: '5 years',
    currentDesignation: 'Software Engineer',
    currentDepartment: 'Engineering',
    currentSalary: '$90,000',
    currentLocation: 'New York',
    designationAppliedFor: 'Senior Software Engineer',
    offeredDepartment: 'Engineering',
    salaryOffered: '$120,000',
    expectedLocation: 'New York',
    currentStage: 'Offer Letter Issued',
    remarks: 'Strong technical skills.',
    username: 'alice.smith',
    password: 'password123',
    createdAt: new Date().toISOString(),
  }
];

export const getCandidates = (): Candidate[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCandidates));
    return initialCandidates;
  }
  return JSON.parse(data);
};

export const saveCandidates = (candidates: Candidate[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

export const addCandidate = (candidate: Omit<Candidate, 'id' | 'createdAt'>) => {
  const candidates = getCandidates();
  const newCandidate: Candidate = {
    ...candidate,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  saveCandidates([...candidates, newCandidate]);
  return newCandidate;
};

export const updateCandidate = (id: string, updates: Partial<Candidate>) => {
  const candidates = getCandidates();
  const updatedCandidates = candidates.map(c => 
    c.id === id ? { ...c, ...updates } : c
  );
  saveCandidates(updatedCandidates);
};

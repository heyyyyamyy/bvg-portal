import { Candidate } from './types';

const STORAGE_KEY = 'bg_verification_candidates';

const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '555-0101',
    address: '123 Main St, Anytown',
    joiningDate: '2026-08-15',
    employmentHistoryStatus: 'Verified',
    criminalBackgroundStatus: 'Pending',
    overallStatus: 'In Progress',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Bob Jones',
    email: 'bob@example.com',
    phone: '555-0102',
    address: '456 Oak Ave, Somewhere',
    joiningDate: '2026-09-01',
    employmentHistoryStatus: 'Pending',
    criminalBackgroundStatus: 'Pending',
    overallStatus: 'Pending',
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

import React, { useState } from 'react';
import { User, Candidate } from '../types';
import { getCandidates } from '../store';
import { Shield, User as UserIcon } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<'admin' | 'candidate'>('admin');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'admin') {
      onLogin({ id: 'admin-1', role: 'admin', email: 'admin@portal.com' });
    } else {
      const candidates = getCandidates();
      const candidate = candidates.find(c => c.email === candidateEmail);
      if (candidate) {
        onLogin({ id: `user-${candidate.id}`, role: 'candidate', email: candidate.email, candidateId: candidate.id });
      } else {
        setError('Candidate not found with this email.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xl">
            V
          </div>
        </div>
        
        <h1 className="text-xl font-bold tracking-tight text-center text-slate-800 uppercase mb-2">
          VeriTrust Portal
        </h1>
        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase text-center mb-8">
          Sign in to access your dashboard
        </p>

        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
              role === 'admin' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => setRole('candidate')}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
              role === 'candidate' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Candidate
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {role === 'candidate' && (
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="candidate@example.com"
                  required
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2.5 rounded shadow-sm font-semibold hover:bg-slate-800 transition-colors uppercase tracking-wider text-sm mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

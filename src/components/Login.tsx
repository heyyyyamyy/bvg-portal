import React, { useState } from 'react';
import { User, Candidate } from '../types';
import { getCandidates } from '../store';
import { Shield, User as UserIcon, Lock, ArrowRight, Building2, Briefcase } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<'admin' | 'candidate'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        onLogin({ id: 'admin-1', role: 'admin', username: 'admin' });
      } else {
        setError('Invalid admin credentials.');
      }
    } else {
      const candidates = getCandidates();
      const candidate = candidates.find(c => c.username === username && c.password === password);
      if (candidate) {
        onLogin({ id: `user-${candidate.id}`, role: 'candidate', username: candidate.username!, candidateId: candidate.id });
      } else {
        setError('Invalid username or password.');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-background font-sans overflow-hidden">
      {/* Left Side - Brand & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar relative flex-col justify-between p-12 overflow-hidden text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Abstract corporate shapes */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-corporate-navy blur-[100px] opacity-70 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-royal-blue blur-[120px] opacity-40"></div>
          
          <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-white/5 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-96 h-96 border border-white/5 rounded-full"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">Kiewit Corporation</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold mt-0.5">Enterprise ATS</p>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-blue-200 mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            Next-Generation Recruitment
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Discover and hire the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-electric-cyan">world's top talent.</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Welcome to the centralized hub for enterprise recruitment, talent acquisition, and corporate onboarding.
          </p>
        </div>
        
        <div className="relative z-10 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Kiewit Corporation. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface relative">
        {/* Mobile Header */}
        <div className="absolute top-8 left-8 flex items-center gap-3 lg:hidden">
          <div className="w-10 h-10 bg-sidebar rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary uppercase">Kiewit Corporation</h1>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold">Enterprise ATS</p>
          </div>
        </div>

        <div className="w-full max-w-[420px] space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-2">Welcome Back</h2>
            <p className="text-text-secondary">Please enter your credentials to continue.</p>
          </div>

          <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => { setRole('admin'); setUsername(''); setPassword(''); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                role === 'admin' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Admin Portal
            </button>
            <button
              type="button"
              onClick={() => { setRole('candidate'); setUsername(''); setPassword(''); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                role === 'candidate' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Candidate Portal
            </button>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-danger shrink-0"></div>
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-text-primary placeholder:text-slate-400 focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition-all sm:text-sm"
                    placeholder={role === 'admin' ? "admin" : "Enter your username"}
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-[10px] font-bold uppercase tracking-wider text-royal-blue hover:text-corporate-navy transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-text-primary placeholder:text-slate-400 focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition-all sm:text-sm"
                    placeholder={role === 'admin' ? "admin123" : "Enter your password"}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-border text-royal-blue focus:ring-royal-blue"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                Remember my device
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-sidebar hover:bg-corporate-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sidebar transition-colors"
            >
              Sign In Securely
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-[10px] uppercase tracking-wider font-bold text-text-secondary text-center leading-relaxed">
              Protected by Enterprise Single Sign-On (SSO). <br />
              For assistance, contact IT Support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

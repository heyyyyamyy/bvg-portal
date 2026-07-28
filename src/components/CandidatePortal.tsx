import React, { useState, useEffect } from 'react';
import { Candidate } from '../types';
import { getCandidates } from '../store';
import { StatusBadge } from './StatusBadge';
import { LogOut, Calendar, MapPin, Mail, Phone, Briefcase, ShieldAlert, FileCheck, CheckCircle2, Clock, FileText, ChevronRight, Activity, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { format } from 'date-fns';

export function CandidatePortal({ candidateId, onLogout }: { candidateId: string, onLogout: () => void }) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const candidates = getCandidates();
    setCandidate(candidates.find(c => c.id === candidateId) || null);
  }, [candidateId]);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-medium text-white">Candidate not found</h2>
          <button onClick={onLogout} className="mt-4 text-blue-400 hover:underline">Return to login</button>
        </div>
      </div>
    );
  }

  let progressPercentage = 0;
  if (candidate.overallStatus === 'Verified') progressPercentage = 100;
  else if (candidate.overallStatus === 'Rejected') progressPercentage = 100;
  else if (candidate.overallStatus === 'In Progress') progressPercentage = 50;
  else progressPercentage = 15;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
      <header className="bg-slate-900 border-b border-white/10 sticky top-0 z-10 shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-slate-900 font-bold text-lg">V</div>
            <h1 className="text-sm font-bold tracking-widest uppercase text-white/90">Candidate Portal</h1>
          </div>
          <button 
            onClick={onLogout}
            className="text-white/50 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8 flex flex-col">
        
        {/* Progress Tracker Section */}
        <div className="bg-slate-800/50 rounded-xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
              <div>
                <p className="text-[10px] font-bold text-blue-400 mb-2 uppercase tracking-widest">Onboarding Progress</p>
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  Welcome back, {candidate.name.split(' ')[0]}
                </h2>
                <p className="text-white/60 text-sm max-w-lg">
                  Your background verification is currently <strong className="text-white font-medium">{candidate.overallStatus.toLowerCase()}</strong>. Please review any action items below.
                </p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-900/80 rounded border border-white/5 shadow-inner">
                <span className="text-[10px] font-bold text-white/50 uppercase">Overall Status</span>
                <StatusBadge status={candidate.overallStatus} className="text-xs px-3 py-1.5" />
              </div>
            </div>

            {/* Stepper */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -translate-y-1/2 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000 ease-in-out" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              
              <div className="relative flex justify-between">
                {[
                  { label: 'Information Submitted', active: progressPercentage >= 15 },
                  { label: 'Verification In Progress', active: progressPercentage >= 50 },
                  { label: 'Final Review & Cleared', active: progressPercentage === 100 }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-slate-900 z-10 transition-colors ${step.active ? 'bg-blue-500 text-white' : 'bg-slate-700 text-white/30'}`}>
                      {step.active ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current"></div>}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider text-center max-w-[120px] ${step.active ? 'text-white' : 'text-white/40'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Details & Documents Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-800/50 rounded-xl border border-white/10 p-6 shadow-xl">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-400" />
                Your Profile Details
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white/90">{candidate.email}</div>
                    <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Email Address</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white/90">{candidate.phone}</div>
                    <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Phone Number</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white/90 leading-tight">{candidate.address}</div>
                    <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider mt-1">Current Address</div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-900 p-4 rounded border border-white/5 mt-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Target Start Date</p>
                    <p className="text-lg font-bold tabular-nums text-blue-400 mt-0.5">
                      {format(new Date(candidate.joiningDate), 'MMM dd, yyyy').toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Calendar className="w-6 h-6 text-white/10" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-900/50 border border-dashed border-white/10 rounded text-center">
                <p className="text-[10px] font-bold tracking-wide text-white/50 uppercase">Profile managed by HR</p>
                <p className="text-[10px] text-white/30 mt-1">Contact your admin to request changes.</p>
              </div>
            </div>

            {/* Mock Documents Section */}
            <div className="bg-slate-800/50 rounded-xl border border-white/10 p-6 shadow-xl">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Submitted Documents
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-white/5 group hover:border-white/10 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/80">Government ID</p>
                      <p className="text-[10px] text-white/40 font-medium">Verified • PDF</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-white/5 group hover:border-white/10 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/80">Offer Letter Signed</p>
                      <p className="text-[10px] text-white/40 font-medium">Verified • PDF</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Status Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800/50 rounded-xl border border-white/10 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Verification Checklist</h3>
                <span className="text-[10px] font-bold bg-slate-900 text-white/60 px-2 py-1 rounded border border-white/5 uppercase">Mandatory Checks</span>
              </div>
              
              <div className="space-y-4">
                
                {/* Employment Check Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-lg border border-white/5 bg-slate-900/50 hover:bg-slate-900 transition-colors">
                  <div className={`p-3 rounded-lg shrink-0 ${candidate.employmentHistoryStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : candidate.employmentHistoryStatus === 'In Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-white/90 tracking-wide">Employment History</h4>
                      <StatusBadge status={candidate.employmentHistoryStatus} />
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Verifying past employment details, roles, and dates with provided references. HR will contact your previous employers.
                    </p>
                  </div>
                </div>

                {/* Criminal Check Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-lg border border-white/5 bg-slate-900/50 hover:bg-slate-900 transition-colors">
                  <div className={`p-3 rounded-lg shrink-0 ${candidate.criminalBackgroundStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : candidate.criminalBackgroundStatus === 'In Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-white/90 tracking-wide">Criminal Background</h4>
                      <StatusBadge status={candidate.criminalBackgroundStatus} />
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Conducting standard criminal record checks across relevant jurisdictions. This process typically takes 3-5 business days.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Recent Activity Mock */}
            <div className="bg-slate-800/50 rounded-xl border border-white/10 p-6 shadow-xl">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                Recent Activity
              </h3>
              
              <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-white/10">
                <div className="relative">
                  <div className="absolute -left-6 w-4 h-4 bg-slate-900 border-2 border-purple-500 rounded-full"></div>
                  <p className="text-xs font-bold text-white/90">Verification Started</p>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{format(new Date(candidate.createdAt), 'MMM dd, yyyy • HH:mm')}</p>
                </div>
                
                {progressPercentage >= 50 && (
                  <div className="relative">
                    <div className="absolute -left-6 w-4 h-4 bg-slate-900 border-2 border-blue-500 rounded-full"></div>
                    <p className="text-xs font-bold text-white/90">Processing Checks</p>
                    <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">In Progress</p>
                  </div>
                )}

                {progressPercentage === 100 && (
                  <div className="relative">
                    <div className="absolute -left-6 w-4 h-4 bg-slate-900 border-2 border-emerald-500 rounded-full"></div>
                    <p className="text-xs font-bold text-white/90">Verification Complete</p>
                    <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">Cleared for Onboarding</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

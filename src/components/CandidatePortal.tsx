import React, { useEffect, useState } from 'react';
import { Candidate, APPLICATION_STAGES } from '../types';
import { getCandidates } from '../store';
import { LogOut, CheckCircle2, Circle, User, Briefcase, FileText, Phone, Mail, MapPin } from 'lucide-react';

export function CandidatePortal({ candidateId, onLogout }: { candidateId: string, onLogout: () => void }) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [activeTab, setActiveTab] = useState<'journey' | 'profile'>('journey');

  useEffect(() => {
    const candidates = getCandidates();
    const found = candidates.find(c => c.id === candidateId);
    setCandidate(found || null);
  }, [candidateId]);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-medium text-slate-900">Candidate not found</h2>
          <button onClick={onLogout} className="mt-4 text-blue-600 hover:underline">Return to login</button>
        </div>
      </div>
    );
  }

  const currentStageIndex = APPLICATION_STAGES.indexOf(candidate.currentStage);
  
  const progressPercentage = Math.max(5, Math.min(100, Math.round((currentStageIndex / (APPLICATION_STAGES.length - 1)) * 100)));

  const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value || '-'}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xl">K</div>
            <div>
              <h1 className="text-sm font-bold tracking-tight uppercase leading-tight text-slate-900">Kiewit Corporation</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase leading-tight">Candidate Dashboard</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="text-slate-500 hover:text-slate-900 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 md:py-12 flex flex-col gap-8">
        
        {/* Welcome Banner */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Welcome back, {candidate.name.split(' ')[0]}!
            </h2>
            <p className="text-slate-300 max-w-xl text-sm md:text-base">
              Track your application progress for the <strong className="text-white font-semibold">{candidate.designationAppliedFor}</strong> position. Your profile details are securely managed by HR.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full font-bold text-sm border border-white/20 shadow-sm backdrop-blur-sm">
              <span className="text-[10px] text-slate-300 uppercase tracking-widest mr-2">Current Status:</span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              {candidate.currentStage}
            </div>
          </div>
        </div>

        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-6 py-4 text-sm font-bold tracking-widest uppercase transition-colors border-b-2 ${
              activeTab === 'journey'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Application Journey
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-4 text-sm font-bold tracking-widest uppercase transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            My Profile Details
          </button>
        </div>

        <div>
          {activeTab === 'journey' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Application Journey</h3>
                
                <div className="relative max-w-md ml-4">
                  {/* Vertical line connecting steps */}
                  <div className="absolute top-4 bottom-4 left-[19px] w-0.5 bg-slate-100"></div>
                  
                  {/* Active progress line */}
                  <div 
                    className="absolute top-4 left-[19px] w-0.5 bg-slate-900 transition-all duration-1000"
                    style={{ height: `calc(${progressPercentage}% - 2rem)` }}
                  ></div>

                  <div className="space-y-8 relative z-10">
                    {APPLICATION_STAGES.map((stage, index) => {
                      const isCompleted = index < currentStageIndex;
                      const isCurrent = index === currentStageIndex;
                      const isPending = index > currentStageIndex;
                      
                      let iconColor = 'text-slate-300 bg-white border-slate-200';
                      if (isCompleted) iconColor = 'text-white bg-slate-900 border-slate-900';
                      if (isCurrent) iconColor = 'text-slate-900 bg-white border-slate-900 ring-4 ring-slate-100';

                      return (
                        <div key={stage} className={`flex items-start gap-5 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${iconColor}`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : (isCurrent ? <Circle className="w-3 h-3 fill-current" /> : <div className="w-2 h-2 rounded-full bg-slate-300"></div>)}
                          </div>
                          <div>
                            <p className={`font-bold ${isCurrent ? 'text-slate-900 text-lg' : (isCompleted ? 'text-slate-700 text-base' : 'text-slate-500 text-base')}`}>
                              {stage}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-blue-600 mt-1 font-bold uppercase tracking-wider">Currently In Progress</p>
                            )}
                            {isCompleted && (
                              <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">Completed</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard icon={User} title="Personal Details">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xl">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{candidate.name}</p>
                    <p className="text-xs text-slate-500">{candidate.email}</p>
                  </div>
                </div>
                <div className="grid gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <InfoItem label="Mobile Number" value={candidate.mobile} />
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <InfoItem label="Current Location" value={candidate.currentLocation} />
                  </div>
                </div>
              </InfoCard>

              <InfoCard icon={Briefcase} title="Professional Profile">
                <div className="grid gap-4">
                  <InfoItem label="Total Experience" value={candidate.totalExperience} />
                  <InfoItem label="Current Designation" value={candidate.currentDesignation} />
                  <InfoItem label="Current Department" value={candidate.currentDepartment} />
                </div>
              </InfoCard>

              <InfoCard icon={FileText} title="Application Details">
                <div className="grid gap-4">
                  <InfoItem label="Designation Applied For" value={candidate.designationAppliedFor} />
                  <InfoItem label="Offered Department" value={candidate.offeredDepartment} />
                  <InfoItem label="Expected Location" value={candidate.expectedLocation} />
                  <InfoItem label="Salary Offered" value={candidate.salaryOffered} />
                </div>
                
                <div className="bg-slate-100 rounded-lg p-4 mt-6 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Need to update your details?</p>
                  <p className="text-xs text-slate-600 mt-1">Please contact your HR administrator.</p>
                </div>
              </InfoCard>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Candidate, APPLICATION_STAGES } from '../types';
import { getCandidates } from '../store';
import { LogOut, CheckCircle2, Circle, User, Briefcase, FileText, Phone, Mail, MapPin, Building2 } from 'lucide-react';

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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-medium text-text-primary">Candidate not found</h2>
          <button onClick={onLogout} className="mt-4 text-royal-blue hover:underline font-medium">Return to login</button>
        </div>
      </div>
    );
  }

  const currentStageIndex = APPLICATION_STAGES.indexOf(candidate.currentStage);
  const progressPercentage = Math.max(5, Math.min(100, Math.round((currentStageIndex / (APPLICATION_STAGES.length - 1)) * 100)));

  const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="bg-surface rounded-2xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div>
      <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm font-semibold text-text-primary">{value || '-'}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <header className="bg-sidebar border-b border-sidebar shrink-0 sticky top-0 z-50 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight uppercase leading-tight text-white">Kiewit Corporation</h1>
              <p className="text-[10px] text-blue-200 font-bold tracking-widest uppercase leading-tight mt-0.5">Candidate Portal</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="text-blue-200 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
        
        {/* Welcome Banner */}
        <div className="bg-surface rounded-3xl p-10 md:p-12 shadow-sm border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <p className="text-sm font-bold text-royal-blue uppercase tracking-widest mb-2">Welcome Back</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-text-primary">
              Hello, {candidate.name.split(' ')[0]}
            </h2>
            <p className="text-text-secondary max-w-xl text-base leading-relaxed">
              Your recruitment journey for <strong className="text-text-primary font-semibold">{candidate.designationAppliedFor}</strong> is progressing. View your application status and updates below.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-royal-blue/10 text-royal-blue rounded-full font-bold text-sm border border-royal-blue/20">
                <span className="text-[10px] uppercase tracking-widest text-corporate-navy opacity-70">Stage:</span>
                <span className="w-2 h-2 rounded-full bg-royal-blue animate-pulse"></span>
                {candidate.currentStage}
              </div>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-surface border border-border text-text-secondary rounded-full font-bold text-sm shadow-sm">
                <span className="text-[10px] uppercase tracking-widest opacity-70">Expected Completion:</span>
                3-5 Business Days
              </div>
            </div>
          </div>
        </div>

        <div className="flex border-b border-border mt-4 mb-4">
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors border-b-2 ${
              activeTab === 'journey'
                ? 'border-royal-blue text-royal-blue'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
            }`}
          >
            Application Journey
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-royal-blue text-royal-blue'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
            }`}
          >
            My Profile Details
          </button>
        </div>

        <div>
          {activeTab === 'journey' && (
            <div className="max-w-2xl">
              <div className="bg-surface rounded-2xl border border-border p-8 shadow-sm">
                <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-8">Application Journey</h3>
                
                <div className="relative max-w-md ml-4">
                  {/* Vertical line connecting steps */}
                  <div className="absolute top-4 bottom-4 left-[19px] w-0.5 bg-border"></div>
                  
                  {/* Active progress line */}
                  <div 
                    className="absolute top-4 left-[19px] w-0.5 bg-royal-blue transition-all duration-1000"
                    style={{ height: `calc(${progressPercentage}% - 2rem)` }}
                  ></div>

                  <div className="space-y-8 relative z-10">
                    {APPLICATION_STAGES.map((stage, index) => {
                      const isCompleted = index < currentStageIndex;
                      const isCurrent = index === currentStageIndex;
                      const isPending = index > currentStageIndex;
                      
                      let iconColor = 'text-slate-300 bg-surface border-border';
                      if (isCompleted) iconColor = 'text-white bg-success border-success';
                      if (isCurrent) iconColor = 'text-royal-blue bg-surface border-royal-blue ring-4 ring-blue-50';

                      return (
                        <div key={stage} className={`flex items-start gap-5 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${iconColor}`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : (isCurrent ? <Circle className="w-3 h-3 fill-current" /> : <div className="w-2 h-2 rounded-full bg-border"></div>)}
                          </div>
                          <div>
                            <p className={`font-bold ${isCurrent ? 'text-text-primary text-lg' : (isCompleted ? 'text-text-primary text-base' : 'text-text-secondary text-base')}`}>
                              {stage}
                            </p>
                            {isCurrent && (
                              <p className="text-[10px] text-royal-blue mt-1 font-bold uppercase tracking-wider">Currently In Progress</p>
                            )}
                            {isCompleted && (
                              <p className="text-[10px] text-success mt-1 font-bold uppercase tracking-wider">Completed</p>
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
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-text-secondary font-bold text-xl border border-border">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{candidate.name}</p>
                    <p className="text-xs text-text-secondary">{candidate.email}</p>
                  </div>
                </div>
                <div className="grid gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-text-secondary mt-0.5 shrink-0" />
                    <InfoItem label="Mobile Number" value={candidate.mobile} />
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-text-secondary mt-0.5 shrink-0" />
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
                
                <div className="bg-background rounded-xl p-4 mt-6 text-center border border-border">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Need to update your details?</p>
                  <p className="text-xs text-text-secondary mt-1">Please contact your HR administrator.</p>
                </div>
              </InfoCard>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

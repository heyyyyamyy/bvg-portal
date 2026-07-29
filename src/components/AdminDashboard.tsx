import React, { useState, useEffect } from 'react';
import { Candidate, APPLICATION_STAGES, ApplicationStage } from '../types';
import { getCandidates, addCandidate, updateCandidate } from '../store';
import { Search, Plus, UserPlus, X, LogOut, Edit2, LayoutDashboard, Users, Settings, Building2, ChevronRight, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState('overview');

  useEffect(() => {
    setCandidates(getCandidates());
  }, []);

  const refresh = () => setCandidates(getCandidates());

  const filtered = candidates.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCandidates = candidates.filter(c => c.currentStage !== 'Joined' && c.currentStage !== 'Application Submitted').length;
  const offersPending = candidates.filter(c => c.currentStage === 'Offer Letter Released').length;
  const bgvProgress = candidates.filter(c => c.currentStage === 'Background Verification Started').length;

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar/90 hidden lg:flex flex-col shrink-0 text-white shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shadow-sm">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight uppercase leading-tight text-white">Kiewit Corp</h1>
            <p className="text-[10px] text-blue-200 font-bold tracking-widest uppercase mt-0.5">Enterprise ATS</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveMenu('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeMenu === 'overview' 
                ? 'bg-corporate-navy text-white border border-blue-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Executive Overview
          </button>
          <button 
            onClick={() => setActiveMenu('candidates')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeMenu === 'candidates' 
                ? 'bg-corporate-navy text-white border border-blue-400/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            Candidate Directory
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 mb-4">
            <div className="w-8 h-8 rounded-full bg-royal-blue flex items-center justify-center text-xs font-bold shadow-sm text-white">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Admin User</p>
              <p className="text-[10px] text-blue-200 uppercase tracking-wider truncate">HR Administrator</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-surface border-b border-border shrink-0 sticky top-0 z-10 shadow-sm h-[72px] flex items-center">
          <div className="w-full px-4 sm:px-8 flex items-center justify-between">
            <div className="lg:hidden flex items-center gap-3">
              <div className="w-8 h-8 bg-sidebar rounded-lg flex items-center justify-center text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <h1 className="text-sm font-bold tracking-tight text-text-primary uppercase">Kiewit Corp</h1>
            </div>
            
            <div className="hidden lg:flex items-center gap-2 text-sm text-text-secondary">
              <span className="font-medium">Dashboard</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="font-bold text-text-primary capitalize">{activeMenu.replace('-', ' ')}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Global search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-full text-sm focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none shadow-sm transition-all"
                />
              </div>
              <button className="lg:hidden p-2 text-slate-400 hover:text-text-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-8 bg-background">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-corporate-navy/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-4 h-4 text-corporate-navy" />
                  </div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Total Candidates</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-primary tracking-tight">{candidates.length}</p>
                </div>
              </div>
              
              <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-royal-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-4 h-4 text-royal-blue" />
                  </div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Active Pipeline</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-primary tracking-tight">{activeCandidates}</p>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-warning" />
                  </div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Offers Pending</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-primary tracking-tight">{offersPending}</p>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-electric-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="w-4 h-4 text-electric-cyan" />
                  </div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">BGV In Progress</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-primary tracking-tight">{bgvProgress}</p>
                </div>
              </div>
            </div>

            {/* Header for Table */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8 mb-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-text-primary">Enterprise Directory</h2>
                <p className="text-sm text-text-secondary mt-1">Manage and track candidate pipelines.</p>
              </div>
              <button
                onClick={() => setIsAdding(true)}
                className="px-5 py-2.5 bg-sidebar text-white font-bold rounded-xl shadow-sm hover:shadow-md text-xs uppercase tracking-wider hover:bg-corporate-navy transition-all flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Candidate
              </button>
            </div>

            {/* Data Grid */}
            <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="bg-background border-b border-border text-text-secondary font-bold text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Candidate Profile</th>
                      <th className="px-6 py-4">Position & Dept</th>
                      <th className="px-6 py-4">Current Stage</th>
                      <th className="px-6 py-4">Location & Exp</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-text-primary divide-y divide-slate-100/50">
                    {filtered.map(candidate => (
                      <tr key={candidate.id} className="hover:bg-blue-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-corporate-navy/5 border border-corporate-navy/10 flex items-center justify-center text-corporate-navy font-bold text-sm shrink-0">
                              {candidate.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-text-primary">{candidate.name}</div>
                              <div className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary mt-0.5">{candidate.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-text-primary">{candidate.designationAppliedFor}</div>
                          <div className="text-[10px] uppercase tracking-wider font-bold text-text-secondary mt-0.5">{candidate.offeredDepartment || 'Unassigned'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-background border border-border text-xs font-bold text-text-primary shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-royal-blue mr-2"></div>
                            {candidate.currentStage}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-text-primary">{candidate.expectedLocation || 'Remote'}</div>
                          <div className="text-[10px] uppercase tracking-wider font-bold text-text-secondary mt-0.5">{candidate.totalExperience} Exp</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setEditingId(candidate.id)}
                            className="p-2 text-slate-400 hover:text-royal-blue hover:bg-royal-blue/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-16 text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                            <Search className="w-6 h-6 text-slate-400" />
                          </div>
                          <p className="text-sm font-semibold text-text-primary">No candidates found.</p>
                          <p className="text-xs text-text-secondary mt-1">Try adjusting your search criteria.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isAdding && (
        <CandidateModal 
          onClose={() => setIsAdding(false)} 
          onSave={() => {
            setIsAdding(false);
            refresh();
          }} 
        />
      )}
      
      {editingId && (
        <CandidateModal
          candidate={candidates.find(c => c.id === editingId)}
          onClose={() => setEditingId(null)}
          onSave={() => {
            setEditingId(null);
            refresh();
          }}
        />
      )}
    </div>
  );
}

function CandidateModal({ candidate, onClose, onSave }: { candidate?: Candidate, onClose: () => void, onSave: () => void }) {
  const isEditing = !!candidate;
  
  const [formData, setFormData] = useState<Partial<Candidate>>(candidate || {
    name: '', email: '', mobile: '', totalExperience: '', currentDesignation: '',
    currentDepartment: '', currentSalary: '', currentLocation: '', designationAppliedFor: '',
    offeredDepartment: '', salaryOffered: '', expectedLocation: '',
    currentStage: 'Application Submitted', remarks: '', username: '', password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && candidate) {
      updateCandidate(candidate.id, formData);
    } else {
      addCandidate(formData as Omit<Candidate, 'id' | 'createdAt'>);
    }
    onSave();
  };

  const InputField = ({ label, field, type = 'text' }: { label: string, field: keyof Candidate, type?: string }) => (
    <div>
      <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1.5">{label}</label>
      <input 
        required={!['remarks', 'username', 'password'].includes(field as string)} 
        type={type} 
        value={formData[field] as string || ''} 
        onChange={e => setFormData({...formData, [field]: e.target.value})} 
        className="w-full p-2.5 bg-background border border-border rounded-lg text-sm text-text-primary focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition-all shadow-sm" 
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-sidebar/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl border border-border w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between shrink-0 bg-background">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest flex items-center gap-2">
            {isEditing ? 'Edit Candidate Profile' : 'New Candidate Profile'}
          </h3>
          <button onClick={onClose} className="p-2 -mr-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-border/50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-surface">
          <form id="candidate-form" onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h4 className="text-xs font-bold text-text-primary uppercase mb-4 pb-2 border-b border-border">Personal Info</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Full Name" field="name" />
                <InputField label="Email Address" field="email" type="email" />
                <InputField label="Mobile Number" field="mobile" type="tel" />
                <InputField label="Current Location" field="currentLocation" />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-text-primary uppercase mb-4 pb-2 border-b border-border">Professional Info</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Total Experience" field="totalExperience" />
                <InputField label="Current Designation" field="currentDesignation" />
                <InputField label="Current Department" field="currentDepartment" />
                <InputField label="Current Salary" field="currentSalary" />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-text-primary uppercase mb-4 pb-2 border-b border-border">Application Info</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Designation Applied For" field="designationAppliedFor" />
                <InputField label="Offered Department" field="offeredDepartment" />
                <InputField label="Expected Location" field="expectedLocation" />
                <InputField label="Salary Offered" field="salaryOffered" />
              </div>
            </div>

            {isEditing && (
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase mb-4 pb-2 border-b border-border">ATS Status & Login</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1.5">Current Stage</label>
                    <select 
                      value={formData.currentStage} 
                      onChange={e => setFormData({...formData, currentStage: e.target.value as ApplicationStage})}
                      className="w-full p-2.5 bg-background border border-border rounded-lg text-sm font-bold text-text-primary focus:ring-2 focus:ring-royal-blue outline-none shadow-sm"
                    >
                      {APPLICATION_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1.5">Admin Remarks (Internal)</label>
                    <textarea 
                      value={formData.remarks || ''} 
                      onChange={e => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full p-3 bg-background border border-border rounded-lg text-sm text-text-primary focus:ring-2 focus:ring-royal-blue outline-none resize-none shadow-sm"
                    />
                  </div>
                  <InputField label="Candidate Username (for Portal Login)" field="username" />
                  <InputField label="Candidate Password (for Portal Login)" field="password" />
                </div>
              </div>
            )}

            {!isEditing && (
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase mb-4 pb-2 border-b border-border">Initial Login Setup (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Candidate Username" field="username" />
                  <InputField label="Candidate Password" field="password" />
                </div>
                <p className="text-[10px] text-text-secondary mt-2">Credentials can also be generated during later stages of the recruitment process.</p>
              </div>
            )}
          </form>
        </div>

        <div className="px-6 py-5 bg-background border-t border-border flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary hover:bg-border/50 rounded-xl transition-all">Cancel</button>
          <button type="submit" form="candidate-form" className="px-6 py-2.5 bg-corporate-navy text-white rounded-xl shadow-sm text-xs font-bold uppercase tracking-wider hover:bg-sidebar transition-all hover:shadow-md">
            {isEditing ? 'Save Profile' : 'Create Candidate'}
          </button>
        </div>
      </div>
    </div>
  );
}

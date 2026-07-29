import React, { useState, useEffect } from 'react';
import { Candidate, APPLICATION_STAGES, ApplicationStage } from '../types';
import { getCandidates, addCandidate, updateCandidate } from '../store';
import { Search, Plus, UserPlus, X, LogOut, Edit2 } from 'lucide-react';

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setCandidates(getCandidates());
  }, []);

  const refresh = () => setCandidates(getCandidates());

  const filtered = candidates.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 shrink-0 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xl">K</div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-800 uppercase leading-tight">Kiewit Corporation</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase leading-tight">Admin Dashboard</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="text-slate-500 hover:text-slate-900 flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Candidates</p>
              <p className="text-3xl font-bold mt-1 text-slate-900">{candidates.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Process</p>
              <p className="text-3xl font-bold mt-1 text-slate-900">{candidates.filter(c => c.currentStage !== 'Joined').length}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Candidate Management</h2>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-slate-900 text-white font-bold rounded shadow-sm text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Candidate</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Role Applied For</th>
                  <th className="px-6 py-4">Current Stage</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                {filtered.map(candidate => (
                  <tr key={candidate.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{candidate.name}</div>
                      <div className="text-xs text-slate-500">{candidate.mobile} • {candidate.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{candidate.designationAppliedFor}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{candidate.totalExperience} exp</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">
                        {candidate.currentStage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setEditingId(candidate.id)}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-sm">
                      No candidates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

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
    currentStage: 'Level 1 Screening', remarks: '', username: '', password: ''
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
      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{label}</label>
      <input 
        required={!['remarks', 'username', 'password'].includes(field as string)} 
        type={type} 
        value={formData[field] as string || ''} 
        onChange={e => setFormData({...formData, [field]: e.target.value})} 
        className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 outline-none" 
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            {isEditing ? 'Edit Candidate Details' : 'Add New Candidate'}
          </h3>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <form id="candidate-form" onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase mb-4 pb-2 border-b border-slate-100">Personal Info</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Full Name" field="name" />
                <InputField label="Email Address" field="email" type="email" />
                <InputField label="Mobile Number" field="mobile" type="tel" />
                <InputField label="Current Location" field="currentLocation" />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase mb-4 pb-2 border-b border-slate-100">Professional Info</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Total Experience" field="totalExperience" />
                <InputField label="Current Designation" field="currentDesignation" />
                <InputField label="Current Department" field="currentDepartment" />
                <InputField label="Current Salary" field="currentSalary" />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase mb-4 pb-2 border-b border-slate-100">Application Info</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Designation Applied For" field="designationAppliedFor" />
                <InputField label="Offered Department" field="offeredDepartment" />
                <InputField label="Expected Location" field="expectedLocation" />
                <InputField label="Salary Offered" field="salaryOffered" />
              </div>
            </div>

            {isEditing && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-4 pb-2 border-b border-slate-100">ATS Status & Login</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Current Stage</label>
                    <select 
                      value={formData.currentStage} 
                      onChange={e => setFormData({...formData, currentStage: e.target.value as ApplicationStage})}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      {APPLICATION_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Admin Remarks (Internal)</label>
                    <textarea 
                      value={formData.remarks || ''} 
                      onChange={e => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                    />
                  </div>
                  <InputField label="Candidate Username (for Portal Login)" field="username" />
                  <InputField label="Candidate Password (for Portal Login)" field="password" />
                </div>
              </div>
            )}

            {!isEditing && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-4 pb-2 border-b border-slate-100">Initial Login Setup (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Candidate Username" field="username" />
                  <InputField label="Candidate Password" field="password" />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">You can also create this later during Salary Discussion phase.</p>
              </div>
            )}
          </form>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
          <button type="submit" form="candidate-form" className="px-6 py-2 bg-slate-900 text-white rounded shadow-sm text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
            {isEditing ? 'Save Changes' : 'Create Candidate'}
          </button>
        </div>
      </div>
    </div>
  );
}

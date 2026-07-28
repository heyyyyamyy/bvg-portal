import React, { useState, useEffect } from 'react';
import { Candidate, CheckStatus } from '../types';
import { getCandidates, addCandidate, updateCandidate } from '../store';
import { StatusBadge } from './StatusBadge';
import { Search, Plus, UserPlus, X, LogOut } from 'lucide-react';
import { format } from 'date-fns';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 shrink-0 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xl">V</div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-800 uppercase leading-tight">VeriTrust Portal</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase leading-tight">Corporate Background & Onboarding</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Candidate Management</h2>
            <p className="text-slate-500 mt-1 text-sm">Review and update background check statuses manually.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-md shadow-sm text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create New Candidate</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Candidate Name</th>
                  <th className="px-6 py-4">Joining Date</th>
                  <th className="px-6 py-4">Employment History</th>
                  <th className="px-6 py-4">Criminal Background</th>
                  <th className="px-6 py-4">Overall Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                {filtered.map(candidate => (
                  <tr key={candidate.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      <div className="flex flex-col">
                        <span>{candidate.name}</span>
                        <span className="text-xs font-normal text-slate-500 italic">{candidate.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 tabular-nums font-medium text-slate-600">
                      {format(new Date(candidate.joiningDate), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={candidate.employmentHistoryStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={candidate.criminalBackgroundStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={candidate.overallStatus} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setEditingId(candidate.id)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
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
        <AddCandidateModal 
          onClose={() => setIsAdding(false)} 
          onAdd={() => {
            setIsAdding(false);
            refresh();
          }} 
        />
      )}
      
      {editingId && (
        <EditCandidateModal
          candidate={candidates.find(c => c.id === editingId)!}
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

function AddCandidateModal({ onClose, onAdd }: { onClose: () => void, onAdd: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    joiningDate: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCandidate({
      ...formData,
      employmentHistoryStatus: 'Pending',
      criminalBackgroundStatus: 'Pending',
      overallStatus: 'Pending',
    });
    onAdd();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add New Candidate
          </h3>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="add-candidate-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone Number</label>
              <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Current Address</label>
              <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} rows={3} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Joining Date</label>
              <input required type="date" value={formData.joiningDate} onChange={e => setFormData({...formData, joiningDate: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
          </form>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
          <button type="submit" form="add-candidate-form" className="px-5 py-2 bg-blue-600 text-white rounded shadow-md text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors">Add Candidate</button>
        </div>
      </div>
    </div>
  );
}

function EditCandidateModal({ candidate, onClose, onSave }: { candidate: Candidate, onClose: () => void, onSave: () => void }) {
  const [formData, setFormData] = useState({
    employmentHistoryStatus: candidate.employmentHistoryStatus,
    criminalBackgroundStatus: candidate.criminalBackgroundStatus,
    overallStatus: candidate.overallStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidate(candidate.id, formData);
    onSave();
  };

  const statusOptions: CheckStatus[] = ['Pending', 'In Progress', 'Verified', 'Rejected'];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Admin Editor: {candidate.name}</h3>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="edit-candidate-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Employment History Check</label>
              <select 
                value={formData.employmentHistoryStatus} 
                onChange={e => setFormData({...formData, employmentHistoryStatus: e.target.value as CheckStatus})}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none"
              >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Criminal Background Check</label>
              <select 
                value={formData.criminalBackgroundStatus} 
                onChange={e => setFormData({...formData, criminalBackgroundStatus: e.target.value as CheckStatus})}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none"
              >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="pt-4 border-t border-slate-200">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Overall Status</label>
              <select 
                value={formData.overallStatus} 
                onChange={e => setFormData({...formData, overallStatus: e.target.value as CheckStatus})}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none"
              >
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
          <button type="submit" form="edit-candidate-form" className="px-5 py-2 bg-blue-600 text-white rounded shadow-md text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors">Synchronize</button>
        </div>
      </div>
    </div>
  );
}

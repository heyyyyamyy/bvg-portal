import React from 'react';
import { CheckStatus } from '../types';
import { cn } from '../lib/utils';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

export function StatusBadge({ status, className }: { status: CheckStatus; className?: string }) {
  const styles = {
    'Pending': 'bg-slate-200 text-slate-600',
    'In Progress': 'bg-amber-100 text-amber-800',
    'Verified': 'bg-emerald-100 text-emerald-800',
    'Rejected': 'bg-red-100 text-red-800',
  };

  return (
    <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider', styles[status], className)}>
      {status}
    </span>
  );
}

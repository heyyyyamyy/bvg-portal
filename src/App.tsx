/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User } from './types';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { CandidatePortal } from './components/CandidatePortal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard onLogout={() => setUser(null)} />;
  }

  if (user.role === 'candidate' && user.candidateId) {
    return <CandidatePortal candidateId={user.candidateId} onLogout={() => setUser(null)} />;
  }

  return <div>Invalid state</div>;
}

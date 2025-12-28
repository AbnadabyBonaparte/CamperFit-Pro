import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Editor } from './pages/Editor';
import { Reports } from './pages/Reports';
import { Marketplace } from './pages/Marketplace';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editor/:projectId" element={<Editor />} />
        <Route path="/reports/:projectId" element={<Reports />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


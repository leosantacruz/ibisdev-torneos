import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Participantes from './components/Participantes';
import Torneo from './components/Torneo';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Participantes />} />
          <Route path="/torneo" element={<Torneo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
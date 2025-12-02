import React, { useContext } from 'react';
import { Home, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar({ onNavigate }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-[#2A4D5E] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <Home className="h-7 w-7 text-white" />
          <span className="text-white font-bold text-xl">HOMECARE</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="text-gray-200">Home</button>
          <button onClick={() => onNavigate('nurses')} className="text-gray-200">Nurses</button>
          <button onClick={() => onNavigate('contact')} className="text-gray-200">Contact</button>

          {user ? (
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate(user.role === 'nurse' ? 'nurse-profile' : 'patient-profile')} className="text-white font-bold">{user.name}</button>
              <button onClick={() => { logout(); onNavigate('home'); }} className="text-red-300"><LogOut size={18} /></button>
            </div>
          ) : (
            // Register button navigates to nurse-profile as requested
            <button onClick={() => onNavigate('nurse-profile')} className="border border-white text-white px-4 py-2 rounded-full">Register</button>
          )}
        </div>
      </div>
    </nav>
  );
}
import React from 'react';
import { User, Code2, Sparkles, AlertCircle } from './Icons';

interface IdentityFormProps {
  name: string;
  role: string;
  builderTitle: string;
  onNameChange: (name: string) => void;
  onRoleChange: (role: string) => void;
}

export const IdentityForm: React.FC<IdentityFormProps> = ({
  name,
  role,
  builderTitle,
  onNameChange,
  onRoleChange,
}) => {
  const isNameEmpty = name.trim().length === 0;

  return (
    <div className="w-full space-y-4">
      <label className="block text-xs font-mono font-bold text-yellow-300 uppercase tracking-wider mb-1">
        03 / BUILDER IDENTITY DETAILS
      </label>

      {/* Name Input */}
      <div>
        <label className="block text-xs text-emerald-200 font-medium mb-1.5 flex items-center justify-between">
          <span>YOUR NAME</span>
          <span className="text-[10px] text-pink-400 font-mono font-bold">*REQUIRED FOR ID</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your name to continue..."
            maxLength={32}
            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#011F15] border ${
              isNameEmpty ? 'border-pink-500/80 focus:border-pink-400' : 'border-yellow-500/40 focus:border-yellow-400'
            } text-white placeholder-emerald-400/60 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-all font-medium`}
          />
        </div>
        {isNameEmpty && (
          <p className="text-[11px] font-mono text-pink-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Enter your name to continue.
          </p>
        )}
      </div>

      {/* Stack / Role Input */}
      <div>
        <label className="block text-xs text-emerald-200 font-medium mb-1.5 flex items-center justify-between">
          <span>STACK / ROLE</span>
          <span className="text-[10px] text-pink-400 font-mono font-bold">*REQUIRED FOR ID</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
            <Code2 className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            placeholder="e.g. Full Stack Developer"
            maxLength={40}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#011F15] border border-yellow-500/40 text-white placeholder-emerald-400/60 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all font-medium"
          />
        </div>
      </div>

      {/* Generated Title Badge Showcase */}
      <div className="p-3.5 rounded-xl bg-[#011F15] border border-pink-500/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
          <span className="text-xs font-mono text-emerald-300 uppercase">GENERATED TITLE:</span>
        </div>
        <span className="px-3 py-1 rounded-lg bg-pink-500 text-white font-mono text-xs font-black tracking-wider shadow-md">
          {builderTitle}
        </span>
      </div>
    </div>
  );
};

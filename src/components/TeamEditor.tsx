import React from 'react';
import type { TeamMember } from '../types/team';
import { UserPlus, Trash2, Upload } from './Icons';

interface TeamEditorProps {
  teamMembers: TeamMember[];
  onAddMember: () => void;
  onRemoveMember: (id: string) => void;
  onUpdateMember: (id: string, updates: Partial<TeamMember>) => void;
}

export const TeamEditor: React.FC<TeamEditorProps> = ({
  teamMembers,
  onAddMember,
  onRemoveMember,
  onUpdateMember,
}) => {
  const handlePhotoUpload = (id: string, file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      onUpdateMember(id, { imageUrl: url, imageElement: img });
    };
    img.src = url;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold text-yellow-300 uppercase tracking-wider">
          TEAM MEMBERS ({teamMembers.length} / 5)
        </label>
        {teamMembers.length < 5 && (
          <button
            type="button"
            onClick={onAddMember}
            className="px-3 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-yellow-300 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-yellow-400/30 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Member
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            className="p-3.5 rounded-2xl bg-[#011F15] border border-yellow-500/20 space-y-3 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-yellow-400">
                BUILDER #{index + 1}
              </span>
              {teamMembers.length > 2 && (
                <button
                  type="button"
                  onClick={() => onRemoveMember(member.id)}
                  className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                  title="Remove Builder"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={member.name}
                onChange={(e) => onUpdateMember(member.id, { name: e.target.value })}
                placeholder="Builder Name"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-800 text-white font-mono text-xs focus:border-yellow-400 outline-none"
              />
              <input
                type="text"
                value={member.role}
                onChange={(e) => onUpdateMember(member.id, { role: e.target.value })}
                placeholder="Stack / Role (e.g. AI ENGINEER)"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-800 text-white font-mono text-xs focus:border-yellow-400 outline-none"
              />
            </div>

            <label className="flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-900 border border-dashed border-emerald-700 text-xs font-mono text-emerald-300 hover:text-white cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-yellow-400" />
              <span>{member.imageUrl ? 'Change Photo' : 'Upload Photo'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handlePhotoUpload(member.id, e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

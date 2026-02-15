import React from 'react';

interface ModeBadgeProps {
    mode: string;
}

export const ModeBadge: React.FC<ModeBadgeProps> = ({ mode }) => {
    const getModeColor = (m: string) => {
        switch (m.toLowerCase()) {
            case 'diplomatic_advisor': return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
            case 'venting_listener': return 'bg-rose-500/10 text-rose-300 border-rose-500/20';
            case 'YARA': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
            case 'cultural_guide': return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
        }
    };

    return (
        <div className={`mb-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold border ${getModeColor(mode)}`}>
            {mode.replace(/_/g, ' ')}
        </div>
    );
};

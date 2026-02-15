import React from 'react';
import { MapPin, Clock, Home } from 'lucide-react';
import type { Context } from '../types';

interface ContextBarProps {
    context: Context;
    setContext: (ctx: Context) => void;
}

export const ContextBar: React.FC<ContextBarProps> = ({ context, setContext }) => {
    const handleChange = (key: keyof Context, value: string) => {
        setContext({ ...context, [key]: value });
    };

    return (
        <div className="flex items-center space-x-4 p-3 bg-slate-900/40 backdrop-blur-md border-b border-white/5 shadow-sm overflow-x-auto">
            <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <input
                    type="text"
                    value={context.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder-slate-500 w-24"
                    placeholder="City"
                />
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Home className="w-4 h-4 text-indigo-400" />
                <input
                    type="text"
                    value={context.place}
                    onChange={(e) => handleChange('place', e.target.value)}
                    className="bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder-slate-500 w-24"
                    placeholder="Place"
                />
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 text-amber-400" />
                <input
                    type="text"
                    value={context.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder-slate-500 w-24"
                    placeholder="Time"
                />
            </div>

            <div className="ml-auto text-xs text-slate-500 font-medium px-2">
                Buddy uses this context to adapt responses.
            </div>
        </div>
    );
};

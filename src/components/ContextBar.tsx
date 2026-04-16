import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import type { Context } from '../types';
import { getUserLocation } from '../utils/geolocation';

interface ContextBarProps {
    context: Context;
    setContext: React.Dispatch<React.SetStateAction<Context>>;
}

export const ContextBar: React.FC<ContextBarProps> = ({ context, setContext }) => {

    // Auto-update time
    React.useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setContext((prev) => ({ ...prev, time: timeString }));
        };

        updateTime(); // Initial set
        const interval = setInterval(updateTime, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [setContext]);

    const handleGPS = () => {
        getUserLocation()
            .then((location) => {
                setContext((prev) => ({
                    ...prev,
                    city: location.city || 'Unknown Location',
                    place: location.place || 'unknown',
                }));
            })
            .catch((error) => {
                console.error('GPS Error:', error);
                setContext((prev) => ({ ...prev, city: 'Location Unavailable' }));
            });
    };

    const handleChange = (key: keyof Context, value: string) => {
        setContext((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex items-center space-x-4 p-3 bg-slate-900/40 backdrop-blur-md border-b border-white/5 shadow-sm overflow-x-auto">
            <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <input
                    type="text"
                    value={context.city || ""}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder-slate-500 w-32"
                    placeholder="City / GPS"
                />
                <button onClick={handleGPS} className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 transition-colors" title="Detect Location">
                    GPS
                </button>
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 text-amber-400" />
                <input
                    type="text"
                    value={context.time || ""}
                    readOnly
                    className="bg-transparent border-none focus:outline-none text-sm text-slate-400 w-16 cursor-default"
                    placeholder="Time"
                />
            </div>

            <div className="ml-auto text-xs text-slate-500 font-medium px-2">
                YARA uses this context to adapt responses.
            </div>
        </div>
    );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Shield, Zap } from 'lucide-react';
import type { Analysis, Policy } from '../types';

interface AnalysisPanelProps {
    analysis: Analysis | null;
    policy: Policy | null;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, policy }) => {
    if (!analysis) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 p-8 border border-slate-800/50 rounded-2xl bg-slate-900/30 backdrop-blur-sm">
                <Activity className="w-12 h-12 opacity-50" />
                <p className="text-sm font-medium">Waiting for social signals...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 h-full overflow-y-auto pr-2 custom-scrollbar"
        >
            {/* Analysis Card */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-md shadow-xl">
                <div className="flex items-center space-x-2 mb-4 text-emerald-400">
                    <Activity className="w-5 h-5" />
                    <h3 className="font-semibold tracking-wide text-sm uppercase">Social Analysis</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-400 font-medium">Primary Emotion</label>
                        <div className="mt-1 flex items-center justify-between">
                            <span className="text-lg font-bold text-white capitalize">{analysis.primary_emotion}</span>
                            <div className={`h-2 w-2 rounded-full ${getEmotionColor(analysis.primary_emotion)} animate-pulse`} />
                        </div>
                        {/* Simple meter bar just for visuals */}
                        <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '75%' }}
                                className={`h-full ${getEmotionColor(analysis.primary_emotion)}`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <label className="text-xs text-slate-400 block mb-1">Relationship</label>
                            <span className="text-sm font-semibold capitalize flex items-center">
                                <Heart className="w-3 h-3 mr-1.5 text-pink-400" />
                                {analysis.relationship}
                            </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <label className="text-xs text-slate-400 block mb-1">Risk Level</label>
                            <span className="text-sm font-semibold capitalize flex items-center">
                                <Shield className="w-3 h-3 mr-1.5 text-amber-400" />
                                {analysis.conflict_risk}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Policy Card */}
            {policy && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 backdrop-blur-md shadow-xl"
                >
                    <div className="flex items-center space-x-2 mb-4 text-indigo-400">
                        <Zap className="w-5 h-5" />
                        <h3 className="font-semibold tracking-wide text-sm uppercase">Behavior Policy</h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-indigo-300/60 font-medium">Adopted Persona</label>
                            <p className="text-base font-bold text-indigo-100 capitalize mt-0.5">{policy.mode.replace(/_/g, ' ')}</p>
                        </div>
                        <div>
                            <label className="text-xs text-indigo-300/60 font-medium">Tone Strategy</label>
                            <div className="mt-1 inline-block px-2.5 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-xs font-semibold text-indigo-200">
                                {policy.tone}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

// Helper for dynamic colors
const getEmotionColor = (emotion: string) => {
    const map: Record<string, string> = {
        anger: 'bg-red-500',
        joy: 'bg-emerald-500',
        sadness: 'bg-blue-500',
        fear: 'bg-purple-500',
        surprise: 'bg-yellow-500',
        neutral: 'bg-slate-400',
        frustration: 'bg-orange-500'
    };
    return map[emotion.toLowerCase()] || 'bg-slate-400';
};

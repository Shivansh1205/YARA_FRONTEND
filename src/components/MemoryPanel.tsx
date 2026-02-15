import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles, TrendingUp, Heart, Target } from 'lucide-react';
import type { LearningInsights } from '../types';

interface MemoryPanelProps {
    insights: LearningInsights | null;
}

export const MemoryPanel: React.FC<MemoryPanelProps> = ({ insights }) => {
    const hasData = insights && insights.total_interactions > 0;

    return (
        <div className="h-full flex flex-col bg-slate-900/60 border-r border-white/5 p-4 w-64 backdrop-blur-md">
            <div className="flex items-center space-x-2 mb-6 text-indigo-300">
                <BrainCircuit className="w-5 h-5" />
                <h2 className="font-semibold tracking-wide text-sm uppercase">Memory Core</h2>
            </div>

            {!hasData ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-3 opacity-60">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                    <p className="text-sm text-center px-4">YARA is learning about you...</p>
                </div>
            ) : (
                <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1">
                    {/* Total Interactions */}
                    <div className="bg-slate-800/40 border border-white/5 rounded-lg px-3 py-2">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Interactions</p>
                        <p className="text-2xl font-bold text-indigo-400 mt-1">{insights.total_interactions}</p>
                    </div>

                    {/* Preferred Modes */}
                    {insights.preferred_modes.length > 0 && (
                        <div>
                            <div className="flex items-center space-x-1 mb-2">
                                <Target className="w-3.5 h-3.5 text-cyan-400" />
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Preferred Modes</p>
                            </div>
                            <div className="space-y-1.5">
                                <AnimatePresence>
                                    {insights.preferred_modes.map((mode, index) => (
                                        <motion.div
                                            key={mode}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-slate-800/40 hover:bg-cyan-900/20 border border-white/5 hover:border-cyan-500/30 rounded-lg px-3 py-1.5 text-xs text-slate-300 transition-all cursor-default"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block mr-2 opacity-60" />
                                            {mode.replace(/_/g, ' ')}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {/* Common Emotions */}
                    {insights.common_emotions.length > 0 && (
                        <div>
                            <div className="flex items-center space-x-1 mb-2">
                                <Heart className="w-3.5 h-3.5 text-rose-400" />
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Common Emotions</p>
                            </div>
                            <div className="space-y-1.5">
                                <AnimatePresence>
                                    {insights.common_emotions.map((emotion, index) => (
                                        <motion.div
                                            key={emotion}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-slate-800/40 hover:bg-rose-900/20 border border-white/5 hover:border-rose-500/30 rounded-lg px-3 py-1.5 text-xs text-slate-300 transition-all cursor-default"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block mr-2 opacity-60" />
                                            {emotion.replace(/_/g, ' ')}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {/* Common Scenarios */}
                    {insights.common_scenarios.length > 0 && (
                        <div>
                            <div className="flex items-center space-x-1 mb-2">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Common Scenarios</p>
                            </div>
                            <div className="space-y-1.5">
                                <AnimatePresence>
                                    {insights.common_scenarios.map((scenario, index) => (
                                        <motion.div
                                            key={scenario}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-slate-800/40 hover:bg-emerald-900/20 border border-white/5 hover:border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs text-slate-300 transition-all cursor-default"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-2 opacity-60" />
                                            {scenario.replace(/_/g, ' ')}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {/* Adaptations Learned */}
                    {insights.adaptations_learned.length > 0 && (
                        <div>
                            <div className="flex items-center space-x-1 mb-2">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Learned Adaptations</p>
                            </div>
                            <div className="space-y-1.5">
                                <AnimatePresence>
                                    {insights.adaptations_learned.map((adaptation, index) => (
                                        <motion.div
                                            key={adaptation}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-gradient-to-r from-amber-900/20 to-transparent border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-slate-300 leading-relaxed"
                                        >
                                            {adaptation}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-auto pt-4 border-t border-white/5">
                <p className="text-[10px] text-slate-500 text-center">
                    Memory updates automatically based on your interactions.
                </p>
            </div>
        </div>
    );
};

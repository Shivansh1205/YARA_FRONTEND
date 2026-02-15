import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles } from 'lucide-react';

interface MemoryPanelProps {
    traits: string[];
}

export const MemoryPanel: React.FC<MemoryPanelProps> = ({ traits }) => {
    return (
        <div className="h-full flex flex-col bg-slate-900/60 border-r border-white/5 p-4 w-64 backdrop-blur-md">
            <div className="flex items-center space-x-2 mb-6 text-indigo-300">
                <BrainCircuit className="w-5 h-5" />
                <h2 className="font-semibold tracking-wide text-sm uppercase">Memory Core</h2>
            </div>

            {traits.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-3 opacity-60">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                    <p className="text-sm text-center px-4">Buddy is learning about you...</p>
                </div>
            ) : (
                <div className="space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider pl-1">Learned Traits</p>
                    <AnimatePresence>
                        {traits.map((trait, index) => (
                            <motion.div
                                key={trait}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="bg-slate-800/40 hover:bg-indigo-900/20 border border-white/5 hover:border-indigo-500/30 rounded-lg px-3 py-2 text-sm text-slate-300 transition-all cursor-default">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block mr-2 opacity-60 group-hover:opacity-100 group-hover:animate-pulse" />
                                    {trait.replace(/_/g, ' ')}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
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

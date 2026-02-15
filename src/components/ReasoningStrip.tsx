import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Lightbulb, ShieldAlert, Sparkles } from 'lucide-react';
import type { Reasoning } from '../types';

interface ReasoningStripProps {
    reasoning: Reasoning;
}

export const ReasoningStrip: React.FC<ReasoningStripProps> = ({ reasoning }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-2 w-full max-w-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-slate-500 hover:text-indigo-400 transition-colors bg-slate-900/40 px-2 py-1 rounded-md border border-white/5"
            >
                <Sparkles className="w-3 h-3" />
                <span>Buddy's Reasoning</span>
                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-2 text-xs bg-slate-900/60 border border-slate-700/50 rounded-lg p-3 space-y-2 text-slate-300 shadow-inner">
                            <div className="flex items-start">
                                <Lightbulb className="w-3 h-3 mr-2 mt-0.5 text-yellow-500 shrink-0" />
                                <span>
                                    <strong className="text-yellow-500/80">Context:</strong> {reasoning.understood}
                                </span>
                            </div>
                            <div className="flex items-start">
                                <ShieldAlert className="w-3 h-3 mr-2 mt-0.5 text-amber-500 shrink-0" />
                                <span>
                                    <strong className="text-amber-500/80">Risk Assessment:</strong> {reasoning.risk}
                                </span>
                            </div>
                            <div className="flex items-start">
                                <div className="w-3 h-3 mr-2 mt-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0">
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                                </div>
                                <span>
                                    <strong className="text-indigo-400">Strategy:</strong> {reasoning.strategy}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

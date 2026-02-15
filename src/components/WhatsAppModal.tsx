import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { chatAPI } from '../api';

interface WhatsAppModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: () => void;
    userId: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, onImport, userId }) => {
    const [text, setText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImport = async () => {
        if (!text.trim()) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const response = await chatAPI.importWhatsAppChat(userId, text);

            // Check if response was successful
            if (response && response.reply) {
                onImport();
                onClose();
                setText('');
            } else if (response.error) {
                setError(response.error);
            }
        } catch (err) {
            setError("Failed to analyze chat. Please try again.");
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-slate-700 bg-slate-800/30 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                                <Upload className="w-5 h-5 mr-2 text-emerald-500" />
                                Import WhatsApp Chat
                            </h3>
                            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-5 space-y-4">
                            <p className="text-sm text-slate-400">
                                Paste your exported chat here. Buddy will analyze it to understand your relationship dynamics.
                                <span className="block mt-1 text-xs text-slate-500 italic">Privacy Note: Data is processed in-memory and not stored.</span>
                            </p>

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste chat content here... e.g. [12/01/24] Mom: Hello..."
                                className="w-full h-48 bg-slate-950/50 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none custom-scrollbar"
                            />

                            {error && (
                                <div className="flex items-center text-rose-400 text-sm bg-rose-950/20 p-2 rounded-lg border border-rose-900/30">
                                    <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-5 border-t border-slate-700 bg-slate-800/30 flex justify-end space-x-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={!text.trim() || isAnalyzing}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Analyze Context
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

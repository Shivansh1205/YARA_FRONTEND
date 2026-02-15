import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { ContextBar } from './components/ContextBar';
import { WhatsAppModal } from './components/WhatsAppModal';
import { chatAPI, getUserId, getTimeOfDay } from './api';
import type { Message, Context } from './types';

const USER_ID = getUserId();

function App() {
    // State
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: "Hi! I'm YARA. I can help with social situations, drafting replies, or just venting. What's on your mind?",
            sender: 'YARA',
            timestamp: new Date(),
            mode: 'YARA'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [context, setContext] = useState<Context>({
        city: '',
        time: getTimeOfDay()
    });

    // Modals
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: uuidv4(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const data = await chatAPI.sendMessage(USER_ID, userMsg.text, context);

            // Check for backend error
            if (data.error) {
                toast.error("YARA is having network issues — try again", {
                    icon: '⚠️',
                    style: {
                        borderRadius: '10px',
                        background: '#1e293b',
                        color: '#fff',
                        border: '1px solid #334155'
                    },
                });
                return;
            }

            // Handle Learning Feedback
            if (data.learning) {
                toast.success(data.learning, {
                    icon: '🧠',
                    duration: 4000,
                    style: {
                        borderRadius: '10px',
                        background: '#1e293b',
                        color: '#fff',
                        border: '1px solid #334155'
                    },
                });
            }

            const botMsg: Message = {
                id: uuidv4(),
                text: data.reply,
                sender: 'YARA',
                timestamp: new Date(),
                mode: data.mode,
                emotion: data.emotion,
                intensity: data.intensity,
                reasoning: {
                    understood: data.emotion,
                    risk: data.relationship,
                    strategy: data.mode
                }
            };

            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("YARA is having network issues — try again", {
                icon: '⚠️',
                style: {
                    borderRadius: '10px',
                    background: '#1e293b',
                    color: '#fff',
                    border: '1px solid #334155'
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleWhatsAppImport = () => {
        toast.success("YARA analyzed your conversation!", {
            icon: '✅',
            duration: 3000,
            style: {
                borderRadius: '10px',
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155'
            },
        });
    };

    return (
        <Layout>
            <Toaster position="top-center" />

            {/* Top Bar: Context */}
            <div className="absolute top-0 left-0 right-0 z-20">
                <ContextBar context={context} setContext={setContext} />
            </div>

            <div className="flex h-full pt-[60px] pb-6">
                {/* Left Sidebar: Memory */}

                {/* Main Chat Area */}
                <div className="flex-1 h-full min-w-0 relative">
                    <ChatInterface
                        messages={messages}
                        input={input}
                        setInput={setInput}
                        onSend={handleSend}
                        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {/* Modals */}
            <WhatsAppModal
                isOpen={isWhatsAppModalOpen}
                onClose={() => setIsWhatsAppModalOpen(false)}
                onImport={handleWhatsAppImport}
                userId={USER_ID}
            />
        </Layout>
    );
}

export default App;


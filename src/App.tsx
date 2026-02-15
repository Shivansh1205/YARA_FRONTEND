import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { MemoryPanel } from './components/MemoryPanel';
import { ContextBar } from './components/ContextBar';
import { WhatsAppModal } from './components/WhatsAppModal';
import type { Message, Context } from './types';

// API Setup
const api = axios.create({
    baseURL: 'http://localhost:8001/api',
});

const USER_ID = "demo_user_123";

function App() {
    // State
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: "Hi! I'm Buddy. I can help with social situations, drafting replies, or just venting. What's on your mind?",
            sender: 'buddy',
            timestamp: new Date(),
            mode: 'chill_companion'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [traits, setTraits] = useState<string[]>([]);
    const [context, setContext] = useState<Context>({
        city: 'Mumbai',
        place: 'Home',
        time: 'Evening'
    });

    // Modals
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

    // Load initial memory
    useEffect(() => {
        fetchMemory();
    }, []);

    const fetchMemory = async () => {
        try {
            const res = await api.get(`/chat/learning/${USER_ID}`);
            setTraits(res.data.learned_traits);
        } catch (err) {
            console.error("Failed to fetch memory", err);
        }
    };

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
            const response = await api.post('/chat', {
                message: userMsg.text,
                user_id: USER_ID,
                meta: context
            });

            const { response: botText, reasoning, debug, learning_feedback } = response.data;

            // Handle Learning Feedback
            if (learning_feedback) {
                toast.success(learning_feedback, {
                    icon: '🧠',
                    style: {
                        borderRadius: '10px',
                        background: '#1e293b',
                        color: '#fff',
                        border: '1px solid #334155'
                    },
                });
                fetchMemory(); // Refresh memory panel
            }

            const botMsg: Message = {
                id: uuidv4(),
                text: botText,
                sender: 'buddy',
                timestamp: new Date(),
                mode: debug?.policy?.mode,
                reasoning: reasoning,
                debug: debug
            };

            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Couldn't reach Buddy's brain. Is the server running?");
        } finally {
            setIsLoading(false);
        }
    };

    const handleWhatsAppImport = () => {
        // Add a system or invisible message to context?
        // Or just let user know analysis is done
        toast.success("WhatsApp chat analyzed! Buddy now has more context.", {
            icon: '✅',
            style: {
                borderRadius: '10px',
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155'
            },
        });

        // Optionally trigger a refresh of memory if the analysis endpoint updated it
        fetchMemory();
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
                <div className="hidden md:block h-full shrink-0">
                    <MemoryPanel traits={traits} />
                </div>

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
            />
        </Layout>
    );
}

export default App;

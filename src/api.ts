import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import type { ChatResponse, LearningInsights, Context } from './types';

// API Configuration
export const API_BASE_URL = 'https://yara-0ecr.onrender.com';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// User ID Management
export const getUserId = (): string => {
    let userId = localStorage.getItem('YARA_user_id');
    if (!userId) {
        userId = `user_${uuidv4()}`;
        localStorage.setItem('YARA_user_id', userId);
    }
    return userId;
};

// Time of Day Utility
export const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
};

// API Functions
export const chatAPI = {
    /**
     * Send a chat message to YARA
     */
    sendMessage: async (userId: string, message: string, meta?: Context): Promise<ChatResponse> => {
        const response = await api.post<ChatResponse>('/chat', {
            user_id: userId,
            message,
            meta: {
                city: meta?.city || '',
                place: meta?.place || 'unknown',
                time: meta?.time || getTimeOfDay(),
            },
        });
        return response.data;
    },

    /**
     * Import WhatsApp chat for analysis
     */
    importWhatsAppChat: async (userId: string, chatText: string): Promise<ChatResponse> => {
        const response = await api.post<ChatResponse>('/chat/whatsapp', {
            user_id: userId,
            chat_text: chatText,
        });
        return response.data;
    },

    /**
     * Get learning insights for a user
     */
    getLearningInsights: async (userId: string): Promise<LearningInsights> => {
        const response = await api.get<LearningInsights>(`/chat/learning/${userId}`);
        return response.data;
    },

    /**
     * Health check
     */
    healthCheck: async (): Promise<boolean> => {
        try {
            const response = await api.get('/');
            return response.status === 200;
        } catch {
            return false;
        }
    },
};


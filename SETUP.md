# YARA Frontend - Setup & Integration Guide

## 🎯 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔌 Backend Integration Details

### Production Backend
- **URL**: `https://yara-0ecr.onrender.com`
- **Status**: The backend may have a ~30 second cold start on first request
- **Test Health**: `curl https://yara-0ecr.onrender.com/`

### API Integration (Already Implemented ✅)

All API integration is complete and ready to use:

1. **Chat Messages** → `chatAPI.sendMessage()`
2. **WhatsApp Import** → `chatAPI.importWhatsAppChat()`
3. **Learning Insights** → `chatAPI.getLearningInsights()`

See `src/api.ts` for implementation details.

## 🧪 Testing the Integration

### Test 1: Chat Message
1. Open the app in your browser
2. Type a message like "I'm feeling stressed about work"
3. Click Send
4. You should see:
   - Typing indicator (3 dots)
   - Buddy's response with mode badge
   - Reasoning strip (expandable)
   - Learning toast (if applicable)

### Test 2: WhatsApp Import
1. Click the upload icon in the chat input
2. Paste a sample WhatsApp chat:
   ```
   12/01/2024, 10:30 - Boss: Need the report by EOD
   12/01/2024, 10:35 - You: Sure, I'll send it
   ```
3. Click "Analyze Context"
4. Wait for success message

### Test 3: Memory Panel
1. Send 2-3 messages
2. Check the left sidebar (Memory Core)
3. You should see:
   - Total interactions count
   - Common emotions
   - Preferred modes
   - Learned adaptations

## 📊 Response Structure

### Chat Response
```json
{
  "reply": "The actual message from Buddy",
  "mode": "chill_companion | diplomatic_advisor | expert_consultant",
  "emotion": "joy | anxiety | frustration | calm",
  "intensity": 1-10,
  "relationship": "friend | colleague | family",
  "learning": "What Buddy learned (optional)",
  "error": null or "error message"
}
```

### Learning Insights
```json
{
  "total_interactions": 5,
  "common_scenarios": ["work_stress", "social_anxiety"],
  "common_emotions": ["anxiety", "calm"],
  "preferred_modes": ["chill_companion"],
  "adaptations_learned": [
    "User prefers brief responses",
    "Responds well to humor"
  ]
}
```

## 🎨 UI Components

### 1. ChatInterface
- Displays conversation history
- Typing animation while loading
- Send button with keyboard shortcut (Enter)

### 2. MemoryPanel
- Shows learning insights
- Updates after each interaction
- Categorized by type (emotions, modes, scenarios)

### 3. ContextBar
- City input
- Place input (e.g., home, office, cafe)
- Time input (auto-detects: morning/afternoon/evening/night)

### 4. WhatsAppModal
- Import WhatsApp conversations
- Privacy notice
- Real-time analysis feedback

## 🚨 Error Handling

The frontend handles errors gracefully:

1. **Network Errors**: Shows "Buddy is having network issues — try again"
2. **Backend Errors**: Displays error from `response.error` field
3. **No Crash**: UI remains functional even if API calls fail

## 🔐 User Privacy

- **User ID**: Generated once and stored in localStorage
- **No Authentication**: Hackathon mode (no login required)
- **Session-Based**: Each browser gets unique ID
- **WhatsApp Data**: Processed in-memory, not stored permanently

## 📁 File Structure

```
src/
├── api.ts                  # ✅ Centralized API functions
├── types.ts                # ✅ TypeScript interfaces
├── App.tsx                 # ✅ Main app component
├── components/
│   ├── ChatInterface.tsx   # ✅ Chat UI
│   ├── MemoryPanel.tsx     # ✅ Learning insights
│   ├── ContextBar.tsx      # ✅ Context controls
│   ├── WhatsAppModal.tsx   # ✅ WhatsApp import
│   ├── ModeBadge.tsx       # ✅ Mode display
│   └── ReasoningStrip.tsx  # ✅ Reasoning panel
```

## 🔧 Customization

### Change Backend URL
Edit `src/api.ts`:
```typescript
export const API_BASE_URL = 'your-backend-url';
```

### Adjust Context Defaults
Edit `src/App.tsx` initial context state:
```typescript
const [context, setContext] = useState<Context>({
    city: 'Your City',
    place: 'home',
    time: getTimeOfDay()
});
```

### Modify UI Theme
Tailwind CSS classes are used throughout. Edit component styles as needed.

## 🐛 Troubleshooting

### Issue: Backend not responding
**Solution**: Wait 30 seconds for cold start, then retry

### Issue: CORS errors
**Solution**: Backend already configured for CORS. Clear browser cache.

### Issue: Learning panel empty
**Solution**: Send at least 1 message. Insights accumulate over time.

### Issue: WhatsApp import fails
**Solution**: Ensure chat format matches:
```
MM/DD/YYYY, HH:MM - Name: Message
```

## 📞 Support

For backend issues, check:
- Backend logs at `https://yara-0ecr.onrender.com`
- Console errors in browser DevTools
- Network tab for failed requests

## 🎉 You're Ready!

The frontend is fully integrated with the backend. Just run `npm run dev` and start chatting with Buddy!


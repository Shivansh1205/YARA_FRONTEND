# YARA_FRONTEND
This is the frontend of YARA - an AI companion that helps with social situations.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 🔗 Backend Integration

### Backend Base URL
```
https://yara-0ecr.onrender.com
```

All responses are JSON. No authentication required (hackathon mode).

### User Session Management
The frontend automatically generates and persists a unique `user_id` per browser session using localStorage.

## 📡 API Endpoints

### 1. Main Chat Endpoint
**POST** `/chat`

Send a normal user message with optional context metadata.

#### Request
```json
{
  "user_id": "user_abc123",
  "message": "bhai train late ho gayi",
  "meta": {
    "city": "Bangalore",
    "place": "railway_station",
    "time": "evening"
  }
}
```

#### Parameters
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| user_id | string | Unique ID per user/session | Yes |
| message | string | User message | Yes |
| meta.city | string | City name | No |
| meta.place | string | Environment type (e.g., home, office, railway_station) | No |
| meta.time | string | Time of day: morning/afternoon/evening/night | No |

#### Response
```json
{
  "reply": "Arre yaar Bangalore traffic + station combo 😭",
  "mode": "chill_companion",
  "emotion": "frustration",
  "intensity": 6,
  "relationship": "friend",
  "learning": "Buddy learned you prefer concise replies",
  "error": null
}
```

#### UI Mapping
| Field | UI Component |
|-------|--------------|
| reply | Chat bubble message |
| mode | Badge above message |
| emotion | Reasoning strip (emotion) |
| learning | Toast notification |
| error | Error banner (if not null) |

### 2. WhatsApp Chat Import
**POST** `/chat/whatsapp`

Paste exported WhatsApp chat for conversation analysis.

#### Request
```json
{
  "user_id": "user_abc123",
  "chat_text": "12/01/2024, 10:30 - Boss: Need report today..."
}
```

#### Response
Same format as `/chat` endpoint

#### Frontend Behavior
- Show "Buddy analyzed your conversation" before displaying reply
- Refresh memory panel after successful import

### 3. Learning Insights (Memory Panel)
**GET** `/chat/learning/{user_id}`

Retrieve user's learning insights and interaction history.

#### Example
```
GET /chat/learning/user_abc123
```

#### Response
```json
{
  "total_interactions": 8,
  "common_scenarios": ["workplace_conflict"],
  "common_emotions": ["anxiety"],
  "preferred_modes": ["diplomatic_advisor"],
  "adaptations_learned": [
    "Buddy learned you prefer diplomatic approaches"
  ]
}
```

#### Frontend Behavior
- Populate sidebar memory panel with this data
- Refresh after every message to show latest insights

## 🎨 Frontend Behavior Rules

### 1. Show Thinking State
After sending message:
- Disable input field
- Show typing animation (3 bouncing dots)
- Wait for response before re-enabling

### 2. Display Order
For each Buddy reply, render in this order:
1. Mode badge (above message)
2. Reply message bubble
3. Emotion strip (collapsible reasoning panel)
4. Learning toast notification (if learning field present)

### 3. Error Handling
If `error !== null` in response:
- Show error message: "Buddy is having network issues — try again"
- Do NOT crash the UI
- Log error to console for debugging

### 4. Context Defaults
If user doesn't provide context, use these defaults:
- `city`: "" (empty string)
- `place`: "unknown"
- `time`: Current browser time bucket (morning/afternoon/evening/night)

## 🧪 Testing

### Quick Backend Test
```bash
curl https://yara-0ecr.onrender.com/
```
Should return: `Buddy AI running`

### Test Chat Endpoint
```bash
curl -X POST https://yara-0ecr.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test_user",
    "message": "Hi buddy!",
    "meta": {
      "city": "Mumbai",
      "place": "home",
      "time": "evening"
    }
  }'
```

## 📁 Project Structure

```
src/
├── App.tsx                 # Main app with API integration
├── types.ts                # TypeScript interfaces
├── components/
│   ├── ChatInterface.tsx   # Main chat UI
│   ├── MemoryPanel.tsx     # Learning insights sidebar
│   ├── ContextBar.tsx      # Context input controls
│   ├── WhatsAppModal.tsx   # WhatsApp import dialog
│   ├── ModeBadge.tsx       # Mode display badge
│   └── ReasoningStrip.tsx  # Collapsible reasoning panel
```

## 🔑 Key Features

- ✅ Persistent user session management (localStorage)
- ✅ Real-time learning insights
- ✅ WhatsApp chat import and analysis
- ✅ Context-aware responses (location, time, place)
- ✅ Emotional intelligence display
- ✅ Graceful error handling
- ✅ Toast notifications for learning updates

## 🛠️ Technologies

- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📝 Notes

- No authentication required (hackathon mode)
- Backend may have cold start delay (~30s) on first request
- All user data is session-based and stored per user_id
- Privacy-focused: WhatsApp data is processed in-memory

## 🤝 Contributing

This is a hackathon project. Feel free to extend and improve!

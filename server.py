import sys
import os
import random
from typing import Optional, Dict, Any, List

# Add claudBUD to python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../claudBUD')))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import Buddy AI modules
try:
    from src.extractors import analyze_social_context
    from src.policy_engine import generate_behavior_policy
    from src.rag import find_relevant_knowledge
    from src.composer import generate_reply
    from src.whatsapp.parser import parse_whatsapp_chat
except ImportError as e:
    print(f"Error importing Buddy AI modules: {e}")
    print("Ensure you are running this from YARA_FRONTEND and claudBUD is in ../claudBUD")
    sys.exit(1)

app = FastAPI(title="Buddy AI API")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- IN-MEMORY MOCK PERSISTENCE ---
# Since we don't have a database or the full persistent persona module yet
USER_MEMORY = {
    "default_user": [
        "prefers_direct_communication",
        "values_loyalty"
    ]
}

# --- DATA MODELS ---

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = "default_user"
    meta: Optional[Dict[str, Any]] = {}

class WhatsAppRequest(BaseModel):
    chat_export: str
    user_id: Optional[str] = "default_user"

class VerifyRequest(BaseModel):
    message: str

# --- ENDPOINTS ---

@app.get("/")
async def root():
    return {"status": "online", "system": "Buddy AI"}

@app.get("/api/chat/learning/{user_id}")
async def get_user_learning(user_id: str):
    """
    Get learned traits for a user.
    """
    return {
        "user_id": user_id,
        "learned_traits": USER_MEMORY.get(user_id, [])
    }

@app.post("/api/chat/whatsapp")
async def import_whatsapp(request: WhatsAppRequest):
    """
    Import and analyze WhatsApp chat export.
    """
    try:
        clean_text = parse_whatsapp_chat(request.chat_export)
        
        # In a real system, we might batch process this for learning.
        # For now, we'll just extract a signal from the last part of it.
        if clean_text:
            # Simple heuristic to "learn" something from the chat
            # This is a mock simulation of the learning process
            if "sorry" in clean_text.lower():
                trait = "apologetic_nature"
            elif "thanks" in clean_text.lower():
                trait = "polite"
            else:
                trait = "active_chatter"
                
            user_traits = USER_MEMORY.get(request.user_id, [])
            if trait not in user_traits:
                user_traits.append(trait)
                USER_MEMORY[request.user_id] = user_traits
                
        return {
            "status": "success",
            "message": "Chat analyzed successfully",
            "extracted_preview": clean_text[:200] + "..." if len(clean_text) > 200 else clean_text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze")
async def analyze_message(request: VerifyRequest):
    """
    Phase 2: Extract social signals (Emotion, Relationship, etc.)
    """
    try:
        analysis = analyze_social_context(request.message)
        return analysis.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Full Pipeline with Reasoning and Learning.
    """
    try:
        user_input = request.message
        user_id = request.user_id
        meta = request.meta or {}
        
        # 1. Analyze Social Context
        analysis = analyze_social_context(user_input)
        
        # 2. Generate Behavior Policy
        policy = generate_behavior_policy({
            "user_message": user_input,
            "emotion": analysis.primary_emotion,
            "relationship": analysis.relationship,
            "conflict_risk": analysis.conflict_risk
        })
        
        # 3. Retrieve Knowledge (RAG)
        knowledge = find_relevant_knowledge(user_input, analysis.model_dump())
        
        # 4. Generate Response
        # We might inject meta context here if the composer supports it, 
        # but for now we proceed as is.
        response_text = generate_reply(
            user_input=user_input,
            analysis=analysis,
            policy=policy,
            rag_knowledge=knowledge
        )
        
        # 5. Mock "Learning" Step
        # If the analysis defines a clearer need or emotion, we "learn" it.
        learning_feedback = None
        user_traits = USER_MEMORY.get(user_id, [])
        
        new_trait = None
        if analysis.primary_emotion == "frustration":
             if policy.mode == "diplomatic_advisor":
                 new_trait = "prefers_diplomacy_in_conflict"
             elif policy.mode == "venting_listener":
                 new_trait = "needs_venting_space"
        elif analysis.primary_emotion == "joy":
             new_trait = "responds_well_to_celebration"

        if new_trait and new_trait not in user_traits:
            user_traits.append(new_trait)
            USER_MEMORY[user_id] = user_traits
            learning_feedback = f"Buddy learned: {new_trait.replace('_', ' ')}"
        
        return {
            "response": response_text,
            "reasoning": {
                "understood": f"{analysis.primary_emotion} • {analysis.relationship} context",
                "risk": f"{analysis.conflict_risk} risk",
                "strategy": policy.mode.replace("_", " ")
            },
            "learning_feedback": learning_feedback,
            "debug": {
                "analysis": analysis.model_dump(),
                "policy": policy.model_dump(),
                "knowledge": knowledge,
                "meta_received": meta
            }
        }
        
    except Exception as e:
        print(f"Error in chat pipeline: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Debug: Print routes
    for route in app.routes:
        print(f"Route: {route.path} [{route.name}]")
        
    uvicorn.run(app, host="0.0.0.0", port=8001)

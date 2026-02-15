export interface Analysis {
    primary_emotion: string;
    relationship: string;
    conflict_risk: string;
    user_need: string;
    social_context: string;
}

export interface Policy {
    mode: string;
    tone: string;
    goal: string;
}

export interface Knowledge {
    scenario: string;
    do: string[];
    dont: string[];
}

export interface Context {
    city: string;
    place: string;
    time: string;
}

export interface Reasoning {
    understood: string;
    risk: string;
    strategy: string;
}

export interface DebugData {
    analysis: Analysis;
    policy: Policy;
    knowledge: Knowledge;
    meta_received?: Context;
}

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'buddy';
    timestamp: Date;
    mode?: string; // e.g. "diplomatic_advisor"
    reasoning?: Reasoning;
    debug?: DebugData;
}

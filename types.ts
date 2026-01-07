
export interface UserData {
  name: string;
  birthDate: string;
  birthTime: string;
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
  };
}

export interface FiveElements {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface ActionStory {
  title: string;
  shortDesc: string;
  fullNarrative: string;
  visualMetaphor: string; // Description for a visualization/image
  energyCost: string; // e.g., "耗散火能", "补充水能"
}

export interface LuckAnalysis {
  label: string;
  suit: string[];
  avoid: string[];
  actions: ActionStory[];
  affirmation: string;
  narrative: string;
}

export interface AnalysisResult {
  zodiac: string;
  zodiacStory: string;
  baziElements: FiveElements;
  baziNarrative: string;
  humanDesign: string;
  humanStrategy: string;
  humanDesignStory: string;
  dailyLuck: LuckAnalysis;
  weeklyLuck: LuckAnalysis;
  monthlyLuck: LuckAnalysis;
  soulMission: string;
  environmentalResonance: string;
  harmonyScore: number;
  weatherContext: {
    temp: string;
    description: string;
    elementalShift: string; // How weather changes the bazi balance
  };
}


import { GoogleGenAI, Type } from "@google/genai";
import { UserData, AnalysisResult, ActionStory } from '../types';

const simulateUniverse = (user: UserData): AnalysisResult => {
  const seed = Array.from(user.name + user.birthDate).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const generateAction = (i: number): ActionStory => ({
    title: ["月影冥想", "古木寻踪", "星光书写", "露台观云", "松针烹茶"][(seed + i) % 5],
    shortDesc: "捕捉当下的心流时刻",
    fullNarrative: "外界的喧嚣在此刻静止。由于你命格中水气与今日气候的共鸣，最适合通过这种温和而深邃的活动来锚定灵魂。你会发现，每一个微小的动作都藏着宇宙的暗示。",
    visualMetaphor: "一滴落在静谧湖面的晶莹晨露",
    energyCost: "转化燥火为清泉"
  });

  const generateLuck = (label: string) => ({
    label,
    suit: ['专注内观', '深度聆听'],
    avoid: ['过早决策', '情绪投射'],
    actions: [generateAction(1), generateAction(2), generateAction(3)],
    affirmation: '我与群星共呼吸，在这变幻的环境中寻找恒久的宁静。',
    narrative: '今日星盘显示一种罕见的和谐，适合将繁杂的思绪沉淀。'
  });

  return {
    zodiac: "银河守护者",
    zodiacStory: "你的星盘如同一张在晨曦中展开的地图。虽然你有着如群星般的闪耀，但更有着如深空般的包容。今日天象正缓慢移入你的核心宫位，唤醒那些沉睡的直觉。",
    baziElements: { wood: 28, fire: 18, earth: 22, metal: 12, water: 20 },
    baziNarrative: "你体内的木元素正如春芽般萌发，虽然土气稍重，但水的滋养让生命力得以在裂缝中顽强生长。今日的环境微冷，正好固化了你那略显跳脱的火能。",
    humanDesign: "显示型生产者",
    humanStrategy: "回应并告知",
    humanDesignStory: "你是一个天生的能量发动机。你的灵魂使命是通过高频率的行为来点燃他人的火花。在这个具体的地理坐标上，你的能量场正呈现出一种扩张态势。",
    dailyLuck: generateLuck('今日'),
    weeklyLuck: generateLuck('本周'),
    monthlyLuck: generateLuck('本月'),
    soulMission: "在每一次呼吸间，完成与宇宙的秘密交换。",
    environmentalResonance: "你所在的城市正经历某种细腻的情绪波动，空气中的湿度与你的命盘产生了奇妙的导电性。",
    harmonyScore: 92,
    weatherContext: {
      temp: "18°C",
      description: "微凉多云，偶有星光",
      elementalShift: "水气滋润了你命盘中干涸的木性，促使直觉升华。"
    }
  };
};

export const analyzeUniverseAI = async (user: UserData): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const currentTime = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    const locationStr = user.location ? `经纬度 (${user.location.latitude}, ${user.location.longitude})` : "未知地点";
    
    const actionStorySchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        shortDesc: { type: Type.STRING },
        fullNarrative: { type: Type.STRING },
        visualMetaphor: { type: Type.STRING },
        energyCost: { type: Type.STRING },
      },
      required: ["title", "shortDesc", "fullNarrative", "visualMetaphor", "energyCost"]
    };

    const luckSchema = {
      type: Type.OBJECT,
      properties: {
        label: { type: Type.STRING },
        suit: { type: Type.ARRAY, items: { type: Type.STRING } },
        avoid: { type: Type.ARRAY, items: { type: Type.STRING } },
        actions: { type: Type.ARRAY, items: actionStorySchema },
        affirmation: { type: Type.STRING },
        narrative: { type: Type.STRING },
      },
      required: ["label", "suit", "avoid", "actions", "affirmation", "narrative"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `行者：${user.name} | 出生：${user.birthDate} ${user.birthTime} | 实况：${currentTime} | 位置：${locationStr}`,
      config: {
        systemInstruction: `你是一位全知且极具文学底蕴的“心流星命师”。
你的任务是为行者打造一份沉浸式的灵魂报告。
1. **五行分析**：不仅给出百分比，还要描述它们在今日特定天气和地理环境下的“化学反应”。
2. **生辰深度**：结合星座、八字和人类图，撰写三段极其优美、富有哲学感的深度分析。
3. **环境共鸣**：基于提供的经纬度和推断的天气，描述周围环境如何调动或压制行者的能量场。
4. **行动指南**：提供三个带有“视觉隐喻”和“深度故事”的建议，引导行者进入心流。

JSON输出格式必须严格遵守给定的Schema。风格：唯美、治愈、深邃。`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            zodiac: { type: Type.STRING },
            zodiacStory: { type: Type.STRING },
            baziElements: {
              type: Type.OBJECT,
              properties: { wood: { type: Type.NUMBER }, fire: { type: Type.NUMBER }, earth: { type: Type.NUMBER }, metal: { type: Type.NUMBER }, water: { type: Type.NUMBER } },
              required: ["wood", "fire", "earth", "metal", "water"]
            },
            baziNarrative: { type: Type.STRING },
            humanDesign: { type: Type.STRING },
            humanStrategy: { type: Type.STRING },
            humanDesignStory: { type: Type.STRING },
            weatherContext: {
              type: Type.OBJECT,
              properties: { temp: { type: Type.STRING }, description: { type: Type.STRING }, elementalShift: { type: Type.STRING } },
              required: ["temp", "description", "elementalShift"]
            },
            dailyLuck: luckSchema,
            weeklyLuck: luckSchema,
            monthlyLuck: luckSchema,
            soulMission: { type: Type.STRING },
            environmentalResonance: { type: Type.STRING },
            harmonyScore: { type: Type.NUMBER }
          },
          required: ["zodiac", "zodiacStory", "baziElements", "baziNarrative", "humanDesign", "humanStrategy", "humanDesignStory", "weatherContext", "dailyLuck", "weeklyLuck", "monthlyLuck", "soulMission", "environmentalResonance", "harmonyScore"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Empty Response");
    return JSON.parse(resultText);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return simulateUniverse(user);
  }
};

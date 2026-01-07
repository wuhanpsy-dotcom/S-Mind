
import React, { useState, useMemo } from 'react';
import { AnalysisResult, ActionStory } from '../types';

interface Props {
  result: AnalysisResult;
  userName: string;
  onReset: () => void;
}

const ActionModal: React.FC<{ story: ActionStory; onClose: () => void }> = ({ story, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate__animated animate__fadeIn">
      <div className="w-full max-w-lg glass-card p-8 relative overflow-hidden animate__animated animate__zoomIn">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="w-full h-48 mb-8 rounded-3xl bg-indigo-500/10 border border-white/5 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-indigo-500/5 animate-pulse group-hover:bg-indigo-500/10 transition-all"></div>
           <p className="text-indigo-400/40 text-[10px] uppercase tracking-[0.3em] mb-4 relative z-10">Soul Visualization</p>
           <p className="text-indigo-100/90 text-lg font-light italic leading-relaxed relative z-10">“{story.visualMetaphor}”</p>
        </div>

        <h3 className="text-2xl font-light text-white mb-2">{story.title}</h3>
        <div className="flex items-center space-x-3 mb-8">
          <span className="px-3 py-1 bg-indigo-500/20 rounded-full text-[10px] text-indigo-300 border border-indigo-500/20 tracking-widest">{story.energyCost}</span>
        </div>

        <div className="space-y-6 text-indigo-100/70 text-sm leading-loose text-justify max-h-[40vh] overflow-y-auto pr-3 scrollbar-hide">
          {story.fullNarrative.split('\n').map((para, i) => <p key={i}>{para}</p>)}
        </div>

        <button 
          onClick={onClose}
          className="mt-10 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all active:scale-95 shadow-xl shadow-indigo-600/20 font-light tracking-widest"
        >
          铭记此念 • Embark
        </button>

        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};

const ResultView: React.FC<Props> = ({ result, userName, onReset }) => {
  const [selectedStory, setSelectedStory] = useState<ActionStory | null>(null);
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month'>('day');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const luck = activeTab === 'day' ? result.dailyLuck : activeTab === 'week' ? result.weeklyLuck : result.monthlyLuck;

  const elementDetails: Record<string, { desc: string; icon: string }> = {
    wood: { desc: "生命力、创造、生长", icon: "🌱" },
    fire: { desc: "热情、感化、表达", icon: "🔥" },
    earth: { desc: "稳重、包容、根基", icon: "⛰️" },
    metal: { desc: "决断、锐利、收敛", icon: "⚔️" },
    water: { desc: "智慧、灵动、深邃", icon: "💧" }
  };

  return (
    <div className="w-full max-w-2xl px-6 pb-40 animate__animated animate__fadeIn">
      {/* 1. Real-time Environmental Context */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-transparent">
          <p className="text-[10px] text-indigo-400 uppercase tracking-widest mb-2">时空坐标 • Location</p>
          <div className="flex items-end justify-between">
            <span className="text-white text-lg font-light">锚定中心</span>
            <div className="text-[10px] text-indigo-300/60 leading-tight">
               Lat: {Math.round((result.weatherContext as any).latitude || 30.6)}<br/>
               Lng: {Math.round((result.weatherContext as any).longitude || 104.1)}
            </div>
          </div>
        </div>
        <div className="glass-card p-6 bg-gradient-to-br from-purple-500/10 to-transparent">
          <p className="text-[10px] text-purple-400 uppercase tracking-widest mb-2">天象实况 • Weather</p>
          <div className="flex items-end justify-between">
            <span className="text-white text-lg font-light">{result.weatherContext.description}</span>
            <span className="text-2xl text-white font-thin">{result.weatherContext.temp}</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 mb-16 bg-white/[0.01] border-indigo-500/10">
        <p className="text-xs text-indigo-300/80 leading-relaxed italic text-center">
          “{result.environmentalResonance}”
        </p>
      </div>

      {/* 2. Interactive Five Elements */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-light tracking-[0.2em] text-indigo-100">五行原力场</h3>
           <div className="flex items-center space-x-2">
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
             <span className="text-[10px] text-indigo-500/60 uppercase tracking-widest">能量已更新</span>
           </div>
        </div>
        
        <div className="glass-card p-10 relative overflow-hidden">
          <div className="energy-bar-container gap-4">
            {[
              { key: 'wood', label: '木', val: result.baziElements.wood, color: '#10b981' },
              { key: 'fire', label: '火', val: result.baziElements.fire, color: '#f43f5e' },
              { key: 'earth', label: '土', val: result.baziElements.earth, color: '#d97706' },
              { key: 'metal', label: '金', val: result.baziElements.metal, color: '#94a3b8' },
              { key: 'water', label: '水', val: result.baziElements.water, color: '#3b82f6' }
            ].map((el, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center flex-1 group cursor-pointer"
                onMouseEnter={() => setHoveredElement(el.key)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="mb-3 text-xs opacity-0 group-hover:opacity-100 transition-all font-mono text-indigo-300">
                  {el.val}%
                </div>
                <div 
                  className={`energy-bar w-4 rounded-full transition-all duration-1000 ${hoveredElement === el.key ? 'brightness-125 scale-x-125' : 'opacity-80'}`} 
                  style={{ height: `${el.val}%`, backgroundColor: el.color, color: el.color }}
                ></div>
                <span className="text-xs text-indigo-400/80 mt-6 font-light">{el.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 h-20 flex items-center justify-center text-center">
            {hoveredElement ? (
              <div className="animate__animated animate__fadeIn">
                <span className="text-xl mr-2">{elementDetails[hoveredElement].icon}</span>
                <span className="text-indigo-100 font-light">{elementDetails[hoveredElement].desc}</span>
              </div>
            ) : (
              <p className="text-xs text-indigo-400/60 italic px-4 leading-relaxed">
                {result.weatherContext.elementalShift}
              </p>
            )}
          </div>
        </div>
        <p className="mt-6 text-sm text-indigo-100/70 leading-relaxed text-justify px-2">
          {result.baziNarrative}
        </p>
      </section>

      {/* 3. Deep Analysis Cards (Zodiac & Human Design) */}
      <section className="mb-20 space-y-10">
        <div className="glass-card p-10 border-l-4 border-indigo-500/40">
           <div className="flex items-center space-x-4 mb-6">
              <div className="text-3xl text-indigo-400">✨</div>
              <div>
                <p className="text-[10px] text-indigo-500/60 uppercase tracking-widest">星系本质 • Zodiac</p>
                <h4 className="text-xl font-light text-white">{result.zodiac}</h4>
              </div>
           </div>
           <p className="text-sm text-indigo-100/70 leading-loose">
             {result.zodiacStory}
           </p>
        </div>

        <div className="glass-card p-10 border-l-4 border-purple-500/40">
           <div className="flex items-center space-x-4 mb-6">
              <div className="text-3xl text-purple-400">🌀</div>
              <div>
                <p className="text-[10px] text-purple-500/60 uppercase tracking-widest">能量图谱 • Human Design</p>
                <h4 className="text-xl font-light text-white">{result.humanDesign}</h4>
              </div>
           </div>
           <div className="mb-4 inline-block px-3 py-1 rounded-lg bg-purple-500/10 text-[10px] text-purple-300 border border-purple-500/10 uppercase tracking-widest">
             策略：{result.humanStrategy}
           </div>
           <p className="text-sm text-indigo-100/70 leading-loose">
             {result.humanDesignStory}
           </p>
        </div>
      </section>

      {/* 4. Action Guide */}
      <section className="mb-16">
        <div className="flex flex-col items-center mb-12">
           <h3 className="text-2xl font-light tracking-[0.3em] text-white mb-4">开启心旅行动</h3>
           <div className="flex space-x-2 bg-white/5 p-1 rounded-full border border-white/5">
              {['day', 'week', 'month'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={`px-8 py-2 text-[10px] rounded-full transition-all uppercase tracking-widest ${activeTab === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-400/40 hover:text-indigo-300'}`}
                >
                  {t === 'day' ? '今日' : t === 'week' ? '本周' : '本月'}
                </button>
              ))}
           </div>
        </div>

        <div className="space-y-6">
          {luck.actions.map((action, i) => (
            <div 
              key={i}
              onClick={() => setSelectedStory(action)}
              className="action-card p-8 rounded-[40px] cursor-pointer group flex items-start space-x-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-xl font-serif text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                {i + 1}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-indigo-100 font-medium group-hover:text-white transition-colors">{action.title}</h4>
                  <svg className="w-5 h-5 text-indigo-500/20 group-hover:text-indigo-400 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
                <p className="text-xs text-indigo-400/70">{action.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Soul Affirmation */}
      <section className="text-center py-24 px-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent -z-10"></div>
        <p className="text-2xl font-extralight text-indigo-50 text-white leading-relaxed mb-10">
          “{luck.affirmation}”
        </p>
        <div className="h-[1px] w-20 bg-indigo-500/30 mx-auto mb-16"></div>
        
        <button 
          onClick={onReset}
          className="group relative px-16 py-4 rounded-full overflow-hidden transition-all active:scale-95"
        >
          <div className="absolute inset-0 bg-indigo-600 transition-all group-hover:bg-indigo-500"></div>
          <span className="relative z-10 text-white text-xs tracking-[0.4em] uppercase">重新锚定宇宙坐标</span>
        </button>
      </section>

      {selectedStory && (
        <ActionModal 
          story={selectedStory} 
          onClose={() => setSelectedStory(null)} 
        />
      )}
    </div>
  );
};

export default ResultView;

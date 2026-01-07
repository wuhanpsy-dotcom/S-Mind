
import React, { useEffect, useState } from 'react';

const MESSAGES = [
  "正在链接宇宙能量",
  "正在观测星象轨迹",
  "正在解析五行流转",
  "正在共鸣人类图谱",
  "正在编织心旅行动"
];

const LoadingScreen: React.FC = () => {
  const [dots, setDots] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    
    const msgInterval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % MESSAGES.length);
    }, 800);

    return () => {
      clearInterval(dotInterval);
      clearInterval(msgInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-2xl animate__animated animate__fadeIn">
      <div className="relative w-40 h-40 mb-10">
        <div className="absolute inset-0 border-2 border-indigo-500/10 rounded-full"></div>
        <div className="absolute inset-0 border-t-2 border-indigo-400 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-2 border-purple-500/10 rounded-full"></div>
        <div className="absolute inset-4 border-r-2 border-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        <div className="absolute inset-10 border-2 border-pink-500/10 rounded-full"></div>
        <div className="absolute inset-10 border-b-2 border-pink-400 rounded-full animate-spin" style={{ animationDuration: '5s' }}></div>
        
        {/* Core Pulsing Light */}
        <div className="absolute inset-[45%] bg-indigo-400 rounded-full blur-sm animate-pulse"></div>
      </div>
      
      <p className="text-indigo-100 text-lg font-light tracking-widest min-h-[1.5em] transition-all duration-500">
        {MESSAGES[msgIndex]}{dots}
      </p>
      
      <div className="mt-6 flex space-x-3">
        {[0, 1, 2].map(i => (
          <span 
            key={i} 
            className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" 
            style={{ animationDelay: `${i * 0.15}s` }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;

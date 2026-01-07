
import React, { useState } from 'react';
import { UserData } from '../types';

interface Props {
  onAnalyze: (data: UserData) => void;
}

const InputForm: React.FC<Props> = ({ onAnalyze }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserData>({
    name: '',
    birthDate: '',
    birthTime: '12:00'
  });

  const nextStep = () => {
    if (step === 1 && !formData.name) return;
    if (step === 2 && !formData.birthDate) return;
    if (step < 3) setStep(step + 1);
    else onAnalyze(formData);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepsContent = [
    {
      title: "你在这世间的称谓？",
      subtitle: "名字是能量的初次显化",
      field: (
        <input
          autoFocus
          type="text"
          className="w-full bg-transparent border-b-2 border-indigo-500/30 focus:border-indigo-400 text-center text-2xl py-4 outline-none transition-all placeholder:text-slate-700"
          placeholder="请输入名字"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && nextStep()}
        />
      )
    },
    {
      title: "星辰交汇的那一天？",
      subtitle: "日期标记了你灵魂降临的坐标",
      field: (
        <input
          autoFocus
          type="date"
          className="w-full bg-transparent border-b-2 border-indigo-500/30 focus:border-indigo-400 text-center text-2xl py-4 outline-none transition-all"
          value={formData.birthDate}
          onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && nextStep()}
        />
      )
    },
    {
      title: "万物苏醒的时辰？",
      subtitle: "精确的时间能解析深层的能量流动",
      field: (
        <input
          autoFocus
          type="time"
          className="w-full bg-transparent border-b-2 border-indigo-500/30 focus:border-indigo-400 text-center text-2xl py-4 outline-none transition-all"
          value={formData.birthTime}
          onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && nextStep()}
        />
      )
    }
  ];

  return (
    <div className="w-full max-w-lg px-8 py-12 min-h-[400px] flex flex-col justify-between items-center text-center relative">
      <div className="w-full animate__animated animate__fadeIn" key={step}>
        <span className="text-indigo-500/60 text-xs tracking-widest uppercase mb-4 block">Step 0{step} / 03</span>
        <h2 className="text-2xl font-light text-white mb-2">{stepsContent[step - 1].title}</h2>
        <p className="text-indigo-300/60 text-sm mb-12">{stepsContent[step - 1].subtitle}</p>
        
        <div className="mb-12">
          {stepsContent[step - 1].field}
        </div>
      </div>

      <div className="w-full flex justify-between items-center pt-8">
        {step > 1 ? (
          <button onClick={prevStep} className="text-indigo-400/60 text-sm hover:text-indigo-400 transition-colors">
            ← 返回
          </button>
        ) : <div />}
        
        <button
          onClick={nextStep}
          className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center"
        >
          {step === 3 ? "开启共鸣" : "继续探索"}
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </button>
      </div>

      {/* Background decoration */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full"></div>
    </div>
  );
};

export default InputForm;

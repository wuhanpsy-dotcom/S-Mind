
import React, { useState, useCallback } from 'react';
import { UserData, AnalysisResult } from './types';
import { analyzeUniverseAI } from './services/astrologyEngine';
import InputForm from './components/InputForm';
import ResultView from './components/ResultView';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback(async (data: UserData) => {
    setLoading(true);
    
    // Attempt to get geolocation
    let location = undefined;
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      });
      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    } catch (e) {
      console.warn("Could not get location, continuing without it.");
    }

    const finalData = { ...data, location };
    setUserData(finalData);
    
    try {
      const analysis = await analyzeUniverseAI(finalData);
      setResult(analysis);
      
      setTimeout(() => {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    } catch (error) {
      console.error("Critical error in analysis flow:", error);
      setLoading(false);
      alert("星辰能量暂时波动，请稍后再试。");
    }
  }, []);

  const handleReset = () => {
    setResult(null);
    setUserData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Brand Header */}
      <header className="w-full py-16 px-6 flex flex-col items-center animate__animated animate__fadeIn">
        <div className="w-20 h-20 mb-6 relative">
          <div className="absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full animate-pulse"></div>
          <svg className="w-full h-full text-indigo-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            <path d="M19 3v4"></path>
            <path d="M21 5h-4"></path>
            <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.2"></circle>
          </svg>
        </div>
        <h1 className="text-4xl font-extralight tracking-[0.3em] text-white">星命心旅</h1>
        <p className="text-indigo-400/60 text-[10px] mt-4 tracking-[0.5em] uppercase">The Celestial Inner Mirror</p>
      </header>

      <main className="w-full flex-grow flex justify-center items-start">
        {!result ? (
          <InputForm onAnalyze={handleAnalyze} />
        ) : (
          <ResultView result={result} userName={userData?.name || ''} onReset={handleReset} />
        )}
      </main>

      <footer className="w-full py-20 text-center">
        <div className="h-[1px] w-8 bg-indigo-500/20 mx-auto mb-8"></div>
        <p className="text-indigo-500/20 text-[10px] tracking-[0.4em] uppercase">
          Guided by Stars • Anchored in Earth
        </p>
      </footer>

      {loading && <LoadingScreen />}
    </div>
  );
};

export default App;

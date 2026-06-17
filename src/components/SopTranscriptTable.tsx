import React, { useState } from 'react';
import { BookOpen, Play, Volume2, Clock, Search, X, MessageSquareOff } from 'lucide-react';
import { storyboardSegments } from '../data';

interface SopTranscriptTableProps {
  activeTime: number;
  setActiveTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
}

export default function SopTranscriptTable({
  activeTime,
  setActiveTime,
  setIsPlaying
}: SopTranscriptTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-scroll active section into view when playhead changes
  React.useEffect(() => {
    if (!searchTerm) {
      const activeIdx = storyboardSegments.findIndex(
        s => activeTime >= s.secondsStart && activeTime < s.secondsEnd
      );
      if (activeIdx !== -1) {
        const el = document.getElementById(`transcript_scene_${activeIdx + 1}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  }, [activeTime, searchTerm]);

  const filteredSegments = storyboardSegments.filter(scene => {
    const searchLower = searchTerm.toLowerCase();
    return (
      scene.title.toLowerCase().includes(searchLower) ||
      scene.subtitle.toLowerCase().includes(searchLower) ||
      scene.narrative.toLowerCase().includes(searchLower) ||
      scene.erpScreen.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-sans text-slate-100">
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-white text-[13.5px] flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" />
          <span>SOP 影片旁白與字幕完整對話軌</span>
        </h3>
        <span className="text-[9.5px] bg-slate-950 border border-slate-850 text-slate-500 px-2 rounded font-mono font-bold">民國 115 教材</span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed text-left">
        本對話軌依據會計部規範編製。支援對話、畫面與字軌關鍵字即時搜尋，點選任一時間段即可使影片播放器自動對焦播放：
      </p>

      {/* Interactive Search Bar Panel */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜尋對話、按鍵、系統畫面、字軌或字幕關鍵字..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex justify-between items-center text-[10.5px] text-slate-500 font-mono bg-slate-950/40 p-2 rounded-lg border border-slate-850">
          <span>
            符合篩選條件：<strong className="text-amber-400 font-bold">{filteredSegments.length}</strong> / <strong>{storyboardSegments.length}</strong> 筆
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-amber-500 hover:text-amber-400 font-bold cursor-pointer"
            >
              [重設搜尋]
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Container with List Items */}
      <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
        {filteredSegments.length > 0 ? (
          filteredSegments.map((scene, i) => {
            const isActive = activeTime >= scene.secondsStart && activeTime < scene.secondsEnd;
            
            // Character-proportional timing phrase segmentation
            const clauses = scene.narrative.match(/[^，。；：！？、\s]+(?:[，。；：！？、\s]+)?/g) || [scene.narrative];
            const totalLength = clauses.reduce((acc, c) => acc + c.length, 0);
            let currentLengthSum = 0;
            const duration = scene.secondsEnd - scene.secondsStart;

            let activeClauseIdx = 0;
            const timedClauses = clauses.map((clause, idx) => {
              const clauseLen = clause.length;
              const startRatio = currentLengthSum / totalLength;
              currentLengthSum += clauseLen;
              const endRatio = currentLengthSum / totalLength;
              const startSec = scene.secondsStart + startRatio * duration;
              const endSec = scene.secondsStart + endRatio * duration;

              if (activeTime >= startSec && activeTime < endSec) {
                activeClauseIdx = idx;
              }
              return {
                text: clause,
                startSec,
                endSec
              };
            });

            return (
              <div 
                key={i}
                id={`transcript_scene_${scene.index}`}
                onClick={() => {
                  setActiveTime(scene.secondsStart);
                  setIsPlaying(true);
                }}
                className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer space-y-3 ${
                  isActive 
                    ? 'bg-gradient-to-br from-indigo-950/30 to-amber-955/10 border-amber-500 shadow-xl ring-1 ring-amber-500/20 scale-[1.01]' 
                    : 'bg-slate-950/60 hover:bg-slate-850 border-slate-900/80 hover:border-slate-800'
                }`}
              >
                {/* Header block within segment */}
                <div className="flex items-center justify-between border-b border-slate-900/50 pb-2">
                  <span className={`text-[11px] font-extrabold font-mono flex items-center gap-1.5 ${
                    isActive ? 'text-amber-450' : 'text-slate-500'
                  }`}>
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>第 {scene.index} 幕 • {formatTime(scene.secondsStart)} - {formatTime(scene.secondsEnd)}</span>
                  </span>
                  <span className={`text-[9.5px] p-0.5 px-2.5 rounded font-mono font-bold uppercase shrink-0 ${
                    isActive 
                      ? 'bg-amber-400 text-slate-950 font-black' 
                      : 'bg-[#182a4a]/40 text-[#5a8bf0] border border-[#2a4577]/30'
                  }`}>
                    {scene.erpScreen}
                  </span>
                </div>

                {/* Title & Key sentence */}
                <div className="space-y-1.5">
                  <h4 className={`font-black text-sm ${isActive ? "text-amber-300" : "text-slate-200"}`}>
                    {scene.title}
                  </h4>
                  <div className={`text-[11px] leading-relaxed border-l-2 pl-2 ${isActive ? 'border-amber-500 text-amber-200/80' : 'border-slate-700 text-slate-400'}`}>
                    <span className="font-bold block sm:inline">🎯 課程要點：</span>
                    {scene.subtitle}
                  </div>
                </div>

                {/* Speech Voice-over Text */}
                <div className={`text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed flex items-start gap-2 p-3 rounded-lg border transition-colors ${
                  isActive 
                    ? 'bg-slate-950/90 border-slate-800/80 text-white' 
                    : 'bg-slate-950/40 border-slate-950 text-slate-350'
                }`}>
                  <Volume2 className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? "text-amber-400 animate-bounce" : "text-slate-500"}`} />
                  <div className="font-medium leading-relaxed font-sans">
                    <span className={`font-black mr-1 ${isActive ? "text-amber-400" : "text-slate-400"}`}>旁白口播：</span>
                    {isActive ? (
                      <span className="inline flex-wrap gap-x-1">
                        {timedClauses.map((c, cIdx) => {
                          const isCurrent = cIdx === activeClauseIdx;
                          const isPast = cIdx < activeClauseIdx;
                          return (
                            <span 
                              key={cIdx} 
                              className={`transition-colors duration-150 ${
                                isCurrent 
                                  ? 'text-amber-300 font-extrabold underline decoration-amber-500/50 underline-offset-2' 
                                  : isPast 
                                  ? 'text-slate-500 line-through font-normal' 
                                  : 'text-slate-305'
                              }`}
                            >
                              {c.text}
                            </span>
                          );
                        })}
                      </span>
                    ) : (
                      <span>{scene.narrative}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-slate-500 space-y-2 border border-dashed border-slate-850 rounded-2xl">
            <MessageSquareOff className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs font-sans font-light">
              未尋找到與「<span className="text-slate-300 font-semibold">{searchTerm}</span>」相符的旁白教材字幕
            </p>
            <button 
              onClick={() => setSearchTerm("")}
              className="text-[10px] text-amber-500 font-bold hover:underline"
            >
              清除篩選條件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

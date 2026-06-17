import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipBack, Volume2, Sparkles, Award, Terminal, Copy, ClipboardCheck,
  ArrowRight, Video, ListMusic, Layers, ChevronLeft, ChevronRight, Presentation, 
  Tv, CheckCircle, AlertTriangle, BookOpen, FileText, CheckSquare, Printer, Archive
} from 'lucide-react';

export interface TimelineScene {
  start: number; // in seconds
  end: number;
  title: string;
  subtitle: string;
  narrative: string;
  erpScreen: string; // 'FLOW' | 'ACPI02' | 'AJSB01' | 'AJSI20' | 'ACTI10' | 'AJSB22'
  highlightField?: string;
  visualFocus?: string;
}

interface TimelinePlayerProps {
  onSceneChange: (scene: TimelineScene, currentTime: number) => void;
  activeTime: number;
  setActiveTime: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const timelineScenes: TimelineScene[] = [
  {
    start: 0,
    end: 15,
    title: "片頭：專案流程說明",
    subtitle: "應付憑單審核與分錄底稿作業流程。",
    narrative: "本影片說明應付憑單、發票、分錄底稿、過帳與傳票整理的完整操作流程。",
    erpScreen: "FLOW",
    highlightField: "AJSB01_flow",
    visualFocus: "應付憑單審核與分錄底稿流程概觀導覽"
  },
  {
    start: 15,
    end: 35,
    title: "段落一：審核憑證",
    subtitle: "先確認發票日期、發票號碼與底稿資訊。",
    narrative: "首先審核憑證內容及發票，確認發票日期與發票號碼是否正確。若資料有誤，需依規則重新建立底稿，並以應付憑單日期作為傳票期。",
    erpScreen: "ACPI02",
    highlightField: "inv_date_acp",
    visualFocus: "底稿編號規則：個人英文字第一位 + 當天日期 + 傳票產生日期 + 筆數編號。"
  },
  {
    start: 35,
    end: 55,
    title: "段落二：輸入傳票",
    subtitle: "輸入傳票期，摘要依規定編輯。",
    narrative: "輸入傳票時，傳票期要以應付憑單日期為準。進項稅額科目的摘要需依規定格式編輯，方便後續查核與比對。",
    erpScreen: "AJSB01",
    highlightField: "ajsb_batch_id",
    visualFocus: "注意進項稅額登打順序。"
  },
  {
    start: 55,
    end: 75,
    title: "段落三：分錄底稿重點",
    subtitle: "摘要、順序與附註要一次確認。",
    narrative: "在分錄底稿中，除了摘要編輯外，也要注意進項稅額的登打順序。應付摘要需增加付款日期，立沖帳目則要補上公司統編，避免後續資料不完整。",
    erpScreen: "AJSI20",
    highlightField: "ajsi_pay_final",
    visualFocus: "完成後回分錄底稿查詢傳票號碼。"
  },
  {
    start: 75,
    end: 95,
    title: "段落四：系統流程",
    subtitle: "依系統流程完成底稿與傳票。",
    narrative: "系統流程中，應付憑單建立、分錄底稿作業、還原與查詢，以及傳票處理都要依順序完成。這一步主要是確認作業路徑，避免漏做或重複建檔。",
    erpScreen: "FLOW",
    highlightField: "AJSI20_flow",
    visualFocus: "完成後再進行總帳過帳與傳票列印。"
  },
  {
    start: 95,
    end: 115,
    title: "段落五：查詢與確認",
    subtitle: "查詢傳票號碼並確認明細。",
    narrative: "完成底稿後，需回到分錄底稿查詢傳票號碼，確認傳票已正確建立。若需修正會計科目或摘要，必須回到分錄底稿重新修正。",
    erpScreen: "AJSI20",
    highlightField: "ajs_pay_desc",
    visualFocus: "只修正分錄底稿資訊，不直接改傳票內容。"
  },
  {
    start: 115,
    end: 135,
    title: "段落六：修正原則",
    subtitle: "如需退回，請選擇傳票作廢。",
    narrative: "如果整筆要退回原承辦人員，應選擇傳票作廢，以免造成傳票跳號。若只是科目或摘要有誤，則僅限修改分錄底稿資訊，不可直接跳過流程。",
    erpScreen: "AJSB22",
    highlightField: "ajsb22_mode_void",
    visualFocus: "整筆退回時，請確保傳票狀態一致。"
  },
  {
    start: 135,
    end: 155,
    title: "段落七：建檔與審核",
    subtitle: "建立傳票後再進行確認與審核。",
    narrative: "傳票建立完成後，需再次檢查日期、摘要與金額是否正確，再進行確認、審核及後續帳務處理。",
    erpScreen: "ACTI10",
    highlightField: "acti10_unconfirm",
    visualFocus: "確認發票與憑證資訊一致。"
  },
  {
    start: 155,
    end: 185,
    title: "段落八：整理歸檔",
    subtitle: "列印傳票並整理憑證與發票。",
    narrative: "完成過帳後，需列印傳票並整理相關憑證。應付憑單最後一頁上方要書寫分錄底稿編號、傳票編號及付款日期。發票上也要書寫傳票編號，若為感熱紙，記得加 COPY 一張，總共兩張。",
    erpScreen: "ACTI10",
    highlightField: "acti10_print",
    visualFocus: "1. COPY 應付憑單最後頁上面要書寫底稿編號、傳票編號與付款日期。2. COPY 發票上面要書寫傳票編號（若為感熱紙則加印一張共 2 張）。"
  },
  {
    start: 185,
    end: 200,
    title: "結尾：完工歸檔",
    subtitle: "完成作業，請依規定歸檔。",
    narrative: "以上流程完成後，請依公司規範整理、核對並歸檔所有憑證與傳票資料。",
    erpScreen: "FLOW",
    highlightField: "AJSB22_flow",
    visualFocus: "完成日常帳務勾稽所有作業。"
  }
];

export default function TimelinePlayer({
  onSceneChange,
  activeTime,
  setActiveTime,
  isPlaying,
  setIsPlaying
}: TimelinePlayerProps) {
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false); // Start unmuted for voice narration by default
  const [activeSpeech, setActiveSpeech] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpokenSceneRef = useRef<string | null>(null);

  // Find active scene & index
  const activeSceneIndex = timelineScenes.findIndex(s => activeTime >= s.start && activeTime < s.end);
  const activeScene = activeSceneIndex !== -1 ? timelineScenes[activeSceneIndex] : timelineScenes[timelineScenes.length - 1];
  const currentSlideNum = activeSceneIndex !== -1 ? activeSceneIndex + 1 : timelineScenes.length;

  useEffect(() => {
    onSceneChange(activeScene, activeTime);
  }, [activeTime, activeScene, onSceneChange]);

  // Handle Playback Interval countdown
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveTime(prev => {
          const nextTime = prev + 1 * playbackSpeed;
          if (nextTime >= 200) {
            setIsPlaying(false);
            return 200; // Finish line
          }
          return nextTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playbackSpeed, setActiveTime, setIsPlaying]);

  // Speaking function using Web Speech TTS
  const speakNarrative = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 1.0;
      utterance.onstart = () => setActiveSpeech(true);
      utterance.onend = () => setActiveSpeech(false);
      utterance.onerror = () => setActiveSpeech(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Interactive Voice synthesis automatically speaking current scene narrative upon change if not muted
  useEffect(() => {
    if (isPlaying && !isMuted) {
      if (lastSpokenSceneRef.current !== activeScene.title) {
        lastSpokenSceneRef.current = activeScene.title;
        speakNarrative(activeScene.narrative);
      }
    } else {
      if (!isPlaying || isMuted) {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          setActiveSpeech(false);
        }
        if (isMuted) {
          lastSpokenSceneRef.current = null;
        }
      }
    }
  }, [activeScene, isPlaying, isMuted]);

  // Global cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Click handler to go next slide
  const handleNextSlide = () => {
    const nextIdx = (activeSceneIndex + 1) % timelineScenes.length;
    setActiveTime(timelineScenes[nextIdx].start);
    if (!isMuted) {
      speakNarrative(timelineScenes[nextIdx].narrative);
    }
  };

  // Click handler to go prev slide
  const handlePrevSlide = () => {
    const prevIdx = activeSceneIndex === 0 ? timelineScenes.length - 1 : activeSceneIndex - 1;
    setActiveTime(timelineScenes[prevIdx].start);
    if (!isMuted) {
      speakNarrative(timelineScenes[prevIdx].narrative);
    }
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Helper renderer to render custom slide diagram based on scene
  const renderSlideDiagram = () => {
    switch (activeScene.erpScreen) {
      case 'FLOW':
        return (
          <div className="flex items-center justify-center gap-2 md:gap-3 py-1 font-sans">
            <div className={`p-2 rounded-lg text-center ${activeSceneIndex === 0 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'} text-[11px] border border-slate-700/50`}>
              📄 憑證審核
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
            <div className={`p-2 rounded-lg text-center ${activeSceneIndex === 4 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'} text-[11px] border border-slate-700/50`}>
              ⚙️ 底稿批聯
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
            <div className={`p-2 rounded-lg text-center ${activeSceneIndex === 9 ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-300'} text-[11px] border border-slate-700/50`}>
              🗂️ 憑證歸檔
            </div>
          </div>
        );
      case 'ACPI02':
        return (
          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 text-[11px] grid grid-cols-2 gap-2 text-left font-mono">
            <div>
              <span className="text-slate-500 block">統編對照:</span>
              <span className="text-slate-200">麗嬰房 04377371</span>
            </div>
            <div>
              <span className="text-slate-500 block">憑單序期:</span>
              <span className="text-amber-400">115 會計年度</span>
            </div>
            <div>
              <span className="text-slate-500 block">複核進項稅額:</span>
              <span className="text-slate-200">$1,250 (5% 營業稅)</span>
            </div>
            <div>
              <span className="text-slate-500 block">承辦簽章:</span>
              <span className="text-emerald-400 font-bold">會計助理「合規」</span>
            </div>
          </div>
        );
      case 'AJSB01':
        return (
          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1 text-left font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">自動分錄生成軌跡:</span>
              <span className="text-emerald-400">W2026060320260527005</span>
            </div>
            <div className="text-[10px] text-slate-500 leading-normal font-sans">
              以承辦人 W 代碼與會計年 115 即時演算，關聯 AP 應付系統。
            </div>
          </div>
        );
      case 'AJSI20':
        return (
          <div className="bg-slate-950/70 p-2 border border-slate-800 rounded-lg text-left text-[10.5px] font-mono space-y-1">
            <div className="grid grid-cols-3 text-slate-500 border-b border-slate-800 pb-1">
              <span>會計科目</span>
              <span className="text-right">借方(Dr)</span>
              <span className="text-right">貸方(Cr)</span>
            </div>
            <div className="grid grid-cols-3 text-slate-300">
              <span className="truncate">1137-0100 進項稅額</span>
              <span className="text-right text-emerald-400">$1,250</span>
              <span></span>
            </div>
            <div className="grid grid-cols-3 text-slate-300">
              <span className="truncate">2143-0100 應付憑單</span>
              <span></span>
              <span className="text-right text-sky-400">$26,250</span>
            </div>
          </div>
        );
      case 'AJSB22':
        return (
          <div className="grid grid-cols-2 gap-2 text-left text-[11px] font-sans">
            <div className="p-1.5 bg-emerald-950/40 border border-emerald-900 rounded">
              <span className="block text-emerald-400 font-bold">✅ 嚴格作廢</span>
              <p className="text-[9.5px] text-slate-400">保留流水跳號序，符合商業會計法</p>
            </div>
            <div className="p-1.5 bg-rose-950/40 border border-rose-900 rounded opacity-60">
              <span className="block text-red-400 font-bold">❌ 實體刪除</span>
              <p className="text-[9.5px] text-slate-400">易斷序跳號，查帳內控大缺失</p>
            </div>
          </div>
        );
      case 'ACTI10':
        return (
          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 text-left text-[10.5px] space-y-1.5 font-mono">
            <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-1">
              <span>🖨️ 經手書寫印出歸檔註記:</span>
              <span className="text-amber-400 font-bold text-[9.5px] bg-amber-950/40 border border-amber-900/40 px-1 rounded">裝訂政策要求</span>
            </div>
            <div className="space-y-1 text-slate-300 text-[10px] font-sans leading-relaxed">
              <div>1️⃣ <span className="font-semibold text-amber-300">COPY 應付憑單最後頁上方手寫：</span></div>
              <div className="pl-3 text-[9.5px] font-mono text-slate-400">底稿：W2026060320260527005 / 傳票：910-20260527009 / 付款：240615</div>
              <div>2️⃣ <span className="font-semibold text-sky-300">COPY 發票上方手寫：</span></div>
              <div className="pl-3 text-[9.5px] font-mono text-slate-400">傳票：910-20260527009 （感熱紙加 COPY 一張，共 2 張）</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="video-training-player" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col gap-5 shadow-2xl select-none font-sans">
      
      {/* PPT Deck Master Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-950 p-3 px-5 rounded-xl border-l-[6px] border-amber-500 gap-2 shadow-inner">
        <div className="flex items-center gap-2.5">
          <Presentation className="w-5 h-5 text-amber-500 shrink-0" />
          <span className="text-amber-400 text-xs font-bold font-mono tracking-widest uppercase">
            [ 互動簡報暨隨選語音旁白課堂 ]
          </span>
          <span className="text-[#182a4a] bg-amber-100 text-[10.5px] font-extrabold p-0.5 px-2.5 rounded-full shadow">
            第 {currentSlideNum} / 10 頁
          </span>
        </div>
        <div className="text-[11.5px] font-mono text-slate-400 flex items-center gap-2">
          進度: <span className="text-amber-300 font-semibold">{formatTime(activeTime)} / 03:20</span>
        </div>
      </div>

      {/* Main Slide / 簡報頁 Viewport Frame */}
      <div className="bg-gradient-to-b from-[#111e35] to-[#0c1424] rounded-2xl p-6 min-h-[290px] flex flex-col justify-between border-2 border-slate-800/80 relative overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* PowerPoint Grid lines & ambient decor */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-wrap gap-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-8 h-8 border border-white rounded"></div>
          ))}
        </div>

        {/* Slide Header area */}
        <div className="flex justify-between items-start z-10">
          <div className="bg-gradient-to-r from-amber-500/20 to-indigo-500/10 border border-amber-500/30 p-1.5 px-3 rounded-lg text-[10.5px] text-amber-300 font-bold tracking-wide font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow shrink-0" />
            <span>會計勾稽變焦定位：{activeScene.visualFocus}</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/60 text-slate-300 text-[10px] px-2.5 py-1 rounded-full font-mono shadow-sm">
            🖥️ 鼎新 ERP【{activeScene.erpScreen}】
          </div>
        </div>

        {/* Dynamic Presentation Body - Structured Layouts */}
        <div className="my-5 text-center px-4 z-10 space-y-4">
          <h2 className="text-lg md:text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
            {activeScene.title}
          </h2>
          
          <p className="text-amber-200 font-medium text-xs md:text-sm max-w-2xl mx-auto leading-relaxed border-t border-b border-white/5 py-2.5">
            「 {activeScene.subtitle} 」
          </p>

          {/* Core visual illustration embedded on slide depending on ERP screen */}
          <div className="max-w-md mx-auto mt-2">
            {renderSlideDiagram()}
          </div>
        </div>

        {/* Presentation Speaker Narration & soundwaves */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 z-10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3 w-full sm:w-[85%] text-left">
            <div className="relative shrink-0">
              <div className={`w-9 h-9 rounded-full bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-xs font-bold ${activeSpeech ? 'ring-2 ring-emerald-400 animate-pulse' : ''}`}>
                🎤
              </div>
              {activeSpeech && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-slate-900 animate-ping"></div>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[9.5px] text-amber-400 font-semibold block tracking-wider uppercase font-sans">
                {activeScene.title} • {activeScene.subtitle} (講師 主管 & 實習生 口播旁白)
              </span>
              <p className="text-slate-100 text-[11px] sm:text-[11.5px] md:text-[12px] leading-relaxed font-medium tracking-wide">
                {activeScene.narrative}
              </p>
            </div>
          </div>

          {/* Dynamic Audio Visualizer */}
          <div className="flex gap-0.5 items-end h-5 w-12 shrink-0">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 rounded-t-sm bg-gradient-to-t from-amber-500 to-amber-300 transition-all duration-150 ${
                  activeSpeech 
                    ? 'opacity-100' 
                    : 'opacity-30'
                }`}
                style={{ 
                  height: activeSpeech 
                    ? `${Math.max(15, Math.floor(Math.random() * 100))}%` 
                    : '15%' 
                }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Slide Navigation & Control panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 shadow-md">
        
        {/* Previous / Play / Next Controls */}
        <div className="md:col-span-5 flex items-center gap-2 justify-center md:justify-start">
          <button
            onClick={handlePrevSlide}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 rounded-xl text-slate-300 font-bold transition-all flex items-center gap-1 cursor-pointer"
            title="回上一張投影片"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs">上一頁</span>
          </button>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            id="play-pause-btn"
            className={`p-2.5 px-6 rounded-full font-extrabold flex items-center gap-2 shadow-lg transition-transform ${
              isPlaying 
                ? 'bg-[#182a4a] text-white border border-[#2a4577] hover:bg-indigo-900 scale-[1.02]' 
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-extrabold'
            } cursor-pointer`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span className="text-xs">暫停播放</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span className="text-xs">簡報自動播放</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextSlide}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 rounded-xl text-slate-300 font-bold transition-all flex items-center gap-1 cursor-pointer"
            title="下一張投影片"
          >
            <span className="text-xs">下一頁</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speak / Mute / Speed */}
        <div className="md:col-span-4 flex items-center gap-2.5 justify-center">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (isMuted) {
                speakNarrative(activeScene.narrative);
              } else {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setActiveSpeech(false);
                }
              }
            }}
            className={`p-2 px-4 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              !isMuted 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/40 hover:bg-rose-500/30'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{!isMuted ? "🔊 旁白發聲中" : "🔇 旁白已靜音"}</span>
          </button>

          <button
            onClick={() => speakNarrative(activeScene.narrative)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold border border-slate-700 text-slate-400 cursor-pointer flex items-center gap-1"
            title="手動重新發音一次"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>手動發音</span>
          </button>
        </div>

        {/* Autoplay Advancement speed configuration */}
        <div className="md:col-span-3 flex items-center gap-1.5 justify-center md:justify-end">
          <span className="text-[10.5px] text-slate-400 font-mono">幻燈片更替速度:</span>
          {[1, 2, 5].map(speed => (
            <button 
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              className={`p-1 px-2 text-xs font-mono rounded cursor-pointer transition-colors ${
                playbackSpeed === speed 
                  ? 'bg-amber-500 text-slate-950 border border-amber-500 font-bold' 
                  : 'bg-slate-800 hover:bg-slate-700 text-gray-400 border border-transparent'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>

      </div>

      {/* Grid Table of Pages */}
      <div className="space-y-2">
        <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
          <ListMusic className="w-4 h-4 text-amber-500" />
          <span>簡報章節目錄索引 (點擊任一頁即可直接投射，上方 ERP 模組模擬會同步定位變焦)</span>
        </span>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {timelineScenes.map((scene, i) => {
            const isActive = activeTime >= scene.start && activeTime < scene.end;
            return (
              <button 
                key={i}
                type="button"
                onClick={() => {
                  setActiveTime(scene.start);
                  if (!isMuted) {
                    speakNarrative(scene.narrative);
                  }
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between h-[65px] ${
                  isActive 
                    ? 'bg-gradient-to-br from-amber-500/15 to-indigo-500/10 border-amber-500 text-amber-200 shadow-lg scale-[1.01]' 
                    : 'bg-slate-950/60 hover:bg-slate-800/50 border-slate-900 text-slate-400'
                }`}
              >
                <div className="flex justify-between w-full items-center">
                  <span className={`text-[9.5px] font-mono ${isActive ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                    投影片 {i + 1}
                  </span>
                  <span className="text-[8px] font-mono p-0.5 px-1 bg-slate-900 border border-slate-800 text-slate-500 rounded font-bold uppercase shrink-0">
                    {scene.erpScreen}
                  </span>
                </div>
                <div className="text-[10px] font-bold truncate w-full mt-1">{scene.title}</div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

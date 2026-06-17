import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, CheckCircle2, Tv, Sparkles, BookOpen, BookMarked } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  bullets: string[];
  associatedScene: string;
  associatedTime: number; // seconds
  screenType: string;
  highlightBoxes: string[]; // text descriptions of red rectangles
  caption: string;
}

const slidesData: Slide[] = [
  {
    id: 1,
    title: "審核憑證與發票",
    bullets: [
      "審核憑證內容及發票。",
      "發票日期或發票號碼錯誤時，需重新建立底稿。",
      "作業重點：先確認資料正確，再進入後續登打。"
    ],
    associatedScene: "段落一：審核憑證",
    associatedTime: 15,
    screenType: "ACPI02",
    highlightBoxes: [
      "畫面重點：審核發票字軌與金額",
      "先確認憑證資料（日期與發票號）正確"
    ],
    caption: "步驟一：審核憑證內容及發票核對要領"
  },
  {
    id: 2,
    title: "建立底稿與傳票期",
    bullets: [
      "底稿編號：個人英文字第一位 + 1150602 + 傳票產生日期 + 001（第幾筆）。",
      "輸入傳票期為應付憑單日期。",
      "進項稅額科目摘要編輯成：AY56654359-20260527-麗嬰房。"
    ],
    associatedScene: "段落二：產生底稿",
    associatedTime: 35,
    screenType: "AJSB01_FLOW",
    highlightBoxes: [
      "底稿編號公式：W + 1150602 + 傳票產生日 + 三位流水",
      "進項稅額摘要格式為「發票字軌號碼-憑單日期-往來廠商」"
    ],
    caption: "步驟二：底稿批號流水命名與摘要命名要領"
  },
  {
    id: 3,
    title: "分錄底稿注意事項",
    bullets: [
      "摘要編輯依據會計部規範確實登載簡明扼要。",
      "進項稅額登打依標準核對順序，不可漏列漏登。",
      "應付摘要要增加付款日期，利於出納稽核登帳與沖帳平衡。",
      "立沖帳目要補上公司統編，確保公司主體稽核無誤。"
    ],
    associatedScene: "段落三：底稿維護",
    associatedTime: 55,
    screenType: "AJSI20_FLOW",
    highlightBoxes: [
      "應付摘要務必補上「付款日期」欄位",
      "立沖費用與帳目務必在摘要欄備註「公司統一編號（04377371）」"
    ],
    caption: "步驟三：各分錄底稿借貸明細核心登打注意細則"
  },
  {
    id: 4,
    title: "查詢與過帳",
    bullets: [
      "回分錄底稿查詢傳票號碼。",
      "再至總帳過帳及列印傳票。",
      "確認傳票號碼、摘要與金額都正確。"
    ],
    associatedScene: "段落四：拋轉傳票",
    associatedTime: 75,
    screenType: "AJSB20",
    highlightBoxes: [
      "系統拋轉完畢後，回 AJSI20 查詢相應生成的正式傳票編號",
      "至總帳 ACTI10 做最終過帳確認 Y，確保帳務完全上鎖"
    ],
    caption: "步驟四：分錄底稿反向查詢與總帳傳票確認過帳"
  },
  {
    id: 5,
    title: "整理憑證及傳票",
    bullets: [
      "COPY 應付憑單最後頁，上面書寫分錄底稿編號、傳票編號及付款日期。",
      "COPY 發票上面書寫傳票編號。",
      "若為感熱紙，要加 COPY 一張，共 2 張。"
    ],
    associatedScene: "段落八：整理歸檔",
    associatedTime: 155,
    screenType: "ACTI10",
    highlightBoxes: [
      "憑單末頁手寫「底稿編號、傳票編號、付款日期」",
      "發票影本裝訂防熱感褪色，上面手寫「傳票編號」"
    ],
    caption: "步驟五：憑證傳票手寫註記與感熱影印本雙重裝訂歸卷"
  },
  {
    id: 6,
    title: "修正與退回",
    bullets: [
      "發現會計科目或摘要有誤時，分錄底稿要全部重新修正。",
      "限：只修正分錄底稿資訊。",
      "如整筆要退回原承辦人員，需選擇傳票作廢，以免造成傳票跳號。"
    ],
    associatedScene: "段落五：查詢與確認",
    associatedTime: 95,
    screenType: "AJSB22_QUERY",
    highlightBoxes: [
      "會計修改大律：只可修正分錄底稿，禁止手工直改總帳傳票",
      "還原應選擇 AJSB22 傳票作廢模式，防止記帳序號中斷"
    ],
    caption: "步驟六：傳票異常還原原則與系統序號控管限制"
  },
  {
    id: 7,
    title: "整筆退回原承辦人員",
    bullets: [
      "整筆退回時，先確認是否要作廢傳票。",
      "作廢後再重新修正或重新建立。",
      "避免發生傳票跳號。"
    ],
    associatedScene: "段落六：修正原則",
    associatedTime: 115,
    screenType: "AJSB22_REVERT",
    highlightBoxes: [
      "退件稽核動作：一律保留傳票流水廢止紀錄",
      "作廢後重新修正重拋，避免系統產生跳號斷軌"
    ],
    caption: "步驟七：整件承辦退件及傳票流水安全處理常規"
  },
  {
    id: 8,
    title: "完成歸檔",
    bullets: [
      "完成後依公司規範整理、核對並歸檔所有憑證與傳票資料。"
    ],
    associatedScene: "結尾：完工歸檔",
    associatedTime: 185,
    screenType: "FLOW_MAP",
    highlightBoxes: [
      "依序整理裝訂成冊、核對金額筆數一致",
      "依據公司管理標準將實體全案歸入專用檔案櫃保管"
    ],
    caption: "步驟八：憑證檔案歸位完成、稽核大循環合規封箱"
  }
];

interface OriginalSlideshowProps {
  setActiveTime: (time: number) => void;
  setCurrentTab: (tab: 'simulation' | 'transcript' | 'chat' | 'slides') => void;
  setIsPlaying: (playing: boolean) => void;
  currentTime?: number;
  autoSync?: boolean;
  onAutoSyncToggle?: (sync: boolean) => void;
  compactMode?: boolean;
}

export default function OriginalSlideshow({ 
  setActiveTime, 
  setCurrentTab, 
  setIsPlaying,
  currentTime,
  autoSync = true,
  onAutoSyncToggle,
  compactMode = false
}: OriginalSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper mapping from currentTime to slide index (0 to 7)
  const getActiveSlideIndex = (time: number): number => {
    if (time < 15) return 7;    // Slide 8 (全域流程 0s - 15s)
    if (time < 35) return 0;    // Slide 1 (應付憑單與進項發票審核 ACPI02 15s - 35s)
    if (time < 55) return 1;    // Slide 2 (產生分錄底稿批次程序 AJSB01_FLOW 35s - 55s)
    if (time < 75) return 2;    // Slide 3 (分錄底稿借貸平衡與摘要 AJSI20_FLOW 55s - 75s)
    if (time < 95) return 3;    // Slide 4 (分錄底稿拋轉會計傳票 AJSB20 75s - 95s)
    if (time < 115) return 5;   // Slide 6 (會計傳票查詢條件與對等關係 AJSB22_QUERY 95s - 115s)
    if (time < 135) return 6;   // Slide 7 (還原會計傳票與退件作廢 AJSB22_REVERT 115s - 135s)
    if (time < 185) return 4;   // Slide 5 (總帳會計傳票建檔、審核與列印 ACTI10 135s - 185s)
    return 7;                   // Slide 8 (完成歸檔 185s+)
  };

  // Sync index automatically if autoSync is enabled and currentTime changes
  useEffect(() => {
    if (autoSync && currentTime !== undefined) {
      const targetIdx = getActiveSlideIndex(currentTime);
      setCurrentIndex(targetIdx);
    }
  }, [currentTime, autoSync]);

  const currentSlide = slidesData[currentIndex];

  const handleNext = () => {
    if (autoSync && onAutoSyncToggle) {
      onAutoSyncToggle(false);
    }
    setCurrentIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (autoSync && onAutoSyncToggle) {
      onAutoSyncToggle(false);
    }
    setCurrentIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const handleJumpToTimeline = () => {
    setActiveTime(currentSlide.associatedTime);
    setIsPlaying(false);
    setCurrentTab("simulation");
    
    // Play sound chime feedback if possible
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch(e) {}
  };
  if (compactMode) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-4 text-left flex flex-col justify-between h-full select-none font-sans">
        
        {/* Slide Title Bar */}
        <div className="bg-[#1b4e82] px-4 py-2 flex justify-between items-center rounded-lg border border-sky-950">
          <span className="text-white font-extrabold text-xs md:text-[13px] tracking-wide truncate">
            {currentIndex + 1}/8. {currentSlide.title}
          </span>
          <div className="text-[10px] text-sky-200 font-mono font-bold uppercase tracking-wider flex items-center gap-1 p-0.5 px-2 bg-sky-900/40 rounded border border-sky-850/20 shrink-0">
            <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
            <span>講義對照</span>
          </div>
        </div>

        {/* Slide Content Split Body */}
        <div className="bg-[#f1f5f9] p-3 rounded-xl border border-slate-300 grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch min-h-[300px] overflow-y-auto">
          
          {/* Left Side: slide bullets */}
          <div className="md:col-span-6 bg-white rounded-xl p-3 shadow-sm border border-slate-200 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1 p-0.5 px-2.5 bg-slate-100 rounded-full text-slate-600 text-[9.5px] font-black tracking-wide border border-slate-200">
                <BookOpen className="w-3 h-3 text-slate-500" />
                <span>內控制度與程序說明</span>
              </span>

              <ul className="space-y-4 text-slate-800 text-[14px] sm:text-[15px] md:text-[15.5px] leading-relaxed">
                {currentSlide.bullets.map((bullet, idx) => {
                  const parts = bullet.split("：");
                  return (
                    <li key={idx} className="flex items-start gap-1.5 text-slate-800 font-normal">
                      <span className="mt-2 w-1 h-1 bg-slate-950 rounded-full shrink-0 animate-pulse"></span>
                      <p className="leading-relaxed">
                        {parts.length > 1 ? (
                          <>
                            <strong className="text-slate-950 font-black">{parts[0]}：</strong>
                            <span className="text-slate-700 font-medium">{parts[1]}</span>
                          </>
                        ) : (
                          <span className="text-slate-750 font-medium">{bullet}</span>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Manual match trigger */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <div className="text-[9px] text-slate-400 font-mono flex justify-between">
                <span>分鏡章節：</span>
                <span className="text-indigo-600 font-bold">{currentSlide.associatedScene}</span>
              </div>
              <button
                onClick={handleJumpToTimeline}
                className="w-full p-2 bg-[#1b4e82] hover:bg-[#153e68] text-white text-[10.5px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 shadow cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5 text-amber-300 stroke-[2.5]" />
                <span>🎯 同步視訊與此頁對齊</span>
              </button>
            </div>
          </div>

          {/* Right Side: original slide annotation diagram */}
          <div className="md:col-span-6 bg-[#f8fafc] rounded-xl p-3 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[180px]">
            
            {/* Slide mockup preview */}
            <div className="bg-slate-200 rounded-lg border border-slate-300 overflow-hidden flex-1 flex flex-col relative text-[10px]">
              <div className="bg-slate-300 px-2 py-1 flex justify-between items-center text-[8.5px] font-mono text-slate-600 border-b border-slate-300">
                <span className="font-bold truncate">Cosmos ERP - [{currentSlide.screenType}]</span>
              </div>

              <div className="bg-slate-100 p-2 flex-1 flex flex-col justify-between space-y-1 relative">
                
                {currentSlide.screenType === "AJSB20" && (
                  <div className="space-y-1 text-[9px] text-slate-700">
                    <div className="bg-[#1b4e82]/5 p-0.5 rounded border border-slate-300 text-indigo-950 font-bold">拋轉會計傳票 AJSB20</div>
                    <div className="relative p-1 bg-indigo-50/50 border border-slate-350 rounded text-[8.5px] space-y-1">
                      <div className="flex justify-between font-mono bg-white p-0.5 border border-slate-200 rounded">
                        <span className="font-extrabold text-[8px]">W20260603...</span>
                        <span className="text-emerald-650 text-[7.5px] font-bold">APPROVED</span>
                      </div>
                      <div className="bg-[#1b4e82] text-white p-0.5 rounded font-bold text-center text-[8px]">
                        整批拋轉正式傳票
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "AJSB01_FLOW" && (
                  <div className="space-y-1">
                    <div className="text-slate-500 font-bold text-[8px]">AJSB01 產生分錄底稿作業</div>
                    <div className="relative p-1 bg-amber-50 border border-red-500 rounded text-center text-[8.5px] font-bold text-indigo-950">
                      AJSB01 底稿產生器引擎
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "AJSI20_FLOW" && (
                  <div className="space-y-1">
                    <div className="text-[8.5px] text-slate-400 font-bold">分錄底稿維護 (AJSI20)</div>
                    <div className="relative p-1 bg-rose-50 border border-red-500 rounded text-[9px] font-medium text-slate-800">
                      麗嬰房租金借貸勾稽合規
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "ACPI02" && (
                  <div className="space-y-1 text-[8.5px] text-slate-700">
                    <div className="bg-[#1b4e82]/10 p-0.5 font-bold rounded">ACPI02 應付憑單維護</div>
                    <div className="relative border border-red-500 p-1 rounded bg-yellow-50/50">
                      <div>發票統編: 04377371</div>
                      <div className="text-red-600 font-bold text-[8.5px]">額: $2,056,090 (稅額 $102,805)</div>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "ACTI10" && (
                  <div className="space-y-1 text-[8.5px]">
                    <div className="relative border border-red-500 p-1 bg-emerald-50 rounded">
                      <div className="text-emerald-750 font-bold">過帳狀況: 已確認 [Y]</div>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "AJSB22_QUERY" && (
                  <div className="space-y-1 text-[8.5px]">
                    <div className="relative border border-red-500 p-1 rounded bg-amber-50">
                      <span className="font-mono block font-bold text-amber-900 truncate">W2026060320260527005</span>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "FLOW_MAP" && (
                  <div className="space-y-1 text-center">
                    <span className="relative border border-red-500 p-0.5 bg-amber-50 rounded text-[8.5px] font-bold text-indigo-950 block">原廠 PDF 全域系統流程圖</span>
                  </div>
                )}

                {currentSlide.screenType === "AJSB22_REVERT" && (
                  <div className="space-y-1 text-[8.5px]">
                    <div className="relative border border-red-500 p-1 rounded bg-white">
                      <span className="block text-red-600 font-bold text-[8.5px]">還原：【傳票作廢】</span>
                    </div>
                  </div>
                )}
                
                <span className="hidden md:inline-block font-mono text-[7px] text-slate-400 select-none text-right">
                  [紅框為關鍵重點區]
                </span>
              </div>
            </div>

            {/* Highlights label */}
            <div className="mt-1 bg-white p-1 rounded border border-slate-200">
              <span className="text-[8px] font-extrabold text-[#1b4e82] uppercase tracking-wider block">
                🔴 紅標重點:
              </span>
              <p className="text-[9px] text-slate-500 font-medium font-sans truncate">
                {currentSlide.highlightBoxes.join(" ➡ ")}
              </p>
            </div>

          </div>

        </div>

        {/* Slide Deck Controllers in compact mode */}
        <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1 px-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-0.5"
            >
              <ChevronLeft className="w-3 h-3" /> 上頁
            </button>
            
            <span className="text-slate-300 font-bold text-[10px] font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
              {currentIndex + 1} / {slidesData.length}
            </span>

            <button
              onClick={handleNext}
              className="p-1 px-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-0.5"
            >
              下頁 <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[8.5px] text-slate-500 select-none">時間軸播片:</span>
            <button
              onClick={() => {
                if (onAutoSyncToggle) {
                  onAutoSyncToggle(!autoSync);
                }
              }}
              className={`p-1 px-2 text-[10px] rounded font-bold cursor-pointer transition-colors ${
                autoSync ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400" : "bg-slate-700 text-slate-350 hover:bg-slate-600"
              }`}
            >
              {autoSync ? "自動同步中" : "開啟自動同步"}
            </button>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6 text-slate-200">
      
      {/* Top Banner Slide Title bar resembling exact physical PPT structure */}
      <div className="bg-[#1b4e82] px-6 py-4 rounded-3xl border border-sky-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-lg">
        <div className="space-y-1 text-left">
          <span className="text-[11.5px] uppercase tracking-widest font-mono text-cyan-200 font-extrabold block">
            章節：自動分錄模組 AJSB01 ➔ AJSB20
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight font-sans">
            {currentIndex + 1}/8. {currentSlide.title}
          </h2>
        </div>
        <div className="bg-sky-900/40 border border-sky-800 p-2 rounded-2xl flex items-center gap-2 select-none">
          <BookMarked className="w-5 h-5 text-amber-300 animate-pulse" />
          <div className="text-left">
            <p className="text-[9.5px] text-sky-200 font-bold uppercase tracking-wider font-mono">
              內控講義教材
            </p>
            <p className="text-[11.5px] text-white font-extrabold font-sans">
              系統操作配圖對照
            </p>
          </div>
        </div>
      </div>

      {/* Main Slide Presentation Stage Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Left Side: White Instruction Card (Exactly like the bullets list with big white card in images) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 md:p-6 shadow-md border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 p-1 px-3 bg-slate-100 rounded-full text-slate-700 text-xs font-black tracking-wide border border-slate-200">
                <BookOpen className="w-4 h-4 text-[#1b4e82] shrink-0 animate-pulse" />
                <span>內控制度與程序說明</span>
              </span>

              <ul className="space-y-5 text-slate-800 text-[15.5px] md:text-[16.5px] leading-relaxed">
                {currentSlide.bullets.map((bullet, idx) => {
                  const parts = bullet.split("：");
                  return (
                    <li key={idx} className="flex items-start gap-2 text-slate-800 font-normal">
                      <span className="mt-2.5 w-1.5 h-1.5 bg-slate-950 rounded-full shrink-0 animate-pulse"></span>
                      <p className="leading-relaxed">
                        {parts.length > 1 ? (
                          <>
                            <strong className="text-slate-950 font-black">{parts[0]}：</strong>
                            <span className="text-slate-700 font-medium">{parts[1]}</span>
                          </>
                        ) : (
                          <span className="text-slate-750 font-medium">{bullet}</span>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick action or guide */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                <span>對應章節：</span>
                <span className="text-indigo-600 font-extrabold">{currentSlide.associatedScene}</span>
              </div>
              <button
                onClick={handleJumpToTimeline}
                className="w-full p-2.5 bg-[#1b4e82] hover:bg-[#153e68] text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Tv className="w-4 h-4 text-amber-300 stroke-[2.5]" />
                <span>🎯 同步視訊與此頁對齊</span>
              </button>
            </div>
          </div>

          {/* Right Side: Mock Cosmos ERP screenshot with annotation boxes */}
          <div className="lg:col-span-7 bg-[#f8fafc] rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[300px]">
            
            {/* Slide mockup preview */}
            <div className="bg-slate-200 rounded-2xl border border-slate-350 overflow-hidden flex-1 flex flex-col relative text-[11px]">
              
              {/* Fake systems header */}
              <div className="bg-slate-300 px-3 py-1.5 flex justify-between items-center text-[10px] font-mono text-slate-600 border-b border-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                  <span className="pl-1 font-bold text-slate-700">鼎新 Cosmos ERP - [{currentSlide.screenType}]</span>
                </div>
                <span className="text-[9px]">艾盟仕股份有限公司 (2026)</span>
              </div>

              <div className="bg-slate-100 p-4 flex-1 flex flex-col justify-between space-y-3 relative">

                {currentSlide.screenType === "AJSB20" && (
                  <div className="space-y-2 text-left text-[10.5px]">
                    <div className="bg-slate-300 p-1 text-[9.5px] font-bold uppercase">AJSB20 拋轉會計傳票</div>
                    <div className="p-3 bg-white border rounded shadow-sm space-y-2">
                      <div className="bg-emerald-50 text-emerald-800 p-1 rounded font-bold text-center">
                        整批拋轉正式傳票
                      </div>
                      <div className="border p-2 rounded bg-slate-50 space-y-1">
                        <div>分錄底稿單號: <span className="font-mono font-bold text-slate-800">W2026060320260527005</span></div>
                        <div className="text-[#1b4e82] font-bold">傳票號碼: 910-20260527009 (自動回寫系統)</div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "AJSB01_FLOW" && (
                  <div className="space-y-2 text-left text-[10.5px]">
                    <div className="bg-slate-300 p-1 text-[9.5px] font-bold uppercase">AJSB01 產生分錄底稿作業</div>
                    <div className="p-3 bg-white border rounded shadow-sm space-y-2">
                      <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 p-2 rounded text-center">
                        <span className="block font-bold text-[#1b4e82]">底稿批號流水命名對齊</span>
                        <span className="block font-mono text-[9px] mt-1 text-slate-600">公式: Personal_Initial + "1150602" + YYYYMMDD + NNN</span>
                      </div>
                      <div className="border-2 border-red-500 p-2 rounded bg-amber-50">
                        <div className="text-amber-900 font-bold">底稿批號: <span className="font-mono text-red-650 font-extrabold">W115060220260527001</span></div>
                        <div className="text-[8.5px] text-slate-500 mt-1">
                          摘要包含字軌、憑單日期、麗嬰房。
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "AJSI20_FLOW" && (
                  <div className="space-y-2 text-left">
                    <div className="text-slate-500 font-bold text-[10px] uppercase">分錄底稿維護作業 (AJSI20) ➜ 傳票轉換</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-white border rounded">
                        <span className="block font-bold">借方合計</span>
                        <span className="text-emerald-600 font-mono font-bold">$2,158,895</span>
                      </div>
                      <div className="p-2 bg-white border rounded">
                        <span className="block font-bold">貸方合計</span>
                        <span className="text-emerald-600 font-mono font-bold">$2,158,895</span>
                      </div>
                    </div>
                    {/* RED HIGHLIGHT BLOCK */}
                    <div className="relative p-1.5 bg-rose-50 border-2 border-red-500 rounded-lg text-center text-rose-955">
                      <span className="font-bold text-[10.5px]">底稿明細：麗嬰房租金借貸勾稽與稅額</span>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "ACPI02" && (
                  <div className="space-y-2 text-[10px] text-left">
                    <div className="bg-[#1b4e82]/10 p-1.5 font-bold rounded">ACPI02 應付憑單維護</div>
                    <div className="p-2 bg-white border rounded space-y-1">
                      <div>發票統編: <span className="font-mono">04377371</span></div>
                      
                      {/* RED HIGHLIGHT */}
                      <div className="relative border-2 border-red-500 p-1.5 rounded bg-yellow-50/50">
                        <div>發票字軌號碼: <span className="font-mono text-red-650 font-bold">AY56654359</span></div>
                        <div>發票金額: <span className="font-mono font-bold">$2,158,895 (貨款 $2,056,090 / 稅額 $102,805)</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "ACTI10" && (
                  <div className="space-y-1.5 text-[10px] text-left">
                    <div className="bg-slate-300 p-1 font-bold">會計傳票建立與過帳作業 (ACTI10)</div>
                    <div className="p-2 bg-white border rounded space-y-1">
                      <div>傳票單號: <span className="font-mono font-bold text-slate-800">910-20260527009</span></div>
                      
                      {/* RED HIGHLIGHT */}
                      <div className="relative border-2 border-red-500 p-1 bg-emerald-50/40 rounded">
                        <div className="text-emerald-700 font-bold">審核狀態: 過帳確認 [Y] (主管聯網簽章已鎖定)</div>
                        <div className="text-slate-400 text-[8px] mt-0.5">核簽字軌：主管廖有毅 (L) & 承辦王淑菲 (W)</div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "AJSB22_QUERY" && (
                  <div className="space-y-2 text-[10px] text-left">
                    <div className="bg-slate-300 p-1 text-[9px] font-bold uppercase">AJSB22 傳票查詢 & 批次還原管制區</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="p-1 border bg-white">查詢底稿: Y</div>
                      <div className="p-1 border bg-white">傳票已產出</div>
                    </div>
                    {/* RED HIGHLIGHT */}
                    <div className="relative border-2 border-red-500 p-2 rounded bg-amber-50">
                      <span className="font-mono block text-[10.5px] font-bold text-amber-900">條件：W2026060320260527005</span>
                      <span className="text-[8px] text-slate-500">此查詢確保源頭底稿與傳票 1:1 對等勾稽關係</span>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "FLOW_MAP" && (
                  <div className="space-y-2 text-left">
                    <div className="text-slate-500 font-bold text-[10px]">自動分錄模組全域流程</div>
                    <div className="flex items-center gap-1.5 justify-center py-2">
                      <span className="p-1 bg-slate-200 border rounded text-[9px]">ACPI02</span>
                      <span>➔</span>
                      {/* RED HIGHLIGHT */}
                      <span className="relative border-2 border-red-500 p-1 px-1.5 bg-amber-100 rounded text-[9px] font-bold animate-pulse text-indigo-950">AJSB01</span>
                      <span>➔</span>
                      <span className="p-1 bg-slate-200 border rounded text-[9px]">AJSI20</span>
                      <span>➔</span>
                      <span className="p-1 bg-slate-200 border rounded text-[9px]">AJSB20</span>
                    </div>
                  </div>
                )}

                {currentSlide.screenType === "AJSB22_REVERT" && (
                  <div className="space-y-1.5 text-[10px] text-left">
                    <div className="bg-slate-300 p-1 font-bold">還原傳票控制台 (AJSB22)</div>
                    <div className="p-2 bg-rose-50 border border-slate-300 rounded space-y-1">
                      <div className="text-red-700 font-extrabold flex items-center gap-1">
                        <span>⚠️ 內控法規警告：</span>
                      </div>
                      
                      {/* RED HIGHLIGHT */}
                      <div className="relative border-2 border-red-500 p-1.5 rounded bg-white">
                        <span className="block text-[10px] font-bold text-red-600 flex items-center gap-1.5">
                          <span>◎ 還原模式勾選：【傳票作廢】</span>
                        </span>
                        <span className="block text-[8.5px] text-slate-500 leading-normal mt-0.5">
                          禁止物理刪除總帳實體，保持商業會計憑證連續性。
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Annotation helper watermark */}
                <span className="absolute bottom-2 left-3 font-mono text-[8px] text-slate-400 select-none">
                  [講義標記紅色外框為學員關鍵視覺重點區]
                </span>

              </div>

              {/* Caption footer overlay */}
              <div className="bg-slate-900 px-6 py-2 border-t border-slate-800 text-[10.5px] font-mono text-slate-400 flex justify-between items-center">
                <span className="truncate">🔖 圖標：{currentSlide.caption}</span>
                <span className="text-[9.5px] text-slate-500 font-bold shrink-0">鼎新 Cosmos ERP 配圖對照</span>
              </div>

            </div>

            {/* Red annotation visual labels bar */}
            <div className="mt-4 space-y-1.5 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-left">
              <span className="text-[11px] font-black text-[#1b4e82] uppercase tracking-wider block">
                🔴 紅框標註重點 (Red Highlight Focus):
              </span>
              <p className="text-[12px] md:text-[13px] leading-relaxed text-slate-800 font-semibold font-sans">
                {currentSlide.highlightBoxes.join(" ➜ ")}
              </p>
            </div>

          </div>

        </div>

      {/* Playback matching indicator */}
      <div className="bg-[#1b4e82]/10 border border-[#1b4e82]/20 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="font-sans">
            本頁面投影片對應至影片分鏡：<strong className="text-amber-400"> 「{currentSlide.associatedScene}」</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveTime(currentSlide.associatedTime);
              setIsPlaying(true);
              setCurrentTab("simulation");
            }}
            className="p-1 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>立即播放該片段教學 (語音同步)</span>
          </button>
        </div>
      </div>

      {/* Standard Slide Navigation buttons & markers (matches PPT layout) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 transition-colors cursor-pointer"
            title="上一張投影頁"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-slate-300 font-bold text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg select-all">
            頁碼：{currentIndex + 1} / {slidesData.length}
          </span>

          <button
            onClick={handleNext}
            className="p-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 transition-colors cursor-pointer"
            title="下一張投影頁"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Small PPT authoring label in raw Taiwanese style precisely matching the target slides bottom labels */}
        <span className="text-[11px] text-slate-500 font-sans tracking-wide">
          使用原始截圖搭配說明 {currentSlide.id}/8
        </span>
      </div>

    </div>
  );
}

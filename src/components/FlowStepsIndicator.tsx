import React from 'react';
import { 
  FileText, PlusSquare, ArrowRightLeft, BookOpen, Printer, CheckSquare, Sparkles 
} from 'lucide-react';

interface FlowStepsIndicatorProps {
  activeTime: number;
  onSelectStep: (startTime: number) => void;
}

export interface FlowSection {
  title: string;
  sub: string;
  start: number;
  end: number;
  icon: any;
  desc: string;
}

export const flowSections: FlowSection[] = [
  {
    title: "第一段：審核憑證",
    sub: "發票核驗與底稿重估",
    start: 10,
    end: 40,
    icon: FileText,
    desc: "覈對 5 月發票號 AY56654359 與單據日期，建立民國底稿批號 W2026060320260527005 "
  },
  {
    title: "第二段：摘要規整",
    sub: "科目摘要與登打順序",
    start: 40,
    end: 75,
    icon: PlusSquare,
    desc: "1137-0100 營業稅科目需以 [公司統編][發票]-[淨額]-[稅額] 的特殊摘要，應付憑單附註付款日"
  },
  {
    title: "第三段：進度抛轉",
    sub: "底稿完成並轉帳傳票",
    start: 75,
    end: 110,
    icon: ArrowRightLeft,
    desc: "AJSB01 批號拋轉會計傳票 AJSI20 進行借貸總金額勾稽對帳"
  },
  {
    title: "第四段：修正與退件",
    sub: "傳票作廢與底稿修改",
    start: 110,
    end: 140,
    icon: BookOpen,
    desc: "若科目錯誤僅修正底稿。若需整筆退回承辦，於 AJSB22 選擇「傳票作廢」避免跳號缺失"
  },
  {
    title: "第五段：列印整理",
    sub: "傳票裝訂與核備書寫",
    start: 140,
    end: 175,
    icon: Printer,
    desc: "1. COPY 應付憑單最後頁上面要書寫分錄底稿編號、傳票編號及付款日期"
  },
  {
    title: "第六段：發票歸檔",
    sub: "簽署與影印保管",
    start: 175,
    end: 200,
    icon: CheckSquare,
    desc: "2. COPY 發票上面書寫傳票編號（若為感熱紙則要加 COPY 一張共 2 張）裝訂歸檔"
  }
];

export default function FlowStepsIndicator({
  activeTime,
  onSelectStep
}: FlowStepsIndicatorProps) {
  return (
    <div id="video-flow-indicator" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-sans">
      <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-extrabold text-white text-[13.5px] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>鼎新 Cosmos 審計流向導航 (分鏡時間對位)</span>
          </h3>
          <p className="text-[10.5px] text-slate-400 mt-0.5">點擊下方流程卡片可隨時切換至該段教學章節與 ERP 預覽</p>
        </div>
        <span className="text-[9.5px] bg-slate-950 border border-slate-850 text-slate-500 px-2 rounded font-mono font-bold">115會計期</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {flowSections.map((sec, index) => {
          const isActive = activeTime >= sec.start && activeTime < sec.end;
          const Icon = sec.icon;

          return (
            <div 
              key={index}
              onClick={() => onSelectStep(sec.start)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-[115px] ${
                isActive 
                  ? 'bg-gradient-to-br from-slate-950 to-amber-950/15 border-amber-500 ring-1 ring-amber-500/20 shadow-lg scale-[1.01]'
                  : 'bg-slate-950/60 hover:bg-slate-800/40 text-slate-300 border-slate-900/80'
              }`}
            >
              {/* Highlight ribbon representing continuous progress */}
              <div className={`absolute top-0 left-0 w-1 h-full ${isActive ? 'bg-amber-500' : 'bg-slate-800'}`} />

              <div className="pl-1.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[12px] font-extrabold ${isActive ? 'text-amber-300' : 'text-slate-100'}`}>
                    {sec.title}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
                </div>
                <div className={`text-[9.5px] font-sans font-bold uppercase tracking-wide ${isActive ? 'text-amber-200/80' : 'text-slate-500'}`}>{sec.sub}</div>
                <p className={`text-[10px] leading-normal line-clamp-2 pt-0.5 ${isActive ? 'text-slate-300 font-light' : 'text-slate-400 font-light'}`}>
                  {sec.desc}
                </p>
              </div>

              {isActive && (
                <div className="text-[9px] text-amber-500 font-bold self-end flex items-center gap-1 pt-1 animate-pulse font-mono">
                  <span className="w-1 h-1 rounded-full bg-amber-500 animate-ping"></span>
                  <span>播放定位中...</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

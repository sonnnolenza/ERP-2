import React, { useState } from 'react';
import { 
  Film, Clock, Tv, Layers, Volume2, Search, Download, Play, Filter, Info
} from 'lucide-react';
import { storyboardSegments } from '../data';

interface SopStoryboardProps {
  activeTime: number;
  setActiveTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
}

export default function SopStoryboard({
  activeTime,
  setActiveTime,
  setIsPlaying
}: SopStoryboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScreen, setSelectedScreen] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [showEditorNotes, setShowEditorNotes] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredSegments = storyboardSegments.filter(seg => {
    const matchesSearch = 
      seg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seg.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seg.narrative.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seg.visualDetail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seg.erpMockupDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seg.editorCuts.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesScreen = selectedScreen === 'all' || seg.erpScreen === selectedScreen;

    return matchesSearch && matchesScreen;
  });

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Speaks using browser TTS
  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleExportMarkdown = () => {
    let mdContent = `# 🎬 艾盟仕 ERP 系統導入 & 會計勾稽演練 - 影片剪輯逐秒分鏡腳本\n`;
    mdContent += `> 生成時間: 民國115年6月3日 • 總監與會計師審閱專用\n\n`;
    mdContent += `| 時間期 | 章節主題 | 畫面與滑鼠路徑特寫 | ERP系統模擬截圖對照 | 影片字幕 | 語音旁白稿 | 剪接點與後製轉場 | BGM與音效設計 | 內控合規要點 |\n`;
    mdContent += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    
    storyboardSegments.forEach(seg => {
      mdContent += `| **${formatTime(seg.secondsStart)} - ${formatTime(seg.secondsEnd)}** | **${seg.title}** (${seg.erpScreen}) | ${seg.visualDetail} | ${seg.erpMockupDescription} | ${seg.subtitle} | ${seg.narrative} | ${seg.editorCuts} | ${seg.audioBgm} | ${seg.compliancePoint} |\n`;
    });

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "ERP_Video_Production_Storyboard_115.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4 text-left font-sans text-slate-100">
      
      {/* Upper Control Bar & Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Film className="w-5 h-5 animate-pulse" />
            </span>
            <h2 className="text-base md:text-lg font-extrabold text-white">
              國稅認列黃金會計課 — 系統導入「逐秒剪輯分鏡表」
            </h2>
          </div>
          <p className="text-[11.5px] text-slate-400 mt-1">
            本表專為視訊剪輯師、會計指導及課表設計師量身打造，結合 <b>影格時間戳記</b>、<b>ERP 數據位置標注</b> 與 <b>二重歸檔審查手寫動作</b>，點擊任一卡片即可即時連動上方 ERP 模擬視窗跳轉。
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button 
            type="button"
            onClick={handleExportMarkdown}
            className="p-2 px-3 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-lg text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="下載 Markdown 格式的完整劇本，便於匯入剪輯軟體或傳給主管審批"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>匯出 .MD 劇本</span>
          </button>

          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex gap-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 px-2.5 rounded text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-amber-500 text-slate-950 font-black shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📊 密格式列表
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 px-2.5 rounded text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-amber-500 text-slate-950 font-black shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🎥 畫面分鏡卡
            </button>
          </div>
        </div>
      </div>

      {/* Live Search & Filter Deck */}
      <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋分鏡要素 (如：麗嬰房、感熱紙、摘要、AJSB01)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 p-2 text-xs text-slate-100 outline-none focus:border-amber-500 placeholder-slate-500"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedScreen}
              onChange={(e) => setSelectedScreen(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">所有系統 / 模組</option>
              <option value="FLOW">全域流程 (FLOW)</option>
              <option value="ACPI02">應付憑單維護 (ACPI02)</option>
              <option value="AJSB01">產生分錄底稿 (AJSB01)</option>
              <option value="AJSI20">分錄底稿維護 (AJSI20)</option>
              <option value="AJSB20">拋轉會計傳票 (AJSB20)</option>
              <option value="AJSB22">傳票作廢還原 (AJSB22)</option>
              <option value="ACTI10">憑證過帳列印 (ACTI10)</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 ml-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showEditorNotes}
              onChange={(e) => setShowEditorNotes(e.target.checked)}
              className="rounded bg-slate-900 border-slate-800 text-amber-500 focus:ring-0 focus:ring-offset-0"
            />
            <span className="text-xs text-slate-400">顯示後製/合規說明</span>
          </label>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* GRID CARD SHAPE VIEW (DIRECTOR'S BOARDS) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSegments.map((seg) => {
            const isPlayingThis = activeTime >= seg.secondsStart && activeTime < seg.secondsEnd;
            return (
              <div 
                key={seg.index}
                className={`border rounded-2xl p-5 space-y-3.5 transition-all text-left flex flex-col justify-between relative ${
                  isPlayingThis 
                    ? 'border-amber-500 bg-amber-955/10 shadow-xl scale-[1.01]' 
                    : 'border-slate-800/80 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60'
                }`}
              >
                {/* Scene Header */}
                <div className="flex justify-between items-start border-b border-slate-900/60 pb-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-300 bg-slate-950 border border-slate-850 p-0.5 px-2 rounded">
                      場景 {seg.index} • {seg.erpScreen}
                    </span>
                    <h3 className={`font-extrabold text-[#ffffff] text-sm mt-1 ${isPlayingThis ? 'text-amber-300' : ''}`}>
                      {seg.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTime(seg.secondsStart);
                      setIsPlaying(true);
                    }}
                    className={`p-1 px-2 text-[10.5px] font-mono rounded font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                      isPlayingThis 
                        ? 'bg-amber-500 text-slate-950 font-black' 
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{formatTime(seg.secondsStart)} - {formatTime(seg.secondsEnd)}</span>
                  </button>
                </div>

                {/* Split Details columns */}
                <div className="space-y-3 flex-1 text-xs text-left">
                  {/* Vis Column */}
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/60 space-y-1">
                    <span className="block font-bold text-slate-300 text-[10.5px] flex items-center gap-1">
                      <Tv className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>畫面剪影與滑鼠軌跡 (Visual Focus)</span>
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{seg.visualDetail}</p>
                  </div>

                  {/* ERP Screenshot Data Column */}
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/60 space-y-1">
                    <span className="block font-bold text-slate-300 text-[10.5px] flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>ERP 畫面登載與字軌數據說明</span>
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{seg.erpMockupDescription}</p>
                  </div>

                  {/* Voice transcription column */}
                  <div className="bg-amber-955/10 p-3.5 rounded-xl border border-amber-900/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="block font-bold text-amber-400 text-[10.5px]">💬 旁白與字幕</span>
                      <button
                        onClick={() => handleSpeak(seg.narrative)}
                        className="text-[10px] text-amber-300 hover:text-white flex items-center gap-0.5 bg-amber-955/30 border border-amber-900/20 p-0.5 px-2 rounded cursor-pointer"
                        title="語音合成發音試聽"
                      >
                        <Volume2 className="w-3 h-3 text-amber-400 animate-pulse" />
                        <span>聽旁白</span>
                      </button>
                    </div>
                    <p className="text-slate-100 text-sm md:text-[16px] leading-relaxed font-semibold">
                      <span className="font-extrabold text-amber-300 text-[10.5px] mr-1">【字幕】</span>「{seg.subtitle}」
                    </p>
                    <p className="text-white text-base md:text-[18px] leading-relaxed font-black tracking-wide bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                      <span className="font-extrabold text-[#ffffff] bg-slate-900 px-1.5 py-0.5 rounded text-[10px] mr-1.5 inline-block align-middle">【旁白】</span>
                      {seg.narrative}
                    </p>
                  </div>

                  {/* Director / Cuts block */}
                  {showEditorNotes && (
                    <div className="bg-rose-950/10 border border-rose-950/30 rounded-xl p-3 text-[11px] space-y-1.5">
                      <p className="text-rose-300 leading-relaxed">
                        <span className="font-semibold text-rose-400">🎬 後製剪接 & 轉場 (Cut points)：</span>
                        {seg.editorCuts}
                      </p>
                      <p className="text-slate-400 text-[10.5px]">
                        <span className="font-semibold text-rose-400">🎵 BGM & 音效：</span>
                        {seg.audioBgm}
                      </p>
                      <p className="text-slate-400 text-[10.5px] border-t border-slate-900 pt-1.5">
                        <span className="font-semibold text-amber-500">⚖ 內控合規要點：</span>
                        {seg.compliancePoint}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE SHAPE VIEW */
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
          <table className="w-full text-xs text-left text-slate-300 border-collapse">
            <thead className="text-[10px] text-slate-400 uppercase bg-slate-950 border-b border-slate-800">
              <tr>
                <th className="p-3 w-14 text-center">場景</th>
                <th className="p-3 w-28">時間戳記</th>
                <th className="p-3 w-40">模組標章 / 任務</th>
                <th className="p-3 min-w-[200px]">畫面內容與滑鼠特寫 (Visuals)</th>
                <th className="p-3 min-w-[200px]">對應 ERP 截圖與數據</th>
                <th className="p-3 min-w-[220px]">字幕與旁白口播稿 (Audio)</th>
                {showEditorNotes && <th className="p-3 min-w-[220px]">剪接與 BGM 設計 / 稽核點</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {filteredSegments.map((seg) => {
                const isPlayingThis = activeTime >= seg.secondsStart && activeTime < seg.secondsEnd;
                return (
                  <tr 
                    key={seg.index}
                    className={`transition-colors group align-top ${
                      isPlayingThis ? 'bg-amber-955/10 relative font-medium' : 'hover:bg-slate-950/20'
                    }`}
                  >
                    {/* Scene Index */}
                    <td className="p-3 w-14 text-center">
                      <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-[11px] ${
                        isPlayingThis 
                          ? 'bg-amber-500 text-slate-950 font-extrabold' 
                          : 'bg-slate-900 text-slate-400 group-hover:bg-slate-800'
                      }`}>
                        {seg.index}
                      </span>
                    </td>

                    {/* Timestamp Trigger */}
                    <td className="p-3 w-28">
                      <div className="space-y-1.5 text-center">
                        <span className={`block font-mono font-extrabold rounded p-1 text-[11px] ${
                          isPlayingThis ? 'bg-amber-500/10 text-amber-300 border border-amber-900/30' : 'bg-slate-950 text-slate-500 border border-slate-850'
                        }`}>
                          {formatTime(seg.secondsStart)} - {formatTime(seg.secondsEnd)}
                        </span>
                        
                        <button
                          onClick={() => {
                            setActiveTime(seg.secondsStart);
                            setIsPlaying(true);
                          }}
                          className="w-full text-[10px] text-amber-400 hover:text-amber-300 font-bold flex items-center justify-center gap-0.5 cursor-pointer bg-slate-950 p-1 rounded border border-slate-850"
                        >
                          <Play className="w-3 h-3 fill-current text-amber-400" />
                          <span>定位至此</span>
                        </button>
                      </div>
                    </td>

                    {/* ERP Screen Tag */}
                    <td className="p-3 w-40">
                      <div className="space-y-1 text-left">
                        <span className="inline-block text-[9.5px] font-mono font-bold bg-slate-950 border border-slate-850 text-amber-300 p-0.5 px-2 rounded">
                          {seg.erpScreen}
                        </span>
                        <div className={`font-extrabold text-[11.5px] mt-1 leading-normal ${isPlayingThis ? 'text-amber-300' : 'text-slate-200'}`}>
                          {seg.title}
                        </div>
                      </div>
                    </td>

                    {/* Camera Visual Action */}
                    <td className="p-3 text-[11px] text-slate-400 leading-relaxed max-w-[280px]">
                      <p className="font-light">{seg.visualDetail}</p>
                    </td>

                    {/* ERP Input Text Description */}
                    <td className="p-3 text-[11px] text-slate-400 leading-relaxed max-w-[280px]">
                      <p className="font-light">{seg.erpMockupDescription}</p>
                    </td>

                    {/* Narration & Subtitle */}
                    <td className="p-3 text-xs leading-relaxed max-w-[320px]">
                      <div className="space-y-2 text-left">
                        <p className="p-1.5 bg-amber-955/15 border border-amber-900/20 rounded text-[11px] text-amber-300 font-medium">
                          <b>📺 字幕：</b>「{seg.subtitle}」
                        </p>
                        <p className="text-white text-base md:text-[18px] leading-relaxed font-semibold bg-slate-950 p-2 rounded-lg border border-slate-900">
                          <b className="text-amber-400 font-extrabold">🗣 旁白稿：</b>{seg.narrative}
                        </p>
                        <div className="flex justify-between items-center pt-1">
                          <button
                            onClick={() => handleSpeak(seg.narrative)}
                            className="bg-slate-950 text-[10px] text-slate-400 hover:text-slate-200 p-1 px-2 rounded flex items-center gap-1 border border-slate-800 cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>發音聽稿</span>
                          </button>
                          
                          <button
                            onClick={() => handleCopyText(seg.narrative, seg.index)}
                            className="text-amber-400 hover:text-amber-300 text-[10px] font-bold cursor-pointer"
                          >
                            {copiedIndex === seg.index ? "已複製 ✓" : "複製旁白"}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Editor Note */}
                    {showEditorNotes && (
                      <td className="p-3 text-[11px] text-rose-300 leading-relaxed max-w-[260px] bg-rose-955/5">
                        <div className="space-y-1.5">
                          <p>
                            <b>🎬 切點：</b>{seg.editorCuts}
                          </p>
                          <p className="text-[10px] font-mono text-slate-550 border-t border-slate-900 pt-1">
                            <b>BGM：</b>{seg.audioBgm}
                          </p>
                          <p className="text-[10px] text-amber-500/90 font-sans border-t border-slate-900/55 pt-1">
                            <b>⚖ 合規：</b>{seg.compliancePoint}
                          </p>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Frame footer compliance guidelines */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 text-xs text-left text-slate-400 leading-relaxed space-y-1.5">
        <div className="flex items-center gap-1.5 text-white font-bold border-b border-slate-900 pb-1">
          <Info className="w-4 h-4 text-amber-500" />
          <span>剪輯合規注意要點 (商會法第34條、41條之影印本規範)</span>
        </div>
        <p className="font-light">
          主管廖有毅與實習生王淑菲在影片第 <b>02:35</b> 處所說的<b>「感熱紙加印複本二重裝訂」</b>是營業稅申報查核的重要內控。在製作影片字卡或放大聚焦（Zoom-in）特效時，剪輯師<b>務必</b>在實體發票複本貼上「與正本核對無誤」的浮水紅卡註記，以提供百分之百的實務擬真教學！
        </p>
      </div>

    </div>
  );
}

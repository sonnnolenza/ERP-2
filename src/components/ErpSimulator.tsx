import React, { useState, useEffect, useRef } from 'react';
import { 
  Folder, ChevronRight, ChevronDown, Check, X, FileText, Search, Play, ArrowRight,
  Computer, RefreshCw, Layers, Printer, Calendar, Database, ShieldAlert, CornerDownRight, Settings,
  Video, Eye, Heart, Volume2, Plus, Trash2, Edit, Save, Paperclip, ChevronLeft,
  ChevronsLeft, ChevronsRight, FileSpreadsheet
} from 'lucide-react';

interface ErpSimulatorProps {
  activeScreen: string; // 'ACPI02' | 'AJSB01' | 'AJSI20' | 'ACTI10' | 'AJSB22' | 'FLOW' | 'DEP_FLOW';
  highlightedField?: string;
  onFieldClick?: (fieldId: string) => void;
  interactiveValues?: {
    batchId?: string;
    invoiceNo?: string;
    invoiceDate?: string;
    voucherNo?: string;
    reversalMode?: 'void' | 'delete';
  };
  setInteractiveValues?: React.Dispatch<React.SetStateAction<any>>;
}

// Percentages representing exact locations inside #erp-screen-body responsive box
const fieldCoords: Record<string, { x: number; y: number; origin: string; scale: number }> = {
  // FLOW Map
  'AJSB01_flow': { x: 55, y: 38, origin: '55% 38%', scale: 1.15 },
  'AJSI20_flow': { x: 55, y: 55, origin: '55% 55%', scale: 1.15 },
  'AJSB20_flow': { x: 55, y: 72, origin: '55% 72%', scale: 1.15 },
  'AJSB22_flow': { x: 50, y: 92, origin: '50% 90%', scale: 1.15 },

  // ACPI02 Map
  'inv_date_acp': { x: 80, y: 15, origin: '80% 15%', scale: 1.25 },
  'inv_no_acp': { x: 50, y: 20, origin: '50% 20%', scale: 1.25 },
  'acp_pay_date': { x: 60, y: 65, origin: '60% 65%', scale: 1.25 },
  'acp_tax_memo': { x: 60, y: 88, origin: '60% 88%', scale: 1.25 },

  // AJSB01 Map
  'ajsb_src_ap': { x: 30, y: 20, origin: '30% 20%', scale: 1.2 },
  'ajsb_batch_id': { x: 50, y: 56, origin: '50% 56%', scale: 1.3 },
  'ajsb_confirm': { x: 50, y: 85, origin: '50% 85%', scale: 1.2 },

  // AJSI20 Map
  'ajsi_pay_final': { x: 70, y: 88, origin: '70% 88%', scale: 1.25 },
  'ajsi_tax_desc': { x: 70, y: 72, origin: '70% 72%', scale: 1.25 },
  'ajsi_pay_desc': { x: 70, y: 56, origin: '70% 56%', scale: 1.25 },

  // ACTI10 Map
  'acti10_unconfirm': { x: 30, y: 40, origin: '30% 40%', scale: 1.25 },
  'acti10_print': { x: 18, y: 8, origin: '18% 8%', scale: 1.25 },

  // AJSB22 Map
  'ajsb22_mode_void': { x: 26, y: 28, origin: '26% 28%', scale: 1.25 },
  'ajsb22_mode_delete': { x: 70, y: 28, origin: '70% 28%', scale: 1.25 },
  'ajsb22_batch': { x: 50, y: 52, origin: '50% 52%', scale: 1.3 },
  'ajsb22_execute': { x: 50, y: 75, origin: '50% 75%', scale: 1.2 },

  // AJSB20 Map
  'ajsb20_transfer': { x: 91, y: 20, origin: '91% 20%', scale: 1.25 }
};


export default function ErpSimulator({
  activeScreen,
  highlightedField = '',
  onFieldClick = () => {},
  interactiveValues = {},
  setInteractiveValues
}: ErpSimulatorProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    ap: true,
    gl: true,
    auto: true
  });

  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [ripple, setRipple] = useState(false);
  const [typingInProgress, setTypingInProgress] = useState(false);
  const [acti10QueryOpen, setActi10QueryOpen] = useState(true);

  // Auto-reset and timer-based closing for ACTI10 Query Dialog to offer cinematic experience
  useEffect(() => {
    if (activeScreen === 'ACTI10') {
      setActi10QueryOpen(true);
      const timer = setTimeout(() => {
        setActi10QueryOpen(false);
      }, 5500); // Give 5.5s for users to see the query configuration before transition
      return () => clearTimeout(timer);
    }
  }, [activeScreen]);

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  // Coordinates mapping calculation
  useEffect(() => {
    if (highlightedField && fieldCoords[highlightedField]) {
      const { x, y } = fieldCoords[highlightedField];
      // Smooth travel delay simulation
      const travelTimer = setTimeout(() => {
        setCursorPos({ x, y });
        // After cursor settles, flash ripple & click action sound effect
        const rippleTimer = setTimeout(() => {
          setRipple(true);
          const offTimer = setTimeout(() => setRipple(false), 800);
          return () => clearTimeout(offTimer);
        }, 600);
        return () => clearTimeout(rippleTimer);
      }, 200);

      return () => clearTimeout(travelTimer);
    }
  }, [highlightedField]);

  // Stable tracking of dynamic batchId from parent props
  const targetStrRef = useRef("W2026060320260527005");

  useEffect(() => {
    if (interactiveValues.batchId && interactiveValues.batchId.length > 5 && !typingInProgress) {
      targetStrRef.current = interactiveValues.batchId;
    }
  }, [interactiveValues.batchId, typingInProgress]);

  // Simulated auto-typing routines for realistic demo video feel
  useEffect(() => {
    if (highlightedField === 'ajsb_batch_id' && setInteractiveValues && !typingInProgress) {
      setTypingInProgress(true);
      const targetStr = targetStrRef.current;
      let currentVal = targetStr[0] || "W";
      let charIdx = 1;

      const interval = setInterval(() => {
        if (charIdx < targetStr.length) {
          currentVal += targetStr[charIdx];
          setInteractiveValues(prev => ({ ...prev, batchId: currentVal }));
          charIdx++;
        } else {
          clearInterval(interval);
          setTypingInProgress(false);
        }
      }, 70);

      return () => {
        clearInterval(interval);
        setTypingInProgress(charIdx === targetStr.length ? false : typingInProgress);
      };
    }
  }, [highlightedField, setInteractiveValues]);

  // ERP Sidebar Navigation tree matching screenshots exactly
  const erpTree = [
    { id: 'root', name: '鼎新 Cosmos ERP iGP', isFolder: true, level: 0 },
    { id: 'ap', name: '應付管理系統', isFolder: true, level: 1, parent: 'root' },
    { id: 'ACPI02', name: '應付憑單建立作業 (ACPI02)', isFolder: false, level: 2, parent: 'ap' },
    { id: 'gl', name: '會計總帳管理系統', isFolder: true, level: 1, parent: 'root' },
    { id: 'ACTI10', name: '會計傳票建立作業 (ACTI10)', isFolder: false, level: 2, parent: 'gl' },
    { id: 'auto', name: '自動分錄系統', isFolder: true, level: 1, parent: 'root' },
    { id: 'AJSB01', name: '產生分錄底稿作業 (AJSB01)', isFolder: false, level: 2, parent: 'auto' },
    { id: 'AJSI20', name: '分錄底稿維護作業 (AJSI20)', isFolder: false, level: 2, parent: 'auto' },
    { id: 'AJSB20', name: '拋轉會計傳票作業 (AJSB20)', isFolder: false, level: 2, parent: 'auto' },
    { id: 'AJSB22', name: '還原會計傳票作業 (AJSB22)', isFolder: false, level: 2, parent: 'auto' },
  ];

  const visibleTree = erpTree.filter(node => {
    if (node.level === 0) return true;
    if (node.parent === 'root' && expandedFolders.root) return true;
    if (node.parent === 'ap' && expandedFolders.root && expandedFolders.ap) return true;
    if (node.parent === 'gl' && expandedFolders.root && expandedFolders.gl) return true;
    if (node.parent === 'auto' && expandedFolders.root && expandedFolders.auto) return true;
    return false;
  });

  const getHighlightClass = (fieldId: string) => {
    return highlightedField === fieldId 
      ? 'ring-4 ring-rose-500 animate-pulse bg-rose-50 border-rose-300 relative z-30 scale-[1.01]' 
      : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500';
  };

  // Zoom parameters from active highlight selection
  const activeZoom = highlightedField && fieldCoords[highlightedField] 
    ? fieldCoords[highlightedField] 
    : { scale: 1, origin: '50% 50%' };

  return (
    <div id="erp-workspace-root" className="flex h-[520px] w-full border border-slate-700 bg-slate-900 text-slate-800 rounded-lg overflow-hidden font-sans select-none shadow-2xl relative">
      
      {/* Dynamic continuous video editor record overlays for authentic movie-tutorial feel */}
      <div className="absolute top-2.5 right-3 z-50 pointer-events-none flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded text-[10px] text-red-500 font-mono font-bold tracking-wider">
        <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
        <span>REC ● 1080p SOP_VIDEO</span>
      </div>

      {/* Visual audio frequency spectrum meter to reinforce the training movie theme */}
      <div className="absolute bottom-2.5 left-3 z-50 pointer-events-none flex items-center gap-1 bg-black/50 p-1 rounded font-mono text-[9px] text-gray-400">
        <Volume2 className="w-3.5 h-3.5 text-amber-500" />
        <span>SOP CHANNEL</span>
      </div>

      {/* Side Menu Drawer representing classic Cosmos sidebar - updated to 20% (2/10 ratio) */}
      <div id="erp-sidebar" className="w-[20%] bg-[#fcfcfc] border-r border-slate-350 flex flex-col shrink-0 text-xs z-20 min-w-0 overflow-y-auto">
        <div className="bg-[#2a4d80] text-white p-2 flex items-center justify-between font-mono font-medium tracking-tight">
          <div className="flex items-center gap-1.5 min-w-0">
            <Computer className="w-4 h-4 text-sky-300 shrink-0" />
            <span className="truncate">Cosmos ERP iGP</span>
          </div>
          <span className="text-[9px] bg-sky-800 text-sky-200 px-1 rounded shrink-0 hidden md:inline">v16.1</span>
        </div>
        
        <div className="p-1 px-2 border-b border-indigo-100 bg-[#edf3fc] text-slate-600 font-medium truncate">
          系統作業導航
        </div>

        <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
          {visibleTree.map(node => (
            <div 
              key={node.id}
              className={`flex items-center p-1 rounded cursor-pointer ${
                node.id === activeScreen 
                  ? 'bg-sky-100 text-sky-900 border border-sky-300 font-semibold' 
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
              style={{ paddingLeft: `${node.level * 10 + 4}px` }}
              onClick={() => {
                if (node.isFolder) {
                  toggleFolder(node.id);
                } else if (setInteractiveValues) {
                  setInteractiveValues(prev => ({ ...prev, activeScreen: node.id }));
                }
              }}
            >
              {node.isFolder ? (
                expandedFolders[node.id] ? (
                  <ChevronDown className="w-3.5 h-3.5 mr-1 text-slate-500 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 mr-1 text-slate-500 shrink-0" />
                )
              ) : (
                <FileText className="w-3.5 h-3.5 mr-1 text-sky-600 shrink-0" />
              )}
              {node.isFolder ? (
                <Folder className={`w-3.5 h-3.5 mr-1 text-[#e1b54a] fill-current shrink-0`} />
              ) : null}
              <span className="truncate">{node.name}</span>
            </div>
          ))}
        </div>

        <div className="p-2 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500 flex flex-col gap-0.5 font-mono min-w-0 truncate">
          <div className="truncate">公司: 艾盟仕</div>
          <div className="truncate">用戶: 王淑菲</div>
        </div>
      </div>

      {/* Main content viewport representing 80% (8/10 ratio) */}
      <div id="erp-viewport" className="w-[80%] flex flex-col bg-slate-200 relative p-2.5 overflow-hidden z-10 shrink-0">
        
        {/* Active Screen Title Board */}
        <div id="erp-window-header" className="bg-gradient-to-r from-sky-800 to-[#1e345e] text-white text-[12px] px-3 py-1.5 flex items-center justify-between rounded-t shadow-sm shrink-0">
          <div className="flex items-center gap-1.5 font-bold tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {activeScreen === 'FLOW' && '自動分錄子系統流程圖'}
            {activeScreen === 'ACPI02' && '應付憑單建立作業 (ACPI02) - [艾盟仕股份有限公司]'}
            {activeScreen === 'AJSB01' && '產生分錄底稿作業 (AJSB01) - Mod: 2022/10/15'}
            {activeScreen === 'AJSI20' && '分錄底稿維護作業 (AJSI20) - 2026/06/02'}
            {activeScreen === 'AJSB20' && '拋轉會計傳票作業 (AJSB20) - [主辦會計輔助模組]'}
            {activeScreen === 'ACTI10' && '會計傳票建立作業 (ACTI10) - 2026/05/27'}
            {activeScreen === 'AJSB22' && '還原會計傳票作業 (AJSB22) - Mod: 2022/11/17'}
          </div>
          <div className="flex gap-1">
            <span className="w-4 h-4 bg-slate-400/20 hover:bg-slate-400/40 rounded flex items-center justify-center cursor-pointer text-[10px]">_</span>
            <span className="w-4 h-4 bg-slate-400/20 hover:bg-slate-400/40 rounded flex items-center justify-center cursor-pointer text-[10px] md:inline hidden">❑</span>
            <span className="w-4 h-4 bg-rose-500/80 hover:bg-rose-500 rounded flex items-center justify-center cursor-pointer text-[9px]">✕</span>
          </div>
        </div>

        {/* Windows Standard Control Ribbon */}
        <div id="erp-toolbar" className="bg-[#f0f0f0] border-b border-slate-300 p-1 flex items-center gap-2 text-xs text-slate-700 shrink-0 select-none">
          <button className="px-2 py-0.5 border border-slate-300 hover:bg-slate-200 rounded text-slate-700 flex items-center gap-1 shadow-sm bg-white">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>查詢</span>
          </button>
          <button className="px-2 py-0.5 border border-slate-300 hover:bg-slate-200 rounded text-slate-700 flex items-center gap-1 shadow-sm bg-white">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
            <span>載入</span>
          </button>
          <div className="h-4 w-px bg-slate-400 mx-1"></div>
          <button className="px-2 py-0.5 border border-slate-300 hover:bg-slate-200 rounded text-slate-700 flex items-center gap-1 shadow-sm bg-white">
            <Printer className="w-3.5 h-3.5 text-indigo-600" />
            <span>列印</span>
          </button>
          <div className="h-4 w-px bg-slate-400 mx-1"></div>
          <span className="text-[10px] text-slate-400 ml-auto font-mono">過帳碼: N (未過帳)</span>
        </div>

        <div 
          id="erp-screen-body" 
          className="flex-1 bg-white border border-t-0 border-slate-300 overflow-y-auto p-4 text-[12px] relative shadow-inner overflow-x-hidden"
          style={{
            transform: `scale(${activeZoom.scale})`,
            transformOrigin: activeZoom.origin,
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {/* Animated Mouse Cursor Overlay */}
          <div 
            className="absolute pointer-events-none z-50 transition-all duration-700 ease-out"
            style={{ 
              top: `${cursorPos.y}%`, 
              left: `${cursorPos.x}%`,
              transform: 'translate(-6px, -6px)'
            }}
          >
            {/* Standard retro pointer hand vector */}
            <svg className="w-6 h-6 text-yellow-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] fill-amber-400" viewBox="0 0 24 24">
              <path d="M12 2a.5.5 0 0 1 .5.5v5.38l1.62-.32a.5.5 0 0 1 .58.39l.23 1.15a.5.5 0 0 1-.39.58l-2.04.41V22h-1v-8.2l-2.04-.41a.5.5 0 0 1-.39-.58l.23-1.15a.5.5 0 0 1 .58-.39l1.62.32V2.5A.5.5 0 0 1 12 2zM12 0a2.5 2.5 0 0 0-2.5 2.5v4.5A2.5 2.5 0 0 0 12 9.5a2.5 2.5 0 0 0 2.5-2.5v-4.5A2.5 2.5 0 0 0 12 0zm0 18a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/>
            </svg>
            
            {/* Circular Ripple Pulsing Animation on click */}
            {ripple && (
              <div className="absolute -top-3 -left-3 w-12 h-12 border-2 border-red-500 rounded-full animate-ping opacity-75"></div>
            )}
            {ripple && (
              <div className="absolute -top-1 -left-1 w-8 h-8 bg-yellow-400/30 rounded-full animate-pulse"></div>
            )}
          </div>
          
          {/* FLOW - Flowchart screen based on screenshot 2 & 3 */}
          {activeScreen === 'FLOW' && (
            <div className="flex flex-col items-center justify-center h-full text-center p-3 relative bg-slate-50">
              <div className="absolute top-2 left-2 text-[#e0651d] font-bold flex items-center gap-1 text-[13px]">
                <Layers className="w-4 h-4" />
                <span>自動分錄系統</span>
              </div>
              
              <div className="flex flex-col gap-5 max-w-lg w-full">
                <div className="bg-[#f2a552] text-slate-900 border border-amber-600 font-bold p-1.5 rounded-md shadow-sm max-w-[180px] mx-auto text-xs">
                  自動分錄參數設定
                </div>
                
                <div className="grid grid-cols-3 gap-2 w-full">
                  <div className="bg-sky-100 text-sky-900 p-1 border border-sky-400 rounded">營業日報表</div>
                  <div className="bg-[#2d7ad6] text-white p-1 font-bold rounded shadow-sm border border-blue-700">進貨單 / 退貨單</div>
                  <div className="bg-sky-100 text-sky-900 p-1 border border-sky-400 rounded">領料單 / 退料單</div>
                </div>

                <div className="flex items-center justify-center gap-3 w-full border-t border-b border-slate-300 py-4 my-2 relative">
                  <div className="flex flex-col gap-2 items-center">
                    <div className="bg-[#e49bb0] text-rose-950 p-1.5 border border-rose-300 rounded font-medium text-[11px] w-28">
                      應收應付管理系統
                    </div>
                    <div className="text-gray-400 flex justify-center">↓</div>
                    <div className="bg-sky-200 text-sky-950 p-1 border border-sky-400 rounded font-bold text-[11px] w-28 animate-pulse ring-2 ring-sky-400">
                      應付憑單建立作業
                    </div>
                  </div>

                  <div className="text-2xl text-slate-400">➔</div>

                  <div className="flex flex-col gap-1.5 text-[11.5px] items-center">
                    <div className={`p-1 px-2 border rounded cursor-pointer transition-all ${getHighlightClass('AJSB01_flow')}`}
                      onClick={() => onFieldClick('AJSB01_flow')}>
                      產生分錄底稿作業 (AJSB01)
                    </div>
                    <div className="text-slate-400 text-[10px]">↓</div>
                    <div className={`p-1 px-2 border rounded cursor-pointer transition-all ${getHighlightClass('AJSI20_flow')}`}
                      onClick={() => onFieldClick('AJSI20_flow')}>
                      分錄底稿維護作業 (AJSI20)
                    </div>
                    <div className="text-slate-400 text-[10px]">↓</div>
                    <div className={`p-1 px-2 border rounded cursor-pointer transition-all ${getHighlightClass('AJSB20_flow')}`}
                      onClick={() => onFieldClick('AJSB20_flow')}>
                      拋轉會計傳票作業 (AJSB20)
                    </div>
                  </div>

                  <div className="text-2xl text-slate-400">➔</div>

                  <div className="flex flex-col gap-2 items-center">
                    <div className="bg-[#9ec2ea] p-1.5 border border-blue-400 rounded font-medium text-[11px] w-28">
                      會計總帳管理系統
                    </div>
                    <div className="text-gray-400 flex justify-center">↓</div>
                    <div className="bg-indigo-300 text-indigo-950 p-1 border border-indigo-400 rounded font-bold text-[11px] w-28">
                      會計傳票建立作業
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className={`bg-rose-100 text-rose-900 border border-rose-300 p-1.5 px-3 rounded text-[11px] font-bold flex items-center gap-1.5 cursor-pointer max-w-[200px] hover:bg-rose-200 transition-colors ${getHighlightClass('AJSB22_flow')}`}
                    onClick={() => onFieldClick('AJSB22_flow')}>
                    <RefreshCw className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    還原會計傳票作業 (AJSB22)
                  </div>
                </div>

              </div>
            </div>
          )}


          {/* ACPI02 - Payable Voucher screen */}
          {activeScreen === 'ACPI02' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded border border-slate-200 shadow-sm">
                <div>
                  <label className="block text-slate-500 text-[10.5px]">憑單單別</label>
                  <input type="text" value="717B" readOnly className="w-full bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 text-slate-600 font-bold" />
                </div>
                <div>
                  <label className="block text-slate-500 text-[10.5px]">憑單單號</label>
                  <input type="text" value="20260527001" readOnly className="w-full bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 text-slate-600" />
                </div>
                <div>
                  <label className="block text-slate-500 text-[10.5px]">單據日期</label>
                  <input type="text" value="2026/05/27" readOnly className={`w-full bg-white border rounded px-1.5 py-0.5 font-mono cursor-pointer transition-all ${getHighlightClass('inv_date_acp')}`} onClick={() => onFieldClick('inv_date_acp')} />
                </div>
                
                <div>
                  <label className="block text-[#a85507] font-semibold text-[10.5px]">統一編號</label>
                  <input type="text" value="04377371" readOnly className="w-full bg-amber-50 border border-amber-300 rounded px-1.5 py-0.5" />
                </div>
                <div>
                  <label className="block text-[#2563eb] font-semibold text-[10.5px]">發票號碼</label>
                  <input type="text" value={interactiveValues.invoiceNo || "AY56654359"} readOnly className={`w-full bg-sky-50 border font-mono rounded px-1.5 py-0.5 cursor-pointer transition-all ${getHighlightClass('inv_no_acp')}`} onClick={() => onFieldClick('inv_no_acp')} />
                </div>
                <div>
                  <label className="block text-slate-500 text-[10.5px]">申報年月</label>
                  <input type="text" value="2026/05" readOnly className="w-full bg-amber-50 border border-amber-300 font-bold rounded px-1.5 py-0.5 text-amber-900" />
                </div>

                <div>
                  <label className="block text-slate-500 text-[10.5px]">發票應稅貨款</label>
                  <input type="text" value="2,056,090" readOnly className="w-full bg-slate-100 border rounded px-1.5 py-0.5 text-right" />
                </div>
                <div>
                  <label className="block text-[#059669] font-medium text-[10.5px]">發票稅額</label>
                  <input type="text" value="102,805" readOnly className="w-full bg-emerald-50 border border-emerald-200 text-emerald-900 rounded px-1.5 py-0.5 text-right font-mono font-medium" />
                </div>
                <div>
                  <label className="block text-slate-500 text-[10.5px]">發票金額</label>
                  <input type="text" value="2,158,895" readOnly className="w-full bg-slate-100 border rounded px-1.5 py-0.5 text-right font-bold text-slate-700" />
                </div>
              </div>

              {/* Items Grid reflecting Screenshot 4 & 5 */}
              <div>
                <div className="text-[11px] font-bold text-slate-600 mb-1.5 flex items-center justify-between">
                  <span>會計分錄明細</span>
                  <span className="text-[10px] text-slate-400 font-normal">借貸平衡: 2,158,895</span>
                </div>
                <div className="border border-slate-300 rounded overflow-hidden">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 border-b border-slate-300 text-left">
                        <th className="p-1 px-2">序號</th>
                        <th className="p-1">借貸</th>
                        <th className="p-1">會計科目</th>
                        <th className="p-1">科目名稱</th>
                        <th className="p-1">部門</th>
                        <th className="p-1 text-right">金額</th>
                        <th className="p-1">摘要備註</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-white">
                        <td className="p-1 px-2 text-slate-400">0001</td>
                        <td className="p-1 text-blue-600 font-bold">借</td>
                        <td className="p-1">6111-0200</td>
                        <td className="p-1 font-sans">租金支出-倉庫</td>
                        <td className="p-1">3500 (物流部)</td>
                        <td className="p-1 text-right">779,886</td>
                        <td className="p-1 text-[10.5px] font-sans text-slate-500">麗嬰房(倉儲) 115.05 麗嬰房倉庫租金</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-1 px-2 text-slate-400">0002</td>
                        <td className="p-1 text-blue-600 font-bold">借</td>
                        <td className="p-1">6111-0200</td>
                        <td className="p-1 font-sans">租金支出-倉庫</td>
                        <td className="p-1">3700 (行銷部)</td>
                        <td className="p-1 text-right">20,100</td>
                        <td className="p-1 text-[10.5px] font-sans text-slate-500">麗嬰房(倉儲) 115.05 大巨蛋道具固定坪</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-1 px-2 text-slate-400">0003</td>
                        <td className="p-1 text-blue-600 font-bold">借</td>
                        <td className="p-1">6188-0600</td>
                        <td className="p-1 font-sans">其他費用-作業費</td>
                        <td className="p-1">3500 (物流部)</td>
                        <td className="p-1 text-right">11,000</td>
                        <td className={`p-1 text-[10.5px] font-sans text-[#a85507] cursor-pointer transition-all ${getHighlightClass('acp_pay_date')}`} onClick={() => onFieldClick('acp_pay_date')}>
                          麗嬰房(倉儲) 20呎人工櫃+40呎HQ 貨櫃 <span className="bg-amber-100 text-[#a85507] px-1 font-bold rounded">應付摘要記付款日</span>
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-1 px-2 text-slate-400">0004</td>
                        <td className="p-1 text-emerald-600 font-bold">借</td>
                        <td className="p-1">1137-0100</td>
                        <td className="p-1 font-sans">進項稅額-非資本設備</td>
                        <td className="p-1 block py-0.5">3500 (物流部)</td>
                        <td className="p-1 text-right">102,805</td>
                        <td className={`p-1 text-[10.5px] font-sans text-emerald-800 transition-all cursor-pointer ${getHighlightClass('acp_tax_memo')}`} onClick={() => onFieldClick('acp_tax_memo')}>
                          ⭐ 格式規範: 麗嬰房(倉儲) 進項稅額登打順序與格式！
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}


          {/* AJSB01 - Generate Posting Draft screen */}
          {activeScreen === 'AJSB01' && (
            <div className="space-y-4 max-w-xl mx-auto border border-slate-300 p-4 rounded-md bg-slate-50 shadow-sm relative">
              <div className="text-[#103a74] font-bold border-b border-slate-300 pb-1.5 flex items-center justify-between">
                <span>產生分錄底稿與拋轉設定</span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 rounded">程式碼: AJSB01</span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                
                {/* Source document option block */}
                <div className="border border-slate-200 p-2.5 rounded bg-white">
                  <span className="block text-slate-500 font-semibold mb-1">1. 選擇單據來源</span>
                  <div className="grid grid-cols-2 gap-2 font-medium">
                    <label className={`flex items-center gap-1.5 p-1 px-2 rounded border cursor-pointer border-indigo-200 bg-indigo-50/50 ${getHighlightClass('ajsb_src_ap')}`} onClick={() => onFieldClick('ajsb_src_ap')}>
                      <input type="checkbox" defaultChecked readOnly className="w-3.5 h-3.5 text-indigo-600" />
                      <span>應付憑單 (AP)</span>
                    </label>
                    <label className="flex items-center gap-1.5 opacity-40 p-1 px-2 rounded border border-slate-200 bg-slate-100">
                      <input type="checkbox" disabled className="w-3.5 h-3.5" />
                      <span>進貨單 (PO)</span>
                    </label>
                  </div>
                </div>

                {/* Subdocument serial input */}
                <div>
                  <label className="block text-slate-500 font-semibold">2. 選擇單別範圍</label>
                  <input type="text" value="717B 應付憑單(租金費用)" readOnly className="w-full bg-slate-100 border border-slate-300 rounded p-1" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-semibold">單據起始號</label>
                    <input type="text" value="20260527001" readOnly className="w-full bg-slate-100 p-1 rounded font-mono border" />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-semibold">單據結束號</label>
                    <input type="text" value="20260527001" readOnly className="w-full bg-slate-100 p-1 rounded font-mono border" />
                  </div>
                </div>

                <div className="h-px bg-slate-300 my-2"></div>

                {/* Batch Code formatting - CORE RULE 1 */}
                <div className="bg-sky-50 p-2.5 rounded border border-sky-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#0747a6] font-bold">3. 輸入底稿批號 *</span>
                    <span className="text-[10px] text-sky-800 font-mono">傳票期以它為準</span>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={interactiveValues.batchId || "W2026060320260527005"}
                      onChange={(e) => {
                        if (setInteractiveValues) {
                          setInteractiveValues(prev => ({ ...prev, batchId: e.target.value }));
                        }
                      }}
                      className={`flex-1 bg-white font-mono rounded p-1.5 text-center text-sm font-bold border ${getHighlightClass('ajsb_batch_id')}`} 
                      onClick={() => onFieldClick('ajsb_batch_id')}
                      placeholder="e.g. W2026060320260527005"
                    />
                  </div>
                  <div className="text-[10.5px] text-slate-500 leading-relaxed font-mono">
                    格式: <span className="text-orange-700 font-semibold">W</span>(王) + <span className="text-green-700 font-semibold">20260603</span>(今天) + <span className="text-blue-700 font-semibold">20260527</span>(傳票產生) + <span className="text-purple-700 font-semibold">005</span>(筆數)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-semibold">傳票日期</label>
                    <input type="text" value="2026/05/27" readOnly className="w-full bg-slate-100 p-1 rounded border font-mono" />
                  </div>
                  <div>
                    <span className="block text-slate-500 font-semibold">拋轉方式</span>
                    <div className="flex gap-2 pt-1">
                      <label className="flex items-center gap-1 font-medium">
                        <input type="radio" defaultChecked readOnly className="w-3 h-3 text-indigo-600" />
                        <span>拋轉分錄底稿</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Run Execute button */}
                <div className="pt-2 text-center">
                  <button className={`w-full py-2 rounded font-bold text-white shadow-md transition-transform flex items-center justify-center gap-1.5 cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-700 hover:scale-[1.01] ${getHighlightClass('ajsb_confirm')}`} onClick={() => onFieldClick('ajsb_confirm')}>
                    <Check className="w-4 h-4" />
                    <span>確認產生分錄底稿 (OK)</span>
                  </button>
                </div>

              </div>
            </div>
          )}


          {/* AJSI20 - Maintain Draft Entry screen */}
          {activeScreen === 'AJSI20' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200">
                <div className="flex gap-4 items-center">
                  <div className="font-bold flex items-center font-mono text-[#0e3b74]">
                    <span>底稿批號:</span>
                    <span className="ml-1.5 text-sky-800 font-bold bg-white border px-1.5 rounded">{interactiveValues.batchId || "W2026060320260527005"}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    傳票單號: {interactiveValues.voucherNo || "910-20260527009"}
                  </div>
                </div>
                <div className="space-x-1">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">已拋轉(過帳)</span>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">AJSI20</span>
                </div>
              </div>

              {/* Advanced Ledger Grid reflecting Screenshot 8 & 12 */}
              <div className="border border-slate-300 rounded overflow-hidden animate-fade-in">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="bg-[#e9f0fa] text-slate-700 border-b border-slate-300 text-left">
                      <th className="p-1 px-2.5">序號</th>
                      <th className="p-1">借貸</th>
                      <th className="p-1">會計科目</th>
                      <th className="p-1">科目名稱</th>
                      <th className="p-1 text-right">借方金額</th>
                      <th className="p-1 text-right">貸方金額</th>
                      <th className="p-1">專案</th>
                      <th className="p-1">摘要或立沖統編</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11.5px]">
                    <tr className="bg-white">
                      <td className="p-1 px-2.5 text-slate-400">0010</td>
                      <td className="p-1 text-blue-600 font-bold">D.借</td>
                      <td className="p-1 text-[#0747a6]">6111-0200</td>
                      <td className="p-1">租金支出-倉庫</td>
                      <td className="p-1 text-right font-bold text-slate-700">779,886</td>
                      <td className="p-1 text-right text-slate-400">0</td>
                      <td className="p-1 text-slate-500">EMERS</td>
                      <td className="p-1 text-slate-500">麗嬰房(倉儲) 115.05 麗嬰房倉庫租金</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-1 px-2.5 text-slate-400">0020</td>
                      <td className="p-1 text-blue-600 font-bold">D.借</td>
                      <td className="p-1 text-[#0747a6]">6111-0200</td>
                      <td className="p-1">租金支出-倉庫</td>
                      <td className="p-1 text-right font-bold text-slate-700">20,100</td>
                      <td className="p-1 text-right text-slate-400">0</td>
                      <td className="p-1 text-slate-500 font-bold">EMERS</td>
                      <td className="p-1 text-slate-500">麗嬰房(倉儲) 115.05 大巨蛋道具固定坪</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-1 px-2.5 text-slate-400">0030</td>
                      <td className="p-1 text-blue-600 font-bold">D.借</td>
                      <td className="p-1">6188-0600</td>
                      <td className="p-1">其他費用-作業費</td>
                      <td className="p-1 text-right font-bold text-slate-700">11,000</td>
                      <td className="p-1 text-right text-slate-400">0</td>
                      <td className="p-1 text-slate-500">EMERS</td>
                      <td className={`p-1 text-slate-500 cursor-pointer transition-all ${getHighlightClass('ajsi_pay_desc')}`} onClick={() => onFieldClick('ajsi_pay_desc')}>
                        麗嬰房(倉儲) 20呎人工櫃+40呎HQ 貨櫃 <strong className="text-rose-600">717B-20260527001</strong>
                      </td>
                    </tr>
                    
                    {/* The critical row: Input Tax details - CORE RULE 2 */}
                    <tr className="bg-amber-50">
                      <td className="p-1 px-2.5 text-amber-700 font-bold">0040</td>
                      <td className="p-1 text-emerald-600 font-bold">D.借</td>
                      <td className="p-1 font-bold">1137-0100</td>
                      <td className="p-1 font-bold">進項稅額-非設備</td>
                      <td className="p-1 text-right font-bold text-emerald-700">102,805</td>
                      <td className="p-1 text-right text-slate-400">0</td>
                      <td className="p-1 text-emerald-800 font-bold">EMERS</td>
                      <td className={`p-1 text-amber-900 cursor-pointer text-[10.5px] transition-all ${getHighlightClass('ajsi_tax_desc')}`} onClick={() => onFieldClick('ajsi_tax_desc')}>
                        ⭐ <span className="bg-amber-200 px-1 font-bold">麗嬰房-{(interactiveValues.invoiceDate || "2026/05/27").replace(/\//g, '').slice(0, 6)}-倉庫租金</span>
                      </td>
                    </tr>

                    <tr className="bg-[#f0f9ff]">
                      <td className="p-1 px-2.5 text-sky-800 font-bold">0050</td>
                      <td className="p-1 text-rose-600 font-bold">C.貸</td>
                      <td className="p-1">2141-0200</td>
                      <td className="p-1">應付憑單(租金)-應付票據</td>
                      <td className="p-1 text-right text-slate-400">0</td>
                      <td className="p-1 text-right font-bold text-rose-700">2,158,895</td>
                      <td className="p-1 text-sky-900 font-bold">EMERS</td>
                      <td className={`p-1 text-sky-800 cursor-pointer text-[10px] transition-all ${getHighlightClass('ajsi_pay_final')}`} onClick={() => onFieldClick('ajsi_pay_final')}>
                        麗嬰房(倉儲) 2026/05/27 <span className="bg-sky-200 px-1 font-bold">04377371</span> (115.05付款)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tips Callout */}
              <div className="p-2 px-3 bg-indigo-50 border border-indigo-100 rounded-md text-xs text-indigo-950 leading-relaxed font-sans">
                <strong>💡 審計小叮嚀 (第二段規則):</strong> 進項稅額格式要求: <code>[廠商名]-[年月]-[費用名稱]</code> (例如：<code>麗嬰房-202605-倉庫租金</code>)。應付憑單摘要必須完整含有 <code>付款日期</code> 與 <code>對象統編</code>以供勾稽。
              </div>
            </div>
          )}


          {/* ACTI10 - Finance Journal Entry screen */}
          {activeScreen === 'ACTI10' && (
            <div className="max-w-4xl mx-auto border border-slate-400 bg-[#f4f3eb] shadow-lg relative animate-fade-in text-xs font-sans text-slate-800 rounded-sm overflow-hidden select-none">
              
              {/* Main Title Bar */}
              <div className="bg-gradient-to-r from-blue-900 via-[#1d4e89] to-[#133e7e] text-white p-1.5 px-2.5 flex items-center justify-between text-[11px] font-mono select-none">
                <div className="flex items-center gap-1.5 font-bold">
                  <Database className="w-3.5 h-3.5 text-sky-400" />
                  <span>會計傳票建立作業(ACTI10) [艾盟仕股份有限公司(2023)]</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] opacity-90">
                  <span>Version:16.1.2.8</span>
                  <span>ModiDate:2026/3/4 上午 10:11:48</span>
                  <div className="flex items-center gap-1 ml-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#ff3b30] flex items-center justify-center text-[8px] font-bold text-white">_</span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#ffcc00] flex items-center justify-center text-[8px] font-bold text-slate-900">▢</span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#5c5c5c] flex items-center justify-center text-[8px] font-bold text-white">✕</span>
                  </div>
                </div>
              </div>

              {/* Top Menu Ribbon Tab bar */}
              <div className="bg-[#dfded9] border-b border-slate-350 px-2 flex gap-1.5 pt-1 text-[11px] select-none font-medium">
                <div className="bg-[#f0efea] border-t border-l border-r border-slate-400 rounded-t-sm px-3.5 py-1 text-blue-900 font-bold shadow-sm">常用</div>
                <div className="text-slate-600 px-3 py-1 hover:text-slate-900 cursor-pointer">資料</div>
                <div className="text-slate-600 px-3 py-1 hover:text-slate-900 cursor-pointer">功能</div>
                <div className="text-slate-600 px-3 py-1 hover:text-slate-900 cursor-pointer">訊息通知</div>
                <div className="text-slate-600 px-3 py-1 hover:text-slate-900 cursor-pointer">FAQ</div>
                <div className="text-slate-600 px-3 py-1 hover:text-slate-900 cursor-pointer">關於</div>
              </div>

              {/* Main ERP Toolbar Menu Button Row (Exactly matching Cosmos ERP) */}
              <div className="bg-[#f2f1eb] border-b border-slate-300 p-1 flex flex-wrap items-center gap-0.5 select-none overflow-x-auto min-h-[50px] shadow-sm">
                
                {/* Standard ERP buttons styled with original colors */}
                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-slate-400 cursor-not-allowed">
                  <Plus className="w-4 h-4 text-slate-300" />
                  <span className="mt-0.5">新增</span>
                </button>

                <button 
                  className={`flex flex-col items-center justify-center p-1 px-2.5 border rounded-sm text-[10px] cursor-pointer transition-all ${acti10QueryOpen ? 'bg-sky-100 border-sky-300 font-bold text-sky-900' : 'hover:bg-white text-slate-700'}`}
                  onClick={() => setActi10QueryOpen(true)}
                >
                  <Search className="w-4 h-4 text-blue-800" />
                  <span className="mt-0.5">查詢</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-slate-400 cursor-not-allowed">
                  <Edit className="w-4 h-4 text-slate-300" />
                  <span className="mt-0.5">修改</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-slate-400 cursor-not-allowed">
                  <Trash2 className="w-4 h-4 text-slate-300" />
                  <span className="mt-0.5">刪除</span>
                </button>

                {/* Print button (activates in segment 8) */}
                <button 
                  className={`flex flex-col items-center justify-center p-1 px-2.5 border rounded-sm text-[10px] transition-all cursor-pointer ${getHighlightClass('acti10_print')}`}
                  onClick={() => onFieldClick?.('acti10_print')}
                >
                  <Printer className="w-4 h-4 text-slate-750" />
                  <span className="mt-0.5 font-medium">列印</span>
                </button>

                <div className="w-px h-7 bg-slate-300 mx-1"></div>

                <button className="flex flex-col items-center justify-center p-1 px-1.5 hover:bg-white border border-transparent hover:border-slate-300 rounded-sm text-[10px] text-slate-600">
                  <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
                  <span className="text-[9px]">上筆</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-1.5 hover:bg-white border border-transparent hover:border-slate-300 rounded-sm text-[10px] text-slate-600">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="text-[9px]">下筆</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-1.5 hover:bg-white border border-transparent hover:border-slate-300 rounded-sm text-[10px] text-slate-600">
                  <ChevronsLeft className="w-3.5 h-3.5" />
                  <span className="text-[9px]">首筆</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-1.5 hover:bg-white border border-transparent hover:border-slate-300 rounded-sm text-[10px] text-slate-600">
                  <ChevronsRight className="w-3.5 h-3.5" />
                  <span className="text-[9px]">末筆</span>
                </button>

                <div className="w-px h-7 bg-slate-300 mx-1"></div>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-slate-500">
                  <Layers className="w-4 h-4 text-blue-650" />
                  <span className="mt-0.5">串查</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-slate-500">
                  <RefreshCw className="w-3.5 h-3.5 text-teal-650" />
                  <span className="mt-0.5">重查</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2 text-slate-400 border border-transparent rounded-sm text-[10px] cursor-not-allowed">
                  <Save className="w-4 h-4 text-slate-300" />
                  <span className="mt-0.5">儲存</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 text-slate-400 border border-transparent rounded-sm text-[10px] cursor-not-allowed">
                  <Folder className="w-4 h-4 text-slate-300" />
                  <span className="mt-0.5">單筆儲存</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 text-slate-400 border border-transparent rounded-sm text-[10px] cursor-not-allowed">
                  <X className="w-4 h-4 text-slate-300" />
                  <span className="mt-0.5">取消</span>
                </button>

                {/* Confirm button */}
                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-emerald-800 font-bold font-sans">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  <span className="mt-0.5">確認</span>
                </button>

                {/* Cancel Confirmation button (activates in segment 7) */}
                <button 
                  className={`flex flex-col items-center justify-center p-1 px-2.5 border rounded-sm text-[10px] text-rose-800 font-bold transition-all cursor-pointer ${getHighlightClass('acti10_unconfirm')}`}
                  onClick={() => onFieldClick?.('acti10_unconfirm')}
                >
                  <X className="w-4 h-4 text-rose-600 stroke-[2.5]" />
                  <span className="mt-0.5 font-bold">取消確認</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-red-700">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span className="mt-0.5">作廢</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-slate-700">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-750" />
                  <span className="mt-0.5">Excel</span>
                </button>

                <button className="flex flex-col items-center justify-center p-1 px-2.5 hover:bg-white border hover:border-slate-300 rounded-sm text-[10px] text-slate-700">
                  <Paperclip className="w-4 h-4 text-indigo-750" />
                  <span className="mt-0.5">附件</span>
                </button>

                <div className="w-px h-7 bg-slate-300 mx-1"></div>

                <button className="flex flex-col items-center justify-center p-0.5 px-2 bg-sky-50 border border-sky-200 text-sky-900 rounded-sm text-[10px] hover:bg-white">
                  <span className="font-bold">應用</span>
                </button>

                <button className="flex flex-col items-center justify-center p-0.5 px-2 bg-[#fffae8] border border-amber-300 text-amber-950 font-bold rounded-sm text-[10px] hover:bg-white shadow-sm shrink-0">
                  <span>傳票單筆過帳/還原</span>
                </button>

              </div>

              {/* Sub-Tabs Selector inside ACTI10 */}
              <div className="flex bg-[#e2e1dc] border-b border-slate-300 px-2 pt-1.5 text-[11px] font-sans font-medium select-none">
                <div className="text-slate-500 px-3.5 py-1.5 hover:text-slate-800 cursor-not-allowed">詳細欄位</div>
                <div className="text-slate-500 px-3.5 py-1.5 hover:text-slate-800 cursor-not-allowed">營運分類資料</div>
                <div className="bg-[#ffffff] border-t border-l border-r border-slate-350 rounded-t-sm px-4.5 py-1.5 font-bold text-slate-900 shadow-inner">資料瀏覽</div>
              </div>

              {/* Work Viewport with overlay capability */}
              <div className="relative min-h-[360px] bg-white flex flex-col font-sans overflow-x-auto">
                
                {/* 1. BACKGROUND LAYOUT - Upper Master Document Section */}
                <div className={`p-2 bg-[#f8f9f6] border-b border-slate-200 flex flex-col gap-1 z-0 ${acti10QueryOpen ? 'opacity-30 blur-[0.5px]' : ''}`}>
                  <table className="w-full text-[11px] border-collapse text-left text-slate-700">
                    <thead>
                      <tr className="bg-[#e4e6dd] text-slate-800 border-b border-slate-300 font-bold select-none">
                        <th className="p-1 border-r border-slate-300 pl-2 w-16">總帳帳別</th>
                        <th className="p-1 border-r border-slate-300 w-24">總帳帳別名稱</th>
                        <th className="p-1 border-r border-slate-300 w-20">傳票單別</th>
                        <th className="p-1 border-r border-slate-300 w-24">單別名稱</th>
                        <th className="p-1 border-r border-slate-300 w-28">傳票單號</th>
                        <th className="p-1 border-r border-slate-300 w-24">傳票日期</th>
                        <th className="p-1 border-r border-slate-300 w-28">人員名稱</th>
                        <th className="p-1 border-r border-slate-300 w-16">收支科目</th>
                        <th className="p-1 pl-2">科目名稱</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-sky-50 font-mono">
                        <td className="p-1 border-b border-r border-slate-200 pl-2 font-bold text-slate-600">00</td>
                        <td className="p-1 border-b border-r border-slate-200 text-slate-800 font-sans">910</td>
                        <td className="p-1 border-b border-r border-slate-200 font-bold text-slate-600">910</td>
                        <td className="p-1 border-b border-r border-slate-200 text-slate-800 font-sans">轉帳傳票</td>
                        <td className="p-1 border-b border-r border-slate-200 font-bold text-blue-900">20260527009</td>
                        <td className="p-1 border-b border-r border-slate-200 text-slate-800">2026/05/27</td>
                        <td className="p-1 border-b border-r border-slate-200 font-sans text-slate-700">王淑菲 (Sophie...)</td>
                        <td className="p-1 border-b border-r border-slate-200"></td>
                        <td className="p-1 border-b border-slate-200"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 2. BACKGROUND LAYOUT - Lower Ledger Grid Section (Scrollable detail items table) */}
                <div className={`flex-1 overflow-y-auto max-h-[220px] bg-white z-0 ${acti10QueryOpen ? 'opacity-35 blur-[0.5px]' : ''}`}>
                  <table className="w-full text-[10.5px] border-collapse text-slate-700 font-mono text-left">
                    <thead className="sticky top-0 bg-[#fbfbfa] text-slate-700 border-b border-slate-300 select-none shadow-sm">
                      <tr className="font-semibold text-[10.5px] h-6 bg-[#f0f2eb]">
                        <th className="p-1 border-r border-slate-250 text-center w-12">序號</th>
                        <th className="p-1 border-r border-slate-250 text-center w-12">借/貸</th>
                        <th className="p-1 border-r border-slate-250 pl-2 w-20">科目編號</th>
                        <th className="p-1 border-r border-slate-250 pl-2 w-32 font-sans">科目名稱</th>
                        <th className="p-1 border-r border-slate-250 text-center w-14">部門</th>
                        <th className="p-1 border-r border-slate-250 pl-2 w-24 font-sans">部門名稱</th>
                        <th className="p-1 border-r border-slate-250 text-center w-14">幣別</th>
                        <th className="p-1 border-r border-slate-250 text-right pr-2 w-12">匯率</th>
                        <th className="p-1 border-r border-slate-250 text-right pr-2 w-24">原幣金額</th>
                        <th className="p-1 border-r border-slate-250 text-right pr-2 w-24">記帳金額</th>
                        <th className="p-1 font-sans border-r border-slate-250 pl-2 w-16 text-slate-400">立沖帳目</th>
                        <th className="p-1 font-sans pl-2">摘要</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      
                      {/* Debit Rental Rows */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0010</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800 font-bold">6111-0200</td>
                        <td className="p-1 pl-2 font-sans text-slate-700 font-medium">租金支出-倉庫</td>
                        <td className="p-1 text-center">3500</td>
                        <td className="p-1 pl-2 font-sans">物流部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-850">779,886</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-850">779,886</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">麗嬰房-2026/05-倉庫租金</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0020</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800 font-bold">6111-0200</td>
                        <td className="p-1 pl-2 font-sans text-slate-700 font-medium">租金支出-倉庫</td>
                        <td className="p-1 text-center">3700</td>
                        <td className="p-1 pl-2 font-sans">行銷部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-850">20,100</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-850">20,100</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">租金分擔</td>
                      </tr>

                      {/* Operation Expense Rows */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0030</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800">6188-0600</td>
                        <td className="p-1 pl-2 font-sans text-slate-700">其他費用-作業費</td>
                        <td className="p-1 text-center">3500</td>
                        <td className="p-1 pl-2 font-sans">物流部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2">11,000</td>
                        <td className="p-1 text-right pr-2">11,000</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">作業裝卸費用</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0040</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800">6188-0600</td>
                        <td className="p-1 pl-2 font-sans text-slate-700">其他費用-作業費</td>
                        <td className="p-1 text-center">3500</td>
                        <td className="p-1 pl-2 font-sans">物流部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-800">258,723</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-800">258,723</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">裝卸及理貨費用</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0050</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800">6188-0600</td>
                        <td className="p-1 pl-2 font-sans text-slate-700">其他費用-作業費</td>
                        <td className="p-1 text-center">3500</td>
                        <td className="p-1 pl-2 font-sans">物流部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-850">729,226</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-850">729,226</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">系統倉儲作業月結</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0060</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800">6188-0600</td>
                        <td className="p-1 pl-2 font-sans text-slate-700">其他費用-作業費</td>
                        <td className="p-1 text-center">3500</td>
                        <td className="p-1 pl-2 font-sans">物流部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2">3,000</td>
                        <td className="p-1 text-right pr-2">3,000</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">雜支作業費</td>
                      </tr>

                      {/* Freight Rows (6114 運費) */}
                      <tr className="hover:bg-slate-50 transition-colors bg-amber-50/20">
                        <td className="p-1 text-center font-bold text-slate-400">0070</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800 font-bold">6114</td>
                        <td className="p-1 pl-2 font-sans text-slate-700 font-medium">運費</td>
                        <td className="p-1 text-center">3100</td>
                        <td className="p-1 pl-2 font-sans">運營管理部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2">1,357</td>
                        <td className="p-1 text-right pr-2">1,357</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">文件快遞/卡車分攤</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0080</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800 font-bold">6114</td>
                        <td className="p-1 pl-2 font-sans text-slate-700">運費</td>
                        <td className="p-1 text-center">5999</td>
                        <td className="p-1 pl-2 font-sans">經銷事業部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-800">146,401</td>
                        <td className="p-1 text-right pr-2 font-bold text-slate-800">146,401</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">大宗物流托運費</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0090</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800">6114</td>
                        <td className="p-1 pl-2 font-sans text-slate-700">運費</td>
                        <td className="p-1 text-center">6111</td>
                        <td className="p-1 pl-2 font-sans">零售事業部-Call</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2">251</td>
                        <td className="p-1 text-right pr-2">251</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">客服寄回郵資</td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0100</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-slate-800">6114</td>
                        <td className="p-1 pl-2 font-sans text-slate-700">運費</td>
                        <td className="p-1 text-center">6121</td>
                        <td className="p-1 pl-2 font-sans">零售事業部-ASH</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2">2,612</td>
                        <td className="p-1 text-right pr-2">2,612</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-400 text-[10px]">專櫃調貨運費</td>
                      </tr>

                      {/* VAT / Input Tax Row (科目：2114) */}
                      <tr className="bg-emerald-50/30 hover:bg-emerald-50/50 transition-colors border-y border-emerald-100">
                        <td className="p-1 text-center font-bold text-emerald-800 bg-emerald-100/50">0110</td>
                        <td className="p-1 text-center font-bold text-blue-800">D.借</td>
                        <td className="p-1 pl-2 text-emerald-950 font-bold font-mono">2114</td>
                        <td className="p-1 pl-2 font-sans text-emerald-900 font-semibold flex items-center gap-1.5">
                          <span>進項稅額</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-850 px-1 rounded font-mono font-bold select-none scale-90">待抵扣</span>
                        </td>
                        <td className="p-1 text-center">3500</td>
                        <td className="p-1 pl-2 font-sans">物流部</td>
                        <td className="p-1 text-center text-emerald-900 font-bold">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2 font-bold text-emerald-900">102,805</td>
                        <td className="p-1 text-right pr-2 font-bold text-emerald-900">102,805</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-emerald-950 font-medium bg-[#fffee2]/80 border border-amber-200 shadow-sm rounded-sm text-[11px] select-all animate-pulse">
                          AB12345678-20260527-麗嬰房股份有限公司
                        </td>
                      </tr>

                      {/* Credit - Accounts Payable / Bank row */}
                      <tr className="bg-slate-100/40 hover:bg-slate-100/60 transition-colors">
                        <td className="p-1 text-center font-bold text-slate-400">0120</td>
                        <td className="p-1 text-center font-bold text-red-650">C.貸</td>
                        <td className="p-1 pl-2 text-red-950 font-bold">1113-0200</td>
                        <td className="p-1 pl-2 font-sans text-red-900 font-medium">聯邦存款-開帳</td>
                        <td className="p-1 text-center">9900</td>
                        <td className="p-1 pl-2 font-sans text-slate-800">財務部</td>
                        <td className="p-1 text-center">NTD</td>
                        <td className="p-1 text-right pr-2">1</td>
                        <td className="p-1 text-right pr-2 font-bold text-red-900">2,158,895</td>
                        <td className="p-1 text-right pr-2 font-bold text-red-900">2,158,895</td>
                        <td className="p-1"></td>
                        <td className="p-1 pl-2 font-sans text-slate-500">轉帳支出劃撥</td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                {/* 3. MODAL OVERLAY: 設定查詢條件 (Exactly matching the screenshot dialog) */}
                {acti10QueryOpen && (
                  <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[0.5px] flex items-center justify-center p-4 z-10 select-none animate-fade-in">
                    <div className="w-[380px] bg-[#f4f3ed] border border-slate-400 rounded-sm shadow-xl flex flex-col text-xs text-slate-850 animate-scale-up">
                      
                      {/* Dialog Title Bar */}
                      <div className="bg-[#dfded9] p-1 px-3.5 border-b border-slate-300 flex items-center justify-between font-sans font-bold text-slate-700">
                        <span>設定查詢條件</span>
                        <button 
                          className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-sm w-4 h-4 flex items-center justify-center cursor-pointer font-bold font-mono"
                          onClick={() => setActi10QueryOpen(false)}
                        >
                          ✕
                        </button>
                      </div>

                      {/* Row 1: Limit input */}
                      <div className="p-3 pb-1 flex items-center gap-2 select-none">
                        <span className="text-slate-600">總資料筆數限制</span>
                        <div className="flex border border-slate-350 bg-white rounded-sm overflow-hidden select-all font-mono font-bold w-16">
                          <input type="text" value="500" readOnly className="w-full text-center px-1" />
                        </div>
                      </div>

                      {/* Tab buttons inside lookup dialog */}
                      <div className="flex bg-[#e2e1dc] border-b border-slate-300 mx-2.5 mt-1 select-none text-[11px]">
                        <div className="bg-white border-t border-l border-r border-slate-400 rounded-t-sm px-4.5 py-1 font-bold text-blue-900 shadow-sm">一般選項</div>
                        <div className="text-slate-500 px-4.5 py-1 hover:text-slate-800 cursor-not-allowed">進階設定</div>
                      </div>

                      {/* Form inputs container (styled to match Screenshot 2) */}
                      <div className="m-2.5 mt-0 bg-white border border-t-0 border-slate-350 p-4.5 space-y-3 font-sans relative">
                        
                        {/* Tab visual borders overlay helper */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-white"></div>
                        
                        {/* Form row: 傳票單別 */}
                        <div className="grid grid-cols-[80px_1fr] items-center gap-2.5">
                          <span className="text-slate-600 text-right">傳票單別</span>
                          <div className="flex gap-1.5">
                            <input type="text" placeholder="" readOnly className="flex-1 bg-slate-50 border border-slate-300 p-1 rounded-sm w-full" />
                            <select className="bg-slate-105 border border-slate-300 p-0.5 rounded-sm w-12 text-center" disabled>
                              <option>=</option>
                            </select>
                          </div>
                        </div>

                        {/* Form row: 傳票單號 (typing auto-completed with voucher code!) */}
                        <div className="grid grid-cols-[80px_1fr] items-center gap-2.5">
                          <span className="text-slate-700 font-bold text-right flex items-center justify-end gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-650 animate-ping"></span>
                            <span>傳票單號</span>
                          </span>
                          <div className="flex gap-1.5 relative">
                            <input 
                              type="text" 
                              value={interactiveValues?.voucherNo || "20260527009"} 
                              readOnly
                              className="flex-1 bg-[#fffde8] border border-blue-400 p-1 rounded-sm font-mono font-bold text-sm text-blue-950 focus:outline-none" 
                            />
                            <select className="bg-slate-105 border border-slate-300 p-0.5 rounded-sm w-12 text-center" disabled>
                              <option>=</option>
                            </select>
                          </div>
                        </div>

                        {/* Form row: 總帳帳別 */}
                        <div className="grid grid-cols-[80px_1fr] items-center gap-2.5">
                          <span className="text-slate-600 text-right">總帳帳別</span>
                          <div className="flex gap-1.5">
                            <input type="text" placeholder="" readOnly className="flex-1 bg-slate-50 border border-slate-300 p-1 rounded-sm w-full" />
                            <select className="bg-slate-105 border border-slate-300 p-0.5 rounded-sm w-12 text-center" disabled>
                              <option>=</option>
                            </select>
                          </div>
                        </div>

                      </div>

                      {/* Dialog Bottom Action Buttons */}
                      <div className="bg-[#e4e3dd] p-2 px-3.5 border-t border-slate-300 flex justify-end gap-2 text-[11px] font-sans font-semibold mb-1 select-none">
                        
                        {/* 確定 (O) Button gets dynamic coordinate focus indicator if active */}
                        <button 
                          className="px-5 py-1 bg-white border border-slate-500 hover:bg-slate-50 text-slate-800 rounded-sm shadow-sm flex items-center justify-center cursor-pointer transition-all active:translate-y-0.25 ring-1 ring-blue-500 ring-offset-1 ring-opacity-80"
                          onClick={() => setActi10QueryOpen(false)}
                        >
                          確定 (O)
                        </button>

                        <button 
                          className="px-5 py-1 bg-[#e4e3dd] border border-slate-400 opacity-60 text-slate-500 rounded-sm cursor-not-allowed flex items-center justify-center"
                          disabled
                        >
                          取消 (C)
                        </button>
                        
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Status information bottom bar as seen in screenshot 3 */}
              <div className="bg-[#e7e6df] border-t border-slate-300 p-1 px-3 flex items-center justify-between text-[11px] font-sans text-slate-700 select-none">
                
                {/* Total credit/debit balances matching screenshot details */}
                <div className="flex items-center gap-4 text-slate-800">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">記帳借方總金額:</span>
                    <strong className="font-mono text-[12px] text-blue-900 bg-sky-50 px-1 rounded border border-slate-200">2,158,895</strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">記帳貸方總金額:</span>
                    <strong className="font-mono text-[12px] text-red-900 bg-rose-50 px-1 rounded border border-slate-200">2,158,895</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="font-medium">
                    <span>單身資料筆數 : </span>
                    <strong className="font-mono text-blue-800 font-bold bg-white px-1 border rounded-sm">12</strong>
                  </div>
                  <div className="w-px h-3 bg-slate-300"></div>
                  <div className="font-mono text-[9px] opacity-75">
                    192.168.1.13 - 211
                  </div>
                </div>

              </div>

              {/* Audit Warnings overlay card */}
              <div className="m-3 p-2 px-3 bg-indigo-50 border border-indigo-250 rounded shadow-sm text-xs text-indigo-950 leading-relaxed font-sans mt-0.5">
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 shrink-0 select-none">⚙️</span>
                  <div>
                    <strong>會計核心內控制度 (第24條修正):</strong> 傳票單號 <code className="bg-white px-1 select-all font-bold">20260527009</code> 對應分錄底稿已在 ACTI10 過帳锁定。修改原始借貸細節或進項稅科目資訊（摘要如 <code>AB12345678-20260527-麗嬰房股份有限公司</code>）<strong>一律禁止直接在此傳票表面上手改！</strong> 必須依合規流程，先使用 <code>AJSB22</code> 取消連動/作廢，回歸原始憑底稿端修改。
                  </div>
                </div>
              </div>

            </div>
          )}


          {/* AJSB20 - Journal Voucher Batch Transfer Screen */}
          {activeScreen === 'AJSB20' && (
            <div className="max-w-xl mx-auto border border-slate-400 bg-slate-100 shadow-md relative animate-fade-in text-xs font-sans text-slate-800 rounded-sm overflow-hidden">
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-blue-900 to-[#133e7e] text-white p-1.5 px-2 flex items-center justify-between text-[11px] font-mono select-none">
                <div className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-sky-300 animate-pulse animate-duration-1000" />
                  <span className="font-bold">拋轉會計傳票作業(AJSB20) [艾盟仕股份有限公司(2023)]</span>
                </div>
                <span className="text-[10px] opacity-80">Version:iGP2.0 (16.0.2.1)</span>
              </div>

              {/* Tabs */}
              <div className="flex bg-[#e8e7e1] border-b border-slate-300 px-1 pt-1 text-[11px] select-none">
                <div className="bg-[#f0f0f0] border-t border-l border-r border-slate-400 rounded-t-sm px-3 py-1 font-bold text-slate-800 shadow-sm">基本選項</div>
                <div className="text-slate-500 px-3 py-1 hover:text-slate-800 cursor-pointer">系統選項</div>
                <div className="ml-auto text-slate-400 flex items-center px-1">
                  <span className="border border-slate-300 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-mono font-bold bg-white cursor-help">i</span>
                </div>
              </div>

              <div className="flex min-h-[380px] bg-[#fcfdfd]">
                {/* Left Area - Form Elements */}
                <div className="flex-1 p-3.5 space-y-2.5 border-r border-slate-300">
                  
                  {/* Row 1: 選擇單據性質 */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                    <span className="text-slate-600 text-right">選擇單據性質</span>
                    <select className="bg-white border border-slate-300 p-1 rounded-sm w-full font-mono text-xs focus:ring-1 focus:ring-blue-400" disabled>
                      <option>1.全部</option>
                    </select>
                  </div>

                  {/* Row 2: 總帳帳別 */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                    <span className="text-slate-600 text-right">總帳帳別</span>
                    <div className="flex gap-1.5 items-center">
                      <input type="text" value="00" readOnly className="w-12 bg-slate-200 text-slate-500 border border-slate-300 p-1 text-center font-mono rounded-sm" />
                      <input type="text" value="910" readOnly className="w-20 bg-[#fffde8] text-slate-800 font-bold border border-slate-300 p-1 text-center font-mono rounded-sm" />
                    </div>
                  </div>

                  {/* Row 3: 選擇底稿批號 */}
                  <div className="grid grid-cols-[110px_1fr] gap-2">
                    <span className="text-slate-600 text-right pt-1">選擇底稿批號</span>
                    <div className="border border-[#f8a3a3] bg-[#fffcfc] p-1.5 rounded-sm flex gap-2 relative">
                      <div className="flex-1 min-h-[72px] bg-white border border-slate-200 rounded-sm p-1 font-mono font-bold text-sky-900 break-all leading-relaxed whitespace-pre-wrap">
                        {interactiveValues?.batchId || "W2026060320260527005"}
                      </div>
                      
                      {/* Icons column as seen in screenshot */}
                      <div className="flex flex-col gap-1 text-[10px] pb-1 select-none text-slate-500 border-l pl-2 border-slate-200 justify-center">
                        <button className="p-1 hover:bg-slate-200 border rounded flex items-center justify-center font-mono text-[9px] font-bold text-blue-800 shrink-0">123</button>
                        <button className="p-1 hover:bg-slate-200 border rounded flex items-center justify-center shrink-0">✂️</button>
                        <button className="p-1 hover:bg-[#ffe3e3] hover:text-red-650 border border-red-200 rounded flex items-center justify-center text-red-500 shrink-0">🗑️</button>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: 選擇底稿序號 */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                    <span className="text-slate-600 text-right">選擇底稿序號</span>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">起</span>
                      <input type="text" placeholder="" readOnly className="w-24 bg-slate-50 border border-slate-300 p-1 rounded-sm" />
                      <span className="text-slate-400">至</span>
                      <input type="text" placeholder="" readOnly className="w-24 bg-slate-50 border border-slate-300 p-1 rounded-sm" />
                    </div>
                  </div>

                  {/* Row 5: 選擇產生日期 */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                    <span className="text-slate-600 text-right">選擇產生日期</span>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">起</span>
                      <div className="relative">
                        <input type="text" placeholder="" readOnly className="w-24 bg-slate-50 border border-slate-300 p-1 rounded-sm pr-6" />
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2" />
                      </div>
                      <span className="text-slate-400">至</span>
                      <div className="relative">
                        <input type="text" placeholder="" readOnly className="w-24 bg-slate-50 border border-slate-300 p-1 rounded-sm pr-6" />
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2" />
                      </div>
                    </div>
                  </div>

                  {/* Row 6: 選擇產生人員 */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                    <span className="text-slate-600 text-right">選擇產生人員</span>
                    <div className="relative w-36">
                      <input type="text" placeholder="" readOnly className="w-full bg-slate-50 border border-slate-300 p-1 rounded-sm pr-6" />
                      <Search className="w-3.5 h-3.5 text-blue-650 absolute right-1.5 top-2 cursor-pointer" />
                    </div>
                  </div>

                  {/* Row 7: 選擇傳票日期 */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                    <span className="text-slate-600 text-right">選擇傳票日期</span>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">起</span>
                      <div className="relative">
                        <input type="text" placeholder="" readOnly className="w-24 bg-slate-50 border border-slate-300 p-1 rounded-sm pr-6" />
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2" />
                      </div>
                      <span className="text-slate-400">至</span>
                      <div className="relative">
                        <input type="text" placeholder="" readOnly className="w-24 bg-slate-50 border border-slate-300 p-1 rounded-sm pr-6" />
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2" />
                      </div>
                    </div>
                  </div>

                  {/* Row 8: 選擇傳票排序方式 */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                    <span className="text-slate-600 text-right">選擇傳票排序方式</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 text-slate-700 font-medium">
                        <input type="radio" checked readOnly className="text-blue-650" />
                        依底稿序號
                      </label>
                      <label className="flex items-center gap-1 text-slate-400">
                        <input type="radio" readOnly className="text-slate-300" disabled />
                        依借貸別
                      </label>
                    </div>
                  </div>

                  {/* Row 9: Checkbox */}
                  <div className="pl-[110px] space-y-2">
                    <label className="flex items-center gap-1.5 text-slate-700 font-medium select-none">
                      <input type="checkbox" checked readOnly className="rounded-sm text-blue-650" />
                      拋轉傳票同底稿科目彙總
                    </label>
                    
                    {/* Compliance text / warnings */}
                    <p className="text-red-600 font-bold select-none leading-tight border-t border-dashed border-red-200 pt-1 text-[11px]">
                      注意：若要保留底稿的摘要到傳票，請不要勾選此一選項
                    </p>
                  </div>

                  {/* Toast/Success bubble styled as ERP Dialog */}
                  {interactiveValues?.voucherNo && (
                    <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-2.5 rounded shadow-sm text-[11px] font-medium flex items-center justify-between gap-1 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                        <span>已成功產生會計正式傳票單號：<strong className="text-emerald-800 font-mono font-bold text-sm select-all">{interactiveValues.voucherNo}</strong></span>
                      </div>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold select-none">ACTI10</span>
                    </div>
                  )}

                </div>

                {/* Right Area - Vertical Control Panel (Exactly matching the screenshot!) */}
                <div className="w-[105px] bg-[#e0dfd9] p-2 flex flex-col gap-2.5 select-none border-l border-slate-300">
                  
                  {/* OK / 確定 Button with coordinate trigger */}
                  <button 
                    className={`w-full py-2 border border-slate-400 bg-slate-50 hover:bg-white text-slate-700 font-bold rounded-sm shadow-sm flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:translate-y-0.5 ${getHighlightClass('ajsb20_transfer')}`}
                    onClick={() => onFieldClick?.('ajsb20_transfer')}
                  >
                    <div className="w-7 h-7 rounded-full border border-emerald-400 flex items-center justify-center bg-white shadow-inner">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    </div>
                    <span className="text-[11px]">確定</span>
                  </button>

                  {/* Cancel Button */}
                  <button className="w-full py-2 border border-slate-300 bg-slate-100 opacity-60 text-slate-400 rounded-sm flex flex-col items-center justify-center gap-1 cursor-not-allowed">
                    <div className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center bg-slate-50">
                      <X className="w-3.5 h-3.5 text-slate-400 stroke-[3.5]" />
                    </div>
                    <span className="text-[11px]">取消</span>
                  </button>

                  {/* Recurrence Button */}
                  <button className="w-full py-2 border border-slate-300 bg-slate-100 opacity-60 text-slate-400 rounded-sm flex flex-col items-center justify-center gap-1 cursor-not-allowed mt-2">
                    <div className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center bg-slate-50">
                      <RefreshCw className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                    </div>
                    <span className="text-[11px]">週期性</span>
                  </button>

                </div>
              </div>
            </div>
          )}


          {/* AJSB22 - Restore Journal Voucher (Reversal) screen */}
          {activeScreen === 'AJSB22' && (
            <div className="space-y-4 max-w-lg mx-auto border border-slate-300 p-4 rounded-md bg-slate-50 shadow-sm relative">
              <div className="text-[#a12e2e] font-bold border-b border-rose-300 pb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>還原會計傳票作業 (AJSB22)</span>
                </div>
                <span className="text-[9.5px] bg-rose-100 text-rose-800 px-1.5 rounded">程式碼: AJSB22</span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                
                {/* Method selector - CORE RULE 4 */}
                <div className="border border-rose-200 p-3 rounded bg-white space-y-2">
                  <span className="block text-slate-600 font-bold">1. 選擇還原方式 *</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <label 
                      className={`flex flex-col p-2.5 rounded border cursor-pointer transition-all ${
                        interactiveValues.reversalMode === 'void' 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold' 
                          : 'border-slate-200 hover:bg-slate-50'
                      } ${getHighlightClass('ajsb22_mode_void')}`}
                      onClick={() => {
                        if (setInteractiveValues) {
                          setInteractiveValues(prev => ({ ...prev, reversalMode: 'void' }));
                        }
                        onFieldClick('ajsb22_mode_void');
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <input 
                          type="radio" 
                          name="reversal_mode"
                          checked={interactiveValues.reversalMode === 'void'}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 text-emerald-600" 
                        />
                        <span>傳票作廢 (Invalidate)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal mt-1 leading-normal font-sans">
                        保留號碼、防跳號。適用於送會計稽核退件！
                      </span>
                    </label>

                    <label 
                      className={`flex flex-col p-2.5 rounded border cursor-pointer transition-all ${
                        interactiveValues.reversalMode === 'delete' 
                          ? 'border-rose-500 bg-rose-50 text-rose-950 font-bold' 
                          : 'border-slate-200 hover:bg-slate-50'
                      } ${getHighlightClass('ajsb22_mode_delete')}`}
                      onClick={() => {
                        if (setInteractiveValues) {
                          setInteractiveValues(prev => ({ ...prev, reversalMode: 'delete' }));
                        }
                        onFieldClick('ajsb22_mode_delete');
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <input 
                          type="radio" 
                          name="reversal_mode" 
                          checked={interactiveValues.reversalMode === 'delete'}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 text-rose-600" 
                        />
                        <span>傳票刪除 (Delete)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal mt-1 leading-normal font-sans">
                        直接抹除。可能造成跳號，只適用於當天修正。
                      </span>
                    </label>
                  </div>
                </div>

                {/* Criteria input */}
                <div className="space-y-2">
                  <div>
                    <label className="block text-slate-500 font-semibold mb-0.5">2. 選擇底稿批號</label>
                    <input 
                      type="text" 
                      value={interactiveValues.batchId || "W2026060320260527005"} 
                      readOnly 
                      className={`w-full bg-slate-100 p-1.5 rounded border font-mono font-bold text-slate-700 ${getHighlightClass('ajsb22_batch')}`}
                      onClick={() => onFieldClick('ajsb22_batch')}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-500 font-semibold text-[10.5px]">傳票產生起始日</label>
                      <input type="text" value="2026/05/27" readOnly className="w-full bg-slate-100 p-1 rounded font-mono" />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold text-[10.5px]">傳票產生結束日</label>
                      <input type="text" value="2026/05/27" readOnly className="w-full bg-slate-100 p-1 rounded font-mono" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button 
                    className={`w-full py-2 rounded font-bold text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01] ${
                      interactiveValues.reversalMode === 'void'
                        ? 'bg-[#008f5d] border border-emerald-600'
                        : 'bg-[#a32222] border border-rose-600'
                    } ${getHighlightClass('ajsb22_execute')}`}
                    onClick={() => onFieldClick('ajsb22_execute')}
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                    <span>即刻執行還原過帳作業 (OK)</span>
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 leading-normal pl-1 border-l-2 border-slate-300 font-sans">
                  注意：跑此作業會使會計總帳 ACTI10 與自動分錄 AJSI20 正式解除連動。若作廢，底稿即可重新編輯更正明細或刪除。
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

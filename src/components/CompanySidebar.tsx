import React, { useState } from 'react';
import { 
  MessageSquare, User, Clock, Bell, Info, ShieldCheck, Mail, Send, Check 
} from 'lucide-react';
import { DirectMessage } from '../types';

export default function CompanySidebar() {
  const [messages, setMessages] = useState<DirectMessage[]>([
    {
      id: 1,
      sender: "主管 廖有毅",
      avatar: "👨‍💼",
      role: "主辦會計 / 審查主管",
      time: "10:15",
      message: "王淑菲(E12106)，艾盟仕租金發票（淨額 2,056,090）來了。記得核對憑單和發票、照民國規則建底稿編號。注意，底稿修正只需手動重跑 AJSB01 覆蓋，不可改傳票實體！",
      isMe: false,
      unread: true
    },
    {
      id: 2,
      sender: "你 (王淑菲)",
      avatar: "👸",
      role: "實習生 / 會計助理",
      time: "10:18",
      message: "好的廖主管，發票號碼 AY56654359 比對對齊了，進項稅額摘要 [04377371] 也會登打。那如果廖主管審核退回應付憑單，要退還重編呢？",
      isMe: true,
      unread: false
    },
    {
      id: 3,
      sender: "主管 廖有毅",
      avatar: "👨‍💼",
      role: "主辦會計 / 審查主管",
      time: "10:20",
      message: "退件要極度小心！在 AJSB22 選擇「傳票作廢」，保留流水號，否則「傳票刪除」會導致序號跳號遭外稽管考糾正！最後記得：1. COPY 應付憑單最後頁上面要書寫分錄底稿編號及傳票編號及付款日期；2. COPY 發票上面書寫傳票編號（如為感熱紙則要加 COPY 一張共 2 張）！",
      isMe: false,
      unread: true
    }
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const newMsg: DirectMessage = {
      id: Date.now(),
      sender: "你 (王淑菲)",
      avatar: "👸",
      role: "實習生 / 會計助理",
      time: "10:45",
      message: inputVal,
      isMe: true,
      unread: false
    };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
  };

  return (
    <div id="company-cooperation-panel" className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col h-[520px] justify-between">
      
      {/* Tab Heading */}
      <div className="space-y-1">
        <div className="flex justify-between items-center pb-2 border-b border-indigo-50">
          <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 font-sans">
            <MessageSquare className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>會計部 專案通訊即時對話</span>
          </h3>
          <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 rounded-full font-bold">待覆核</span>
        </div>
        <p className="text-[10px] text-slate-400">王淑菲 (會計實習) ⇄ 廖有毅 (主辦會計) 之作業溝通線</p>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 text-xs max-h-[300px]">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-1 mb-0.5 text-[10px]">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <span>{msg.avatar}</span>
                <span>{msg.sender}</span>
              </span>
              <span className="text-slate-400 font-mono text-[9px]">{msg.time}</span>
            </div>
            
            <div className={`p-2.5 rounded-lg max-w-[90%] leading-relaxed shadow-sm font-sans relative ${
              msg.isMe 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-[#f3f4f6] text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Manual text sender box */}
      <div className="border-t border-slate-200 pt-2.5 space-y-1.5">
        <div className="flex gap-1">
          <input 
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="與廖主管回報作業進度..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded p-1.5 text-xs outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
          />
          <button 
            onClick={handleSend}
            className="p-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded cursor-pointer text-xs flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-2 bg-amber-50/70 border border-amber-200 rounded text-[10px] text-amber-900 leading-normal font-sans space-y-1">
          <strong>⚠️ 國稅稽核及裝訂指引:</strong>
          <div className="pl-1">1. COPY 應付憑單最後頁上面要書寫分錄底稿編號及傳票編號及付款日期。</div>
          <div className="pl-1">2. COPY 發票上面書寫傳票編號（如為感熱紙，必須要加 COPY 一張共 2 張，避免日久氧化褪色）裝訂歸檔。</div>
        </div>
      </div>

    </div>
  );
}

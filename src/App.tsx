import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, Play, Pause, Computer, Layers, Printer, Database, ShieldAlert,
  Clock, Sparkles, Copy, Video, Volume2, ChevronLeft, ChevronRight, ListMusic,
  Tv, PictureInPicture, Archive, CheckSquare, Sparkle, RefreshCw, BookOpen
} from 'lucide-react';
import ErpSimulator from './components/ErpSimulator';
import SopStoryboard from './components/SopStoryboard';
import SopTranscriptTable from './components/SopTranscriptTable';
import OriginalSlideshow from './components/OriginalSlideshow';

interface StoryboardSegment {
  index: number;
  start: string;
  end: string;
  secondsStart: number;
  secondsEnd: number;
  title: string;
  subtitle: string;
  narrative: string;
  erpScreen: string;
  visualFocus: string;
  visualDetail: string;
  erpMockupDescription: string;
  editorCuts: string;
  audioBgm: string;
  compliancePoint: string;
}

const storyboardSegments: StoryboardSegment[] = [
  {
    index: 1,
    start: "00:00",
    end: "00:15",
    secondsStart: 0,
    secondsEnd: 15,
    title: "片頭：專案流程說明",
    subtitle: "應付單據審核與分錄底稿自動拋轉核心架架構演繹。",
    narrative: "歡迎進入鼎新 ERP 與商業會計自動勾稽作業教學。本單元將為您詳盡示範，如何從應付憑單審核，再經由系統自動分錄，無縫拋轉至會計傳票之標準流程。",
    erpScreen: "FLOW",
    visualFocus: "應付憑單審核與分錄底稿流程概觀導覽",
    visualDetail: "開場淡入。呈現「鼎新 ERP 與商業會計自動勾稽作業教學」。數據流向指示燈呈流暢指示，標定自應付憑單向傳票之自動分錄拋轉軌跡。",
    erpMockupDescription: "全域 Cosmos ERP 自動分錄系統流程地圖：進銷存單據/發票憑證 ➜ AJSB01 產生分錄底稿 ➜ AJSI20 底稿維護 ➜ AJSB20 拋轉會計傳票 ➜ ACTI10 會計傳票過帳。",
    editorCuts: "【0.0s】由全黑淡入。【5.0s】配合旁白，流程對照圖中「分錄底稿」框線發光，加入精確指引音效。",
    audioBgm: "科技感電子氛圍樂 (BGM: Deep Focus Track) 低音量背景循環 (15% 音量)。",
    compliancePoint: "內控常規：自動分錄系統為防範人為登帳疏漏與舞弊，核心映射期之年度與系統承辦字軌需經會計主管簽核授權。"
  },
  {
    index: 2,
    start: "00:15",
    end: "00:35",
    secondsStart: 15,
    secondsEnd: 35,
    title: "段落一：審核憑證",
    subtitle: "勾稽進項發票字軌號碼、交易日期與應付底稿勾稽資訊。",
    narrative: "首先進入 ACPI02 應付憑單維護。我們必須嚴格審核原始發票內容，確認發票日期與發票號碼是否與進項憑證相符。若勾稽有任何誤差，需向採購部門核對，其發票日期即為傳票之入帳日期。",
    erpScreen: "ACPI02",
    visualFocus: "進項發票審核要點：發票日期、字軌與統編。",
    visualDetail: "畫面切換至應付憑單(ACPI02)操作介面。鏡頭瞬間拉近 (Speed Zoom) 特寫左側的『麗嬰房倉儲租金進項發票』，紅框套在發票日期與統一編號。隨後滑鼠光標擺動到發票日期與交易日期相互匹配。",
    erpMockupDescription: "應付憑單建立畫面：包含單據字軌主管(L)及承辦(W)代號。表單主鍵為發票總額 $2,158,895（貨款 $2,056,090 與營業稅 $102,805）。發票日期欄位顯示 2026/05/27。",
    editorCuts: "【15.0s】硬切（Cut）進入 ACPI02 輸入畫面。【20.0s】當發票號碼輸入時，配上流暢的『機械鍵盤打字音效』。【30.0s】局部變焦至下方付款到期日區塊。",
    audioBgm: "打字音效疊加。背景音樂進入平穩推進的主弦律，維持心流學習狀態。",
    compliancePoint: "裝訂稽核：進項憑證編號與扣抵聯之核對，為申報扣抵銷項稅額之法定前提，如有不符，將導致國稅局核定補稅處罰。"
  },
  {
    index: 3,
    start: "00:35",
    end: "00:55",
    secondsStart: 35,
    secondsEnd: 55,
    title: "段落二：產生底稿",
    subtitle: "藉 AJSB01 自動轉分錄批處理建立底稿批號。",
    narrative: "應付憑單結項後，前往 AJSB01 產生分錄底稿作業。設定開帳年份 115 年，來源字軌 AP 執行自動拋轉。此時產生的底稿編號格式是依合規公式：由個人英文字第一位、加今日年月日、傳票產生日期，再加流水序號 001 所組成，智慧串接多帳以完成底稿建置。",
    erpScreen: "AJSB01",
    visualFocus: "批號產生器格式：操作人首字首碼 + 當天日期 + 當天拋轉日 + 批次序號。",
    visualDetail: "畫面切換至『AJSB01 產生分錄底稿』設定視窗。滑鼠軌跡準確選中過濾條件，點選右上方「執行產生」，螢幕彈出完成加載綠色勾號提示。",
    erpMockupDescription: "AJSB01 批號預覽：自動產出分錄底稿，如『W2026060320260527005』之規範批次編號。",
    editorCuts: "【35.0s】由 ACPI02 轉場至 AJSB01。【42.0s】批號字元閃爍指引，加入金屬提示音，提示批號建立成功。",
    audioBgm: "底稿產生階段，音軌中加入伺服器硬體運轉與數據流嗶聲 (Data FX)。",
    compliancePoint: "審計留痕：分錄底稿批次格式係為外部稽核循線追溯原始承辦人員及建檔日之唯一合規線索，嚴禁隨意更改或省略字首字軌。"
  },
  {
    index: 4,
    start: "00:55",
    end: "01:15",
    secondsStart: 55,
    secondsEnd: 75,
    title: "段落三：底稿維護",
    subtitle: "進入 AJSI20 維稿借貸平衡，登打合規會計科目摘要。",
    narrative: "底稿產生後，應立即點入 AJSI20 分錄底稿維護作業進行核實。在此，我們必須一筆一筆覆核借方與貸方的科目代碼、金額、進項稅額是否達到完美會計平衡，並特別注意必須將進項稅額科目摘要編輯成『發票號碼-年月日-公司名稱』的合規格式，補全合規的會計分錄摘要說明。",
    erpScreen: "AJSI20",
    visualFocus: "檢查借貸餘額，確使借貸完全平衡且無缺漏。",
    visualDetail: "畫面回到『AJSI20 分錄底稿維護作業』。指針雙擊開啟該筆分錄批號，展開借貸明細表。滑鼠精確指引「應付帳款-開帳」與「進項稅額」在借方，「銀行存款」在貸方之一一對應勾稽狀態。",
    erpMockupDescription: "AJSI20 編輯主頁面：借方（應付帳款 $2,056,090、進項稅額 $102,805）、貸方（聯邦存款 $2,158,895），整體呈現借貸相抵平衡零差額。",
    editorCuts: "【55.0s】硬切進入 AJSI20 特寫。【62.0s】摘要登打完畢，畫面角落高亮亮起綠色勾標，搭配「叮！儲存成功」提示音。",
    audioBgm: "音樂維持低音頻節奏，象徵進入核心會計記帳精算檢測。",
    compliancePoint: "科目要點：進項稅額（科目：2114）登打時，摘要必須編輯成：『發票號碼-年月日-公司名稱』，其餘費用摘要也需填具完整之往來廠商全名，藉以維持會計資訊品質與外稽透明度。"
  },
  {
    index: 5,
    start: "01:15",
    end: "01:35",
    secondsStart: 75,
    secondsEnd: 95,
    title: "段落四：拋轉傳票",
    subtitle: "透過 AJSB20 批次將分錄底稿自動拋轉至總帳會計傳票系統。",
    narrative: "當確定底稿借貸完全平衡後，即可過渡至 AJSB20 拋轉會計傳票。我們在此直接載入剛才校驗完置的底稿批號，執行整批拋轉，將分錄資料全面升格生成總帳會計傳票。",
    erpScreen: "AJSB20",
    visualFocus: "鎖定剛才 AJSI20 校驗通過的分錄底稿，整批拋轉為傳票。",
    visualDetail: "畫面切入『AJSB20 拋轉會計傳票專用控制台』。在底稿字軌處輸入剛才的批號，點選右上方「整批拋轉會計傳票」按鍵。滑鼠引導點擊「確認」彈窗。",
    erpMockupDescription: "AJSB20 任務處理面板：載入批號，進度條一閃而過，彈出綠色泡泡：『已成功產生會計正式傳票單號：910-20260527009』。",
    editorCuts: "【75.0s】拉遠鏡頭 (Zoom Out) 回至全景流程。【80.0s】施加光斑流光特效，硬切至下個底稿反向查詢視窗。",
    audioBgm: "背景音樂轉為稍微輕快的和弦，緩解長時間看系統畫面的枯燥疲倦感。",
    compliancePoint: "流程控管：唯有在 AJSI20 狀態完成核准 (Status: Approved) 之分錄底稿，方能被納入 AJSB20 自動過濾抛轉範圍。否則將遭系統攔截拒絕拋轉。"
  },
  {
    index: 6,
    start: "01:35",
    end: "01:55",
    secondsStart: 95,
    secondsEnd: 115,
    title: "段落五：查詢與確認",
    subtitle: "反向檢索拋轉歷程，貫徹「源頭修改、禁止改傳票」之金科玉律。",
    narrative: "底稿拋轉傳票後，應回到分錄底稿查詢並核對拋出的傳票號碼。切記，若發現摘要、金額或會計科目錯誤，均應回到『分錄底稿』修改重拋，絕對禁止在傳票端直接進行手工修改。",
    erpScreen: "AJSI20",
    visualFocus: "只修正分錄底稿資訊，不直接改傳票內容。",
    visualDetail: "畫面回到 AJSI20 視窗「查詢模式」。滑鼠在底稿批號鍵入『W2026060320260527005』載入，拋轉產生之正式傳票號碼藍黃高亮呈現。",
    erpMockupDescription: "AJSI20 查詢結果：底稿右側拋轉狀態為 Y (已拋轉)，傳票單號精準載入『910-20260527009』。",
    editorCuts: "【95.0s】快速特寫傳票代碼欄位。【105s】在傳票號下方，閃爍紅框警示字眼：『修正原則：禁止在傳票端直接修改！』",
    audioBgm: "背景配樂維持低沉沉穩音符，凸顯系統安全查詢動作的嚴密規範。",
    compliancePoint: "內控常規：禁止手動修改總帳傳票是維持傳票與自動分錄底稿 1:1 對等之唯一法門。違者將遭致外部審計師之管理缺失改善意見。"
  },
  {
    index: 7,
    start: "01:55",
    end: "02:15",
    secondsStart: 115,
    secondsEnd: 135,
    title: "段落六：修正原則",
    subtitle: "依法執行傳票作廢與流水號追蹤留痕，防範跳號缺失。",
    narrative: "若審單發現重大缺失需要整筆退回重開，應前往 AJSB22 選擇『傳票作廢模式』進行還原。此舉旨在保留合規歷史記帳憑證流水，避免序號斷裂、跳號而違反商會法。",
    erpScreen: "AJSB22",
    visualFocus: "整筆退回時，請確保傳票狀態一致。",
    visualDetail: "畫面轉至『AJSB22 拋轉傳票批次還原及作廢』視窗。滑鼠指針高亮點選『傳票作廢模式』。隨即點擊『執行還原與作廢』，彈出確認視窗。",
    erpMockupDescription: "AJSB22 還原控制台：高亮點選『✅ 傳票作廢（保留號碼，符合我國商業會計法）』，警告指示不應實體刪除傳票。",
    editorCuts: "【115s】進入 AJSB22，作廢按鈕呈危險紅閃爍裝飾兩次。【125s】當光標點選作廢安全鎖時配上大鎖音效，強調序號留痕完整性。",
    audioBgm: "音樂加入警醒之低音和聲，增強合規合法、保留資料痕跡的重要性意識。",
    compliancePoint: "商會法規範：依商業會計法第34條規定，所有記帳憑證應依編號順序裝訂。實體刪除傳票會造成跳號缺失，在查帳時是非法與不及格重大內控制度漏洞。"
  },
  {
    index: 8,
    start: "02:15",
    end: "02:35",
    secondsStart: 135,
    secondsEnd: 155,
    title: "段落七：建檔與審核",
    subtitle: "執行總帳過帳終審，實施防舞弊鎖定機制。",
    narrative: "分錄底稿驗收完畢後，進入 ACTI10 會計傳票建立作業。我們進行最後一次的借貸金額平衡與發票比對覆核，確認無誤即可點選審核過帳，將帳務狀態正式上鎖確認。",
    erpScreen: "ACTI10",
    visualFocus: "確認發票與憑證資訊一致。",
    visualDetail: "進入總帳核心『ACTI10 會計傳票建立作業』視窗。滑鼠流暢地核算借貸平衡，並點擊上方「確認過帳」審查簽字。",
    erpMockupDescription: "ACTI10 會計主表：過帳狀態碼從 N 成功變更為 Y (已過帳確認)。傳票中間疊加主管審查蓋章印記。",
    editorCuts: "【135s】硬切入 ACTI10 過帳畫面。【145s】過帳轉換之際伴隨蓋章戳章音效，象徵過帳終審大功告成。",
    audioBgm: "背景氛圍樂達到最高潮，隨後琴鍵聲漸趨平穩，代表主流程已全數在 ERP 總帳中確認留底。",
    compliancePoint: "審計驗收：傳票一經主管確認過帳 (Y)，將鎖死其原始資料，阻斷 any 未留蹤跡之改帳舞弊行為。"
  },
  {
    index: 9,
    start: "02:35",
    end: "03:05",
    secondsStart: 155,
    secondsEnd: 185,
    title: "段落八：整理歸檔",
    subtitle: "單據手寫註記底稿號與傳票號，雙重裝訂感熱紙防褪色複製本。",
    narrative: "過帳完成後，請由系統列印出紙本傳票。於『應付憑單最後一頁複印本』手寫標記底稿批號、傳票號與付款日期；同時在發票上面書寫傳票號碼。若屬感熱紙發票，必須加印影印本，兩張重疊雙重裝訂歸檔。",
    erpScreen: "ACTI10",
    visualFocus: "1. COPY 應付憑單最後頁上面書寫底稿、傳票號與付款日。2. COPY 發票上面書寫傳票號（若為感熱紙則加印一張共 2 張）。",
    visualDetail: "畫面彈出畫中畫特寫實物裝訂照片。展示 COPY 應付憑單最後頁與發票正副本，並用原子筆在 COPY 應付憑單最後頁書寫註記底稿號、傳票號與付款日期，以及在 COPY 發票（感熱紙則複印兩張）上面書寫傳票編號並重疊雙重裝訂。",
    erpMockupDescription: "ACTI10 工具列：滑鼠點擊列印傳票。實體投影片裝訂順序：傳票 ➜ COPY 應付憑單末頁（手寫底稿號、傳票號、付款日期） ➜ 分錄底稿 ➜ 統一發票正本 + COPY 發票上面書寫傳票編號（感熱紙加印一張共 2 張）二重裝訂。",
    editorCuts: "【155s】拉出畫中畫實物照片。【168s】手寫字跡亮起螢光高亮。配上唰——影印機掃描聲。【175s】主副畫面重合。",
    audioBgm: "影印機掃描聲。背景音樂進入優雅的和聲尾奏，徐徐向下遞減。",
    compliancePoint: "裝訂大律：商業會計法第41條指出憑證應妥善保管。因感熱材質化學性，3年內字跡必隨氧化淡化呈白紙。若無影印本重合裝訂，無法通過五年查帳法規審查。"
  },
  {
    index: 10,
    start: "03:05",
    end: "03:20",
    secondsStart: 185,
    secondsEnd: 200,
    title: "結尾：完工歸檔",
    subtitle: "完成實體與數位單據雙向勾稽，依公司規章歸入檔案室保管。",
    narrative: "確認數位分錄與紙本憑證 1:1 完美核對後，即可依合規章程將全案傳票送至檔案室依序歸卷封存。恭喜您，圓滿完成了 Cosmos ERP 的會計自動化稽核標準流程。",
    erpScreen: "FLOW",
    visualFocus: "完成日常帳務勾稽所有作業。",
    visualDetail: "畫面切回全域系統流程圖標 (FLOW)，全流程標籤均點亮綠色完工標誌。畫面中央呈現艾盟仕 ERP 考評「優等通過」簽章。",
    erpMockupDescription: "編制結業簡報：流光巡迴結束，系統各模組正式閉環鎖定。右側顯示數據準確度達『100% 正確合規』。影片漸漸淡出黑幕。",
    editorCuts: "【185s】切換回精緻的影片尾字卡與版權標誌。【195s】音樂尾音結束，畫面在【200s】圓滿淡出黑幕。",
    audioBgm: "背景氛圍音樂悠長地奏出和弦和諧尾音，最終與畫面同步消逝，淡入寂靜。",
    compliancePoint: "專案完結：圓滿完成一期艾盟仕開帳勾稽演練。此 SOP 影片應作為新進出納與帳務主管必修教材。"
  }
];

const bilingualTermsMap: Record<number, { englishTitle: string; englishNarrative: string; termMappings: { zh: string; en: string }[] }> = {
  1: {
    englishTitle: "Scene 1: Process Overview",
    englishNarrative: "Welcome to the Cosmos ERP & Commercial Accounting Automated Integration tutorial. This unit demonstrates standard procedures from Accounts Payable (AP) Voucher review to automated General Ledger (GL) journal posting.",
    termMappings: [
      { zh: "自動分錄", en: "Automated Journal Entry" },
      { zh: "應付憑單", en: "Accounts Payable Voucher" },
      { zh: "會計傳票", en: "Accounting/GL Voucher" },
    ]
  },
  2: {
    englishTitle: "Scene 2: Original Voucher Review",
    englishNarrative: "First, access ACPI02. We must strictly audit invoice dates and numbers to match corresponding certificates. The invoice date determines the GL entry posting date.",
    termMappings: [
      { zh: "發票號碼", en: "Uniform Invoice Number" },
      { zh: "憑證勾稽", en: "Voucher Cross-matching" },
      { zh: "入帳日期", en: "Posting Date" },
    ]
  },
  3: {
    englishTitle: "Scene 3: Generating Entry Drafts",
    englishNarrative: "After voucher completion, open AJSB01 and run auto-posting under AP source. Note that the generated draft ID format compiles by a compliant formula: User's first letter, today's date, voucher date, plus sequence code like 001.",
    termMappings: [
      { zh: "分錄底稿", en: "Journal Entry Draft" },
      { zh: "來源字軌", en: "Source System Journal Code" },
      { zh: "自動拋轉", en: "Automated Linkage Posting" },
    ]
  },
  4: {
    englishTitle: "Scene 4: Entry Draft Verification",
    englishNarrative: "Once generated, inspect AJSI20. Verify debit-credit accounting balance for codes, amounts, and VAT, then complete necessary description comments under legal norms.",
    termMappings: [
      { zh: "科目代碼", en: "COA Account Code" },
      { zh: "進項稅額", en: "Input Tax (VAT)" },
      { zh: "借貸相抵", en: "Debit-Credit Balancing" },
    ]
  },
  5: {
    englishTitle: "Scene 5: General Ledger Voucher Draft Posting",
    englishNarrative: "Upon verifying entries, transition to AJSB20. Retrieve the checked bundle Batch ID and batch-execute GL voucher generation.",
    termMappings: [
      { zh: "批號載入", en: "Batch ID Import" },
      { zh: "整批拋轉", en: "Batch GL Voucher Posting" },
      { zh: "資料升格", en: "Data Status Elevation" },
    ]
  },
  6: {
    englishTitle: "Scene 6: Search & Verification",
    englishNarrative: "Return to AJSI20 to query post-posting voucher IDs. Correct any errors within the original entry draft—never modify GL accounting entries directly.",
    termMappings: [
      { zh: "唯讀傳票", en: "Read-only Posted Voucher" },
      { zh: "禁止改傳票", en: "Direct GL Voucher Mod Prohibited" },
      { zh: "修正重拋", en: "Modify Draft & Re-post" },
    ]
  },
  7: {
    englishTitle: "Scene 7: Correction Rules & Voiding",
    englishNarrative: "For major voids, enter AJSB22 and select 'Void Mode'. This keeps sequential bookkeeping logs intact and avoids serial gap violations of accounting laws.",
    termMappings: [
      { zh: "傳票作廢", en: "Voucher Voiding (Cancellation)" },
      { zh: "序號斷裂", en: "Voucher Serial Identifier Gap" },
      { zh: "商業會計法", en: "Business Accounting Act" },
    ]
  },
  8: {
    englishTitle: "Scene 8: Ledger Posting Approval",
    englishNarrative: "Lastly, navigate to ACTI10. Execute the final debit-credit checkout and click Overposting to permanently lock down current transactions from fraud.",
    termMappings: [
      { zh: "審核過帳", en: "Approve Post-to-GL" },
      { zh: "資料鎖死", en: "Data Modification Lockout" },
      { zh: "防舞弊", en: "Anti-Fraud Internal Control" },
    ]
  },
  9: {
    englishTitle: "Scene 9: Printing & Physical Filing",
    englishNarrative: "Print GL bills. Manually annotate Batch ID and payment date on the AP back-page, and duplicate quick-fade thermal receipts for dual-binding to ensure 5-year tax audits pass.",
    termMappings: [
      { zh: "感熱紙複印", en: "Thermal Receipt Copying" },
      { zh: "雙重裝訂", en: "Double Binding Filing" },
      { zh: "五年查帳", en: "5-Year Statutory Tax Audit" },
    ]
  },
  10: {
    englishTitle: "Scene 10: Concluded Filing",
    englishNarrative: "When digital entries match physical binders 1:1, archive files into the safety vaults. Congratulations on completing Cosmos ERP audit integration!",
    termMappings: [
      { zh: "數位雙向勾稽", en: "Dual Digital-Physical Matching" },
      { zh: "檔案室歸卷", en: "File Vault Archiving" },
      { zh: "稽核閉環", en: "Compliance Audit Loop" },
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'transcript' | 'chat' | 'slides'>('simulation');
  const [bottomTab, setBottomTab] = useState<'storyboard' | 'transcript'>('storyboard');
  const [simLayoutMode, setSimLayoutMode] = useState<'erp' | 'slide' | 'split'>('split');
  const [slidesAutoSync, setSlidesAutoSync] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [ccEnabled, setCcEnabled] = useState<boolean>(true);
  const [subSize, setSubSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [subLanguage, setSubLanguage] = useState<'tw' | 'bilingual' | 'karaoke'>('bilingual');
  const [subColor, setSubColor] = useState<'amber' | 'emerald' | 'cyan' | 'white'>('amber');
  const [subBgOpacity, setSubBgOpacity] = useState<'clear' | 'translucent' | 'opaque'>('translucent');
  const [activeSpeech, setActiveSpeech] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpokenSceneIdxRef = useRef<number | null>(null);

  // New Draft Code ID Builder State parameters (according to user's formula specification)
  const [genOperator, setGenOperator] = useState<string>("W"); // Default is W (助理)
  const [genTodayDate, setGenTodayDate] = useState<string>("2026-06-03"); // Today in this scenario (2026-06-03)
  const [genVoucherDate, setGenVoucherDate] = useState<string>("2026-05-27"); // Voucher creation date on ACPI02
  const [genBatchCount, setGenBatchCount] = useState<number>(5); // Default 5th batch today
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const compiledBatchId = `${genOperator}${genTodayDate.replace(/-/g, "")}${genVoucherDate.replace(/-/g, "")}${String(genBatchCount).padStart(3, '0')}`;

  const playSyncChime = () => {
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15); // G5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      // Audio context may be blocked initially, ignore safely
    }
  };

  const [interactiveValues, setInteractiveValues] = useState({
    batchId: "W2026060320260527005",
    invoiceNo: "AY56654359",
    invoiceDate: "2026/05/27",
    voucherNo: "910-20260527009",
    reversalMode: "void" as "void" | "delete"
  });

  const getActiveSceneIndex = (seconds: number) => {
    const idx = storyboardSegments.findIndex(s => seconds >= s.secondsStart && seconds < s.secondsEnd);
    return idx !== -1 ? idx : storyboardSegments.length - 1;
  };

  const activeSceneIdx = getActiveSceneIndex(currentTime);
  const activeScene = storyboardSegments[activeSceneIdx];

  const getSimulatedParams = (seconds: number) => {
    const idx = getActiveSceneIndex(seconds);
    const offset = seconds - storyboardSegments[idx].secondsStart;

    let activeScreen = storyboardSegments[idx].erpScreen;
    let highlightedField = "";

    if (idx === 0) {
      activeScreen = "FLOW";
      highlightedField = offset < 8 ? "AJSB01_flow" : "AJSI20_flow";
    } else if (idx === 1) {
      activeScreen = "ACPI02";
      if (offset < 7) highlightedField = "inv_date_acp";
      else if (offset < 14) highlightedField = "inv_no_acp";
      else highlightedField = "acp_tax_memo";
    } else if (idx === 2) {
      activeScreen = "AJSB01";
      if (offset < 11) highlightedField = "ajsb_batch_id";
      else highlightedField = "ajsb_confirm";
    } else if (idx === 3) {
      activeScreen = "AJSI20";
      if (offset < 10) highlightedField = "ajsi_tax_desc";
      else highlightedField = "ajsi_pay_final";
    } else if (idx === 4) {
      activeScreen = "AJSB20";
      highlightedField = "ajsb20_transfer";
    } else if (idx === 5) {
      activeScreen = "AJSI20";
      highlightedField = "ajsi_pay_desc";
    } else if (idx === 6) {
      activeScreen = "AJSB22";
      if (offset < 10) highlightedField = "ajsb22_mode_void";
      else highlightedField = "ajsb22_execute";
    } else if (idx === 7) {
      activeScreen = "ACTI10";
      highlightedField = "acti10_unconfirm";
    } else if (idx === 8) {
      activeScreen = "ACTI10";
      highlightedField = "acti10_print";
    } else {
      activeScreen = "FLOW";
      highlightedField = "AJSB22_flow";
    }

    return { activeScreen, highlightedField };
  };

  const { activeScreen, highlightedField } = getSimulatedParams(currentTime);

  // Playback ticks
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = prev + 1 * playbackSpeed;
          if (nextTime >= 199) { // Set to 199 (safe maximum sequence boundary)
            setIsPlaying(false);
            return 199;
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
  }, [isPlaying, playbackSpeed]);

  // Speaking voice narration
  const speakNarrative = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 1.0;
      utterance.onstart = () => setActiveSpeech(true);
      utterance.onend = () => setActiveSpeech(false);
      utterance.onerror = () => setActiveSpeech(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (isPlaying && !isMuted) {
      if (lastSpokenSceneIdxRef.current !== activeSceneIdx) {
        lastSpokenSceneIdxRef.current = activeSceneIdx;
        speakNarrative(activeScene.narrative);
      }
    } else {
      if (!isPlaying || isMuted) {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          setActiveSpeech(false);
        }
        if (isMuted) {
          lastSpokenSceneIdxRef.current = null;
        }
      }
    }
  }, [activeSceneIdx, isPlaying, isMuted, activeScene.narrative]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatVideoTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentTime(val);
    lastSpokenSceneIdxRef.current = null;
    if (isPlaying && !isMuted) {
      const idx = getActiveSceneIndex(val);
      speakNarrative(storyboardSegments[idx].narrative);
    }
  };

  const speakCurrentAgain = () => {
    speakNarrative(activeScene.narrative);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden antialiased">
      
      {/* Top minimalistic header bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 rounded-lg font-bold text-xs">SOP</span>
          <div>
            <h1 className="text-sm font-extrabold tracking-wide text-white font-sans uppercase">
              自動分錄大考評教學系統
            </h1>
            <p className="text-[10.5px] text-slate-400 mt-0.5">
              鼎新 ERP 自動編制拋轉傳票 100% 商業會計合規驗證 (SOP 教學影片與交互模擬器一體化)
            </p>
          </div>
        </div>

        {/* Real-time status indicators */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-400 text-[11px]">
            <Computer className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>互動模擬模式已鏈結</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/40 border border-emerald-900 rounded-full text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>合規核簽狀態: 通過</span>
          </div>
        </div>
      </header>

      {/* Grand Unified Merged Dashboard Workspace */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-2.5 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
        >
          {/* Left side: Animated Video Panel & Simulator & Controls & Chapters Column */}
          <div className="col-span-12 lg:col-span-9 grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            
            {/* Left portion: video simulation screen and timeline/controls */}
            <div className="col-span-12 xl:col-span-8 space-y-3.5">
          
          {/* Main Simulated Video Frame Window */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-3 flex flex-col gap-2.5">
            
            {/* Control Bar for Layout Modes */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-slate-800 gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-300 font-sans">
                  工作區：第 {activeScene.index} 幕【{activeScene.title}】
                </span>
              </div>
              <div className="bg-slate-950 p-1 rounded-xl border border-slate-850 flex gap-1 text-[11px] font-bold">
                <button
                  onClick={() => {
                    setSimLayoutMode('split');
                    playSyncChime();
                  }}
                  className={`p-1 px-3 rounded-lg transition-all cursor-pointer ${
                    simLayoutMode === 'split' 
                      ? 'bg-[#182a4a] text-amber-300 border border-[#2a4577] shadow-md' 
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  🌓 左右講義對照
                </button>
                <button
                  onClick={() => {
                    setSimLayoutMode('erp');
                    playSyncChime();
                  }}
                  className={`p-1 px-3 rounded-lg transition-all cursor-pointer ${
                    simLayoutMode === 'erp' 
                      ? 'bg-[#182a4a] text-amber-300 border border-[#2a4577] shadow-md' 
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  🖥️ ERP模擬畫面
                </button>
                <button
                  onClick={() => {
                    setSimLayoutMode('slide');
                    playSyncChime();
                  }}
                  className={`p-1 px-3 rounded-lg transition-all cursor-pointer ${
                    simLayoutMode === 'slide' 
                      ? 'bg-[#182a4a] text-amber-300 border border-[#2a4577] shadow-md' 
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  📊 講義原圖對照
                </button>
              </div>
            </div>

            {/* Embedded Live ERP canvas which operates on currentTime clock state */}
            <div className="relative min-h-[520px] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-850">
              
              {simLayoutMode === 'split' ? (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 p-3 h-full items-stretch">
                  <div className="xl:col-span-5 h-[495px] overflow-y-auto">
                    <OriginalSlideshow 
                      compactMode={true}
                      currentTime={currentTime}
                      autoSync={slidesAutoSync}
                      onAutoSyncToggle={setSlidesAutoSync}
                      setActiveTime={setCurrentTime}
                      setCurrentTab={setActiveTab}
                      setIsPlaying={setIsPlaying}
                    />
                  </div>
                  <div className="xl:col-span-7 bg-slate-900 rounded-xl border border-slate-850 overflow-hidden relative min-h-[420px] xl:min-h-0">
                    <ErpSimulator 
                      activeScreen={activeScreen}
                      highlightedField={highlightedField}
                      interactiveValues={interactiveValues}
                      setInteractiveValues={setInteractiveValues}
                    />
                  </div>
                </div>
              ) : simLayoutMode === 'slide' ? (
                <div className="p-3 h-full max-w-4xl mx-auto">
                  <OriginalSlideshow 
                    compactMode={true}
                    currentTime={currentTime}
                    autoSync={slidesAutoSync}
                    onAutoSyncToggle={setSlidesAutoSync}
                    setActiveTime={setCurrentTime}
                    setCurrentTab={setActiveTab}
                    setIsPlaying={setIsPlaying}
                  />
                </div>
              ) : (
                <ErpSimulator 
                  activeScreen={activeScreen}
                  highlightedField={highlightedField}
                  interactiveValues={interactiveValues}
                  setInteractiveValues={setInteractiveValues}
                />
              )}

              {/* Dynamic Picture-In-Picture Paper Document Camera view for Segment 9 */}
              {activeSceneIdx === 8 && (
                <div className="absolute top-16 right-4 w-[290px] bg-white text-slate-950 border-2 border-indigo-600 rounded-2xl p-3 shadow-2xl z-40 animate-fade-in font-sans">
                  <div className="flex items-center gap-1 pb-1 border-b border-slate-200 text-[11px] text-indigo-700 font-bold mb-2">
                    <PictureInPicture className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>【段落八 實物裝訂與手寫指引】</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-normal mb-2">
                    整理傳票及應付憑證時，請親手進行以下註記書寫與影印：
                  </p>
                  <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 space-y-2 text-[10.5px] text-slate-800">
                    <div className="space-y-0.5">
                      <div className="font-bold text-amber-900 border-b border-amber-200 pb-0.5 flex items-center gap-1">
                        <span>📝 1. COPY 應付憑單最後頁上面：</span>
                      </div>
                      <div className="font-mono text-[10px] pl-2">
                        <div>• 底稿批號：{interactiveValues.batchId || "W2026060320260527005"}</div>
                        <div>• 傳票編號：910-20260527009</div>
                        <div>• 付款日期：付2026/06/15</div>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-bold text-indigo-900 border-b border-indigo-200 pb-0.5 flex items-center gap-1">
                        <span>📑 2. COPY 發票（若為感熱紙）上面：</span>
                      </div>
                      <div className="font-mono text-[10px] pl-2">
                        <div>• 書寫傳票編號：910-20260527009</div>
                        <div className="text-red-700 font-bold">• 須加 COPY 一張（共 2 張重合裝訂）</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[9px] text-red-700 font-bold bg-red-50 p-1.5 rounded flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>說明：感熱紙高溫熱敏材質易氧化淡化。未加印 COPY 兩張與手寫傳票號，將無法通過五年期完稅查核！</span>
                  </div>
                </div>
              )}



              {/* BURNT-IN SUBTITLE CLOSED CC CAPTION BAR */}
              {ccEnabled && (() => {
                const clauses = activeScene.narrative.match(/[^，。；：！？、\s]+(?:[，。；：！？、\s]+)?/g) || [activeScene.narrative];
                const totalLength = clauses.reduce((acc, c) => acc + c.length, 0);
                let currentLengthSum = 0;
                const duration = activeScene.secondsEnd - activeScene.secondsStart;
                const elapsed = currentTime - activeScene.secondsStart;

                // Track active index based on proportional text length
                let activeClauseIdx = 0;
                const timedClauses = clauses.map((clause, idx) => {
                  const clauseLen = clause.length;
                  const startRatio = currentLengthSum / totalLength;
                  currentLengthSum += clauseLen;
                  const endRatio = currentLengthSum / totalLength;
                  const startSec = activeScene.secondsStart + startRatio * duration;
                  const endSec = activeScene.secondsStart + endRatio * duration;

                  if (currentTime >= startSec && currentTime < endSec) {
                    activeClauseIdx = idx;
                  }
                  return {
                    text: clause,
                    startSec,
                    endSec
                  };
                });

                // Calculate styling variables based on state variables
                const fontSizeClass = subSize === 'sm' ? 'text-[10px] sm:text-[10.5px]' : subSize === 'lg' ? 'text-[13.5px] sm:text-[14.5px]' : 'text-[11.5px] sm:text-[12.5px]';
                const colorGlowMap = {
                  amber: 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] font-black scale-[1.01] underline decoration-amber-500/40 underline-offset-4',
                  emerald: 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] font-black scale-[1.01] underline decoration-emerald-500/40 underline-offset-4',
                  cyan: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] font-black scale-[1.01] underline decoration-cyan-500/40 underline-offset-4',
                  white: 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] font-black scale-[1.01]'
                };
                const activeColorClass = colorGlowMap[subColor] || colorGlowMap.amber;

                const bgOpacityMap = {
                  clear: 'bg-slate-950/20 backdrop-blur-[1px] border-transparent',
                  translucent: 'bg-slate-950/95 backdrop-blur-md border-white/5',
                  opaque: 'bg-black border-slate-700'
                };
                const bgOpacityClass = bgOpacityMap[subBgOpacity] || bgOpacityMap.translucent;

                // Fetch bilingual information if available
                const billingInfo = bilingualTermsMap[activeScene.index];

                return (
                  <div className="absolute inset-x-0 bottom-4 px-6 z-30 pointer-events-none select-none text-center animate-fade-in">
                    <div className={`text-white px-5 py-2.5 rounded-2xl border max-w-[85%] mx-auto inline-block shadow-2xl transition-all duration-300 ${bgOpacityClass}`}>
                      
                      {/* Subtitle Header metadata */}
                      <div className="flex items-center justify-center gap-1.5 mb-1 text-[8.5px] font-black tracking-wide uppercase">
                        <Sparkle className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="text-amber-400 font-sans">第 {activeScene.index} 幕 • {activeScene.subtitle}</span>
                      </div>

                      {/* Dynamic Highlight text content based on mode */}
                      <div className="space-y-1.5 max-w-2xl mx-auto">
                        {subLanguage === 'tw' ? (
                          // Mode 1: Pure Chinese
                          <p className={`text-slate-200 font-bold leading-relaxed block ${fontSizeClass} font-sans`}>
                            {activeScene.narrative}
                          </p>
                        ) : subLanguage === 'karaoke' ? (
                          // Mode 2: Karaoke clause highlight
                          <p className={`leading-relaxed inline-flex flex-wrap justify-center gap-x-1.5 gap-y-1 ${fontSizeClass} font-medium font-sans`}>
                            {timedClauses.map((c, i) => {
                              const isCurrent = i === activeClauseIdx;
                              const isPast = i < activeClauseIdx;
                              return (
                                <span 
                                  key={i} 
                                  className={`transition-all duration-200 ${
                                    isCurrent 
                                      ? activeColorClass 
                                      : isPast 
                                      ? 'text-slate-500 line-through opacity-75' 
                                      : 'text-slate-400 opacity-60'
                                  }`}
                                >
                                  {c.text}
                                </span>
                              );
                            })}
                          </p>
                        ) : (
                          // Mode 3: Bilingual Chinese with Professional terms / English subtitle
                          <div className="space-y-1.5">
                            <p className={`leading-relaxed inline flex-wrap justify-center gap-x-1.5 gap-y-1 ${fontSizeClass} font-medium font-sans`}>
                              {timedClauses.map((c, i) => {
                                const isCurrent = i === activeClauseIdx;
                                const isPast = i < activeClauseIdx;
                                return (
                                  <span 
                                    key={i} 
                                    className={`transition-all duration-150 ${
                                      isCurrent 
                                        ? activeColorClass 
                                        : isPast 
                                        ? 'text-slate-300' 
                                        : 'text-slate-400 opacity-70'
                                    }`}
                                  >
                                    {c.text}
                                  </span>
                                );
                              })}
                            </p>
                            {billingInfo && (
                              <div className="border-t border-white/5 pt-1.5 mt-1.5 text-center font-sans">
                                <div className="flex items-center justify-center gap-1.5 flex-wrap italic text-[8px] text-amber-500 mb-1 leading-none">
                                  {billingInfo.termMappings.map((term, tIdx) => (
                                    <span key={tIdx} className="not-italic bg-slate-900/90 border border-white/5 p-0.5 px-1.5 rounded">
                                      {term.zh}: <b className="text-slate-200 font-bold">{term.en}</b>
                                    </span>
                                  ))}
                                </div>
                                <p className="text-[9.5px] text-slate-400 font-normal leading-normal italic max-w-xl mx-auto">
                                  {billingInfo.englishNarrative}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>

          {/* DYNAMIC PROGRESS TIMELINE SLIDER BAR WITH CHAPTER TIKS */}
          <div className="space-y-1.5 p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex gap-2.5 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-850 shadow-inner">
              <span className="text-xs font-mono font-extrabold text-slate-400 px-2 shrink-0">
                {formatVideoTime(currentTime)}
              </span>
              
              <div className="flex-1 relative flex items-center h-5">
                <input 
                  type="range"
                  min="0"
                  max="199"
                  value={currentTime}
                  onChange={handleScrubChange}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                />

                {/* Chapter Ticks marks overlays */}
                {storyboardSegments.map((seg, i) => (
                  <div 
                    key={i}
                    className="absolute w-2.5 h-2.5 rounded-full cursor-pointer hover:bg-white border transform -translate-y-px transition-transform hover:scale-125 shadow"
                    style={{ 
                      left: `${(seg.secondsStart / 200) * 100}%`,
                      backgroundColor: currentTime >= seg.secondsStart ? '#f59e0b' : '#1e293b',
                      borderColor: (currentTime >= seg.secondsStart && currentTime < seg.secondsEnd) ? '#ffffff' : '#334155'
                    }}
                    title={`${seg.index}. ${seg.title}`}
                    onClick={() => {
                      setCurrentTime(seg.secondsStart);
                      lastSpokenSceneIdxRef.current = null;
                      if (!isMuted) speakNarrative(seg.narrative);
                    }}
                  />
                ))}
              </div>

              <span className="text-xs font-mono font-extrabold text-slate-400 px-2 shrink-0">
                03:20
              </span>
            </div>

            <div className="grid grid-cols-10 gap-0.5 px-2 text-[9.5px] text-slate-500 font-mono text-center overflow-hidden">
              <span className="truncate">1.流程導覽</span>
              <span className="truncate">2.審核憑證</span>
              <span className="truncate">3.產生底稿</span>
              <span className="truncate">4.底稿維護</span>
              <span className="truncate">5.全域路徑</span>
              <span className="truncate">6.正式傳票</span>
              <span className="truncate">7.作廢還原</span>
              <span className="truncate">8.終審過帳</span>
              <span className="truncate">9.印裝歸檔</span>
              <span className="truncate">10.完工鎖定</span>
            </div>
          </div>

          {/* PLAYBACK CONSOLE MEDIA DECK DECK */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl">
            
            {/* Core Play Chapter Seekers */}
            <div className="md:col-span-5 flex items-center gap-2 justify-center md:justify-start">
              
              <button
                onClick={() => {
                  const prevIdx = activeSceneIdx === 0 ? storyboardSegments.length - 1 : activeSceneIdx - 1;
                  setCurrentTime(storyboardSegments[prevIdx].secondsStart);
                  lastSpokenSceneIdxRef.current = null;
                  if (!isMuted && isPlaying) speakNarrative(storyboardSegments[prevIdx].narrative);
                }}
                className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                title="跳到上一個分鏡章節"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span>上章</span>
              </button>

              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 px-6 rounded-full font-extrabold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer shrink-0 ${
                  isPlaying 
                    ? 'bg-amber-500 text-slate-950 font-black' 
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current outline-none" />
                    <span className="text-xs">暫停播放</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current animate-pulse outline-none" />
                    <span className="text-xs">播放教學影片</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  const nextIdx = (activeSceneIdx + 1) % storyboardSegments.length;
                  setCurrentTime(storyboardSegments[nextIdx].secondsStart);
                  lastSpokenSceneIdxRef.current = null;
                  if (!isMuted && isPlaying) speakNarrative(storyboardSegments[nextIdx].narrative);
                }}
                className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                title="跳到下一個分鏡章節"
              >
                <span>下章</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {/* Audio Voice Control parameters */}
            <div className="md:col-span-4 flex items-center gap-2 justify-center">
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (isMuted) {
                    speakNarrative(activeScene.narrative);
                  } else {
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                    }
                  }
                }}
                className={`p-2.5 px-4 rounded-xl border text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                  !isMuted 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/25 text-rose-400 border-rose-500/30'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{!isMuted ? "🔊 語音旁白開啟中" : "🔇 語音旁白已關閉"}</span>
              </button>

              <button
                onClick={speakCurrentAgain}
                className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-400 rounded-xl text-xs border border-slate-700 cursor-pointer flex items-center gap-1 font-semibold"
                title="重聽本幕講解"
              >
                <Tv className="w-3.5 h-3.5 text-slate-400" />
                <span>手動複讀</span>
              </button>
            </div>

            {/* Speeds control panel */}
            <div className="md:col-span-3 flex items-center gap-1.5 justify-center md:justify-end">
              <span className="text-[10.5px] text-slate-500 font-mono">變速播盤:</span>
              {[1, 2, 5].map(speed => (
                <button 
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`p-1 px-2.5 text-xs font-mono rounded cursor-pointer transition-colors ${
                    playbackSpeed === speed 
                      ? 'bg-amber-500 text-slate-950 font-black border border-amber-400' 
                      : 'bg-slate-800 hover:bg-slate-755 text-slate-400 border border-transparent'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

          </div>

          {/* SOP Subtitle & Bilingual AI Customizer Panel */}
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-3.5 text-left shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-2.5 gap-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                <span className="text-[12px] font-extrabold text-white tracking-wide">SOP 會計字軌智慧顯示控制櫃 (Interactive CC Console)</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <label className="text-slate-400 font-bold cursor-pointer flex items-center gap-1.5 bg-slate-900/60 p-1 px-2.5 rounded-lg border border-slate-850/80">
                  <input 
                    type="checkbox" 
                    checked={ccEnabled} 
                    onChange={(e) => setCcEnabled(e.target.checked)} 
                    className="rounded text-amber-500 bg-slate-950 border-slate-800 focus:ring-amber-500 cursor-pointer"
                  />
                  <span>開啟主動字幕 overlay (Toggle CC)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 bg-slate-900/40 p-2.5 rounded-xl">
              {/* 1. Subtitle Mode */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block">🎬 教學字軌語言 / 專業術語</span>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { val: 'tw', label: '正體中字' },
                    { val: 'bilingual', label: '雙語會計' },
                    { val: 'karaoke', label: '逐句導讀' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        setSubLanguage(opt.val as any);
                        setCcEnabled(true);
                      }}
                      className={`py-1 text-[10px] rounded border font-sans cursor-pointer transition-colors text-center ${
                        subLanguage === opt.val && ccEnabled
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-900 hover:bg-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Highlight Color */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block">🎨 字句高亮配色</span>
                <div className="flex items-center gap-2 h-[26px]">
                  {[
                    { val: 'amber', bg: 'bg-amber-400', label: '琥珀橘' },
                    { val: 'emerald', bg: 'bg-emerald-400', label: '翡翠綠' },
                    { val: 'cyan', bg: 'bg-cyan-400', label: '科技藍' },
                    { val: 'white', bg: 'bg-slate-100', label: '極簡白' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        setSubColor(opt.val as any);
                        setCcEnabled(true);
                      }}
                      className={`w-5.5 h-5.5 rounded-full cursor-pointer transition-all border shrink-0 flex items-center justify-center ${
                        subColor === opt.val ? 'ring-2 ring-amber-500 scale-110 border-white' : 'border-transparent hover:scale-105'
                      }`}
                      title={opt.label}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${opt.bg}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Subtitle Size */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block">🔎 螢幕字級尺寸 (Font Size)</span>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { val: 'sm', label: '標準 A-' },
                    { val: 'md', label: '溫和 A' },
                    { val: 'lg', label: '清晰 A+' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        setSubSize(opt.val as any);
                        setCcEnabled(true);
                      }}
                      className={`py-1 text-[10px] rounded border font-sans cursor-pointer transition-colors text-center ${
                        subSize === opt.val && ccEnabled
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-900 hover:bg-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Backdrop Opacity */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block">🌫️ 底框遮幕樣式</span>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { val: 'clear', label: '無遮幕' },
                    { val: 'translucent', label: '毛玻璃' },
                    { val: 'opaque', label: '深全黑' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setSubBgOpacity(opt.val as any)}
                      className={`py-1 text-[10px] rounded border font-sans cursor-pointer transition-colors text-center ${
                        subBgOpacity === opt.val && ccEnabled
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-900 hover:bg-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[9.5px] text-slate-500 font-light leading-normal font-sans">
              💡 <b>字軌提示：</b>選取「雙語會計」或「逐句導讀」時，旁白語句將依據播放進度「分秒同步高亮」朗讀進程，並浮現對應的國際標準會計會與商業法內控英文單詞。
            </p>
          </div>

          {/* Interactive details bubble showing current active scene summary and audit checklist */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 leading-relaxed text-xs">
            <h4 className="font-extrabold text-amber-400 flex items-center gap-1.5 mb-1.5">
              <span>第 {activeScene.index} 幕實操導航：{activeScene.title}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
              <div className="space-y-1">
                <p className="font-light text-slate-200">
                  🔊 <b>旁白內容：</b>{activeScene.narrative}
                </p>
                <button 
                  onClick={() => handleCopyText(activeScene.narrative)}
                  className="mt-2 p-1 px-2 text-[10px] bg-slate-850 hover:bg-slate-800 text-slate-400 border border-slate-750 rounded flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Copy className="w-3 h-3 text-slate-500" />
                  <span>{copied ? "已複製對話！" : "複製旁白文字"}</span>
                </button>
              </div>
              <div className="p-3 bg-indigo-950/40 border border-indigo-900/60 rounded-xl space-y-1.5 text-left">
                <span className="text-amber-400 font-bold block text-[10.5px]">🛡️ 鼎新商業會計內控合規核心要點:</span>
                <p className="text-[11px] leading-relaxed text-slate-300 font-light font-sans">
                  {activeScene.compliancePoint}
                </p>
              </div>
            </div>
          </div>

        </div> {/* End of Left Portion xl:col-span-8 */}

        {/* Right portion: Chapter Selector Column next to Video and PPT */}
        <div className="col-span-12 xl:col-span-4 space-y-4">
          {/* Chapter selector directory */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-amber-500 shrink-0" />
                <span>日常拋轉 10 大分鏡章節</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
                10 SCENES
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal mb-3 font-light">
              本系列微影片完整串接鼎新 AP/GL 自動分錄系統，點按任一幕即可直接跳轉定位，系統模擬器將同步更新為該幕對應之數據頁。
            </p>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {storyboardSegments.map((seg, i) => {
                const isActive = activeSceneIdx === i;
                return (
                  <button
                    key={seg.index}
                    onClick={() => {
                      setCurrentTime(seg.secondsStart);
                      lastSpokenSceneIdxRef.current = null;
                      if (!isMuted) speakNarrative(seg.narrative);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-br from-amber-500/15 to-indigo-500/10 border-amber-500/80 text-amber-200 shadow-lg scale-[1.01]' 
                        : 'bg-slate-950/60 hover:bg-slate-800/40 border-slate-900 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between w-full items-center">
                      <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
                        M幕 {seg.index.toString().padStart(2, '0')} - {seg.start} / {seg.end}
                      </span>
                      <span className="text-[8px] font-mono p-0.5 px-2 bg-slate-900 border border-slate-850 text-slate-500 rounded font-black max-w-[70px] truncate uppercase">
                        {seg.erpScreen}
                      </span>
                    </div>
                    <div className="text-[11.5px] font-extrabold truncate w-full mt-1.5 text-slate-100">{seg.title}</div>
                    <div className={`text-[10px] truncate w-full font-light mt-0.5 ${isActive ? 'text-amber-200/75' : 'text-slate-500'}`}>{seg.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div> {/* End of left parent grid */}

      {/* Right side: Compliance Verification checklist - adjusted to 3/12 split */}
      <div id="cooperation-and-checklists-sidebar" className="col-span-12 lg:col-span-3 space-y-4 text-left">
          
          {/* 📝 考評字幕與法務勾稽對照重點盤 (12-Point Accounting Compliance Checklist) */}
          <div id="subtitles_checklist_card" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 font-sans text-slate-100">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                <span id="subtitles_heading_badge" className="text-amber-500 text-sm font-bold">📝</span>
                <span>會計合規口播對照重點 (12點 Checklist)</span>
              </h3>
              <p className="text-[10px] text-slate-400 leading-normal font-light">
                依影片時間軸自動跳轉、標記對照重點，學員可實時比對此考評指引手冊。
              </p>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {[
                { id: 1, text: "審核發票日期與號碼是否正確。", activeRange: [15, 35] },
                { id: 2, text: "底稿編號規則為：個人英文字第一位 + 當天日期 + 傳票產生日期 + 筆數編號。", activeRange: [15, 35] },
                { id: 3, text: "傳票期以應付憑單日期為準。", activeRange: [35, 55] },
                { id: 4, text: "進項稅額摘要需依規定格式編輯。", activeRange: [35, 55] },
                { id: 5, text: "應付摘要需加付款日期。", activeRange: [55, 75] },
                { id: 6, text: "立沖帳目需補公司統編。", activeRange: [55, 75] },
                { id: 7, text: "回分錄底稿查詢傳票號碼。", activeRange: [95, 115] },
                { id: 8, text: "再至總帳過帳並列印傳票。", activeRange: [135, 155] },
                { id: 9, text: "應付憑單最後頁需註記底稿編號、傳票編號與付款日期。", activeRange: [155, 185] },
                { id: 10, text: "發票上需書寫傳票編號，感熱紙需加 COPY 一張。", activeRange: [155, 185] },
                { id: 11, text: "若科目或摘要有誤，僅修正分錄底稿資訊。", activeRange: [95, 135] },
                { id: 12, text: "若整筆退回原承辦，需選擇傳票作廢。", activeRange: [115, 135] }
              ].map((pt) => {
                const isFocus = currentTime >= pt.activeRange[0] && currentTime < pt.activeRange[1];
                const isPassed = currentTime >= pt.activeRange[1];
                return (
                  <div 
                    key={pt.id}
                    id={`checklist_item_${pt.id}`}
                    className={`p-2 rounded-xl transition-all border flex items-start gap-2 ${
                      isFocus
                        ? "bg-amber-950/20 border-amber-500/80 shadow-md scale-[1.01]"
                        : isPassed
                        ? "bg-slate-950/40 border-slate-900/40 opacity-50"
                        : "bg-slate-950/20 border-transparent opacity-80"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <input 
                        id={`checkbox_pt_${pt.id}`}
                        type="checkbox" 
                        checked={isPassed || isFocus} 
                        readOnly
                        className="w-3.5 h-3.5 rounded border-slate-800 bg-slate-950 text-amber-500 pointer-events-none accent-amber-500"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <p className={`text-[10px] leading-relaxed font-sans ${
                        isFocus 
                          ? "text-amber-300 font-extrabold" 
                          : isPassed 
                          ? "text-slate-400 line-through decoration-slate-600" 
                          : "text-slate-300"
                      }`}>
                        <span className="font-bold text-amber-500 mr-1">#{pt.id}</span>
                        {pt.text}
                      </p>
                      {isFocus && (
                        <span id={`play_badge_${pt.id}`} className="inline-block text-[7.5px] px-1 bg-amber-500 text-slate-950 rounded font-black uppercase tracking-wide animate-pulse">
                          影片正在此節
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Formula-Based Draft ID Generator Card */}
          <div className="bg-slate-900 rounded-2xl border border-indigo-950/60 p-4 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2.5 border-b border-indigo-950/40">
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>底稿編號自動產生器 (Formula Builder)</span>
              </h2>
              <span className="text-[9px] font-mono text-amber-400 bg-amber-950/30 border border-amber-900/40 px-2 py-0.5 rounded uppercase font-bold shrink-0">
                新制公式驗算
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal font-light">
              依最新核簽內控要求：<b>個人英文字首第一位 + 當天年月日 + 傳票產生日期 + 當日筆數</b>。可於下方任意調整參數，體驗公式的即時演算並套入模擬畫中：
            </p>

            <div className="space-y-3.5 text-xs">
              {/* 1. Operator choice */}
              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium block text-[10.5px]">
                  👤 1. 操作人員：
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { key: "W", label: "W - 會計助理 (W)", desc: "助" },
                    { key: "L", label: "L - 會計主管 (L)", desc: "主" },
                    { key: "C", label: "C - 陳美玲 (出納)", desc: "陳" }
                  ].map((op) => (
                    <button
                      key={op.key}
                      onClick={() => {
                        setGenOperator(op.key);
                        playSyncChime();
                      }}
                      className={`p-1.5 rounded-lg border text-left transition-colors flex flex-col justify-center cursor-pointer ${
                        genOperator === op.key
                          ? "bg-amber-500/10 border-amber-500 text-amber-300"
                          : "bg-slate-950/80 border-slate-900 hover:border-slate-800 text-slate-400"
                      }`}
                    >
                      <span className="font-extrabold text-[11px]">{op.label.slice(0, 3)}</span>
                      <span className="text-[9px] text-slate-500 mt-0.5 truncate">{op.label.slice(4)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Simulation Date & 3. Voucher Date Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium block text-[10.5px]">
                    📅 2. 今天日期 (當天)：
                  </label>
                  <input
                    type="date"
                    value={genTodayDate}
                    onChange={(e) => setGenTodayDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 font-mono text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-medium block text-[10.5px]">
                    🧾 3. 傳票產生日期：
                  </label>
                  <input
                    type="date"
                    value={genVoucherDate}
                    onChange={(e) => setGenVoucherDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 font-mono text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* 4. Sequence number */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 font-medium block text-[10.5px]">
                    🔢 4. 當日筆數流水號：
                  </label>
                  <span className="text-[10px] font-mono font-bold text-amber-400">
                    目前值: {String(genBatchCount).padStart(3, "0")}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-850 rounded-lg p-1.5">
                  <button
                    onClick={() => {
                      setGenBatchCount(prev => Math.max(1, prev - 1));
                      playSyncChime();
                    }}
                    className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 text-slate-300 font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-mono text-xs text-slate-300 font-bold">
                    {genBatchCount} 筆
                  </div>
                  <button
                    onClick={() => {
                      setGenBatchCount(prev => Math.min(999, prev + 1));
                      playSyncChime();
                    }}
                    className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 text-slate-300 font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Compiled Terminal Display Output */}
              <div className="bg-slate-950 border border-indigo-950 p-3 rounded-xl space-y-1.5 relative overflow-hidden">
                <div className="text-[10px] text-slate-500 font-bold flex justify-between items-center">
                  <span>🎯 演算底稿編號：</span>
                  <span className="text-[8px] uppercase font-mono tracking-wider bg-slate-900 border border-slate-800 p-0.5 px-1.5 rounded text-amber-400">
                    Live Display
                  </span>
                </div>
                
                <span className="font-mono text-[15px] md:text-[16px] text-slate-100 font-bold block text-center py-1 tracking-wider bg-slate-900/60 rounded-lg">
                  {compiledBatchId}
                </span>

                {/* Formula decomposition visualizer */}
                <div className="pt-2 border-t border-slate-900/80 grid grid-cols-4 gap-0.5 text-center text-[9px] font-mono text-slate-500">
                  <div className="border-r border-slate-900 pb-0.5">
                    <span className="block text-[10px] text-amber-500 font-bold">{genOperator}</span>
                    <span className="scale-90 inline-block text-[8px]">個人首字</span>
                  </div>
                  <div className="border-r border-slate-900 pb-0.5">
                    <span className="block text-[10px] text-indigo-400 font-bold">{genTodayDate.replace(/-/g, "")}</span>
                    <span className="scale-90 inline-block text-[8px]">今天日期</span>
                  </div>
                  <div className="border-r border-slate-900 pb-0.5">
                    <span className="block text-[10px] text-sky-400 font-bold">{genVoucherDate.replace(/-/g, "")}</span>
                    <span className="scale-90 inline-block text-[8px]">傳票日期</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-emerald-400 font-bold">{String(genBatchCount).padStart(3, "0")}</span>
                    <span className="scale-90 inline-block text-[8px]">當日筆數</span>
                  </div>
                </div>
              </div>

              {/* Sync Button link */}
              <button
                onClick={() => {
                  setInteractiveValues(prev => ({ ...prev, batchId: compiledBatchId }));
                  setIsSyncing(true);
                  playSyncChime();
                  setTimeout(() => setIsSyncing(false), 1500);
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center gap-1.5 cursor-pointer border ${
                  isSyncing
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-950/20 shadow-lg scale-[0.99]"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg hover:shadow-xl active:scale-[0.98]"
                }`}
              >
                {isSyncing ? (
                  <>
                    <CheckSquare className="w-4 h-4 text-white animate-bounce" />
                    <span>同步成功！已套用新底稿號碼</span>
                  </>
                ) : (
                  <>
                    <Computer className="w-4 h-4" />
                    <span>立即套用底稿號至 ERP 流程模擬</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Compliance and guidelines overview bar */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-850 rounded-2xl p-4 space-y-2.5">
            <h3 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <Archive className="w-4 h-4 text-emerald-500" />
              <span>會計會同考評準則</span>
            </h3>
            <ul className="text-[11px] text-slate-400 space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">1.</span>
                <span><b>二重勾稽：</b> 所有進項發票號碼、金額、統編必須與 ACPI02 及分錄底稿 AJSI20 保持嚴密 1:1 一致，禁止有任何漏填。</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">2.</span>
                <span><b>跳號預防：</b> 還原拋轉時應落實 AJSB22 的 <b>傳票作廢（Void）</b> 原則，嚴格杜絕實體刪除（Delete）導致的斷號違法狀況。</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">3.</span>
                <span><b>感熱影印：</b> 超商感熱憑證字跡易褪色，應 <b>複印成 A4 規格</b> 與原始正本重裝，以符合五年以上完稅查帳大憲法。</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Unified Bottom Tab area: Switch between 🎬 10大分鏡大綱 and 🔍 語音字軌智慧檢索櫃 */}
        <div className="col-span-12 mt-6 space-y-4">
          <div className="flex border-b border-slate-800 justify-start items-center gap-2">
            <button
              onClick={() => setBottomTab('storyboard')}
              className={`pb-3 px-4 font-sans text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                bottomTab === 'storyboard'
                  ? 'border-amber-500 text-amber-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <Video className="w-4 h-4 shrink-0" />
              <span>🎬 10大分鏡影音教學大綱 (Storyboard)</span>
            </button>
            <button
              onClick={() => setBottomTab('transcript')}
              className={`pb-3 px-4 font-sans text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                bottomTab === 'transcript'
                  ? 'border-amber-500 text-amber-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>🔍 旁白字軌與字幕完整搜尋對照軌</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {bottomTab === 'storyboard' ? (
              <motion.div
                key="storyboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <SopStoryboard activeTime={currentTime} setActiveTime={setCurrentTime} setIsPlaying={setIsPlaying} />
              </motion.div>
            ) : (
              <motion.div
                key="transcript"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="w-full"
              >
                <SopTranscriptTable activeTime={currentTime} setActiveTime={setCurrentTime} setIsPlaying={setIsPlaying} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </motion.div>

      </main>

      {/* Corporate safe legal footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex justify-center items-center gap-2">
            <span className="p-0.5 px-2 bg-slate-900 rounded border border-slate-800 text-[9.5px] font-mono">COSMOS-IGP-V16-ELEARNING-ENGINE</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-600 font-mono">115-SOP-V10</span>
          </div>
          <p className="font-light text-[11px] text-slate-600">
            本影片教學系統受商業會計法合規規範保護。艾盟仕股份有限公司會計部 製作。
          </p>
        </div>
      </footer>

    </div>
  );
}

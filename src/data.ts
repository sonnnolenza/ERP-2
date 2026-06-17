export interface StoryboardSegment {
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

export const storyboardSegments: StoryboardSegment[] = [
  {
    index: 1,
    start: "00:00",
    end: "00:15",
    secondsStart: 0,
    secondsEnd: 15,
    title: "片頭：專案流程說明",
    subtitle: "應付單據審核與分錄底稿自動拋轉核心架構演繹。",
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
    erpMockupDescription: "應付憑單建立畫面：包含單據字軌主管廖有毅(L)及承辦王淑菲(W)代號。表單主鍵為發票總額 $2,158,895（貨款 $2,056,090 與營業稅 $102,805）。發票日期欄位顯示 2026/05/27。",
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
    narrative: "應付憑單結項後，前往 AJSB01 產生分錄底稿作業。設定開帳年份 115 年，來源字軌過濾指定為 AP 應付系統，執行自動拋轉，藉此智慧串接多張應收付帳款，完成會計循環底稿建置。",
    erpScreen: "AJSB01",
    visualFocus: "批號產生器格式：操作人首字首碼 + 當天日期 + 當天拋轉日 + 批次序號。",
    visualDetail: "畫面切換至『AJSB01 產生分錄底稿』設定視窗。滑鼠軌跡準確選中過濾條件，點選右上方「執行產生」，螢幕彈出完成加載綠色勾號提示。",
    erpMockupDescription: "AJSB01 批號預覽：自動產出分錄底稿，如『W2026060320260527005』之規範批次編號。",
    editorCuts: "【35.0s】由 ACPI02 轉場至 AJSB01。【42.0s】批號字元閃爍指引，加入金屬提示音，提示批號建立成功。",
    audioBgm: "底稿產生階段，音軌中加入伺服器硬體運轉與數據流嗶聲 (Data FX)。",
    compliancePoint: "審計留痕：分錄底稿批次格式係為外部稽核循線追溯原始承辦人員及建檔日之唯一合規線索，嚴禁隨意更改 or 省略字首字軌。"
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
    narrative: "底稿拋轉傳票後，應回到分錄底稿查詢並核對拋出的傳票號碼。切記，若發現摘要、金額 or 會計科目錯誤，均應回到『分錄底稿』修改重拋，絕對禁止在傳票端直接進行手工修改。",
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
    erpMockupDescription: "畫面調印結業簡報：流光巡迴結束，系統各模組正式閉環鎖定。右側顯示數據準確度達『100% 正確合規』。影片漸漸淡出黑幕。",
    editorCuts: "【185s】切換回精緻的影片尾字卡與版權標誌。【195s】音樂尾音結束，畫面在【200s】圓滿淡出黑幕。",
    audioBgm: "背景氛圍音樂悠長地奏出和弦和諧尾音，最終與畫面同步消逝，淡入寂靜。",
    compliancePoint: "專案完結：圓滿完成一期艾盟仕開帳勾稽演練。此 SOP 影片應作為新進出納與帳務主管必修教材。"
  }
];

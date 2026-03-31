import React from 'react';
import {motion} from 'framer-motion';
import {X,Shield} from 'lucide-react';

export default function PrivacyPolicy({onClose}){
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{background:'rgba(0,0,0,.5)'}} onClick={onClose}>
      <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}}
        onClick={e=>e.stopPropagation()}
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-indigo-500"/>
            <h2 className="font-black text-lg text-gray-800">隱私政策</h2>
            <span className="text-xs text-gray-400">Privacy Policy</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200">
            <X size={16}/>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 py-4 space-y-5 text-sm text-gray-600">

          <p className="text-xs text-gray-400">最後更新 Last updated: 2026-03-31</p>

          <section>
            <h3 className="font-bold text-gray-800 mb-1">📱 關於本應用程式</h3>
            <p>《小學數學模擬試卷》（Curlboo & Fluffy's Maths Quests）是一款專為香港小學生設計的數學練習工具，涵蓋 P1–P6 課題。</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-800 mb-1">🔒 我們收集什麼資料？</h3>
            <p className="mb-2">本應用程式<strong>不會</strong>將任何資料傳送至外部伺服器。所有資料均儲存於<strong>你的裝置本地</strong>，包括：</p>
            <ul className="list-disc list-inside space-y-1 text-gray-500">
              <li>學生姓名（可選，僅用於個人化顯示及列印）</li>
              <li>考試歷史記錄（分數、日期、年級）</li>
              <li>練習連續天數（Streak）</li>
              <li>應用程式設定（聲音開關等）</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-800 mb-1">🚫 我們不會做什麼</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-500">
              <li>不收集個人身份識別資料</li>
              <li>不將任何資料分享予第三方</li>
              <li>不顯示廣告</li>
              <li>不包含應用程式內購買</li>
              <li>不追蹤用戶行為</li>
              <li>不要求帳號登記</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-800 mb-1">👨‍👩‍👧 兒童私隱（COPPA / PDPO）</h3>
            <p>本應用程式符合《兒童網上私隱保護法》（COPPA）及香港《個人資料（私隱）條例》（PDPO）的要求。我們不會在未經家長同意的情況下收集13歲以下兒童的個人資料。由於所有資料均存放於本地裝置，家長可隨時在應用程式內清除所有記錄。</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-800 mb-1">🗑️ 如何刪除資料</h3>
            <p>家長或學生可在主頁的「歷史記錄」區域清除考試記錄。如需完全清除所有本地資料，請在瀏覽器或裝置設定中清除本網站的儲存資料。</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-800 mb-1">✉️ 聯絡我們</h3>
            <p>如有任何關於私隱的疑問，請電郵至：<span className="text-indigo-600 font-medium">curlboo.bear@oneup24.com</span></p>
          </section>

          <div className="border-t pt-4 text-xs text-gray-400 pb-2">
            <p>This app stores all data locally on your device only. No personal information is transmitted to any server. We do not show ads, require sign-up, or share data with third parties. This app complies with COPPA and Hong Kong PDPO requirements.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

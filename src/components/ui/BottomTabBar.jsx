import { Home, BookOpen, BarChart2, User } from 'lucide-react';

const TABS = [
  { id: 'home',     Icon: Home,      zh: '主頁',  en: 'Home'     },
  { id: 'practice', Icon: BookOpen,  zh: '練習',  en: 'Practice' },
  { id: 'history',  Icon: BarChart2, zh: '記錄',  en: 'History'  },
  { id: 'profile',  Icon: User,      zh: '我的',  en: 'Profile'  },
];

export default function BottomTabBar({ activeTab, onTab, lang = 'zh' }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100"
      style={{
        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex h-16">
        {TABS.map(({ id, Icon, zh, en }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative"
            >
              {active && (
                <span className="absolute top-0 left-3 right-3 h-0.5 rounded-full bg-orange-500" />
              )}
              <Icon
                size={22}
                className={active ? 'text-orange-500' : 'text-gray-400'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span
                className={`text-[10px] font-semibold ${active ? 'text-orange-500' : 'text-gray-400'}`}
              >
                {lang === 'zh' ? zh : en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

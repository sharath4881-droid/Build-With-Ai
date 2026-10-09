import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  criticalCasesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  criticalCasesCount = 3,
}) => {
  const tabs: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'cockpit', label: 'Cockpit', icon: 'speed' },
    { id: 'pipeline', label: 'Pipeline', icon: 'filter_alt' },
    { id: 'cases', label: 'Cases', icon: 'security', badge: criticalCasesCount },
    { id: 'reports', label: 'Reports', icon: 'analytics' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#181b23]/95 backdrop-blur-xl shadow-[0_-6px_24px_rgba(0,0,0,0.7)] border-t border-[#272a32]/70">
      <div className="h-20 px-2 flex items-center justify-around max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative min-w-[70px] min-h-[52px] h-[52px] flex flex-col items-center justify-center rounded transition-all cursor-pointer active:translate-y-0.5 ${
                isActive
                  ? 'text-[#4edea3] bg-[#272a32] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border border-[#3c4a42]/50'
                  : 'text-[#bbcabf] bg-[#0b0e15]/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] hover:bg-[#1c2027]'
              }`}
            >
              {/* Illuminated Diode */}
              <div
                className={`w-1.5 h-1.5 rounded-full mb-1 transition-all ${
                  isActive
                    ? 'bg-[#4edea3] shadow-[0_0_6px_#4edea3]'
                    : 'bg-[#3c4a42]'
                }`}
              />

              {/* Material Symbol Icon */}
              <div className="relative">
                <span className="material-symbols-outlined text-[20px]">
                  {tab.icon}
                </span>
                {tab.badge && tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#93000a] text-[#ffb4ab] text-[9px] font-['JetBrains_Mono'] font-bold rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Stamped Tab Label */}
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase mt-0.5 tracking-wider font-semibold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

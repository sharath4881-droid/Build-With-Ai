import React from 'react';
import { ASSET_URLS } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  sfdcLivePercent: number;
  onRefreshSync?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  sfdcLivePercent,
  onRefreshSync,
  onProfileClick,
}) => {
  const getTabLabel = () => {
    switch (currentTab) {
      case 'cockpit':
        return 'Cockpit Telemetry';
      case 'pipeline':
        return 'Revenue Pipeline';
      case 'reports':
        return 'Incident Analytics';
      case 'cases':
      default:
        return 'Cases';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#181b23]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.65)] border-b border-[#272a32]/60">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-4xl mx-auto">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2">
          <img
            alt="PulseForce Emblem"
            className="h-8 w-auto object-contain"
            src={ASSET_URLS.emblem}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-['Hanken_Grotesk'] text-[22px] font-bold tracking-tight text-[#e0e2ed] uppercase leading-none">
                PulseForce
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#4edea3] bg-[#32353d] px-1 py-0.5 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] tracking-wider">
                EXEC
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#bbcabf] uppercase tracking-wider">
              {getTabLabel()}
            </span>
          </div>
        </div>

        {/* Live Status Indicator & Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshSync}
            title="Click to force SFDC Sync"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0b0e15] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-[#3c4a42]/40 active:translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3] group-hover:scale-125 transition-transform"></div>
            <span className="font-['JetBrains_Mono'] text-[11px] font-medium text-[#4edea3] tracking-wider whitespace-nowrap">
              SFDC LIVE {sfdcLivePercent}%
            </span>
          </button>

          <button
            onClick={onProfileClick}
            className="p-0.5 rounded-full bg-[#32353d] shadow-[0_2px_5px_rgba(0,0,0,0.6)] border border-[#86948a]/30 active:scale-95 transition-transform"
            title="Executive Operator: Chief Incident Director"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={ASSET_URLS.userProfile}
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

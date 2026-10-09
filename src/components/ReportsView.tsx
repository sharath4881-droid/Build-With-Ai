import React, { useState } from 'react';
import { SystemMetrics } from '../types';

interface ReportsViewProps {
  metrics: SystemMetrics;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ metrics }) => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 pb-28 gap-4 pt-2">
      {/* Header Deck */}
      <div className="relative w-full rounded-xl bg-[#272a32] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.65)] flex flex-col gap-4 border border-[#3c4a42]/60">
        <div className="flex items-center justify-between pb-2 border-b border-[#32353d]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-[#e0e2ed]">
              EXECUTIVE AUDIT &amp; SLA PERFORMANCE REPORTS
            </span>
          </div>

          {/* Time range selector */}
          <div className="flex gap-1 bg-[#0b0e15] p-1 rounded-lg border border-[#272a32]">
            {(['24h', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[10px] font-bold uppercase transition-all ${
                  timeRange === range
                    ? 'bg-[#272a32] text-[#4edea3]'
                    : 'text-[#86948a] hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Adherence vs MTTR Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-[#0b0e15] border border-[#272a32] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#86948a]">
              SLA UPTIME ADHERENCE
            </span>
            <span className="font-['JetBrains_Mono'] text-[20px] font-bold text-[#4edea3] mt-1">
              {metrics.slaAdherence}%
            </span>
            <span className="font-['Hanken_Grotesk'] text-[10px] text-[#bbcabf]">
              Target: 99.00%
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#0b0e15] border border-[#272a32] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#86948a]">
              ROLLING MTTR
            </span>
            <span className="font-['JetBrains_Mono'] text-[20px] font-bold text-white mt-1">
              {metrics.mttrMinutes} min
            </span>
            <span className="font-['Hanken_Grotesk'] text-[10px] text-[#4edea3]">
              -12% vs last month
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#0b0e15] border border-[#272a32] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#86948a]">
              RESOLVED INCIDENTS
            </span>
            <span className="font-['JetBrains_Mono'] text-[20px] font-bold text-white mt-1">
              142
            </span>
            <span className="font-['Hanken_Grotesk'] text-[10px] text-[#bbcabf]">
              Past 7 calendar days
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#0b0e15] border border-[#272a32] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#86948a]">
              SLA BREACH PENALTIES
            </span>
            <span className="font-['JetBrains_Mono'] text-[20px] font-bold text-[#ffb77d] mt-1">
              $14,200
            </span>
            <span className="font-['Hanken_Grotesk'] text-[10px] text-[#bbcabf]">
              Finova Credit Memo
            </span>
          </div>
        </div>
      </div>

      {/* Root Cause Pareto Breakdown */}
      <div className="p-4 rounded-xl bg-[#1c2027] border border-[#272a32] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3">
        <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-[#bbcabf]">
          INCIDENT ROOT CAUSE DISTRIBUTION (PARETO)
        </span>

        <div className="flex flex-col gap-3 pt-1">
          {[
            { label: 'Identity & SAML SSO Token Handshake', percent: 42, color: 'bg-[#ffb4ab]', count: '6 cases' },
            { label: 'API Gateway Quota & Rate Limit Throttling', percent: 28, color: 'bg-[#4cd7f6]', count: '4 cases' },
            { label: 'Billing Gates & Contract Renewal Locks', percent: 18, color: 'bg-[#ffb77d]', count: '3 cases' },
            { label: 'Database Replica Lock Contention', percent: 12, color: 'bg-[#4edea3]', count: '1 case' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex justify-between text-[12px] font-['Hanken_Grotesk']">
                <span className="text-white font-medium">{item.label}</span>
                <span className="font-['JetBrains_Mono'] text-[#bbcabf]">
                  {item.percent}% ({item.count})
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#0b0e15] overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="p-4 rounded-xl bg-[#1c2027] border border-[#272a32] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#272a32]">
          <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-[#bbcabf]">
            EXECUTIVE AUDIT LOGS
          </span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a]">
            IMMUTABLE LEDGER
          </span>
        </div>

        <div className="flex flex-col gap-2 font-['JetBrains_Mono'] text-[11px]">
          <div className="p-2.5 rounded bg-[#0b0e15] border border-[#272a32] flex items-center justify-between">
            <div>
              <span className="text-[#4cd7f6] font-bold">23:04:12 UTC</span>
              <span className="text-white ml-2">Autonomous Copilot drafted root cause memo for Finova VP of Eng</span>
            </div>
            <span className="text-[#86948a]">Auto-generated</span>
          </div>

          <div className="p-2.5 rounded bg-[#0b0e15] border border-[#272a32] flex items-center justify-between">
            <div>
              <span className="text-[#ffb77d] font-bold">22:58:05 UTC</span>
              <span className="text-white ml-2">SFDC bidirectional sync heartbeat verified at 99.8% health</span>
            </div>
            <span className="text-[#4edea3]">Grounded</span>
          </div>

          <div className="p-2.5 rounded bg-[#0b0e15] border border-[#272a32] flex items-center justify-between">
            <div>
              <span className="text-[#ffb4ab] font-bold">22:48:19 UTC</span>
              <span className="text-white ml-2">P1 Incident #88412 automatically ingested from Finova EU-West cluster</span>
            </div>
            <span className="text-[#ffb4ab]">P1 Ingest</span>
          </div>
        </div>

        {/* Export Button */}
        <div className="pt-2">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full h-11 rounded-lg bg-[#272a32] text-white hover:bg-[#32353d] font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider border border-[#3c4a42] flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {isExporting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>GENERATING COMPLIANCE AUDIT PACK...</span>
              </>
            ) : exportComplete ? (
              <>
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">done</span>
                <span className="text-[#4edea3]">REPORT PACK DOWNLOADED (PDF + CSV)</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">download</span>
                <span>EXPORT EXECUTIVE INCIDENT REPORT (CSV &amp; PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

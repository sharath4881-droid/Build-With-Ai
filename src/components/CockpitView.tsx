import React, { useState } from 'react';
import { SystemMetrics, IncidentCase } from '../types';
import { ConsoleGauge } from './ConsoleGauge';

interface CockpitViewProps {
  metrics: SystemMetrics;
  cases: IncidentCase[];
  onTriggerTestIncident: () => void;
  onNavigateToCases: () => void;
}

export const CockpitView: React.FC<CockpitViewProps> = ({
  metrics,
  cases,
  onTriggerTestIncident,
  onNavigateToCases,
}) => {
  const [radarSweepAngle, setRadarSweepAngle] = useState(45);

  React.useEffect(() => {
    const sweep = setInterval(() => {
      setRadarSweepAngle((prev) => (prev + 3) % 360);
    }, 40);
    return () => clearInterval(sweep);
  }, []);

  const criticalCases = cases.filter((c) => c.priority === 'P1');

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 pb-28 gap-4 pt-2">
      {/* Top Cockpit Header Card */}
      <div className="relative w-full rounded-xl bg-[#272a32] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.65)] flex flex-col gap-4 border border-[#3c4a42]/60">
        <div className="flex items-center justify-between pb-2 border-b border-[#32353d]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-[#e0e2ed]">
              EXECUTIVE COCKPIT // GLOBAL RADAR TELEMETRY
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] bg-[#0b0e15] px-2 py-0.5 rounded border border-[#3c4a42]/40">
            ALL SYSTEMS ARMED
          </span>
        </div>

        {/* Radar & Pressure Gauge Dual Console */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Radar Screen (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center justify-center p-3 rounded-xl bg-[#0b0e15] border border-[#272a32] shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="w-full flex items-center justify-between mb-1 px-1">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase tracking-wider">
                RADAR-03 INCIDENT SWEEP
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffb4ab] font-bold">
                {criticalCases.length} P1 CONTACTS
              </span>
            </div>

            {/* Radar Circle */}
            <div className="relative w-48 h-48 rounded-full border border-[#3c4a42]/70 flex items-center justify-center overflow-hidden">
              {/* Concentric rings */}
              <div className="absolute w-36 h-36 rounded-full border border-[#272a32]" />
              <div className="absolute w-24 h-24 rounded-full border border-[#272a32]" />
              <div className="absolute w-12 h-12 rounded-full border border-[#272a32]" />
              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-[#272a32]" />
              <div className="absolute h-full w-[1px] bg-[#272a32]" />

              {/* Rotating Sweep Beam */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: `rotate(${radarSweepAngle}deg)`,
                  background:
                    'conic-gradient(from 0deg, rgba(78,222,163,0.3) 0deg, rgba(78,222,163,0.05) 45deg, transparent 60deg)',
                }}
              />

              {/* Blip 1: Finova Global P1 */}
              <div
                className="absolute w-3 h-3 rounded-full bg-[#ffb4ab] shadow-[0_0_8px_#ffb4ab] animate-ping"
                style={{ top: '35%', left: '60%' }}
                title="Finova Global #88412 P1"
              />
              {/* Blip 2: DataCore P1 */}
              <div
                className="absolute w-2.5 h-2.5 rounded-full bg-[#ffb77d] shadow-[0_0_6px_#ffb77d]"
                style={{ top: '65%', left: '30%' }}
                title="DataCore #88371 Stalled"
              />
              {/* Blip 3: Apex P1 */}
              <div
                className="absolute w-2.5 h-2.5 rounded-full bg-[#ffb4ab] shadow-[0_0_6px_#ffb4ab]"
                style={{ top: '25%', left: '28%' }}
                title="Apex FinTech #88405 DB Deadlock"
              />
              {/* Blip 4: HyperFlow P2 */}
              <div
                className="absolute w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_6px_#4edea3]"
                style={{ top: '75%', left: '68%' }}
                title="HyperFlow API Rate Limit"
              />

              <div className="absolute w-2 h-2 rounded-full bg-[#4edea3]" />
            </div>

            <div className="w-full flex justify-between text-[9px] font-['JetBrains_Mono'] text-[#86948a] mt-2 px-2">
              <span>SCAN FREQ: 14.8 GHz</span>
              <span>RANGE: 3 TIERS</span>
              <span>LOCK: SFDC ORG #4881</span>
            </div>
          </div>

          {/* SLA Pressure Gauge (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-xl bg-[#0b0e15] border border-[#272a32] shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)]">
            <ConsoleGauge psi={metrics.psiPressure} label="REAL-TIME SLA PRESSURE" />
            <div className="mt-2 text-center">
              <span className="font-['JetBrains_Mono'] text-[12px] text-[#ffb77d] font-bold block">
                PEAK LOAD INDEX: 84%
              </span>
              <span className="font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf]">
                +14% stress over weekly baseline
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Revenue at Risk */}
        <div className="p-3.5 rounded-xl bg-[#1c2027] border border-[#272a32] shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex flex-col">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffb4ab] uppercase tracking-wider font-semibold">
            REVENUE AT RISK
          </span>
          <span className="font-['JetBrains_Mono'] text-[22px] font-bold text-white mt-1">
            {metrics.revenueAtRisk}
          </span>
          <span className="font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf] mt-0.5">
            Across 14 Tier-1 Accounts
          </span>
        </div>

        {/* MTTR Velocity */}
        <div className="p-3.5 rounded-xl bg-[#1c2027] border border-[#272a32] shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex flex-col">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] uppercase tracking-wider font-semibold">
            MEAN TIME TO RESOLVE
          </span>
          <span className="font-['JetBrains_Mono'] text-[22px] font-bold text-white mt-1">
            {metrics.mttrMinutes}m
          </span>
          <span className="font-['Hanken_Grotesk'] text-[11px] text-[#4edea3] mt-0.5">
            ↓ 4m faster than target
          </span>
        </div>

        {/* SLA Compliance */}
        <div className="p-3.5 rounded-xl bg-[#1c2027] border border-[#272a32] shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex flex-col">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#4cd7f6] uppercase tracking-wider font-semibold">
            SLA ADHERENCE
          </span>
          <span className="font-['JetBrains_Mono'] text-[22px] font-bold text-white mt-1">
            {metrics.slaAdherence}%
          </span>
          <span className="font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf] mt-0.5">
            Target SLA: 99.0%
          </span>
        </div>

        {/* SFDC Sync Health */}
        <div className="p-3.5 rounded-xl bg-[#1c2027] border border-[#272a32] shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex flex-col">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffb77d] uppercase tracking-wider font-semibold">
            SFDC DATA PIPELINE
          </span>
          <span className="font-['JetBrains_Mono'] text-[22px] font-bold text-white mt-1">
            {metrics.sfdcLivePercent}%
          </span>
          <span className="font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf] mt-0.5">
            Latency &lt; 250ms
          </span>
        </div>
      </div>

      {/* Live Operations Feed & Quick Triage */}
      <div className="p-4 rounded-xl bg-[#1c2027] border border-[#272a32] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#272a32]">
          <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-[#bbcabf]">
            CRITICAL INCIDENT HOTLIST (PRIORITY DISPATCH)
          </span>
          <button
            onClick={onNavigateToCases}
            className="text-[11px] font-['JetBrains_Mono'] text-[#4edea3] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW ALL 14 CASES</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {criticalCases.map((item) => (
            <div
              key={item.id}
              onClick={onNavigateToCases}
              className="p-3 rounded-lg bg-[#0b0e15] border border-[#272a32] hover:border-[#ffb4ab]/50 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-pulse"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffb4ab]">
                      {item.caseNumber}
                    </span>
                    <span className="font-['Hanken_Grotesk'] text-[13px] font-semibold text-white">
                      {item.title}
                    </span>
                  </div>
                  <span className="font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf]">
                    {item.account} • {item.contractValue}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb77d] px-2 py-0.5 rounded bg-[#1c2027]">
                  {item.slaStatusText}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#86948a]">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulator Test Action Strip */}
      <div className="p-3 rounded-xl bg-[#0b0e15] border border-[#3c4a42]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">
            bolt
          </span>
          <span className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
            Executive Console Testing Harness: Simulate live telemetry spike
          </span>
        </div>
        <button
          onClick={onTriggerTestIncident}
          className="px-3 py-1.5 rounded-lg bg-[#272a32] text-[#4cd7f6] hover:bg-[#32353d] font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider border border-[#4cd7f6]/40 transition-all cursor-pointer"
        >
          INJECT TEST P1 LOAD
        </button>
      </div>
    </div>
  );
};

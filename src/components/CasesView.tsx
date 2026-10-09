import React, { useState, useEffect } from 'react';
import { IncidentCase, FilterType, SystemMetrics } from '../types';
import { ConsoleGauge } from './ConsoleGauge';
import { ASSET_URLS } from '../data/mockData';

interface CasesViewProps {
  cases: IncidentCase[];
  metrics: SystemMetrics;
  onOpenCopilot: (incident: IncidentCase) => void;
  onOpenCall: (incident: IncidentCase) => void;
  onOpenEscalate: (incident: IncidentCase) => void;
  onOpenOverrideHold: (incident: IncidentCase) => void;
  onOpenBroadcast: () => void;
  onFilterChange?: (filter: FilterType) => void;
}

export const CasesView: React.FC<CasesViewProps> = ({
  cases,
  metrics,
  onOpenCopilot,
  onOpenCall,
  onOpenEscalate,
  onOpenOverrideHold,
  onOpenBroadcast,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [countdown1, setCountdown1] = useState(4460); // 01:14:20
  const [countdown2, setCountdown2] = useState(16335); // 04:32:15
  const [syncSeconds, setSyncSeconds] = useState(14);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown1((prev) => (prev > 0 ? prev - 1 : 0));
      setCountdown2((prev) => (prev > 0 ? prev - 1 : 0));
      setSyncSeconds((prev) => (prev < 59 ? prev + 1 : 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatHMS = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter cases
  const filteredCases = cases.filter((c) => {
    if (activeFilter === 'p1') return c.priority === 'P1';
    if (activeFilter === 'esc') return c.isEscalated;
    if (activeFilter === 'cust') return c.isCustomerImpacting;
    return true; // all
  });

  const p1Count = cases.filter((c) => c.priority === 'P1').length;
  const escCount = cases.filter((c) => c.isEscalated).length;
  const custCount = cases.filter((c) => c.isCustomerImpacting).length;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 pb-28 gap-4 pt-2">
      {/* Top Telemetry & SLA Pressure Meter Console Deck */}
      <div className="relative w-full rounded-xl bg-[#272a32] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col gap-4 border border-[#3c4a42]/60">
        {/* Precision Machined Corner Rivets */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#32353d] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-1 h-0.5 bg-[#3c4a42]"></div>
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#32353d] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-1 h-0.5 bg-[#3c4a42]"></div>
        </div>

        {/* Header Telemetry Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab] shadow-[0_0_8px_#ffb4ab] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider text-[#e0e2ed]">
              DISPATCH COMMAND // RADAR-03
            </span>
          </div>
          <div className="px-2 py-0.5 rounded bg-[#0b0e15] shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] flex items-center gap-1.5 border border-[#3c4a42]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-medium text-[#4edea3]">
              SFDC SYNC: {syncSeconds}s AGO
            </span>
          </div>
        </div>

        {/* Dual Instrument Cluster: Recessed Counters + Skeuomorphic Pressure Gauge */}
        <div className="grid grid-cols-12 gap-3 items-center">
          {/* Left: Recessed Segment Counters (7 cols) */}
          <div className="col-span-7 flex flex-col gap-2">
            <div className="bg-[#0b0e15] p-3 rounded-lg shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(0,0,0,0.7)] flex flex-col gap-2 border border-[#1c2027]">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#bbcabf] uppercase tracking-wider">
                  ACTIVE LOAD
                </span>
                <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#e0e2ed] px-1.5 py-0.5 bg-[#1c2027] rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                  {cases.length} CASES
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#ffb4ab] uppercase tracking-wider">
                  CRITICAL P1
                </span>
                <span className="font-['JetBrains_Mono'] text-[12px] text-[#ffb4ab] px-1.5 py-0.5 bg-[#93000a]/40 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] font-bold">
                  0{p1Count} BREACH
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#4edea3] uppercase tracking-wider">
                  SLA ADHERENCE
                </span>
                <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#4edea3] px-1.5 py-0.5 bg-[#1c2027] rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                  {metrics.slaAdherence}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#86948a] tracking-wider uppercase">
                MTTR: {metrics.mttrMinutes} MIN
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#ffb77d] tracking-wider uppercase">
                QUEUE PEAK +{metrics.queuePeakChange}%
              </span>
            </div>
          </div>

          {/* Right: SLA Pressure Index Analog Round Dial (5 cols) */}
          <div className="col-span-5 flex flex-col items-center justify-center">
            <ConsoleGauge psi={metrics.psiPressure} />
          </div>
        </div>
      </div>

      {/* Tactile Rocker Filter Bank */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider text-[#86948a]">
            TRIAGE SELECTION
          </span>
          <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
            4 VIEWPORTS
          </span>
        </div>

        {/* Recessed Channel with Raised Pill Switches */}
        <div className="w-full bg-[#0b0e15] p-1.5 rounded-full shadow-[inset_0_3px_6px_rgba(0,0,0,0.85)] flex items-center justify-between gap-1 overflow-x-auto border border-[#1c2027]">
          {/* ALL */}
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1.5 px-2 rounded-full flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#272a32] shadow-[0_2px_5px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] text-[#4edea3]'
                : 'bg-[#1c2027] shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-[#bbcabf] hover:bg-[#272a32]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeFilter === 'all'
                  ? 'bg-[#4edea3] shadow-[0_0_6px_#4edea3]'
                  : 'bg-[#4edea3]/70'
              }`}
            ></span>
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold whitespace-nowrap uppercase tracking-wider">
              ALL ({cases.length})
            </span>
          </button>

          {/* P1 */}
          <button
            onClick={() => setActiveFilter('p1')}
            className={`flex-1 py-1.5 px-2 rounded-full flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all cursor-pointer ${
              activeFilter === 'p1'
                ? 'bg-[#272a32] shadow-[0_2px_5px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] text-[#ffb4ab]'
                : 'bg-[#1c2027] shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-[#bbcabf] hover:bg-[#272a32]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold whitespace-nowrap uppercase tracking-wider text-[#ffb4ab]">
              P1 ({p1Count})
            </span>
          </button>

          {/* ESC */}
          <button
            onClick={() => setActiveFilter('esc')}
            className={`flex-1 py-1.5 px-2 rounded-full flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all cursor-pointer ${
              activeFilter === 'esc'
                ? 'bg-[#272a32] shadow-[0_2px_5px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] text-[#ffb77d]'
                : 'bg-[#1c2027] shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-[#bbcabf] hover:bg-[#272a32]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb77d]"></span>
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold whitespace-nowrap uppercase tracking-wider">
              ESC ({escCount})
            </span>
          </button>

          {/* CUST */}
          <button
            onClick={() => setActiveFilter('cust')}
            className={`flex-1 py-1.5 px-2 rounded-full flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all cursor-pointer ${
              activeFilter === 'cust'
                ? 'bg-[#272a32] shadow-[0_2px_5px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] text-[#4cd7f6]'
                : 'bg-[#1c2027] shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-[#bbcabf] hover:bg-[#272a32]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold whitespace-nowrap uppercase tracking-wider">
              CUST ({custCount})
            </span>
          </button>
        </div>
      </div>

      {/* Incident Cards Section */}
      <div className="flex flex-col gap-4">
        {/* CASE 1: P1 Critical SSO Outage (Expanded Tactical Card) */}
        {(activeFilter === 'all' || activeFilter === 'p1' || activeFilter === 'esc' || activeFilter === 'cust') && (
          <div className="relative w-full rounded-xl bg-[#1c2027] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col gap-3 overflow-hidden border border-[#272a32]">
            {/* Amber Left Edge Warning Ridge Strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#ffb4ab] via-[#ffb77d] to-[#ffb4ab] shadow-[0_0_8px_rgba(255,180,171,0.5)]"></div>

            {/* Top Header Row */}
            <div className="flex items-start justify-between pl-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffb4ab] font-['JetBrains_Mono'] text-[10px] font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] uppercase tracking-wider">
                    P1 CRITICAL
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#bbcabf]">
                    #88412
                  </span>
                </div>
                <span className="font-['Hanken_Grotesk'] text-[16px] text-[#e0e2ed] font-semibold mt-1">
                  Enterprise SSO Outage
                </span>
                <span className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                  Finova Global - Tier 1 Enterprise Tier
                </span>
              </div>

              {/* Segmented Countdown Box */}
              <div className="flex flex-col items-end">
                <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#ffb77d] font-semibold">
                  SLA COUNTDOWN
                </span>
                <div className="px-2 py-1 rounded bg-[#0b0e15] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-1 border border-[#272a32]">
                  <span className="material-symbols-outlined text-[16px] text-[#ffb77d] animate-pulse">
                    timer
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[16px] text-[#ffb77d] font-bold tracking-widest">
                    {formatHMS(countdown1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Autonomous Agent Dispatch Output Plate */}
            <div
              onClick={() => onOpenCopilot(cases[0])}
              className="relative rounded-lg bg-[#0b0e15] p-3 shadow-[inset_0_2px_5px_rgba(0,0,0,0.85)] flex items-start gap-2 ml-1 cursor-pointer hover:border hover:border-[#4cd7f6]/40 transition-all group"
            >
              <div className="w-6 h-6 rounded-full bg-[#00b2d0]/30 flex items-center justify-center shrink-0 shadow-[0_0_6px_#00b2d0]">
                <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">
                  smart_toy
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#4cd7f6] uppercase tracking-wider group-hover:underline">
                    AUTONOMOUS COPILOT // DISPATCH DRAFT
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
                </div>
                <p className="font-['Hanken_Grotesk'] text-[12px] text-[#e0e2ed] mt-0.5 leading-snug">
                  {cases[0].copilotDraft?.authorized ? (
                    <span className="text-[#4edea3] font-medium">
                      ✓ Authorized by Exec: Dispatched to Elena Rostova (VP Eng) &amp; SFDC feed.
                    </span>
                  ) : (
                    'Auto-drafted root-cause acknowledgment & SLA credit forecast prepped for VP of Eng (Finova). Awaiting authorization.'
                  )}
                </p>
              </div>
            </div>

            {/* Incident Physical Action Push-Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1 ml-1">
              <button
                onClick={() => onOpenEscalate(cases[0])}
                className="h-10 px-2 rounded-lg bg-[#272a32] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center gap-1.5 active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border border-[#3c4a42]/40 hover:bg-[#32353d] transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#ffb4ab] shadow-[0_0_6px_#ffb4ab]"></span>
                <span className="font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider text-[#e0e2ed]">
                  ESCALATE TO TIER 3
                </span>
              </button>
              <button
                onClick={() => onOpenCall(cases[0])}
                className="h-10 px-2 rounded-lg bg-[#272a32] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center gap-1.5 active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border border-[#3c4a42]/40 hover:bg-[#32353d] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                  phone_in_talk
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider text-[#e0e2ed]">
                  CALL ACCOUNT EXEC
                </span>
              </button>
            </div>
          </div>
        )}

        {/* CASE 2: P2 High API Limit Breach (Stable Radar Card) */}
        {(activeFilter === 'all' || activeFilter === 'cust') && (
          <div className="relative w-full rounded-xl bg-[#1c2027] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col gap-3 overflow-hidden border border-[#272a32]">
            {/* Emerald Left Edge Strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.4)]"></div>

            <div className="flex items-start justify-between pl-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#32353d] text-[#4edea3] font-['JetBrains_Mono'] text-[10px] font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] uppercase tracking-wider">
                    P2 HIGH
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#bbcabf]">
                    #88390
                  </span>
                </div>
                <span className="font-['Hanken_Grotesk'] text-[16px] text-[#e0e2ed] font-semibold mt-1">
                  API Rate Limit Breach
                </span>
                <span className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                  HyperFlow Inc. - 120k req/min Spike
                </span>
              </div>

              {/* Healthy SLA Countdown */}
              <div className="flex flex-col items-end">
                <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#4edea3] font-semibold">
                  SLA ON TRACK
                </span>
                <div className="px-2 py-1 rounded bg-[#0b0e15] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-1 border border-[#272a32]">
                  <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                    check_circle
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[16px] text-[#4edea3] font-bold tracking-widest">
                    {formatHMS(countdown2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Owner & Sync Metadata Strip */}
            <div className="flex items-center justify-between pt-1 ml-1 px-2.5 bg-[#0b0e15]/60 rounded py-1.5 border border-[#272a32]/60">
              <div className="flex items-center gap-2">
                <img
                  className="w-5 h-5 rounded-full object-cover"
                  src={ASSET_URLS.sarahJenkins}
                  alt="Sarah Jenkins"
                  referrerPolicy="no-referrer"
                />
                <span className="font-['Hanken_Grotesk'] text-[12px] text-[#e0e2ed]">
                  Lead: Sarah Jenkins
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a] font-medium">
                SFDC RECORD SYNC: 2M AGO
              </span>
            </div>
          </div>
        )}

        {/* CASE 3: P1 Escalated Billing Discrepancy (Crosshatch Stalled Strip) */}
        {(activeFilter === 'all' || activeFilter === 'p1' || activeFilter === 'esc') && (
          <div className="relative w-full rounded-xl bg-[#1c2027] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col gap-3 overflow-hidden border border-[#272a32]">
            {/* Stalled Hazard Strip on Edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-2.5 hazard-stripes"
              title="Legal Hold Gate Active"
            ></div>

            <div className="flex items-start justify-between pl-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffb4ab] font-['JetBrains_Mono'] text-[10px] font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] uppercase tracking-wider">
                    P1 ESCALATED
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#bbcabf]">
                    #88371
                  </span>
                </div>
                <span className="font-['Hanken_Grotesk'] text-[16px] text-[#e0e2ed] font-semibold mt-1">
                  Billing Discrepancy (Renewal Blocked)
                </span>
                <span className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                  DataCore Enterprises - $1.4M Contract
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#ffb4ab] font-semibold">
                  STATUS STALLED
                </span>
                <div className="px-2 py-1 rounded bg-[#93000a]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-1 border border-[#93000a]/50">
                  <span className="material-symbols-outlined text-[16px] text-[#ffb4ab]">
                    warning
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb4ab] font-bold">
                    PAUSED: LEGAL
                  </span>
                </div>
              </div>
            </div>

            {/* Attention Notice Box */}
            <div className="ml-2 p-2 rounded bg-[#0b0e15] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center justify-between border border-[#272a32]">
              <span className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                Assigned: Finance Operations Desk
              </span>
              <button
                onClick={() => onOpenOverrideHold(cases[2])}
                className="px-2.5 py-1 rounded bg-[#272a32] shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-['JetBrains_Mono'] text-[10px] font-bold uppercase text-[#ffb77d] active:scale-95 transition-all hover:bg-[#32353d] cursor-pointer"
              >
                OVERRIDE HOLD
              </button>
            </div>
          </div>
        )}

        {/* Additional filtered cases for depth and completeness */}
        {activeFilter === 'p1' && cases[3] && (
          <div className="relative w-full rounded-xl bg-[#1c2027] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3 overflow-hidden border border-[#272a32]">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ffb4ab]"></div>
            <div className="flex items-start justify-between pl-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffb4ab] font-['JetBrains_Mono'] text-[10px] font-bold">
                    P1 CRITICAL
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[12px] text-[#bbcabf]">
                    {cases[3].caseNumber}
                  </span>
                </div>
                <h4 className="font-['Hanken_Grotesk'] text-[16px] font-semibold text-white mt-1">
                  {cases[3].title}
                </h4>
                <p className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                  {cases[3].account} • {cases[3].contractValue}
                </p>
              </div>
              <div className="text-right">
                <span className="font-['JetBrains_Mono'] text-[9px] text-[#ffb77d] font-semibold block">
                  SLA COUNTDOWN
                </span>
                <span className="font-['JetBrains_Mono'] text-[15px] text-[#ffb77d] font-bold px-2 py-0.5 rounded bg-[#0b0e15]">
                  00:47:20
                </span>
              </div>
            </div>
            <div className="ml-1 p-2 rounded bg-[#0b0e15] flex items-center justify-between">
              <span className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                DB Read-Replica Pool Stalled (820 query queue)
              </span>
              <button
                onClick={() => onOpenEscalate(cases[3])}
                className="px-2 py-1 rounded bg-[#272a32] text-[#ffb4ab] text-[10px] font-['JetBrains_Mono'] font-bold uppercase"
              >
                Page DBA Lead
              </button>
            </div>
          </div>
        )}

        {activeFilter === 'esc' && cases[5] && (
          <div className="relative w-full rounded-xl bg-[#1c2027] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3 overflow-hidden border border-[#272a32]">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ffb77d]"></div>
            <div className="flex items-start justify-between pl-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#32353d] text-[#ffb77d] font-['JetBrains_Mono'] text-[10px] font-bold">
                    P2 ESCALATED
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[12px] text-[#bbcabf]">
                    {cases[5].caseNumber}
                  </span>
                </div>
                <h4 className="font-['Hanken_Grotesk'] text-[16px] font-semibold text-white mt-1">
                  {cases[5].title}
                </h4>
                <p className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                  {cases[5].account} • {cases[5].contractValue}
                </p>
              </div>
              <div className="text-right">
                <span className="font-['JetBrains_Mono'] text-[9px] text-[#ffb4ab] font-semibold block">
                  SECURITY GATE
                </span>
                <span className="font-['JetBrains_Mono'] text-[12px] text-[#ffb4ab] font-bold px-2 py-0.5 rounded bg-[#93000a]/30">
                  L3 HOLD
                </span>
              </div>
            </div>
          </div>
        )}

        {activeFilter === 'cust' && cases[4] && (
          <div className="relative w-full rounded-xl bg-[#1c2027] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3 overflow-hidden border border-[#272a32]">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4cd7f6]"></div>
            <div className="flex items-start justify-between pl-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#32353d] text-[#4cd7f6] font-['JetBrains_Mono'] text-[10px] font-bold">
                    P2 CUSTOMER IMPACT
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[12px] text-[#bbcabf]">
                    {cases[4].caseNumber}
                  </span>
                </div>
                <h4 className="font-['Hanken_Grotesk'] text-[16px] font-semibold text-white mt-1">
                  {cases[4].title}
                </h4>
                <p className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                  {cases[4].account} • {cases[4].accountTier}
                </p>
              </div>
              <div className="text-right">
                <span className="font-['JetBrains_Mono'] text-[9px] text-[#4edea3] font-semibold block">
                  SLA HEALTHY
                </span>
                <span className="font-['JetBrains_Mono'] text-[15px] text-[#4edea3] font-bold px-2 py-0.5 rounded bg-[#0b0e15]">
                  02:37:00
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dispatch Command Panel Button (Machined Heavy Action Switch) */}
      <div className="relative w-full pt-1">
        <button
          onClick={onOpenBroadcast}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-[#32353d] via-[#272a32] to-[#32353d] shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-between px-4 active:translate-y-0.5 active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] border border-[#3c4a42]/70 hover:border-[#ffb4ab]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            {/* Physical Diode with Outer Housing Ring */}
            <div className="w-5 h-5 rounded-full bg-[#0b0e15] p-0.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex items-center justify-center border border-[#3c4a42]/40">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffb4ab] shadow-[0_0_10px_#ffb4ab] animate-pulse"></div>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffb4ab] uppercase tracking-widest font-bold">
                EXECUTIVE OVERRIDE BROADCAST
              </span>
              <span className="font-['Hanken_Grotesk'] text-[16px] text-[#e0e2ed] font-semibold leading-tight group-hover:text-white">
                Emergency Broadcast to On-Call Leads
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded bg-[#0b0e15] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex items-center justify-center border border-[#3c4a42]/50 group-hover:border-[#ffb4ab]/60 transition-colors">
            <span className="material-symbols-outlined text-[20px] text-[#e0e2ed]">
              cell_tower
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

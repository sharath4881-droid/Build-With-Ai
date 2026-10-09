import React from 'react';
import { IncidentCase } from '../types';
import { ASSET_URLS } from '../data/mockData';

interface PipelineViewProps {
  cases: IncidentCase[];
  onOpenCall: (incident: IncidentCase) => void;
  onOpenCopilot: (incident: IncidentCase) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  cases,
  onOpenCall,
  onOpenCopilot,
}) => {
  const accountsAtRisk = [
    {
      name: 'Finova Global',
      arr: '$2,200,000',
      status: 'P1 Outage Risk',
      statusColor: 'text-[#ffb4ab] bg-[#93000a]/30',
      renewalQuarter: 'Q4 2026',
      lead: 'Sarah Jenkins',
      leadRole: 'Enterprise Director',
      avatar: ASSET_URLS.sarahJenkins,
      caseRef: '#88412',
      riskScore: '92% RISK',
      details: 'SSO failure affecting 1,820 live trading sessions. VP Elena Rostova evaluating credit remedies.',
      incident: cases[0],
    },
    {
      name: 'DataCore Enterprises',
      arr: '$1,400,000',
      status: 'Renewal Legal Hold',
      statusColor: 'text-[#ffb77d] bg-[#d97707]/30',
      renewalQuarter: 'Past Due (12d)',
      lead: 'Finance Operations Desk',
      leadRole: 'Legal & Contract Desk',
      avatar: ASSET_URLS.davidMiller,
      caseRef: '#88371',
      riskScore: '85% RISK',
      details: 'Billing discrepancy paused renewal execution. Requires executive rider §4.2 hold release.',
      incident: cases[2],
    },
    {
      name: 'Apex FinTech Global',
      arr: '$3,100,000',
      status: 'P1 DB Contention',
      statusColor: 'text-[#ffb4ab] bg-[#93000a]/30',
      renewalQuarter: 'Q1 2027',
      lead: 'David Miller',
      leadRole: 'Staff SRE Lead',
      avatar: ASSET_URLS.davidMiller,
      caseRef: '#88405',
      riskScore: '78% RISK',
      details: 'Read-replica pool deadlock during high-frequency batch ingest.',
      incident: cases[3],
    },
    {
      name: 'HyperFlow Inc.',
      arr: '$890,000',
      status: 'SLA Protected (P2)',
      statusColor: 'text-[#4edea3] bg-[#003824]/50',
      renewalQuarter: 'Q2 2027',
      lead: 'Sarah Jenkins',
      leadRole: 'Enterprise Director',
      avatar: ASSET_URLS.sarahJenkins,
      caseRef: '#88390',
      riskScore: '24% SAFE',
      details: 'Rate limit spiked at 120k req/min. Throttling buffer active with no contractual violation.',
      incident: cases[1],
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 pb-28 gap-4 pt-2">
      {/* Revenue Header Deck */}
      <div className="relative w-full rounded-xl bg-[#272a32] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.65)] flex flex-col gap-4 border border-[#3c4a42]/60">
        <div className="flex items-center justify-between pb-2 border-b border-[#32353d]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb77d] shadow-[0_0_8px_#ffb77d] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-[#e0e2ed]">
              SALESFORCE ENTERPRISE PIPELINE RISK MATRIX
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] bg-[#0b0e15] px-2 py-0.5 rounded border border-[#3c4a42]/40">
            SYNCED TO CRM
          </span>
        </div>

        {/* Aggregated Pipeline Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[#0b0e15] border border-[#272a32] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#bbcabf]">
              TOTAL ACTIVE ARR
            </span>
            <span className="font-['JetBrains_Mono'] text-[18px] font-bold text-white mt-1">
              $28.4M
            </span>
            <span className="font-['Hanken_Grotesk'] text-[11px] text-[#4edea3]">
              14 Tier-1 Contracts
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#0b0e15] border border-[#272a32] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#ffb4ab]">
              IMMEDIATE EXPOSURE
            </span>
            <span className="font-['JetBrains_Mono'] text-[18px] font-bold text-[#ffb4ab] mt-1">
              $6.7M ARR
            </span>
            <span className="font-['Hanken_Grotesk'] text-[11px] text-[#ffb4ab]">
              3 P1 Blocked Deals
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#0b0e15] border border-[#272a32] flex flex-col">
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#4cd7f6]">
              SLA PENALTY CEILING
            </span>
            <span className="font-['JetBrains_Mono'] text-[18px] font-bold text-[#4cd7f6] mt-1">
              $38,500
            </span>
            <span className="font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf]">
              Credit reserve capped
            </span>
          </div>
        </div>
      </div>

      {/* Account Cards */}
      <div className="flex flex-col gap-3">
        <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-[#bbcabf] px-1">
          ACCOUNTS UNDER OPERATIONAL PRESSURE
        </span>

        {accountsAtRisk.map((acc, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-[#1c2027] border border-[#272a32] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Hanken_Grotesk'] text-[17px] font-bold text-white">
                    {acc.name}
                  </span>
                  <span
                    className={`font-['JetBrains_Mono'] text-[10px] font-bold px-2 py-0.5 rounded ${acc.statusColor}`}
                  >
                    {acc.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[12px] font-['JetBrains_Mono'] text-[#bbcabf] mt-1">
                  <span>ARR: <strong className="text-white">{acc.arr}</strong></span>
                  <span>•</span>
                  <span>Renewal: <strong className="text-[#ffb77d]">{acc.renewalQuarter}</strong></span>
                  <span>•</span>
                  <span>Case: <strong className="text-[#4cd7f6]">{acc.caseRef}</strong></span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-[#ffb4ab] px-2 py-1 rounded bg-[#0b0e15] border border-[#272a32]">
                  {acc.riskScore}
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <p className="font-['Hanken_Grotesk'] text-[13px] text-[#e0e2ed] bg-[#0b0e15] p-2.5 rounded-lg border border-[#272a32]">
              {acc.details}
            </p>

            {/* Owner & Actions */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <img
                  src={acc.avatar}
                  alt={acc.lead}
                  className="w-6 h-6 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
                  Lead: <span className="text-white font-medium">{acc.lead}</span> ({acc.leadRole})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {acc.incident && acc.incident.copilotDraft && (
                  <button
                    onClick={() => onOpenCopilot(acc.incident!)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#272a32] text-[#4cd7f6] hover:bg-[#32353d] font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider border border-[#4cd7f6]/40 cursor-pointer"
                  >
                    Draft SLA Memo
                  </button>
                )}
                {acc.incident && (
                  <button
                    onClick={() => onOpenCall(acc.incident!)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#272a32] text-[#4edea3] hover:bg-[#32353d] font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider border border-[#4edea3]/40 cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    <span>Direct Dial</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

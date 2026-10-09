import React, { useState } from 'react';
import { IncidentCase } from '../types';

interface EscalateModalProps {
  incident: IncidentCase;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (incidentId: string) => void;
}

export const EscalateModal: React.FC<EscalateModalProps> = ({
  incident,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [tier, setTier] = useState<'tier3' | 'tier4_exec'>('tier3');
  const [notifySre, setNotifySre] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm(incident.id);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-xl bg-[#1c2027] border border-[#ffb4ab]/40 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-[#e0e2ed]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#272a32]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffb4ab] uppercase tracking-wider">
              CONFIRM TIER ESCALATION
            </span>
          </div>
          <button onClick={onClose} className="text-[#bbcabf] hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div>
          <h4 className="font-['Hanken_Grotesk'] text-[16px] font-semibold text-white">
            Escalate {incident.caseNumber}: {incident.title}
          </h4>
          <p className="font-['Hanken_Grotesk'] text-[13px] text-[#bbcabf] mt-1">
            Account: {incident.account} ({incident.accountTier})
          </p>
        </div>

        {/* Tier Selector */}
        <div className="flex flex-col gap-2">
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#86948a]">
            TARGET ESCALATION CELL
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTier('tier3')}
              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                tier === 'tier3'
                  ? 'bg-[#272a32] border-[#ffb4ab] text-white'
                  : 'bg-[#0b0e15] border-[#272a32] text-[#86948a]'
              }`}
            >
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffb4ab]">
                TIER 3 ARCHITECTURE
              </span>
              <span className="font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf]">
                SRE &amp; Core Infrastructure Cell
              </span>
            </button>
            <button
              onClick={() => setTier('tier4_exec')}
              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                tier === 'tier4_exec'
                  ? 'bg-[#272a32] border-[#ffb4ab] text-white'
                  : 'bg-[#0b0e15] border-[#272a32] text-[#86948a]'
              }`}
            >
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffb77d]">
                VP / EXECUTIVE CELL
              </span>
              <span className="font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf]">
                Chief Architect &amp; VP Eng
              </span>
            </button>
          </div>
        </div>

        {/* Option */}
        <label className="flex items-center gap-2 p-2.5 rounded bg-[#0b0e15] cursor-pointer">
          <input
            type="checkbox"
            checked={notifySre}
            onChange={(e) => setNotifySre(e.target.checked)}
            className="accent-[#4edea3]"
          />
          <span className="font-['Hanken_Grotesk'] text-[12px] text-[#e0e2ed]">
            Page primary on-call SRE lead via high-urgency PagerDuty
          </span>
        </label>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onClose}
            className="h-10 rounded-lg bg-[#272a32] text-[#bbcabf] font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-10 rounded-lg bg-[#93000a] hover:bg-[#b00020] text-[#ffdad6] font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            {isSubmitting ? 'ESCALATING...' : 'CONFIRM ESCALATION'}
          </button>
        </div>
      </div>
    </div>
  );
};

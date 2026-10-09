import React, { useState } from 'react';
import { IncidentCase } from '../types';

interface OverrideHoldModalProps {
  incident: IncidentCase;
  isOpen: boolean;
  onClose: () => void;
  onOverrideConfirm: (incidentId: string, reason: string) => void;
}

export const OverrideHoldModal: React.FC<OverrideHoldModalProps> = ({
  incident,
  isOpen,
  onClose,
  onOverrideConfirm,
}) => {
  const [reason, setReason] = useState('Executive Pre-Approval: Customer $1.4M Renewal Grace Period authorized under Master Agreement Rider §4.2');
  const [hasConfirmedPin, setHasConfirmedPin] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onOverrideConfirm(incident.id, reason);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-xl bg-[#1c2027] border-2 border-[#d97707] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-4 text-[#e0e2ed]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#272a32]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ffb77d]">
              gavel
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffb77d] uppercase tracking-wider">
              EXECUTIVE HOLD OVERRIDE
            </span>
          </div>
          <button onClick={onClose} className="text-[#bbcabf] hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div>
          <h4 className="font-['Hanken_Grotesk'] text-[16px] font-semibold text-white">
            Release Legal Hold on {incident.caseNumber}
          </h4>
          <p className="font-['Hanken_Grotesk'] text-[13px] text-[#bbcabf] mt-0.5">
            Account: {incident.account} • Contract: {incident.contractValue}
          </p>
          <div className="mt-2 p-2 rounded bg-[#93000a]/20 border border-[#93000a]/40 text-[#ffb4ab] text-[11px] font-['JetBrains_Mono'] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">warning</span>
            <span>CURRENT GATE: {incident.holdReason || 'PAUSED: LEGAL'} ({incident.assignedDesk})</span>
          </div>
        </div>

        {/* Reason */}
        <div className="flex flex-col gap-1.5">
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#86948a]">
            LEGAL OVERRIDE JUSTIFICATION LOG
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="w-full rounded bg-[#0b0e15] border border-[#272a32] p-2.5 font-['Hanken_Grotesk'] text-[12px] text-[#e0e2ed] focus:outline-none focus:border-[#ffb77d] resize-none"
          />
        </div>

        {/* Executive Confirmation Checkbox */}
        <label className="flex items-center gap-2.5 p-2 rounded bg-[#0b0e15] border border-[#272a32] cursor-pointer">
          <input
            type="checkbox"
            checked={hasConfirmedPin}
            onChange={(e) => setHasConfirmedPin(e.target.checked)}
            className="accent-[#d97707]"
          />
          <span className="font-['Hanken_Grotesk'] text-[12px] text-[#bbcabf]">
            I certify executive sign-off and assume risk on contract renewal.
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
            onClick={handleExecute}
            disabled={!hasConfirmedPin || isProcessing}
            className="h-10 rounded-lg bg-[#d97707] hover:bg-[#b45309] text-white font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
          >
            {isProcessing ? 'AUTHORIZING...' : 'EXECUTE OVERRIDE'}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcastSent: (summary: string) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  onClose,
  onBroadcastSent,
}) => {
  const [channels, setChannels] = useState({
    pagerDuty: true,
    slackSev1: true,
    smsLeads: true,
    bridgeVoice: false,
  });
  const [priorityLevel, setPriorityLevel] = useState<'SEV-1' | 'SEV-0 CRITICAL'>('SEV-1');
  const [message, setMessage] = useState(
    'ALERT: Executive Incident Override declared across Tier 1 instances. Finova Global SSO and Apex DB read-locks escalated. All on-call leads check #war-room-radar immediately.'
  );
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleTransmit = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setIsDone(true);
      setTimeout(() => {
        onBroadcastSent(message);
        setIsDone(false);
        onClose();
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#1c2027] border-2 border-[#ffb4ab]/40 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col gap-4 text-[#e0e2ed]">
        {/* Flashing Tactical Emergency Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#272a32]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#93000a] flex items-center justify-center shadow-[0_0_12px_#ffb4ab] animate-pulse">
              <span className="material-symbols-outlined text-[20px] text-[#ffdad6]">
                cell_tower
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ffb4ab] uppercase tracking-widest">
                  EXECUTIVE OVERRIDE BROADCAST
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-['JetBrains_Mono'] text-[9px] font-bold">
                  {priorityLevel}
                </span>
              </div>
              <span className="font-['Hanken_Grotesk'] text-[13px] text-[#bbcabf]">
                High-Frequency Emergency Dispatch to On-Call Leads
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#272a32] text-[#bbcabf] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Severity Selector */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#0b0e15] border border-[#272a32]">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bbcabf] uppercase tracking-wider">
            ESCALATION TIER
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPriorityLevel('SEV-1')}
              className={`px-3 py-1 rounded font-['JetBrains_Mono'] text-[10px] font-bold uppercase transition-all ${
                priorityLevel === 'SEV-1'
                  ? 'bg-[#d97707] text-white shadow-[0_0_8px_#d97707]'
                  : 'bg-[#272a32] text-[#86948a]'
              }`}
            >
              SEV-1 HIGH
            </button>
            <button
              onClick={() => setPriorityLevel('SEV-0 CRITICAL')}
              className={`px-3 py-1 rounded font-['JetBrains_Mono'] text-[10px] font-bold uppercase transition-all ${
                priorityLevel === 'SEV-0 CRITICAL'
                  ? 'bg-[#93000a] text-[#ffdad6] shadow-[0_0_12px_#ffb4ab]'
                  : 'bg-[#272a32] text-[#86948a]'
              }`}
            >
              SEV-0 CRITICAL
            </button>
          </div>
        </div>

        {/* Target Dispatch Matrix */}
        <div className="flex flex-col gap-1.5">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#86948a]">
            ACTIVE TRANSMISSION CHANNELS
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'pagerDuty', label: 'PagerDuty High Urgency', icon: 'notifications_active' },
              { id: 'slackSev1', label: '#incident-war-room', icon: 'forum' },
              { id: 'smsLeads', label: 'SMS Blast to L3 Leads', icon: 'sms' },
              { id: 'bridgeVoice', label: 'Auto-Bridge Audio Conf', icon: 'headset_mic' },
            ].map((c) => {
              const active = channels[c.id as keyof typeof channels];
              return (
                <button
                  key={c.id}
                  onClick={() =>
                    setChannels({
                      ...channels,
                      [c.id]: !active,
                    })
                  }
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#272a32] border-[#4edea3]/50 text-[#e0e2ed]'
                      : 'bg-[#0b0e15] border-[#272a32] text-[#86948a]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      active ? 'text-[#4edea3]' : 'text-[#86948a]'
                    }`}
                  >
                    {c.icon}
                  </span>
                  <span className="font-['Hanken_Grotesk'] text-[12px] font-medium leading-tight">
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dispatch Message Payload */}
        <div className="flex flex-col gap-1">
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#bbcabf]">
            DISPATCH PAYLOAD MESSAGE
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full rounded-lg bg-[#0b0e15] border border-[#272a32] p-2.5 font-['JetBrains_Mono'] text-[11px] text-[#e0e2ed] focus:outline-none focus:border-[#ffb4ab] resize-none"
          />
        </div>

        {/* Result banner */}
        {isDone && (
          <div className="p-2.5 rounded-lg bg-[#003824] border border-[#4edea3]/40 flex items-center gap-2 text-[#4edea3] text-[12px] font-['JetBrains_Mono']">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>EMERGENCY DISPATCH TRANSMITTED TO 8 ON-CALL RESPONDERS</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onClose}
            className="h-11 px-3 rounded-lg bg-[#272a32] text-[#bbcabf] hover:text-white font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider shadow-[0_2px_4px_rgba(0,0,0,0.5)] active:translate-y-0.5"
          >
            Abort Broadcast
          </button>
          <button
            onClick={handleTransmit}
            disabled={isTransmitting || isDone}
            className="h-11 px-3 rounded-lg bg-gradient-to-r from-[#93000a] via-[#b00020] to-[#93000a] text-white hover:brightness-110 font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(147,0,10,0.6)] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isTransmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>BROADCASTING PULSE...</span>
              </>
            ) : isDone ? (
              <>
                <span className="material-symbols-outlined text-[18px]">done_all</span>
                <span>TRANSMITTED</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                <span>TRANSMIT BROADCAST</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ASSET_URLS } from '../data/mockData';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName?: string;
  targetRole?: string;
  account?: string;
}

export const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  onClose,
  targetName = 'Sarah Jenkins',
  targetRole = 'Enterprise Account Director',
  account = 'Finova Global',
}) => {
  const [callStatus, setCallStatus] = useState<'dialing' | 'connected' | 'ended'>('dialing');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callNotes, setCallNotes] = useState('Spoke with Sarah regarding VP Elena Rostova SLA sensitivity. Finova will accept $14.2k credit memo upon root cause sign-off.');

  useEffect(() => {
    if (!isOpen) {
      setCallStatus('dialing');
      setCallDuration(0);
      return;
    }

    const dialTimeout = setTimeout(() => {
      setCallStatus('connected');
    }, 2200);

    return () => clearTimeout(dialTimeout);
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#1c2027] border border-[#3c4a42] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col items-center gap-4 text-[#e0e2ed]">
        {/* Top Frequency Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b0e15] border border-[#272a32]">
          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] uppercase tracking-wider font-semibold">
            SECURE VOIP DIRECT LINE // SFDC INTEGRATED
          </span>
        </div>

        {/* Avatar with Soundwave Rings */}
        <div className="relative my-2 flex items-center justify-center">
          {callStatus === 'connected' && (
            <div className="absolute w-28 h-28 rounded-full border border-[#4edea3]/40 animate-ping pointer-events-none" />
          )}
          <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#32353d] to-[#4edea3] shadow-[0_8px_20px_rgba(0,0,0,0.7)]">
            <img
              src={ASSET_URLS.sarahJenkins}
              alt={targetName}
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Identity Details */}
        <div className="text-center flex flex-col items-center">
          <span className="font-['Hanken_Grotesk'] text-[20px] font-bold text-white">
            {targetName}
          </span>
          <span className="font-['Hanken_Grotesk'] text-[13px] text-[#bbcabf]">
            {targetRole}
          </span>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb77d] mt-0.5">
            Account: {account}
          </span>

          <div className="mt-2 px-3 py-1 rounded bg-[#0b0e15] font-['JetBrains_Mono'] text-[13px] font-bold">
            {callStatus === 'dialing' && (
              <span className="text-[#ffb77d] animate-pulse">CONNECTING SFDC SECURE SIP...</span>
            )}
            {callStatus === 'connected' && (
              <span className="text-[#4edea3]">LIVE • {formatTimer(callDuration)}</span>
            )}
            {callStatus === 'ended' && <span className="text-[#ffb4ab]">CALL TERMINATED</span>}
          </div>
        </div>

        {/* Audio Waveform Graphic */}
        {callStatus === 'connected' && (
          <div className="w-full h-10 flex items-center justify-center gap-1 px-4 bg-[#0b0e15] rounded-lg border border-[#272a32]">
            {[40, 75, 30, 95, 60, 20, 85, 50, 90, 35, 70, 45, 80].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-[#4edea3] rounded-full transition-all duration-150"
                style={{
                  height: `${isMuted ? 4 : Math.min(100, (h * (callDuration % 3 + 1)) / 2)}%`,
                  opacity: isMuted ? 0.3 : 0.9,
                }}
              />
            ))}
          </div>
        )}

        {/* Instant SFDC Call Log Note */}
        <div className="w-full flex flex-col gap-1">
          <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider text-[#86948a]">
            AUTOMATIC SFDC ACTIVITY LOG
          </span>
          <textarea
            value={callNotes}
            onChange={(e) => setCallNotes(e.target.value)}
            rows={2}
            className="w-full rounded bg-[#0b0e15] border border-[#272a32] p-2 font-['Hanken_Grotesk'] text-[11px] text-[#bbcabf] focus:outline-none focus:border-[#4edea3] resize-none"
          />
        </div>

        {/* Tactical Dial Controls */}
        <div className="flex items-center justify-around w-full pt-2">
          {/* Mute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all ${
              isMuted
                ? 'bg-[#ffb4ab] text-[#690005] shadow-[0_0_12px_#ffb4ab]'
                : 'bg-[#272a32] text-[#bbcabf] hover:text-white'
            }`}
            title="Mute Audio"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-[#93000a] text-[#ffdad6] hover:bg-[#b00020] flex items-center justify-center shadow-[0_4px_16px_rgba(255,180,171,0.4)] active:scale-95 transition-all"
            title="End Call"
          >
            <span className="material-symbols-outlined text-[26px]">call_end</span>
          </button>

          {/* Speaker */}
          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all ${
              isSpeaker
                ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_12px_#4edea3]'
                : 'bg-[#272a32] text-[#bbcabf] hover:text-white'
            }`}
            title="Speaker Phone"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSpeaker ? 'volume_up' : 'volume_off'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

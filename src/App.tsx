import React, { useState } from 'react';
import { TabType, IncidentCase, SystemMetrics } from './types';
import { INITIAL_CASES, INITIAL_METRICS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CasesView } from './components/CasesView';
import { CockpitView } from './components/CockpitView';
import { PipelineView } from './components/PipelineView';
import { ReportsView } from './components/ReportsView';
import { CopilotModal } from './components/CopilotModal';
import { CallModal } from './components/CallModal';
import { BroadcastModal } from './components/BroadcastModal';
import { EscalateModal } from './components/EscalateModal';
import { OverrideHoldModal } from './components/OverrideHoldModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('cases');
  const [cases, setCases] = useState<IncidentCase[]>(INITIAL_CASES);
  const [metrics, setMetrics] = useState<SystemMetrics>(INITIAL_METRICS);

  // Modals state
  const [copilotIncident, setCopilotIncident] = useState<IncidentCase | null>(null);
  const [callIncident, setCallIncident] = useState<IncidentCase | null>(null);
  const [escalateIncident, setEscalateIncident] = useState<IncidentCase | null>(null);
  const [overrideHoldIncident, setOverrideHoldIncident] = useState<IncidentCase | null>(null);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Authorize autonomous copilot draft
  const handleAuthorizeCopilot = (incidentId: string, updatedText: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === incidentId && c.copilotDraft
          ? {
              ...c,
              copilotDraft: {
                ...c.copilotDraft,
                fullText: updatedText,
                authorized: true,
              },
            }
          : c
      )
    );
    showToast(`✓ Autonomous draft authorized & dispatched to Finova Global VP of Eng`);
  };

  // Escalate to Tier 3
  const handleConfirmEscalate = (incidentId: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === incidentId
          ? {
              ...c,
              isEscalated: true,
            }
          : c
      )
    );
    showToast(`✓ Incident ${incidentId} escalated to Tier 3 Architecture Cell & On-Call Paged`);
  };

  // Override Legal Hold on #88371
  const handleOverrideHold = (incidentId: string, reason: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === incidentId
          ? {
              ...c,
              status: 'investigating',
              holdReason: undefined,
              slaStatusText: 'OVERRIDDEN: ACTIVE',
            }
          : c
      )
    );
    showToast(`✓ Legal Hold overridden on ${incidentId}: Renewal processing resumed`);
  };

  // Broadcast sent
  const handleBroadcastSent = (summary: string) => {
    showToast(`🚨 Executive Emergency Broadcast sent to all on-call incident commanders`);
  };

  // Refresh Salesforce Sync
  const handleRefreshSync = () => {
    setMetrics((prev) => ({
      ...prev,
      sfdcSyncSecondsAgo: 0,
      sfdcLivePercent: 99.9,
    }));
    showToast(`⚡ SFDC Live Sync refreshed: All 14 cases aligned with CRM`);
  };

  // Ingest Simulated P1 incident to test dynamic pressure needle
  const handleTriggerTestIncident = () => {
    const isCurrentlyHigh = metrics.psiPressure > 88;
    const newPsi = isCurrentlyHigh ? 84 : 93;
    setMetrics((prev) => ({
      ...prev,
      psiPressure: newPsi,
      activeLoad: isCurrentlyHigh ? 14 : 15,
      criticalP1: isCurrentlyHigh ? 3 : 4,
    }));
    showToast(
      isCurrentlyHigh
        ? '✓ Simulated load normalising. SLA pressure returned to 84% PSI'
        : '⚠️ High-intensity test load injected! SLA pressure needle surged to 93% PSI'
    );
  };

  return (
    <div className="bg-[#10131b] text-[#e0e2ed] min-h-screen flex flex-col font-['Hanken_Grotesk'] antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] px-4 py-2.5 rounded-lg bg-[#1c2027] border border-[#4edea3] text-[#4edea3] shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-['JetBrains_Mono'] text-[12px] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fixed Executive Top Header */}
      <Header
        currentTab={currentTab}
        sfdcLivePercent={metrics.sfdcLivePercent}
        onRefreshSync={handleRefreshSync}
        onProfileClick={() => showToast('Operator: Chief Incident Director • Auth Token: Valid')}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 bg-[#10131b]">
        {currentTab === 'cases' && (
          <CasesView
            cases={cases}
            metrics={metrics}
            onOpenCopilot={(inc) => setCopilotIncident(inc)}
            onOpenCall={(inc) => setCallIncident(inc)}
            onOpenEscalate={(inc) => setEscalateIncident(inc)}
            onOpenOverrideHold={(inc) => setOverrideHoldIncident(inc)}
            onOpenBroadcast={() => setIsBroadcastOpen(true)}
          />
        )}

        {currentTab === 'cockpit' && (
          <CockpitView
            metrics={metrics}
            cases={cases}
            onTriggerTestIncident={handleTriggerTestIncident}
            onNavigateToCases={() => setCurrentTab('cases')}
          />
        )}

        {currentTab === 'pipeline' && (
          <PipelineView
            cases={cases}
            onOpenCall={(inc) => setCallIncident(inc)}
            onOpenCopilot={(inc) => setCopilotIncident(inc)}
          />
        )}

        {currentTab === 'reports' && <ReportsView metrics={metrics} />}
      </main>

      {/* Modals & Overlays */}
      {copilotIncident && (
        <CopilotModal
          incident={copilotIncident}
          isOpen={!!copilotIncident}
          onClose={() => setCopilotIncident(null)}
          onAuthorize={handleAuthorizeCopilot}
        />
      )}

      {callIncident && (
        <CallModal
          isOpen={!!callIncident}
          onClose={() => setCallIncident(null)}
          targetName={callIncident.owner?.name || 'Sarah Jenkins'}
          targetRole={callIncident.owner?.role || 'Enterprise Account Director'}
          account={callIncident.account}
        />
      )}

      {escalateIncident && (
        <EscalateModal
          incident={escalateIncident}
          isOpen={!!escalateIncident}
          onClose={() => setEscalateIncident(null)}
          onConfirm={handleConfirmEscalate}
        />
      )}

      {overrideHoldIncident && (
        <OverrideHoldModal
          incident={overrideHoldIncident}
          isOpen={!!overrideHoldIncident}
          onClose={() => setOverrideHoldIncident(null)}
          onOverrideConfirm={handleOverrideHold}
        />
      )}

      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        onBroadcastSent={handleBroadcastSent}
      />

      {/* Fixed Bottom Navigation Dock */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        criticalCasesCount={metrics.criticalP1}
      />
    </div>
  );
}

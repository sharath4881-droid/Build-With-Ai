export type Priority = 'P1' | 'P2' | 'P3';
export type FilterType = 'all' | 'p1' | 'esc' | 'cust';
export type TabType = 'cockpit' | 'pipeline' | 'cases' | 'reports';

export interface IncidentCase {
  id: string;
  caseNumber: string;
  title: string;
  account: string;
  accountTier: string;
  contractValue?: string;
  priority: Priority;
  status: 'critical' | 'on_track' | 'stalled' | 'investigating' | 'resolved';
  category: 'sso' | 'api' | 'billing' | 'database' | 'infra' | 'security';
  isEscalated?: boolean;
  isCustomerImpacting?: boolean;
  slaRemainingSeconds: number; // For countdown
  slaTotalSeconds: number;
  slaStatusText: string;
  copilotDraft?: {
    id: string;
    title: string;
    preview: string;
    fullText: string;
    targetRecipient: string;
    slaCreditEstimate: string;
    authorized: boolean;
  };
  owner?: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  holdReason?: string;
  assignedDesk?: string;
  sfdcSyncAgo: string;
  createdAgo: string;
}

export interface SystemMetrics {
  activeLoad: number;
  criticalP1: number;
  slaAdherence: number;
  mttrMinutes: number;
  queuePeakChange: number;
  sfdcLivePercent: number;
  sfdcSyncSecondsAgo: number;
  psiPressure: number;
  revenueAtRisk: string;
}

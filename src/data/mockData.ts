import { IncidentCase, SystemMetrics } from '../types';

export const ASSET_URLS = {
  emblem: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-TVZHL7IGSXHGNj_vggKu8d5sKBPFjkhrRxO_EhFm1IaMj2VfzSbySKxfH0jFYKIsbxvbcRCLwNi7GmgmS6uUz8RzsZ65YD6MV6h0hqXRPI_4TdH5HDg7lvtsWRQem2EogLBdixm3-wNAs93HvckOBj8qF1ZEhsUUgHLb-sSbeHuxcElh39DOm1rHUrsREanDbQ5YPz2PMiUBIbKe1U4wDciDdLvBdXQiMnzKPqB0fFhnbGRC6AQYGg',
  userProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyrh31wmcY4aS7qJMJPOEqn4m4AiTrsC9Z243H66JN5UXYFC_IpYEf6BvFrhYqn7RTkZqP3U2iiwyrl6xoCRyI-AybCtWpOVtiIDtFR5Vy_FJV_jogFEQTJrzfikgx_tTaP-2HNNTKYvgoHioYKaNWPYwxWiRtXjEoTr4PSV-N0LJvbs4mIh5MiUdyapBIeUKeabwa-VscEdy9GeWfScc0Wu7OUvAK2-BU4BIGPUK6AC_ZVgjLiIzC7Q',
  sarahJenkins: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMynR6t0brKDsO4ychHGbXb4b6QLmWhP6_AQ387uVdbcfiyy_LZIIvQFIb2mHPRqu--exx3s1Dhhi9E8O0jJDf0pqj3d0GyvrdOj5xORSRE7J78DdKUwo_OsdDVVkNi8_pGwnZXXDNHxI4REzOLegU3lIYOILUkHok7V-oPF90KDNOILWSLMvK8AU1tJj9rQ1aoytWTC_E_F9LKjpo4W8nXO_btY4nP26bIBVZpJpTOR9q8b9MnNvieA',
  davidMiller: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
};

export const INITIAL_METRICS: SystemMetrics = {
  activeLoad: 14,
  criticalP1: 3,
  slaAdherence: 98.4,
  mttrMinutes: 38,
  queuePeakChange: 18,
  sfdcLivePercent: 99.8,
  sfdcSyncSecondsAgo: 14,
  psiPressure: 84,
  revenueAtRisk: '$4.82M',
};

export const INITIAL_CASES: IncidentCase[] = [
  // CASE 1: P1 Critical SSO Outage (Expanded card from screenshot)
  {
    id: 'case-88412',
    caseNumber: '#88412',
    title: 'Enterprise SSO Outage',
    account: 'Finova Global',
    accountTier: 'Tier 1 Enterprise Tier',
    contractValue: '$2.2M ARR',
    priority: 'P1',
    status: 'critical',
    category: 'sso',
    isEscalated: true,
    isCustomerImpacting: true,
    slaRemainingSeconds: 4460, // 01:14:20
    slaTotalSeconds: 14400,
    slaStatusText: 'SLA COUNTDOWN',
    copilotDraft: {
      id: 'draft-88412',
      title: 'AUTONOMOUS COPILOT // DISPATCH DRAFT',
      preview: 'Auto-drafted root-cause acknowledgment & SLA credit forecast prepped for VP of Eng (Finova). Awaiting authorization.',
      fullText: `EXECUTIVE INCIDENT UPDATE [P1 - 88412]
TO: Dr. Elena Rostova, VP of Engineering (Finova Global)
CC: PulseForce Mission Critical Ops, Account Lead Sarah Jenkins

SYNOPSIS:
At 22:48 UTC, telemetry identified an auth token rotation handshake anomaly across Finova's dedicated IdP SAML federation gateway. Active directory sync stalled for ~14% of global active sessions.

IMPACT ASSESSMENT:
- Affected Users: 1,820 SSO sessions in EU-West & US-East
- Revenue Operations: Internal trading dashboard access momentarily degraded
- SLA Adherence Target: 99.9% (Current incident exposure: 12m)
- Forecasted SLA Credit: $14,200 contractual credit credit-memo provisioned

MITIGATION & ETA:
Tier 3 Auth Core leads have deployed a secondary cert validator failover route. Traffic normalisation confirmed at 94%. Full telemetry clearance estimated in 24 minutes.`,
      targetRecipient: 'Elena Rostova (VP Eng, Finova)',
      slaCreditEstimate: '$14,200',
      authorized: false,
    },
    owner: {
      name: 'Sarah Jenkins',
      role: 'Enterprise Account Director',
      avatarUrl: ASSET_URLS.sarahJenkins,
    },
    sfdcSyncAgo: '14s AGO',
    createdAgo: '46m ago',
  },

  // CASE 2: P2 High API Limit Breach (Stable Radar Card from screenshot)
  {
    id: 'case-88390',
    caseNumber: '#88390',
    title: 'API Rate Limit Breach',
    account: 'HyperFlow Inc.',
    accountTier: '120k req/min Spike',
    contractValue: '$890k ARR',
    priority: 'P2',
    status: 'on_track',
    category: 'api',
    isEscalated: false,
    isCustomerImpacting: true,
    slaRemainingSeconds: 16335, // 04:32:15
    slaTotalSeconds: 28800,
    slaStatusText: 'SLA ON TRACK',
    owner: {
      name: 'Sarah Jenkins',
      role: 'Enterprise Account Director',
      avatarUrl: ASSET_URLS.sarahJenkins,
    },
    sfdcSyncAgo: '2M AGO',
    createdAgo: '1h 14m ago',
  },

  // CASE 3: P1 Escalated Billing Discrepancy (Crosshatch Stalled Strip from screenshot)
  {
    id: 'case-88371',
    caseNumber: '#88371',
    title: 'Billing Discrepancy (Renewal Blocked)',
    account: 'DataCore Enterprises',
    accountTier: '$1.4M Contract',
    contractValue: '$1.4M ARR',
    priority: 'P1',
    status: 'stalled',
    category: 'billing',
    isEscalated: true,
    isCustomerImpacting: false,
    slaRemainingSeconds: 1820,
    slaTotalSeconds: 14400,
    slaStatusText: 'STATUS STALLED',
    holdReason: 'PAUSED: LEGAL',
    assignedDesk: 'Finance Operations Desk',
    sfdcSyncAgo: '1m ago',
    createdAgo: '2h 10m ago',
  },

  // CASE 4: P1 Critical Database Deadlock
  {
    id: 'case-88405',
    caseNumber: '#88405',
    title: 'PostgreSQL Read-Replica Lock Contention',
    account: 'Apex FinTech Global',
    accountTier: 'Tier 1 Enterprise Tier',
    contractValue: '$3.1M ARR',
    priority: 'P1',
    status: 'critical',
    category: 'database',
    isEscalated: false,
    isCustomerImpacting: true,
    slaRemainingSeconds: 2840,
    slaTotalSeconds: 14400,
    slaStatusText: 'SLA COUNTDOWN',
    owner: {
      name: 'David Miller',
      role: 'Staff SRE Incident Lead',
      avatarUrl: ASSET_URLS.sarahJenkins,
    },
    sfdcSyncAgo: '35s ago',
    createdAgo: '32m ago',
  },

  // CASE 5: P2 Webhook Latency Spike
  {
    id: 'case-88399',
    caseNumber: '#88399',
    title: 'Webhook Egress Queue Latency (+340ms)',
    account: 'OmniStream Media',
    accountTier: 'Tier 2 Growth',
    contractValue: '$450k ARR',
    priority: 'P2',
    status: 'investigating',
    category: 'infra',
    isEscalated: false,
    isCustomerImpacting: true,
    slaRemainingSeconds: 9420,
    slaTotalSeconds: 28800,
    slaStatusText: 'SLA ON TRACK',
    sfdcSyncAgo: '3m ago',
    createdAgo: '1h 35m ago',
  },

  // CASE 6: P2 SAML Cert Expiring
  {
    id: 'case-88382',
    caseNumber: '#88382',
    title: 'Identity Certificate Key Rotation Failure',
    account: 'Vanguard Health Systems',
    accountTier: 'Tier 1 Enterprise Tier',
    contractValue: '$1.8M ARR',
    priority: 'P2',
    status: 'stalled',
    category: 'sso',
    isEscalated: true,
    isCustomerImpacting: true,
    slaRemainingSeconds: 6120,
    slaTotalSeconds: 28800,
    slaStatusText: 'STATUS STALLED',
    holdReason: 'SECURITY GATE',
    assignedDesk: 'IAM Architecture Cell',
    sfdcSyncAgo: '5m ago',
    createdAgo: '2h 45m ago',
  },

  // CASE 7: P3 Tenant Partition Shard Rebalance
  {
    id: 'case-88365',
    caseNumber: '#88365',
    title: 'Tenant Shard Rebalance Throttling',
    account: 'AeroDynamics Aerospace',
    accountTier: 'Tier 1 Enterprise Tier',
    contractValue: '$1.1M ARR',
    priority: 'P3',
    status: 'on_track',
    category: 'infra',
    isEscalated: false,
    isCustomerImpacting: true,
    slaRemainingSeconds: 24500,
    slaTotalSeconds: 86400,
    slaStatusText: 'SLA ON TRACK',
    sfdcSyncAgo: '7m ago',
    createdAgo: '3h 12m ago',
  },

  // CASE 8: P3 SOC2 Audit Payload Validation
  {
    id: 'case-88360',
    caseNumber: '#88360',
    title: 'Compliance Audit Ingestion Stalled',
    account: 'Krypton Cyber Defense',
    accountTier: 'Tier 2 Enterprise',
    contractValue: '$620k ARR',
    priority: 'P3',
    status: 'investigating',
    category: 'security',
    isEscalated: false,
    isCustomerImpacting: false,
    slaRemainingSeconds: 31200,
    slaTotalSeconds: 86400,
    slaStatusText: 'SLA ON TRACK',
    sfdcSyncAgo: '12m ago',
    createdAgo: '3h 40m ago',
  },

  // CASE 9: P2 Escalated Quota Disconnect
  {
    id: 'case-88355',
    caseNumber: '#88355',
    title: 'Enterprise Billing Gateway Sync Desync',
    account: 'Starlight Retailers',
    accountTier: 'Tier 1 Enterprise Tier',
    contractValue: '$980k ARR',
    priority: 'P2',
    status: 'stalled',
    category: 'billing',
    isEscalated: true,
    isCustomerImpacting: false,
    slaRemainingSeconds: 4300,
    slaTotalSeconds: 28800,
    slaStatusText: 'STATUS STALLED',
    holdReason: 'AUDIT REVIEW',
    assignedDesk: 'Finance Ops Lead',
    sfdcSyncAgo: '14m ago',
    createdAgo: '4h 05m ago',
  },

  // CASE 10: P2 CDN Edge Cache Invalidation Delay
  {
    id: 'case-88350',
    caseNumber: '#88350',
    title: 'Edge Invalidation Purge Latency (>4s)',
    account: 'Nexus Media Networks',
    accountTier: 'Tier 2 Growth',
    contractValue: '$340k ARR',
    priority: 'P2',
    status: 'on_track',
    category: 'infra',
    isEscalated: false,
    isCustomerImpacting: true,
    slaRemainingSeconds: 14800,
    slaTotalSeconds: 28800,
    slaStatusText: 'SLA ON TRACK',
    sfdcSyncAgo: '18m ago',
    createdAgo: '4h 30m ago',
  },

  // CASE 11: P3 Ingestion Stream Lag
  {
    id: 'case-88344',
    caseNumber: '#88344',
    title: 'Kafka Consumer Group Rebalance Jitter',
    account: 'Orbital Logistics',
    accountTier: 'Tier 2 Growth',
    contractValue: '$410k ARR',
    priority: 'P3',
    status: 'on_track',
    category: 'infra',
    isEscalated: false,
    isCustomerImpacting: false,
    slaRemainingSeconds: 42100,
    slaTotalSeconds: 86400,
    slaStatusText: 'SLA ON TRACK',
    sfdcSyncAgo: '21m ago',
    createdAgo: '5h 10m ago',
  },

  // CASE 12: P3 Webhook Security Signature Mismatch
  {
    id: 'case-88339',
    caseNumber: '#88339',
    title: 'HMAC SHA256 Signature Verify Mismatch',
    account: 'Quantum Core Systems',
    accountTier: 'Tier 3 Starter',
    contractValue: '$180k ARR',
    priority: 'P3',
    status: 'resolved',
    category: 'security',
    isEscalated: false,
    isCustomerImpacting: false,
    slaRemainingSeconds: 51200,
    slaTotalSeconds: 86400,
    slaStatusText: 'RESOLVED',
    sfdcSyncAgo: '25m ago',
    createdAgo: '5h 45m ago',
  },

  // CASE 13: P3 SFDC Token Refresh Rate Limits
  {
    id: 'case-88330',
    caseNumber: '#88330',
    title: 'OAuth 2.0 Token Refresh Backoff Event',
    account: 'Horizon Telematics',
    accountTier: 'Tier 2 Growth',
    contractValue: '$520k ARR',
    priority: 'P3',
    status: 'on_track',
    category: 'api',
    isEscalated: false,
    isCustomerImpacting: false,
    slaRemainingSeconds: 58000,
    slaTotalSeconds: 86400,
    slaStatusText: 'SLA ON TRACK',
    sfdcSyncAgo: '29m ago',
    createdAgo: '6h 20m ago',
  },

  // CASE 14: P3 Bulk Data Export Staging Lag
  {
    id: 'case-88321',
    caseNumber: '#88321',
    title: 'Parquet S3 Cold Storage Archive Delay',
    account: 'Zeta Financial Services',
    accountTier: 'Tier 1 Enterprise Tier',
    contractValue: '$1.6M ARR',
    priority: 'P3',
    status: 'on_track',
    category: 'infra',
    isEscalated: false,
    isCustomerImpacting: false,
    slaRemainingSeconds: 68400,
    slaTotalSeconds: 86400,
    slaStatusText: 'SLA ON TRACK',
    sfdcSyncAgo: '34m ago',
    createdAgo: '7h 15m ago',
  },
];

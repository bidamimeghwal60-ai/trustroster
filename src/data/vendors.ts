import { Vendor } from '../types/vendor';

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'supabase',
    name: 'Supabase',
    slug: 'supabase',
    tagline: 'Open source Firebase alternative with Postgres database',
    description: 'Managed PostgreSQL database platform with real-time subscriptions, Row Level Security, dedicated compute, Vault secrets, and point-in-time recovery.',
    category: 'Databases & Storage',
    brandColor: '#3ECF8E',
    logoBg: '#0f382a',
    logoTextColor: '#3ECF8E',
    logoInitial: 'S',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'Self-serve HIPAA Business Associate Agreement on Pro ($25/mo), Team, and Enterprise tiers',
        verifiedAt: 'August 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Security, Availability, and Confidentiality trust service criteria verified',
        verifiedAt: 'October 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO/IEC 27001:2022 certified Information Security Management System',
        verifiedAt: 'July 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Standard Contractual Clauses (SCC) and self-serve Data Processing Addendum (DPA)',
        verifiedAt: 'September 2025'
      }
    ],
    auditorName: 'Schellman & Company',
    lastAuditDate: 'October 2025',
    reportPeriod: 'November 1, 2024 – October 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Freemium / Usage-based',
      priceNote: 'Free tier available · BAA on Team ($599/mo) / Pro ($25/mo)',
      isSelfServe: true,
      baaIncluded: true,
      details: 'Freemium tier available. Self-serve HIPAA BAA can be executed electronically directly in workspace settings on Team & Enterprise plans.'
    },
    trustCenterUrl: 'https://trust.supabase.com',
    auditScopeSummary: 'Full scope evaluation of Supabase Managed Cloud including Postgres instances, Supabase Auth, Storage buckets, Edge Functions, and management console.',
    securityPackDocuments: [
      {
        id: 'supabase-soc2-type2',
        title: 'SOC 2 Type II Audit Report (2025)',
        description: 'Comprehensive 68-page auditor report covering Security, Availability, and Confidentiality.',
        fileType: 'PDF (3.4 MB)',
        requiresNDA: true
      },
      {
        id: 'supabase-hipaa-baa',
        title: 'Standard HIPAA BAA Agreement Template',
        description: 'Standard business associate agreement outlining covered entity and business associate safeguards.',
        fileType: 'PDF (340 KB)',
        requiresNDA: false
      },
      {
        id: 'supabase-pentest-summary',
        title: 'Annual Third-Party Penetration Test Attestation',
        description: 'Executive summary by Cure53 verifying no critical or high severity vulnerabilities.',
        fileType: 'PDF (820 KB)',
        requiresNDA: true
      },
      {
        id: 'supabase-iso-cert',
        title: 'ISO/IEC 27001:2022 Certificate',
        description: 'Official registration certificate issued by accredited registrar.',
        fileType: 'PDF (210 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['Global (AWS regions worldwide)'],
    encryptionStandard: 'AES-256 at rest, TLS 1.3 in transit',
    penTestFrequency: 'Annual third-party pen tests by Cure53',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001:2022'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Row Level Security (RLS)', 'Point-in-time recovery', 'dedicated compute', 'Vault secrets']
  },
  {
    id: 'postmark',
    name: 'Postmark',
    slug: 'postmark',
    tagline: 'Reliable transactional email delivery for web applications',
    description: 'High-deliverability transactional email service focused on lightning-fast delivery times, detailed message tracking, and high security.',
    category: 'Email & Messaging',
    brandColor: '#FCCC00',
    logoBg: '#3a3310',
    logoTextColor: '#FCCC00',
    logoInitial: 'P',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'Executes BAA with zero minimum spend threshold on standard subscription plans',
        verifiedAt: 'June 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated for Security, Availability, and Confidentiality',
        verifiedAt: 'September 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'EU-US Data Privacy Framework certified with self-serve DPA',
        verifiedAt: 'May 2025'
      }
    ],
    auditorName: 'A-LIGN',
    lastAuditDate: 'September 2025',
    reportPeriod: 'September 1, 2024 – August 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Any Paid Plan',
      priceNote: '$15/mo (starts at 10k emails)',
      isSelfServe: true,
      baaIncluded: true,
      details: 'Postmark allows all customers on paid plans to sign a Business Associate Agreement directly in the web account settings with immediate electronic countersignature.'
    },
    trustCenterUrl: 'https://postmarkapp.com/support/article/1172-hipaa-compliance',
    auditScopeSummary: 'Covers Postmark mail processing infrastructure, API servers, web application dashboard, delivery logs, and webhook systems.',
    securityPackDocuments: [
      {
        id: 'postmark-soc2-type2',
        title: 'SOC 2 Type II Examination Report',
        description: 'Independent service auditor evaluation conducted by A-LIGN.',
        fileType: 'PDF (2.8 MB)',
        requiresNDA: true
      },
      {
        id: 'postmark-baa-doc',
        title: 'ActivePost HIPAA Business Associate Agreement',
        description: 'Standard BAA terms covering PHI handling and encryption mandates.',
        fileType: 'PDF (280 KB)',
        requiresNDA: false
      },
      {
        id: 'postmark-dpa',
        title: 'EU/UK Data Processing Addendum',
        description: 'Incorporates standard contractual clauses for transatlantic data transfers.',
        fileType: 'PDF (510 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US (Virginia, Ohio)', 'EU (Frankfurt - data processing option)'],
    encryptionStandard: 'Opportunistic & Enforced TLS 1.2+ · AES-256 backup storage',
    penTestFrequency: 'Annual independent grey-box penetration testing',
    headquarters: 'Chicago, IL, USA (ActiveCampaign)',
    soc2Type: 'Type II',
    isoStandards: [],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['DMARC/DKIM auto-validation', '100% SLA uptime guarantee', '45-day message history retention', 'Encrypted webhook feeds']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    slug: 'vercel',
    tagline: 'Frontend cloud platform for Next.js, React, and serverless compute',
    description: 'Managed deployment and global edge network platform designed for frontend frameworks, serverless APIs, and team collaboration.',
    category: 'Cloud & Hosting',
    brandColor: '#000000',
    logoBg: '#1e293b',
    logoTextColor: '#f8fafc',
    logoInitial: '▲',
    complianceBadges: [
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated under AICPA criteria for Security, Availability, and Confidentiality',
        verifiedAt: 'November 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO/IEC 27001:2013 & ISO 27701 privacy extension certified',
        verifiedAt: 'October 2025'
      },
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'BAA available for customers on the Vercel Enterprise tier',
        verifiedAt: 'August 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Comprehensive Data Processing Addendum with EU edge region pinning',
        verifiedAt: 'December 2025'
      }
    ],
    auditorName: 'Coalfire',
    lastAuditDate: 'November 2025',
    reportPeriod: 'December 1, 2024 – November 30, 2025',
    minimumPlanForBAA: {
      tierName: 'Enterprise Plan',
      priceNote: 'Custom annual contract (~$15,000+/yr)',
      isSelfServe: false,
      baaIncluded: true,
      details: 'HIPAA BAA execution requires negotiation with Vercel Enterprise sales team. Pro plans ($20/seat) do NOT include HIPAA BAA eligibility.'
    },
    trustCenterUrl: 'https://security.vercel.com',
    auditScopeSummary: 'Evaluation of Vercel Edge Network, build pipeline infrastructure, Serverless Functions, Vercel Blob/KV storage, and dashboard access management.',
    securityPackDocuments: [
      {
        id: 'vercel-soc2-type2',
        title: 'Vercel SOC 2 Type II Report (Coalfire)',
        description: 'Complete audit assessment covering all core systems.',
        fileType: 'PDF (4.2 MB)',
        requiresNDA: true
      },
      {
        id: 'vercel-iso-cert',
        title: 'ISO 27001 & ISO 27701 Certificates',
        description: 'Official registrar certificate copies.',
        fileType: 'PDF (450 KB)',
        requiresNDA: false
      },
      {
        id: 'vercel-whitepaper',
        title: 'HIPAA on Vercel Architecture Blueprint',
        description: 'Technical guidance on building HIPAA-compliant healthcare applications.',
        fileType: 'PDF (1.2 MB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['Global Edge Network (100+ cities)', 'AWS US-East-1', 'AWS EU-Central-1'],
    encryptionStandard: 'TLS 1.3 enforced · AES-GCM 256 storage encryption',
    penTestFrequency: 'Bi-annual network and application level penetration audits',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001:2013', 'ISO 27701:2019'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Global Edge Network', 'Firewall / DDoS mitigation', 'Serverless compute isolation', 'Secret management']
  },
  {
    id: 'datadog',
    name: 'Datadog',
    slug: 'datadog',
    tagline: 'Cloud-scale observability, APM, and real-time security monitoring',
    description: 'Unified monitoring and security platform for cloud applications, servers, databases, containers, and network telemetry.',
    category: 'Observability & Security',
    brandColor: '#632CA6',
    logoBg: '#2a1647',
    logoTextColor: '#b78af7',
    logoInitial: 'D',
    complianceBadges: [
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated for Security, Availability, Processing Integrity, and Confidentiality',
        verifiedAt: 'November 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO 27001, ISO 27017 (Cloud), and ISO 27018 (PII in Cloud)',
        verifiedAt: 'October 2025'
      },
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'BAA executed for Pro and Enterprise accounts with Log/APM scrubbing',
        verifiedAt: 'September 2025'
      },
      {
        type: 'PCIDSS',
        label: 'PCI-DSS',
        status: 'Certified',
        details: 'PCI-DSS Level 1 compliant log management and monitoring controls',
        verifiedAt: 'August 2025'
      },
      {
        type: 'FedRAMP',
        label: 'FedRAMP Moderate',
        status: 'Certified',
        details: 'FedRAMP Moderate Impact authorization on dedicated gov environment',
        verifiedAt: 'May 2025'
      }
    ],
    auditorName: 'Ernst & Young LLP',
    lastAuditDate: 'November 2025',
    reportPeriod: 'November 1, 2024 – October 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Usage-based / Enterprise',
      priceNote: '$15/host/mo usage-based + HIPAA Add-on',
      isSelfServe: false,
      baaIncluded: true,
      details: 'Usage-based pricing with Enterprise BAA available upon request through account representative with sensitive data scanner activation.'
    },
    trustCenterUrl: 'https://trust.datadoghq.com',
    auditScopeSummary: 'Full Datadog multi-tenant cloud platform across AWS, Azure, and Google Cloud hosting regions, encompassing APM, Logs, and Infrastructure monitoring.',
    securityPackDocuments: [
      {
        id: 'datadog-soc2-type2',
        title: 'SOC 2 Type II Audit Report (EY)',
        description: 'Comprehensive annual auditor report including SOC 3 public summary.',
        fileType: 'PDF (5.1 MB)',
        requiresNDA: true
      },
      {
        id: 'datadog-soc3-public',
        title: 'Public SOC 3 Report',
        description: 'General distribution assurance report.',
        fileType: 'PDF (750 KB)',
        requiresNDA: false
      },
      {
        id: 'datadog-fedramp-auth',
        title: 'FedRAMP Moderate ATO Letter',
        description: 'Agency Authorization to Operate verification documentation.',
        fileType: 'PDF (320 KB)',
        requiresNDA: true
      }
    ],
    dataResidency: ['US', 'EU', 'Japan'],
    encryptionStandard: 'AES-256, TLS 1.2+',
    penTestFrequency: 'Continuous testing by NCC Group & Bishop Fox',
    headquarters: 'New York, NY, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001', 'ISO 27017', 'ISO 27018'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Cloud SIEM', 'Audit Trail monitoring', 'sensitive data scanner', 'granular RBAC']
  },
  {
    id: 'okta',
    name: 'Okta',
    slug: 'okta',
    tagline: 'Enterprise identity, single sign-on (SSO), and lifecycle management',
    description: 'Enterprise workforce and customer identity cloud supporting SAML/SSO, adaptive multi-factor authentication, automated lifecycle management, and detailed audit logs.',
    category: 'Auth & Identity',
    brandColor: '#00297A',
    logoBg: '#081735',
    logoTextColor: '#38bdf8',
    logoInitial: 'O',
    complianceBadges: [
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated for Security, Availability, and Confidentiality across all cells',
        verifiedAt: 'November 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO/IEC 27001:2013, ISO 27017, and ISO 27018 cloud privacy certified',
        verifiedAt: 'October 2025'
      },
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'Executes HIPAA Business Associate Agreement on Enterprise subscription agreements',
        verifiedAt: 'September 2025'
      },
      {
        type: 'FedRAMP',
        label: 'FedRAMP Moderate',
        status: 'Certified',
        details: 'FedRAMP Moderate & DoD IL4 authorization for government workloads',
        verifiedAt: 'May 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Article 28 Data Processing Addendum with EU data boundary isolation',
        verifiedAt: 'July 2025'
      }
    ],
    auditorName: 'Schellman & Company',
    lastAuditDate: 'November 2025',
    reportPeriod: 'November 1, 2024 – October 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Enterprise Quote / Paid',
      priceNote: 'Custom Enterprise Contract',
      isSelfServe: false,
      baaIncluded: true,
      details: 'HIPAA BAA execution requires an Okta Enterprise Subscription agreement with HIPAA Cell isolation and enhanced audit logging.'
    },
    trustCenterUrl: 'https://trust.okta.com',
    auditScopeSummary: 'Full scope evaluation of Okta Identity Cloud, Workforce Identity, Customer Identity (CIAM), Universal Directory, and Admin Management Console.',
    securityPackDocuments: [
      {
        id: 'okta-soc2-type2',
        title: 'Okta SOC 2 Type II Audit Report (Schellman)',
        description: 'Comprehensive auditor examination covering all production cells.',
        fileType: 'PDF (4.8 MB)',
        requiresNDA: true
      },
      {
        id: 'okta-hipaa-attestation',
        title: 'HIPAA Compliance Attestation Letter',
        description: 'Independent verification of HIPAA Security and Privacy Rule controls.',
        fileType: 'PDF (410 KB)',
        requiresNDA: true
      },
      {
        id: 'okta-iso-cert',
        title: 'ISO 27001 / 27017 / 27018 Certificate Package',
        description: 'Registrar certificate bundle issued by ANAB accredited body.',
        fileType: 'PDF (520 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US', 'EU', 'APAC'],
    encryptionStandard: 'AES-256 at rest, TLS 1.3 in transit',
    penTestFrequency: 'Annual third-party pen tests by Schellman & NCC Group',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001', 'ISO 27017', 'ISO 27018'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['SAML/SSO', 'Multi-Factor Authentication', 'Lifecycle Management', 'Detailed Audit Logs']
  },
  {
    id: 'auth0',
    name: 'Auth0 by Okta',
    slug: 'auth0',
    tagline: 'Enterprise customer identity, SSO, and multi-factor authentication',
    description: 'Universal identity platform supporting OAuth 2.0, OpenID Connect, SAML single sign-on, passwordless auth, and adaptive MFA.',
    category: 'Auth & Identity',
    brandColor: '#EB5424',
    logoBg: '#3d160a',
    logoTextColor: '#EB5424',
    logoInitial: 'A',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'Executes BAA on Enterprise Private Cloud and dedicated deployments',
        verifiedAt: 'July 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'SOC 2 Type II report for both Public Cloud and Private Cloud environments',
        verifiedAt: 'October 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO 27001:2013 and ISO 27018 cloud privacy certification',
        verifiedAt: 'August 2025'
      },
      {
        type: 'PCIDSS',
        label: 'PCI-DSS',
        status: 'Certified',
        details: 'PCI DSS Level 1 Service Provider compliance for secure authentication',
        verifiedAt: 'September 2025'
      }
    ],
    auditorName: 'Schellman & Company',
    lastAuditDate: 'October 2025',
    reportPeriod: 'October 1, 2024 – September 30, 2025',
    minimumPlanForBAA: {
      tierName: 'Enterprise Plan',
      priceNote: 'Custom quote (~$24,000/yr)',
      isSelfServe: false,
      baaIncluded: true,
      details: 'HIPAA BAA is restricted to Auth0 Enterprise contracts. Not available on self-serve B2C ($35/mo) or B2B Essentials plans.'
    },
    trustCenterUrl: 'https://trust.okta.com/compliance',
    auditScopeSummary: 'Auth0 identity engine, token issuance microservices, administrative dashboard, user management database, and custom authentication rule engines.',
    securityPackDocuments: [
      {
        id: 'auth0-soc2-type2',
        title: 'Auth0 SOC 2 Type II Annual Audit Report',
        description: 'Schellman audit report covering full identity infrastructure.',
        fileType: 'PDF (3.9 MB)',
        requiresNDA: true
      },
      {
        id: 'auth0-hipaa-attestation',
        title: 'Third-Party HIPAA Security & Privacy Assessment',
        description: 'Independent attestation confirming compliance with 45 CFR Part 160 & 164.',
        fileType: 'PDF (880 KB)',
        requiresNDA: true
      },
      {
        id: 'auth0-iso27001-cert',
        title: 'ISO 27001 / 27018 Certificate Package',
        description: 'ANAB accredited management certificate.',
        fileType: 'PDF (420 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US (Oregon, Virginia)', 'EU (Frankfurt, Dublin)', 'Australia (Sydney)', 'Japan (Tokyo)'],
    encryptionStandard: 'AES-256 per-tenant key management · TLS 1.3 enforced',
    penTestFrequency: 'Annual third-party pen tests + private bug bounty program',
    headquarters: 'Bellevue, WA, USA (Okta)',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001', 'ISO 27018'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Universal Login', 'Anomaly detection & bot protection', 'Adaptive MFA', 'Custom database scripts']
  },
  {
    id: 'render',
    name: 'Render',
    slug: 'render',
    tagline: 'Modern cloud hosting for web apps, background workers, and PostgreSQL',
    description: 'Zero-configuration cloud application platform with instant Docker builds, managed Postgres, private networking, and autoscaling.',
    category: 'Cloud & Hosting',
    brandColor: '#46E3B7',
    logoBg: '#092d24',
    logoTextColor: '#46E3B7',
    logoInitial: 'R',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'Self-serve HIPAA compliance add-on on Organization plans',
        verifiedAt: 'August 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Security, Confidentiality, and Availability verified',
        verifiedAt: 'October 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'Certified under ISO/IEC 27001:2022',
        verifiedAt: 'July 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Standard Contractual Clauses & Data Processing Addendum included',
        verifiedAt: 'May 2025'
      }
    ],
    auditorName: 'Johanson Group LLP',
    lastAuditDate: 'October 2025',
    reportPeriod: 'October 1, 2024 – September 30, 2025',
    minimumPlanForBAA: {
      tierName: 'Organization Plan',
      priceNote: '$19/user/mo + $100/mo compliance add-on',
      isSelfServe: true,
      baaIncluded: true,
      details: 'Render provides self-serve BAA signing for teams on the Organization tier directly within workspace compliance settings.'
    },
    trustCenterUrl: 'https://render.com/docs/compliance',
    auditScopeSummary: 'Evaluation of Render build clusters, workload orchestration containers, persistent disks, managed Postgres, and Redis infrastructure.',
    securityPackDocuments: [
      {
        id: 'render-soc2-type2',
        title: 'Render SOC 2 Type II Compliance Report',
        description: 'Johanson Group audit examination report.',
        fileType: 'PDF (2.6 MB)',
        requiresNDA: true
      },
      {
        id: 'render-hipaa-guide',
        title: 'HIPAA Readiness & Architecture Guide',
        description: 'Details on environment isolation and encryption requirements.',
        fileType: 'PDF (650 KB)',
        requiresNDA: false
      },
      {
        id: 'render-iso-cert',
        title: 'ISO 27001:2022 Official Certificate',
        description: 'Accredited audit body certification.',
        fileType: 'PDF (310 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US (Oregon, Ohio)', 'EU (Frankfurt)', 'APAC (Singapore)'],
    encryptionStandard: 'AES-256 for all persistent disks · TLS 1.3 enforced',
    penTestFrequency: 'Annual penetration testing by offensive security specialists',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001:2022'],
    gdprDPAAvailable: true,
    featured: false,
    keyFeatures: ['Automated TLS certificates', 'Private networking', 'DDoS protection', 'Zero-downtime deploys']
  },
  {
    id: 'twilio',
    name: 'Twilio',
    slug: 'twilio',
    tagline: 'Global communications APIs for SMS, voice, video, and customer messaging',
    description: 'Programmable communications platform providing telecom connectivity, SMS gateways, WhatsApp business messaging, and WebRTC voice.',
    category: 'Email & Messaging',
    brandColor: '#F22F46',
    logoBg: '#380a10',
    logoTextColor: '#F22F46',
    logoInitial: 'T',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'BAA available for Programmable SMS, Voice, and SendGrid on Enterprise edition',
        verifiedAt: 'July 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Security, Availability, and Confidentiality trust principles',
        verifiedAt: 'November 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO 27001:2013 and ISO 27701 certification',
        verifiedAt: 'September 2025'
      },
      {
        type: 'PCIDSS',
        label: 'PCI-DSS',
        status: 'Certified',
        details: 'PCI-DSS Level 1 compliant for Voice Pay phone interactions',
        verifiedAt: 'August 2025'
      }
    ],
    auditorName: 'Coalfire',
    lastAuditDate: 'November 2025',
    reportPeriod: 'November 1, 2024 – October 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Enterprise Security Edition',
      priceNote: 'Custom enterprise commitment (~$10,000/yr min)',
      isSelfServe: false,
      baaIncluded: true,
      details: 'HIPAA eligibility requires enterprise contract with Twilio Security Add-on package and explicit activation of message redaction controls.'
    },
    trustCenterUrl: 'https://trust.twilio.com',
    auditScopeSummary: 'Comprehensive assessment of Twilio Voice, SMS, Verify, SendGrid, and Flex messaging pipelines and global telecommunication carrier integrations.',
    securityPackDocuments: [
      {
        id: 'twilio-soc2-type2',
        title: 'Twilio Services SOC 2 Type II Report',
        description: 'Coalfire evaluation covering all communication products.',
        fileType: 'PDF (4.8 MB)',
        requiresNDA: true
      },
      {
        id: 'twilio-hipaa-overview',
        title: 'Twilio HIPAA Implementation Whitepaper',
        description: 'Detailed compliance controls for PHI data in transmission.',
        fileType: 'PDF (1.1 MB)',
        requiresNDA: false
      },
      {
        id: 'twilio-iso-pack',
        title: 'ISO 27001 & ISO 27701 Certificates',
        description: 'Global registrar certification bundle.',
        fileType: 'PDF (550 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['Global Carrier Mesh', 'US Edge', 'EU Edge (Dublin, Frankfurt)', 'Australia Edge'],
    encryptionStandard: 'TLS 1.2/1.3 for API calls · SRTP for encrypted voice · AES-256 at rest',
    penTestFrequency: 'Continuous internal red-teaming + annual third-party pen tests',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001', 'ISO 27701'],
    gdprDPAAvailable: true,
    featured: false,
    keyFeatures: ['HIPAA eligible SMS', 'End-to-end event streams', 'Encrypted voice recordings', 'Carrier-grade compliance']
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    slug: 'snowflake',
    tagline: 'AI Data Cloud for secure analytical data warehousing and sharing',
    description: 'Multi-cloud data platform enabling data storage, processing, and analytic solutions with native governance and secure sharing.',
    category: 'Databases & Storage',
    brandColor: '#29B5E8',
    logoBg: '#092c3a',
    logoTextColor: '#29B5E8',
    logoInitial: '❄',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'BAA executed on Business Critical Edition with Tri-Secret Secure encryption',
        verifiedAt: 'October 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'SOC 1 Type II & SOC 2 Type II reports covering all cloud providers',
        verifiedAt: 'December 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO 27001:2013, ISO 27017, ISO 27018, and ISO 22301',
        verifiedAt: 'October 2025'
      },
      {
        type: 'FedRAMP',
        label: 'FedRAMP Moderate',
        status: 'Certified',
        details: 'FedRAMP Moderate and FedRAMP High Authorization on Gov regions',
        verifiedAt: 'June 2025'
      }
    ],
    auditorName: 'Schellman & Company',
    lastAuditDate: 'December 2025',
    reportPeriod: 'December 1, 2024 – November 30, 2025',
    minimumPlanForBAA: {
      tierName: 'Business Critical Edition',
      priceNote: 'Usage-based (~$4.00/credit vs $2.00 Standard)',
      isSelfServe: true,
      baaIncluded: true,
      details: 'Customers can provision a Business Critical account directly via self-serve credit card sign-up and sign the standard BAA electronically via Snowflake Community.'
    },
    trustCenterUrl: 'https://trust.snowflake.com',
    auditScopeSummary: 'Snowflake Virtual Warehouses, metadata cloud services, cross-cloud Snowgrid replication, and customer-managed encryption key interfaces.',
    securityPackDocuments: [
      {
        id: 'snowflake-soc2-type2',
        title: 'Snowflake SOC 2 Type II Examination Report',
        description: 'Schellman audit report encompassing AWS, Azure, and GCP deployments.',
        fileType: 'PDF (6.2 MB)',
        requiresNDA: true
      },
      {
        id: 'snowflake-hipaa-attestation',
        title: 'HIPAA & HITRUST CSF Certification Summary',
        description: 'Attestation of compliance with healthcare data protection standards.',
        fileType: 'PDF (950 KB)',
        requiresNDA: true
      },
      {
        id: 'snowflake-iso-bundle',
        title: 'ISO 27001, 27017, 27018 Certificates',
        description: 'Registrar certificates for cloud security controls.',
        fileType: 'PDF (620 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['40+ Global Cloud Regions across AWS, Azure, and Google Cloud'],
    encryptionStandard: 'Tri-Secret Secure (Customer Master Key + Snowflake Key) · AES-256',
    penTestFrequency: 'Quarterly independent penetration assessments',
    headquarters: 'Bozeman, MT, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001', 'ISO 27017', 'ISO 27018', 'ISO 22301'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Tri-Secret Secure key management', 'Dynamic data masking', 'Row access policies', 'Role-based access control (RBAC)']
  },
  {
    id: 'pinecone',
    name: 'Pinecone',
    slug: 'pinecone',
    tagline: 'Vector database for generative AI, semantic search, and RAG pipelines',
    description: 'Serverless vector database platform purpose-built for fast approximate nearest neighbor search over high-dimensional embeddings.',
    category: 'AI & Machine Learning',
    brandColor: '#000000',
    logoBg: '#1e293b',
    logoTextColor: '#38bdf8',
    logoInitial: '▲',
    complianceBadges: [
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated for Security and Availability trust services criteria',
        verifiedAt: 'October 2025'
      },
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'BAA available for healthcare AI workloads on Pinecone Enterprise',
        verifiedAt: 'July 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO/IEC 27001:2022 certified vector database infrastructure',
        verifiedAt: 'September 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Standard DPA with EU serverless region isolation',
        verifiedAt: 'June 2025'
      }
    ],
    auditorName: 'Presidio',
    lastAuditDate: 'October 2025',
    reportPeriod: 'October 1, 2024 – September 30, 2025',
    minimumPlanForBAA: {
      tierName: 'Enterprise Plan',
      priceNote: 'Custom annual contract (~$12,000/yr)',
      isSelfServe: false,
      baaIncluded: true,
      details: 'HIPAA BAA execution requires Enterprise tier with dedicated private endpoint and customer encryption keys.'
    },
    trustCenterUrl: 'https://trust.pinecone.io',
    auditScopeSummary: 'Pinecone Serverless index indexing engine, metadata filtering service, API endpoints, and AWS/GCP multi-tenant container isolation.',
    securityPackDocuments: [
      {
        id: 'pinecone-soc2-type2',
        title: 'Pinecone SOC 2 Type II Audit Report',
        description: 'Independent auditor evaluation by Presidio.',
        fileType: 'PDF (3.1 MB)',
        requiresNDA: true
      },
      {
        id: 'pinecone-hipaa-pack',
        title: 'HIPAA AI Architecture & BAA Pack',
        description: 'Guidance on vectorizing PHI and protecting embeddings.',
        fileType: 'PDF (780 KB)',
        requiresNDA: true
      }
    ],
    dataResidency: ['US (us-east-1, us-west-2)', 'EU (eu-west-1)', 'APAC (ap-southeast-1)'],
    encryptionStandard: 'AES-256 for vector storage · TLS 1.3 in transit',
    penTestFrequency: 'Annual third-party application penetration test',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001:2022'],
    gdprDPAAvailable: true,
    featured: false,
    keyFeatures: ['Approximate Nearest Neighbor (ANN)', 'Serverless metadata filtering', 'Hybrid sparse/dense search']
  },
  {
    id: 'openai',
    name: 'OpenAI',
    slug: 'openai',
    tagline: 'Frontier AI developer platform, GPT-4o models, and enterprise API infrastructure',
    description: 'Enterprise AI platform offering GPT-4o, embeddings, and reasoning models with Zero Data Retention, enterprise admin controls, and audit logging.',
    category: 'AI & Machine Learning',
    brandColor: '#10A37F',
    logoBg: '#04271e',
    logoTextColor: '#10A37F',
    logoInitial: '✦',
    complianceBadges: [
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated for Security, Availability, and Confidentiality trust services criteria',
        verifiedAt: 'December 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Standard Contractual Clauses (SCC) and automated Data Processing Addendum',
        verifiedAt: 'October 2025'
      },
      {
        type: 'CCPA',
        label: 'CCPA / CPRA',
        status: 'Compliant',
        details: 'Compliant with California Consumer Privacy Act and service provider provisions',
        verifiedAt: 'August 2025'
      },
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'Signs Business Associate Agreement for Enterprise customers with Zero Data Retention',
        verifiedAt: 'November 2025'
      }
    ],
    auditorName: 'A-LIGN',
    lastAuditDate: 'December 2025',
    reportPeriod: 'January 1, 2025 – December 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Usage-based / Enterprise',
      priceNote: 'Usage-based API · BAA on Enterprise agreement',
      isSelfServe: false,
      baaIncluded: true,
      details: 'Usage-based pay-as-you-go available for general API. HIPAA BAA execution requires OpenAI Enterprise contract with Zero Data Retention (ZDR) configuration.'
    },
    trustCenterUrl: 'https://trust.openai.com',
    auditScopeSummary: 'Full scope evaluation of OpenAI API inference clusters, embeddings service, fine-tuning infrastructure, data privacy boundaries, and customer access management.',
    securityPackDocuments: [
      {
        id: 'openai-soc2-type2',
        title: 'OpenAI SOC 2 Type II Audit Report (A-LIGN)',
        description: 'Comprehensive auditor examination covering API infrastructure and privacy controls.',
        fileType: 'PDF (3.7 MB)',
        requiresNDA: true
      },
      {
        id: 'openai-baa-template',
        title: 'OpenAI Business Associate Agreement (BAA) Template',
        description: 'Standard HIPAA BAA agreement for covered entities.',
        fileType: 'PDF (360 KB)',
        requiresNDA: true
      },
      {
        id: 'openai-security-whitepaper',
        title: 'Enterprise Data Privacy & Security Architecture',
        description: 'Technical guidance detailing Zero Data Retention (ZDR) and customer isolation.',
        fileType: 'PDF (1.4 MB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US', 'EU regional data processing options'],
    encryptionStandard: 'AES-256 at rest, TLS 1.2+ in transit',
    penTestFrequency: 'Continuous red-teaming + annual third-party pen tests by Bishop Fox',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: [],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Zero Data Retention (ZDR) policy on API endpoints', 'Enterprise Admin controls', 'Audit logging']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    slug: 'stripe',
    tagline: 'Financial infrastructure and payment processing for the internet',
    description: 'Suite of payment APIs, automated billing, fraud prevention (Radar), identity verification, and global treasury services.',
    category: 'Payments & Billing',
    brandColor: '#635BFF',
    logoBg: '#1e1c50',
    logoTextColor: '#635BFF',
    logoInitial: 'S',
    complianceBadges: [
      {
        type: 'PCIDSS',
        label: 'PCI-DSS Level 1',
        status: 'Certified',
        details: 'Highest level of payment security certification as a Level 1 Service Provider',
        verifiedAt: 'November 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'SOC 1 Type II and SOC 2 Type II reports for core processing systems',
        verifiedAt: 'December 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'Certified under ISO/IEC 27001:2022',
        verifiedAt: 'October 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Binding Corporate Rules & EU Data Processing Addendum',
        verifiedAt: 'June 2025'
      }
    ],
    auditorName: 'Coalfire',
    lastAuditDate: 'December 2025',
    reportPeriod: 'December 1, 2024 – November 30, 2025',
    minimumPlanForBAA: {
      tierName: 'Standard & Enterprise',
      priceNote: 'Standard 2.9% + 30¢ (BAA on enterprise)',
      isSelfServe: false,
      baaIncluded: false,
      details: 'Note: Standard payment processing is exempt from HIPAA under Section 1179. BAA is only needed if storing custom PHI in metadata fields.'
    },
    trustCenterUrl: 'https://stripe.com/docs/security',
    auditScopeSummary: 'Stripe Tokenization Vault, Checkout, Billing engine, Radar ML fraud detection, and banking rail APIs.',
    securityPackDocuments: [
      {
        id: 'stripe-soc2-type2',
        title: 'Stripe SOC 2 Type II Report',
        description: 'Coalfire independent auditor report covering security controls.',
        fileType: 'PDF (5.4 MB)',
        requiresNDA: true
      },
      {
        id: 'stripe-pci-aoc',
        title: 'PCI-DSS Attestation of Compliance (AoC)',
        description: 'Level 1 Service Provider certified AoC documentation.',
        fileType: 'PDF (420 KB)',
        requiresNDA: false
      },
      {
        id: 'stripe-iso-cert',
        title: 'ISO 27001:2022 Certificate',
        description: 'Accredited management certificate copy.',
        fileType: 'PDF (290 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US', 'EU (Dublin, Frankfurt)', 'Global Edge Routing'],
    encryptionStandard: 'AES-256 tokenization vault · TLS 1.3 · Hardware Security Modules (HSM)',
    penTestFrequency: 'Continuous penetration testing and public HackerOne bug bounty',
    headquarters: 'San Francisco, CA & Dublin, Ireland',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001:2022'],
    gdprDPAAvailable: true,
    featured: false,
    keyFeatures: ['PCI Level 1 Tokenization Vault', 'Radar ML fraud detection', 'Hardware Security Modules (HSM)', 'Restricted API keys']
  },
  {
    id: 'clerk',
    name: 'Clerk',
    slug: 'clerk',
    tagline: 'Modern user authentication and user management for React and Next.js',
    description: 'Complete user management and auth suite purpose-built for modern web stacks with drop-in prebuilt components, session management, and B2B SaaS organizations.',
    category: 'Auth & Identity',
    brandColor: '#6C47FF',
    logoBg: '#231557',
    logoTextColor: '#a78bfa',
    logoInitial: 'C',
    complianceBadges: [
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated for Security, Confidentiality, and Availability',
        verifiedAt: 'October 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Self-serve Data Processing Addendum and EU data isolation options',
        verifiedAt: 'July 2025'
      },
      {
        type: 'CCPA',
        label: 'CCPA / CPRA',
        status: 'Compliant',
        details: 'Compliant with California Consumer Privacy Act and privacy regulations',
        verifiedAt: 'August 2025'
      }
    ],
    auditorName: 'A-LIGN',
    lastAuditDate: 'October 2025',
    reportPeriod: 'October 1, 2024 – September 30, 2025',
    minimumPlanForBAA: {
      tierName: 'Freemium / Usage-based',
      priceNote: 'Free up to 10k MAU · Pro $25/mo · Enterprise',
      isSelfServe: false,
      baaIncluded: false,
      details: 'Freemium up to 10,000 monthly active users. SOC 2 Type II, GDPR, and CCPA compliant. Enterprise agreements available for dedicated data isolation.'
    },
    trustCenterUrl: 'https://clerk.com/docs/security/compliance',
    auditScopeSummary: 'Clerk Auth API, session cookie tokens, FIDO2/WebAuthn infrastructure, frontend SDK components, and multi-tenant user database.',
    securityPackDocuments: [
      {
        id: 'clerk-soc2-type2',
        title: 'Clerk SOC 2 Type II Audit Report (A-LIGN)',
        description: 'Comprehensive auditor examination covering user management pipelines.',
        fileType: 'PDF (2.9 MB)',
        requiresNDA: true
      },
      {
        id: 'clerk-pentest-summary',
        title: 'Annual Web Application Penetration Test',
        description: 'Third-party assessment by offensive security firm.',
        fileType: 'PDF (640 KB)',
        requiresNDA: true
      }
    ],
    dataResidency: ['US', 'EU'],
    encryptionStandard: 'AES-256, TLS 1.3',
    penTestFrequency: 'Annual independent grey-box penetration audit',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: [],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Passkeys', 'Social Logins', 'Organization multi-tenancy', 'User Impersonation audit trails']
  },
  {
    id: 'resend',
    name: 'Resend',
    slug: 'resend',
    tagline: 'Modern email API and transactional delivery platform for developers',
    description: 'Developer-first email platform with React Email templates, high inbox placement, webhooks, and analytics.',
    category: 'Email & Messaging',
    brandColor: '#000000',
    logoBg: '#0f172a',
    logoTextColor: '#38bdf8',
    logoInitial: 'R',
    complianceBadges: [
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated under AICPA criteria for Security, Availability, and Confidentiality',
        verifiedAt: 'November 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Standard Contractual Clauses (SCC) and automated Data Processing Addendum',
        verifiedAt: 'August 2025'
      }
    ],
    auditorName: 'Johanson Group LLP',
    lastAuditDate: 'November 2025',
    reportPeriod: 'November 1, 2024 – October 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Freemium / Usage-based',
      priceNote: 'Free 3,000 emails/mo · Pro $20/mo',
      isSelfServe: true,
      baaIncluded: false,
      details: 'Freemium plan available with pay-as-you-go scaling. SOC 2 Type II certified. Standard transactional emails cannot process PHI without enterprise approval.'
    },
    trustCenterUrl: 'https://resend.com/security',
    auditScopeSummary: 'Resend mail pipeline, REST API gateways, AWS SES multi-region integrations, React Email rendering pipeline, and dashboard authentication.',
    securityPackDocuments: [
      {
        id: 'resend-soc2-type2',
        title: 'Resend SOC 2 Type II Audit Report',
        description: 'Johanson Group service organization control audit examination.',
        fileType: 'PDF (2.5 MB)',
        requiresNDA: true
      },
      {
        id: 'resend-dpa',
        title: 'Resend Data Processing Addendum (DPA)',
        description: 'Standard contractual clauses for EU and UK customer compliance.',
        fileType: 'PDF (390 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US', 'EU'],
    encryptionStandard: 'TLS 1.3 in transit, encrypted message logs',
    penTestFrequency: 'Annual third-party application penetration testing',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: [],
    gdprDPAAvailable: true,
    featured: false,
    keyFeatures: ['Dedicated IPs', 'DKIM/SPF auto-validation', 'Webhooks', 'Multi-domain management']
  },
  {
    id: 'mongodb-atlas',
    name: 'MongoDB Atlas',
    slug: 'mongodb-atlas',
    tagline: 'Multi-cloud developer data platform with document database and vector search',
    description: 'Fully managed cloud database with native JSON document model, distributed ACID transactions, automated sharding, and full-text search.',
    category: 'Databases & Storage',
    brandColor: '#00ED64',
    logoBg: '#023419',
    logoTextColor: '#00ED64',
    logoInitial: 'M',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'BAA executed electronically on dedicated clusters (M10+) without sales call',
        verifiedAt: 'October 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated across Security, Availability, and Confidentiality criteria',
        verifiedAt: 'December 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO 27001:2013, ISO 27017 (Cloud), and ISO 27018 (PII Privacy)',
        verifiedAt: 'September 2025'
      },
      {
        type: 'PCIDSS',
        label: 'PCI-DSS',
        status: 'Certified',
        details: 'PCI-DSS Level 1 service provider attestation for secure storage',
        verifiedAt: 'November 2025'
      }
    ],
    auditorName: 'Schellman & Company',
    lastAuditDate: 'December 2025',
    reportPeriod: 'January 1, 2025 – December 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Dedicated Clusters (M10+)',
      priceNote: 'Starts at ~$57/mo (Self-Serve)',
      isSelfServe: true,
      baaIncluded: true,
      details: 'Self-serve BAA can be executed immediately in the MongoDB Atlas Admin Console for any Dedicated Cluster tier (M10 and above).'
    },
    trustCenterUrl: 'https://trust.mongodb.com',
    auditScopeSummary: 'Full scope evaluation of MongoDB Atlas Cloud service running across AWS, Google Cloud, and Azure regions worldwide.',
    securityPackDocuments: [
      {
        id: 'mongodb-soc2-type2',
        title: 'MongoDB Atlas SOC 2 Type II Report (Schellman)',
        description: 'Comprehensive independent audit assessment covering global clusters.',
        fileType: 'PDF (5.8 MB)',
        requiresNDA: true
      },
      {
        id: 'mongodb-hipaa-attestation',
        title: 'HIPAA Independent Security & Compliance Assessment',
        description: 'Attestation of compliance with HIPAA Security, Privacy, and Breach rules.',
        fileType: 'PDF (780 KB)',
        requiresNDA: true
      },
      {
        id: 'mongodb-iso-cert',
        title: 'ISO 27001, 27017, and 27018 Certificates',
        description: 'Global registrar certificate package.',
        fileType: 'PDF (490 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['90+ Global Regions across AWS, GCP, and Azure'],
    encryptionStandard: 'Queryable Encryption · Always-On AES-256 · TLS 1.3',
    penTestFrequency: 'Quarterly third-party audits + private bug bounty program',
    headquarters: 'New York, NY, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001', 'ISO 27017', 'ISO 27018'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Client-Side Field Level Encryption (CSFLE)', 'Queryable Encryption', 'Auditing & RBAC', 'Private endpoints (AWS PrivateLink)']
  },
  {
    id: 'planetscale',
    name: 'PlanetScale',
    slug: 'planetscale',
    tagline: 'Serverless MySQL platform with Vitess horizontal scaling and non-blocking schema branching',
    description: 'Enterprise MySQL-compatible database built on Vitess with automated zero-downtime schema migrations, connection pooling, and branch workflows.',
    category: 'Databases & Storage',
    brandColor: '#000000',
    logoBg: '#1e293b',
    logoTextColor: '#f97316',
    logoInitial: 'P',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'Executes Business Associate Agreement on PlanetScale Enterprise plans',
        verifiedAt: 'September 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Security, Availability, and Confidentiality verified by Coalfire',
        verifiedAt: 'November 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Standard Contractual Clauses and custom Data Processing Addendum',
        verifiedAt: 'August 2025'
      }
    ],
    auditorName: 'Coalfire',
    lastAuditDate: 'November 2025',
    reportPeriod: 'November 1, 2024 – October 31, 2025',
    minimumPlanForBAA: {
      tierName: 'PlanetScale Enterprise',
      priceNote: 'Custom annual contract (~$18,000/yr)',
      isSelfServe: false,
      baaIncluded: true,
      details: 'HIPAA BAA execution requires Enterprise tier with isolated database instances, single-tenant clusters, and customer audit logging.'
    },
    trustCenterUrl: 'https://planetscale.com/docs/security/compliance',
    auditScopeSummary: 'PlanetScale cloud platform, Vitess query proxies, cluster orchestration on AWS, schema migration engine, and customer backup snapshots.',
    securityPackDocuments: [
      {
        id: 'planetscale-soc2-type2',
        title: 'PlanetScale SOC 2 Type II Audit Report',
        description: 'Coalfire Systems examination report covering all cluster infrastructure.',
        fileType: 'PDF (3.2 MB)',
        requiresNDA: true
      },
      {
        id: 'planetscale-hipaa-guide',
        title: 'PlanetScale HIPAA Architecture & Security Guide',
        description: 'Details on PHI storage and field-level encryption practices.',
        fileType: 'PDF (710 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US (us-east-1, us-west-2)', 'EU (eu-west-1, eu-central-1)', 'APAC (ap-southeast-1)'],
    encryptionStandard: 'AES-256 for table storage · TLS 1.3 enforced for client connections',
    penTestFrequency: 'Annual third-party application penetration tests',
    headquarters: 'Mountain View, CA, USA',
    soc2Type: 'Type II',
    isoStandards: [],
    gdprDPAAvailable: true,
    featured: false,
    keyFeatures: ['Non-blocking schema migrations', 'Database branching', 'Automated daily backups', 'Private database connect']
  },
  {
    id: 'sentry',
    name: 'Sentry',
    slug: 'sentry',
    tagline: 'Application performance monitoring and error tracking for software teams',
    description: 'Code-level error and crash monitoring, distributed tracing, and session replay with smart scrubbing of sensitive personal identifiers.',
    category: 'Observability & Security',
    brandColor: '#362D59',
    logoBg: '#1f1638',
    logoTextColor: '#e056fd',
    logoInitial: 'S',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'Signs Business Associate Agreement on Business & Enterprise plans',
        verifiedAt: 'October 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Evaluated for Security, Availability, and Confidentiality',
        verifiedAt: 'December 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO/IEC 27001:2022 certified Information Security Management System',
        verifiedAt: 'August 2025'
      },
      {
        type: 'GDPR',
        label: 'GDPR Compliant',
        status: 'Compliant',
        details: 'Self-serve EU DPA with Data Scrubber rules and EU data region pinning',
        verifiedAt: 'July 2025'
      }
    ],
    auditorName: 'Schellman & Company',
    lastAuditDate: 'December 2025',
    reportPeriod: 'November 1, 2024 – October 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Business Plan',
      priceNote: '$80/mo (Self-Serve Electronic BAA)',
      isSelfServe: true,
      baaIncluded: true,
      details: 'Sentry offers self-serve BAA execution on the Business tier ($80/mo) directly within Organization Settings when Data Scrubbing is enabled.'
    },
    trustCenterUrl: 'https://sentry.io/trust',
    auditScopeSummary: 'Sentry SaaS ingestion pipeline, Relay ingestion proxies, Snuba query service, ClickHouse event storage, and web application dashboard.',
    securityPackDocuments: [
      {
        id: 'sentry-soc2-type2',
        title: 'Sentry SOC 2 Type II Examination Report (Schellman)',
        description: 'Comprehensive auditor report covering event ingestion pipelines.',
        fileType: 'PDF (4.1 MB)',
        requiresNDA: true
      },
      {
        id: 'sentry-hipaa-baa',
        title: 'Sentry Standard Business Associate Agreement (BAA)',
        description: 'Self-serve BAA agreement outlining covered safeguards and scrubber rules.',
        fileType: 'PDF (350 KB)',
        requiresNDA: false
      },
      {
        id: 'sentry-iso-cert',
        title: 'ISO 27001:2022 Certificate Package',
        description: 'ANAB accredited registration certificate.',
        fileType: 'PDF (280 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['US (us.sentry.io)', 'EU (de.sentry.io Frankfurt)'],
    encryptionStandard: 'AES-256 for event payloads · TLS 1.3 in transit',
    penTestFrequency: 'Annual third-party pen tests by Bishop Fox',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001:2022'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Data scrubbing for PII', 'Relay on-premise proxy', 'Audit log streams', 'SOC 2 & HIPAA eligible']
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    slug: 'cloudflare',
    tagline: 'Global cloud network for web performance, security, and edge computing',
    description: 'Edge security, DDoS mitigation, Web Application Firewall (WAF), DNS, and serverless compute (Workers) running across 330+ cities globally.',
    category: 'Cloud & Hosting',
    brandColor: '#F38020',
    logoBg: '#381c06',
    logoTextColor: '#F38020',
    logoInitial: 'C',
    complianceBadges: [
      {
        type: 'HIPAA',
        label: 'HIPAA (Signs BAA)',
        status: 'Verified',
        details: 'BAA executed for Cloudflare Enterprise customers with payload protection',
        verifiedAt: 'November 2025'
      },
      {
        type: 'SOC2',
        label: 'SOC 2 Type II',
        status: 'Current',
        details: 'Security, Confidentiality, and Availability verified across all edge nodes',
        verifiedAt: 'December 2025'
      },
      {
        type: 'ISO27001',
        label: 'ISO 27001',
        status: 'Certified',
        details: 'ISO 27001, ISO 27018, and ISO 27701 certified',
        verifiedAt: 'October 2025'
      },
      {
        type: 'PCIDSS',
        label: 'PCI-DSS',
        status: 'Certified',
        details: 'PCI-DSS 4.0 Level 1 Service Provider attestation for WAF and edge proxies',
        verifiedAt: 'December 2025'
      },
      {
        type: 'FedRAMP',
        label: 'FedRAMP Moderate',
        status: 'Certified',
        details: 'FedRAMP Moderate Authorization for Federal Government customers',
        verifiedAt: 'June 2025'
      }
    ],
    auditorName: 'Ernst & Young LLP',
    lastAuditDate: 'December 2025',
    reportPeriod: 'November 1, 2024 – October 31, 2025',
    minimumPlanForBAA: {
      tierName: 'Enterprise Plan',
      priceNote: 'Custom annual contract (~$20,000/yr)',
      isSelfServe: false,
      baaIncluded: true,
      details: 'HIPAA BAA is restricted to Cloudflare Enterprise agreements with designated security and payload logging controls.'
    },
    trustCenterUrl: 'https://www.cloudflare.com/trust-hub/compliance-resources',
    auditScopeSummary: 'Full scope evaluation of Cloudflare Edge Network (330+ points of presence), Workers runtime, WAF, DNS, Zero Trust Access, and control plane.',
    securityPackDocuments: [
      {
        id: 'cloudflare-soc2-type2',
        title: 'Cloudflare SOC 2 Type II Report (Ernst & Young)',
        description: 'Comprehensive global edge network audit report.',
        fileType: 'PDF (6.8 MB)',
        requiresNDA: true
      },
      {
        id: 'cloudflare-pci-aoc',
        title: 'PCI-DSS 4.0 Attestation of Compliance (AoC)',
        description: 'Level 1 Service Provider AoC for edge proxies.',
        fileType: 'PDF (510 KB)',
        requiresNDA: false
      },
      {
        id: 'cloudflare-iso-cert',
        title: 'ISO 27001, 27018, and 27701 Certificate Bundle',
        description: 'Accredited international management certifications.',
        fileType: 'PDF (620 KB)',
        requiresNDA: false
      }
    ],
    dataResidency: ['Global Anycast Network (330+ cities)', 'Regional Services (EU-only isolation)', 'US-only isolation'],
    encryptionStandard: 'TLS 1.3 enforced · Keyless SSL · Post-quantum cryptography support',
    penTestFrequency: 'Continuous external red-team audits & public bug bounty program',
    headquarters: 'San Francisco, CA, USA',
    soc2Type: 'Type II',
    isoStandards: ['ISO 27001', 'ISO 27018', 'ISO 27701'],
    gdprDPAAvailable: true,
    featured: true,
    keyFeatures: ['Zero Trust network access (ZTNA)', 'Keyless SSL', 'Cloud WAF & DDoS mitigation', 'Post-quantum encryption']
  }
];

export const CATEGORIES = [
  'All',
  'Auth & Identity',
  'Databases & Storage',
  'Email & Messaging',
  'Observability & Security',
  'Cloud & Hosting',
  'AI & Machine Learning',
  'Payments & Billing'
] as const;

export const COMPLIANCE_FRAMEWORKS = [
  { id: 'HIPAA', label: 'HIPAA (Signs BAA)', description: 'Signs Business Associate Agreement for PHI protection' },
  { id: 'SOC2', label: 'SOC 2 Type II', description: 'Audited over time for Security & Availability' },
  { id: 'ISO27001', label: 'ISO 27001', description: 'Certified Information Security Management System' },
  { id: 'GDPR', label: 'GDPR Compliant', description: 'Valid Data Processing Addendum & EU safeguards' },
  { id: 'CCPA', label: 'CCPA / CPRA', description: 'California Consumer Privacy Act verified compliance' },
  { id: 'PCIDSS', label: 'PCI-DSS', description: 'Payment card industry security compliance' },
  { id: 'FedRAMP', label: 'FedRAMP Moderate', description: 'US Federal government authorization' }
] as const;

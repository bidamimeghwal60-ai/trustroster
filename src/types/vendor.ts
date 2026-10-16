export type ComplianceFrameworkType = 'HIPAA' | 'SOC2' | 'ISO27001' | 'GDPR' | 'PCIDSS' | 'FedRAMP' | 'CCPA';

export interface ComplianceBadge {
  type: ComplianceFrameworkType;
  label: string;
  status: 'Verified' | 'Current' | 'Certified' | 'Compliant' | 'In Progress';
  details: string;
  verifiedAt: string;
}

export interface SecurityDocument {
  id: string;
  title: string;
  description: string;
  fileType: string;
  requiresNDA: boolean;
}

export interface MinimumPlanRequirement {
  tierName: string;
  priceNote: string;
  isSelfServe: boolean;
  baaIncluded: boolean;
  details: string;
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: 
    | 'Cloud & Hosting'
    | 'Databases & Storage'
    | 'Email & Messaging'
    | 'Email & SMS'
    | 'Auth & Identity'
    | 'Authentication & IAM'
    | 'Observability & Security'
    | 'AI & Machine Learning'
    | 'AI & Search'
    | 'Payments & Billing'
    | 'Developer Tools';
  brandColor: string;
  logoBg: string;
  logoTextColor: string;
  logoInitial: string;
  complianceBadges: ComplianceBadge[];
  auditorName: string;
  lastAuditDate: string;
  minimumPlanForBAA: MinimumPlanRequirement;
  trustCenterUrl: string;
  auditScopeSummary: string;
  reportPeriod: string;
  securityPackDocuments: SecurityDocument[];
  dataResidency: string[];
  encryptionStandard: string;
  penTestFrequency: string;
  headquarters: string;
  soc2Type: 'Type II' | 'Type I' | 'None';
  isoStandards: string[];
  gdprDPAAvailable: boolean;
  featured?: boolean;
  keyFeatures?: string[];
}

export interface VendorFilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedFrameworks: ComplianceFrameworkType[];
  selfServeBAAOnly: boolean;
  sortBy: 'relevance' | 'certifications' | 'alphabetical' | 'recentAudit' | 'lowestCost';
}

export interface SecurityPackRequest {
  vendorId: string;
  vendorName: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  selectedDocumentIds: string[];
  signedNDA: boolean;
  useCase: string;
}

export interface VendorSubmission {
  companyName: string;
  website: string;
  category: string;
  trustCenterUrl: string;
  auditorName: string;
  complianceFrameworks: ComplianceFrameworkType[];
  minimumPlanForBAA: string;
  isSelfServe: boolean;
  contactEmail: string;
  notes: string;
}

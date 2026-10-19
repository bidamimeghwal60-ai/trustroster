import React, { useState, useEffect } from 'react';
import { ComplianceFrameworkType, Vendor } from '../types/vendor';
import { CATEGORIES, COMPLIANCE_FRAMEWORKS } from '../data/vendors';
import { X, PlusCircle, CheckCircle2, ShieldCheck, AlertCircle, Loader2, ArrowRight, RotateCcw } from 'lucide-react';

interface ListVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitVendor: (newVendor: Vendor) => void;
}

interface SubmittedSummary {
  toolName: string;
  contactEmail: string;
  website: string;
  complianceTags: string;
  category: string;
}

export const ListVendorModal: React.FC<ListVendorModalProps> = ({
  isOpen,
  onClose,
  onSubmitVendor,
}) => {
  if (!isOpen) return null;

  // Form input states
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [category, setCategory] = useState<string>(CATEGORIES[1] || 'Auth & Identity');
  const [tagline, setTagline] = useState('');
  const [trustCenterUrl, setTrustCenterUrl] = useState('');
  const [auditorName, setAuditorName] = useState('');
  const [headquarters, setHeadquarters] = useState('San Francisco, CA, USA');
  const [selectedFrameworks, setSelectedFrameworks] = useState<ComplianceFrameworkType[]>([
    'SOC2',
    'HIPAA',
  ]);
  const [tierName, setTierName] = useState('Pro Plan');
  const [priceNote, setPriceNote] = useState('$25/mo');
  const [isSelfServe, setIsSelfServe] = useState(true);

  // Submission UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedSummary | null>(null);

  // Auto-close countdown timer
  const [autoCloseCountdown, setAutoCloseCountdown] = useState(6);
  const [isAutoClosePaused, setIsAutoClosePaused] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isSuccess && !isAutoClosePaused) {
      if (autoCloseCountdown <= 0) {
        onClose();
      } else {
        timer = setTimeout(() => {
          setAutoCloseCountdown((prev) => prev - 1);
        }, 1000);
      }
    }
    return () => clearTimeout(timer);
  }, [isSuccess, autoCloseCountdown, isAutoClosePaused, onClose]);

  const toggleFramework = (frameworkId: ComplianceFrameworkType) => {
    setSelectedFrameworks((prev) =>
      prev.includes(frameworkId)
        ? prev.filter((f) => f !== frameworkId)
        : [...prev, frameworkId]
    );
  };

  const resetFormFields = () => {
    setCompanyName('');
    setWebsite('');
    setContactEmail('');
    setTagline('');
    setTrustCenterUrl('');
    setAuditorName('');
    setSelectedFrameworks(['SOC2', 'HIPAA']);
    setTierName('Pro Plan');
    setPriceNote('$25/mo');
    setIsSelfServe(true);
    setError('');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setError('');

    if (!companyName.trim()) {
      setError('Please provide the tool name.');
      return;
    }

    if (!contactEmail.trim() || !contactEmail.includes('@')) {
      setError('Please enter a valid contact email.');
      return;
    }

    if (!website.trim()) {
      setError('Please provide the website URL.');
      return;
    }

    if (selectedFrameworks.length === 0) {
      setError('Please select at least one compliance tag (e.g. SOC 2, HIPAA, ISO 27001, GDPR).');
      return;
    }

    setIsSubmitting(true);

    const fwLabels: Record<string, string> = {
      SOC2: 'SOC 2',
      HIPAA: 'HIPAA',
      ISO27001: 'ISO 27001',
      GDPR: 'GDPR',
      CCPA: 'CCPA',
      PCIDSS: 'PCI-DSS',
      FedRAMP: 'FedRAMP',
    };
    const complianceTagsFormatted = selectedFrameworks
      .map((fw) => fwLabels[fw] || fw)
      .join(', ');

    // Generate local vendor entry for immediate directory listing
    const newVendor: Vendor = {
      id: companyName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: companyName.trim(),
      slug: companyName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      tagline: tagline.trim() || `${companyName.trim()} enterprise compliance profile`,
      description: `${companyName.trim()} verified for ${complianceTagsFormatted} compliance standards.`,
      category: category as any,
      brandColor: '#1e3a8a',
      logoBg: '#1e293b',
      logoTextColor: '#38bdf8',
      logoInitial: companyName.trim().charAt(0).toUpperCase() || 'V',
      complianceBadges: selectedFrameworks.map((fw) => {
        const fwDef = COMPLIANCE_FRAMEWORKS.find((f) => f.id === fw);
        return {
          type: fw,
          label: fwDef?.label || fwLabels[fw] || fw,
          status: 'Verified',
          details: auditorName.trim()
            ? `Verified by ${auditorName.trim()}`
            : 'Independent auditor attestation verified',
          verifiedAt: 'Recent 2025/2026',
        };
      }),
      auditorName: auditorName.trim() || 'Independent Attestation',
      lastAuditDate: 'Recent 2025',
      reportPeriod: 'Recent 12 months',
      minimumPlanForBAA: {
        tierName: tierName.trim() || 'Pro Plan',
        priceNote: priceNote.trim() || 'Self-serve pricing',
        isSelfServe: isSelfServe,
        baaIncluded: selectedFrameworks.includes('HIPAA'),
        details: isSelfServe
          ? 'Electronically signable in account workspace settings without sales gate.'
          : 'Available via Enterprise contractual addendum.',
      },
      trustCenterUrl: trustCenterUrl.trim() || website.trim(),
      auditScopeSummary: `Full examination of ${companyName.trim()}'s cloud infrastructure and compliance safeguards.`,
      securityPackDocuments: [
        {
          id: `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-report`,
          title: `Compliance Audit Report (${selectedFrameworks.join(', ')})`,
          description: `Independent audit verification documentation.`,
          fileType: 'PDF (2.8 MB)',
          requiresNDA: true,
        },
      ],
      dataResidency: ['United States', 'European Union'],
      encryptionStandard: 'AES-256 at rest, TLS 1.3 in transit',
      penTestFrequency: 'Annual independent penetration assessment',
      headquarters: headquarters.trim() || 'United States',
      soc2Type: selectedFrameworks.includes('SOC2') ? 'Type II' : 'None',
      isoStandards: selectedFrameworks.includes('ISO27001') ? ['ISO 27001'] : [],
      gdprDPAAvailable: selectedFrameworks.includes('GDPR'),
      featured: false,
      keyFeatures: ['Audit Logging', 'Role-Based Access Control (RBAC)', 'Data Encryption', 'Automated Backups'],
    };

    // Web3Forms API Integration (hardcoded access key)
    const accessKey = '4f69dacb-506a-4c33-a7f0-beb376725ab9';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Tool Submission: ${companyName.trim()}`,
          from_name: 'TrustRoster Compliance Directory',
          'Tool Name': companyName.trim(),
          'Company Name': companyName.trim(),
          'Contact Email': contactEmail.trim(),
          'Website URL': website.trim(),
          'Compliance Tags': complianceTagsFormatted,
          Category: category,
          'Auditor Firm': auditorName.trim() || 'Not specified',
          Headquarters: headquarters.trim() || 'United States',
          'Trust Center URL': trustCenterUrl.trim() || website.trim(),
          'Minimum Plan for BAA': `${tierName.trim()} (${priceNote.trim()})`,
          'Self-Serve BAA': isSelfServe ? 'Yes' : 'No',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        // Record summary data before resetting form
        setSubmittedData({
          toolName: companyName.trim(),
          contactEmail: contactEmail.trim(),
          website: website.trim(),
          complianceTags: complianceTagsFormatted,
          category: category,
        });

        // Reset form inputs upon successful submission
        resetFormFields();

        // Add to active session directory
        onSubmitVendor(newVendor);

        setIsSubmitting(false);
        setAutoCloseCountdown(6);
        setIsAutoClosePaused(false);
        setIsSuccess(true);
      } else {
        setIsSubmitting(false);
        setError(data?.message || 'Failed to submit tool. Please check your details and try again.');
      }
    } catch (err: any) {
      console.warn('Network error during Web3Forms submission:', err);
      setIsSubmitting(false);
      setError(err?.message || 'Network request failed. Please check your internet connection and try again.');
    }
  };

  const handleStartAnother = () => {
    setIsSuccess(false);
    setSubmittedData(null);
    resetFormFields();
    setAutoCloseCountdown(6);
    setIsAutoClosePaused(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-slate-900 my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-vendor-title"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center text-blue-300">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 id="submit-vendor-title" className="text-xl font-bold text-white">
                Get Verified and Listed on TrustRoster
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Join our verified B2B compliance directory. Help engineering and procurement buyers find your tools.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Error notification display */}
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start justify-between gap-3 animate-in fade-in">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-xs text-red-900">Submission Failed</div>
                      <div className="text-xs text-red-700 mt-0.5">{error}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="px-2.5 py-1 text-xs font-semibold bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors cursor-pointer"
                    >
                      Retry
                    </button>
                    <button
                      type="button"
                      onClick={() => setError('')}
                      className="text-red-400 hover:text-red-700 p-1 cursor-pointer"
                      aria-label="Dismiss error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tool Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tool / Company Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Identity"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Primary Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900 bg-white"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Website URL & Contact Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://acme.com"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="security@acme.com"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Tagline & HQ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    One-Line Description
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Modern authentication & user management platform"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Headquarters / Region
                  </label>
                  <input
                    type="text"
                    value={headquarters}
                    onChange={(e) => setHeadquarters(e.target.value)}
                    placeholder="e.g. San Francisco, CA, USA"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Trust Center & Auditor Firm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Trust Center / Security URL
                  </label>
                  <input
                    type="url"
                    value={trustCenterUrl}
                    onChange={(e) => setTrustCenterUrl(e.target.value)}
                    placeholder="https://trust.acme.com"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Auditor Firm Name
                  </label>
                  <input
                    type="text"
                    value={auditorName}
                    onChange={(e) => setAuditorName(e.target.value)}
                    placeholder="e.g. Schellman, A-LIGN, Coalfire, EY"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Compliance Tags checkboxes */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Compliance Tags (Select all that apply) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COMPLIANCE_FRAMEWORKS.map((fw) => {
                    const isChecked = selectedFrameworks.includes(fw.id as ComplianceFrameworkType);
                    return (
                      <label
                        key={fw.id}
                        className={`p-2 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFramework(fw.id as ComplianceFrameworkType)}
                          className="rounded-xs border-slate-300 text-blue-900 focus:ring-blue-600"
                        />
                        <span className="truncate">{fw.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Minimum Plan for BAA */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-semibold text-slate-800">
                  Minimum Plan Required for Compliance & BAA
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Tier Name</label>
                    <input
                      type="text"
                      value={tierName}
                      onChange={(e) => setTierName(e.target.value)}
                      placeholder="e.g. Pro Plan, Team, or Enterprise"
                      className="w-full p-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Starting Price Note</label>
                    <input
                      type="text"
                      value={priceNote}
                      onChange={(e) => setPriceNote(e.target.value)}
                      placeholder="e.g. $25/mo or Usage-based"
                      className="w-full p-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isSelfServe}
                    onChange={(e) => setIsSelfServe(e.target.checked)}
                    className="rounded-xs border-slate-300 text-blue-900 focus:ring-blue-600"
                  />
                  <span className="text-slate-700 text-xs">
                    Customers can execute BAA self-serve in account settings without speaking to enterprise sales
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 disabled:bg-blue-900/60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-blue-200 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-blue-300" />
                    <span>Submit Tool for Verification</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-5 animate-in fade-in duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-slate-900">
                  Thank you! Your submission has been received.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our compliance team will review your tool shortly.
                </p>
              </div>

              {/* Summary Card of submitted vendor */}
              {submittedData && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Tool / Company Name:</span>
                    <span className="font-semibold text-slate-900">{submittedData.toolName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Contact Email:</span>
                    <span className="font-mono text-slate-800">{submittedData.contactEmail}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Website URL:</span>
                    <span className="font-mono text-slate-800 truncate max-w-[200px]">{submittedData.website}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Compliance Tags:</span>
                    <span className="font-semibold text-blue-900">{submittedData.complianceTags}</span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-slate-500">Category:</span>
                    <span className="text-slate-800">{submittedData.category}</span>
                  </div>
                </div>
              )}

              {/* Auto-close notification */}
              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-2">
                {isAutoClosePaused ? (
                  <span>Auto-close paused</span>
                ) : (
                  <span>Auto-closing in {autoCloseCountdown}s...</span>
                )}
                <button
                  type="button"
                  onClick={() => setIsAutoClosePaused((prev) => !prev)}
                  className="text-blue-900 hover:underline font-medium cursor-pointer"
                >
                  {isAutoClosePaused ? 'Resume' : 'Pause'}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleStartAnother}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit Another Tool</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Close & View Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

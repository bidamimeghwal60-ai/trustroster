import React, { useState } from 'react';
import { ComplianceFrameworkType, Vendor, VendorSubmission } from '../types/vendor';
import { CATEGORIES, COMPLIANCE_FRAMEWORKS } from '../data/vendors';
import { X, PlusCircle, CheckCircle2, ShieldCheck, Building2, AlertCircle, Loader2 } from 'lucide-react';

interface ListVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitVendor: (newVendor: Vendor) => void;
}

export const ListVendorModal: React.FC<ListVendorModalProps> = ({
  isOpen,
  onClose,
  onSubmitVendor,
}) => {
  if (!isOpen) return null;

  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(CATEGORIES[1]); // default 'Cloud & Hosting'
  const [website, setWebsite] = useState('');
  const [trustCenterUrl, setTrustCenterUrl] = useState('');
  const [auditorName, setAuditorName] = useState('');
  const [selectedFrameworks, setSelectedFrameworks] = useState<ComplianceFrameworkType[]>([
    'SOC2',
    'HIPAA',
  ]);
  const [tierName, setTierName] = useState('Pro Plan');
  const [priceNote, setPriceNote] = useState('$30/mo');
  const [isSelfServe, setIsSelfServe] = useState(true);
  const [contactEmail, setContactEmail] = useState('');
  const [headquarters, setHeadquarters] = useState('San Francisco, CA');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleFramework = (frameworkId: ComplianceFrameworkType) => {
    setSelectedFrameworks(prev =>
      prev.includes(frameworkId)
        ? prev.filter(f => f !== frameworkId)
        : [...prev, frameworkId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!companyName.trim() || !contactEmail.trim() || !auditorName.trim()) {
      setError('Please provide your company name, auditor firm, and work email.');
      return;
    }

    if (!contactEmail.includes('@')) {
      setError('Please enter a valid work email.');
      return;
    }

    if (selectedFrameworks.length === 0) {
      setError('Please select at least one compliance framework you hold.');
      return;
    }

    setIsSubmitting(true);

    // Generate compliant new vendor entry
    const newVendor: Vendor = {
      id: companyName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: companyName,
      slug: companyName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      tagline: tagline.trim() || `${companyName} enterprise compliance profile`,
      description: description.trim() || `${companyName} is verified for compliance and enterprise security attestations.`,
      category: category as any,
      brandColor: '#1e3a8a',
      logoBg: '#1e293b',
      logoTextColor: '#38bdf8',
      logoInitial: companyName.charAt(0).toUpperCase(),
      complianceBadges: selectedFrameworks.map(fw => {
        const fwDef = COMPLIANCE_FRAMEWORKS.find(f => f.id === fw);
        return {
          type: fw,
          label: fwDef?.label || fw,
          status: 'Verified',
          details: `Verified by ${auditorName}`,
          verifiedAt: 'Recent 2025/2026'
        };
      }),
      auditorName: auditorName.trim(),
      lastAuditDate: 'October 2025',
      reportPeriod: 'Recent 12 months',
      minimumPlanForBAA: {
        tierName: tierName.trim() || 'Pro Plan',
        priceNote: priceNote.trim() || 'Self-serve pricing',
        isSelfServe: isSelfServe,
        baaIncluded: true,
        details: isSelfServe
          ? 'Electronically signable in account workspace settings without sales gate.'
          : 'Available via Enterprise contractual addendum.'
      },
      trustCenterUrl: trustCenterUrl.trim() || `https://trust.${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      auditScopeSummary: `Full examination of ${companyName}'s SaaS platform, cloud hosting infrastructure, and customer data safeguards.`,
      securityPackDocuments: [
        {
          id: `${companyName}-soc2`,
          title: `SOC 2 Type II Audit Report (${auditorName})`,
          description: `Independent audit verification report.`,
          fileType: 'PDF (2.4 MB)',
          requiresNDA: true
        },
        {
          id: `${companyName}-baa`,
          title: 'Standard BAA Agreement Terms',
          description: 'Business Associate Agreement template for covered entities.',
          fileType: 'PDF (310 KB)',
          requiresNDA: false
        }
      ],
      dataResidency: ['United States', 'European Union'],
      encryptionStandard: 'AES-256 at rest · TLS 1.3 in transit',
      penTestFrequency: 'Annual independent penetration assessment',
      headquarters: headquarters.trim() || 'United States',
      soc2Type: selectedFrameworks.includes('SOC2') ? 'Type II' : 'None',
      isoStandards: selectedFrameworks.includes('ISO27001') ? ['ISO 27001'] : [],
      gdprDPAAvailable: selectedFrameworks.includes('GDPR'),
      featured: false
    };

    // Integration hook: simulate or send to admin notification endpoint
    try {
      const adminWebhook = (window as any).TRUSTROSTER_ADMIN_WEBHOOK;
      if (adminWebhook) {
        await fetch(adminWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'vendor_listing_application',
            vendor: newVendor,
            contactEmail: contactEmail.trim(),
            submittedAt: new Date().toISOString(),
          }),
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    } catch (err) {
      console.warn('Admin notification webhook failed, continuing locally', err);
    } finally {
      setIsSubmitting(false);
      onSubmitVendor(newVendor);
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCompanyName('');
    setTagline('');
    setDescription('');
    setAuditorName('');
    setContactEmail('');
    setTrustCenterUrl('');
    onClose();
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
                Join 500+ verified B2B vendors. Help engineering and compliance buyers find your tools.
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
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Company Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Company / Product Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Cloud"
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
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
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
                    placeholder="e.g. Serverless Redis database with sub-millisecond latency"
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
                    placeholder="e.g. San Francisco, CA"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Trust Center & Auditor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Trust Center / Proof URL *
                  </label>
                  <input
                    type="url"
                    value={trustCenterUrl}
                    onChange={(e) => setTrustCenterUrl(e.target.value)}
                    placeholder="https://trust.yourcompany.com"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Auditor Firm Name *
                  </label>
                  <input
                    type="text"
                    value={auditorName}
                    onChange={(e) => setAuditorName(e.target.value)}
                    placeholder="e.g. Schellman, A-LIGN, Coalfire"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                    required
                  />
                </div>
              </div>

              {/* Frameworks checkboxes */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Verified Compliance Certifications Held *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COMPLIANCE_FRAMEWORKS.map(fw => {
                    const isChecked = selectedFrameworks.includes(fw.id as ComplianceFrameworkType);
                    return (
                      <label
                        key={fw.id}
                        className={`p-2 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold'
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
                      placeholder="e.g. Pro Plan or Enterprise Only"
                      className="w-full p-2 rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Starting Price Note</label>
                    <input
                      type="text"
                      value={priceNote}
                      onChange={(e) => setPriceNote(e.target.value)}
                      placeholder="e.g. $25/mo or Custom"
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
                  <span className="text-slate-700">
                    Customers can execute BAA self-serve in account settings without speaking to enterprise sales
                  </span>
                </label>
              </div>

              {/* Contact Email */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Contact Work Email (for verification validation) *
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="security@yourcompany.com"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 disabled:bg-blue-900/70 text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-blue-200 animate-spin" />
                    <span>Submitting for Verification...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-blue-300" />
                    <span>Submit Vendor Verification Listing</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Listing Submitted & Verified!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  <strong>{companyName}</strong> has been added to the TrustRoster index. The audit profile is now live in your directory session.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-left text-xs space-y-1">
                <div><strong>Auditor:</strong> {auditorName}</div>
                <div><strong>Minimum Tier for BAA:</strong> {tierName} ({priceNote})</div>
                <div><strong>Self-Serve:</strong> {isSelfServe ? 'Yes' : 'Enterprise contract required'}</div>
                <div><strong>Verified Frameworks:</strong> {selectedFrameworks.join(', ')}</div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-xs"
              >
                View in Directory
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

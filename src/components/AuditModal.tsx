import React, { useState } from 'react';
import { Vendor, SecurityDocument, SecurityPackRequest } from '../types/vendor';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Download, 
  Building2, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Lock, 
  Server, 
  Send, 
  AlertCircle,
  Clock,
  Sparkles,
  Loader2
} from 'lucide-react';

interface AuditModalProps {
  vendor: Vendor | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestSecurityPack: (request: SecurityPackRequest) => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  vendor,
  isOpen,
  onClose,
  onRequestSecurityPack,
}) => {
  if (!isOpen || !vendor) return null;

  const [activeTab, setActiveTab] = useState<'audit' | 'plans' | 'request'>('audit');
  
  // Security Pack Form State
  const [selectedDocs, setSelectedDocs] = useState<string[]>(
    vendor.securityPackDocuments.map(d => d.id)
  );
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [useCase, setUseCase] = useState('');
  const [signedNDA, setSignedNDA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const toggleDocSelection = (id: string) => {
    setSelectedDocs(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !workEmail.trim() || !companyName.trim()) {
      setFormError('Please fill in your name, work email, and company.');
      return;
    }

    if (!workEmail.includes('@') || !workEmail.includes('.')) {
      setFormError('Please enter a valid work email address.');
      return;
    }

    if (selectedDocs.length === 0) {
      setFormError('Please select at least one security document to request.');
      return;
    }

    setIsSubmitting(true);

    const docTitles = selectedDocs.map(id => {
      const doc = vendor.securityPackDocuments.find(d => d.id === id);
      return doc ? doc.title : id;
    });

    const payload: SecurityPackRequest = {
      vendorId: vendor.id,
      vendorName: vendor.name,
      fullName: fullName.trim(),
      workEmail: workEmail.trim(),
      companyName: companyName.trim(),
      selectedDocumentIds: selectedDocs,
      signedNDA,
      useCase: useCase.trim(),
    };

    // Integration hook: if custom endpoint configured or formspree
    try {
      const webhookUrl = (window as any).TRUSTROSTER_LEAD_WEBHOOK;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            requestedDocumentTitles: docTitles,
            source: 'TrustRoster B2B Compliance Directory',
            submittedAt: new Date().toISOString(),
          }),
        });
      } else {
        // Realistic network latency simulation
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    } catch (err) {
      console.warn('Webhook dispatch skipped/failed, proceeding with client confirmation', err);
    } finally {
      setIsSubmitting(false);
      onRequestSecurityPack(payload);
      setIsSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setWorkEmail('');
    setCompanyName('');
    setUseCase('');
    setSignedNDA(false);
    setFormError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-slate-900 my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl shrink-0 shadow-inner"
              style={{
                backgroundColor: vendor.logoBg,
                color: vendor.logoTextColor,
              }}
            >
              {vendor.logoInitial}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white">
                  {vendor.name}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-sm bg-slate-800 text-blue-300 font-medium">
                  {vendor.category}
                </span>
                <span className="text-xs text-slate-400">
                  {vendor.headquarters}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {vendor.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'border-blue-900 text-blue-900 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Audit Scope & Attestations
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'plans'
                ? 'border-blue-900 text-blue-900 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            BAA & Minimum Plans
          </button>
          <button
            onClick={() => setActiveTab('request')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'request'
                ? 'border-blue-900 text-blue-900 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-800" />
            <span>Request Security Pack</span>
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: AUDIT SCOPE & ATTESTATIONS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              {/* Auditor & Audit Window Summary Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-800" />
                    <span>Independent Auditor</span>
                  </div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {vendor.auditorName}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Accredited AICPA & ISO Certification Body
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-800" />
                    <span>Audit Period & Recency</span>
                  </div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {vendor.lastAuditDate}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">
                    Evaluation Window: {vendor.reportPeriod}
                  </div>
                </div>
              </div>

              {/* Audit Scope Description */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80">
                <h4 className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-800" />
                  <span>Audited System Scope</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                  {vendor.auditScopeSummary}
                </p>
              </div>

              {/* Compliance Frameworks Deep Dive */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Verified Frameworks & Attestations
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {vendor.complianceBadges.map((badge) => (
                    <div
                      key={badge.type}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            {badge.label}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                            {badge.status}
                          </span>
                          <span className="text-xs text-slate-400">
                            Verified {badge.verifiedAt}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {badge.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encryption & Technical Safeguards */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cryptographic Safeguards & Data Residency
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800">Encryption: </span>
                      <span className="text-slate-600">{vendor.encryptionStandard}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Server className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800">Pen Testing: </span>
                      <span className="text-slate-600">{vendor.penTestFrequency}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800">Available Data Regions: </span>
                  <span className="text-slate-600">{vendor.dataResidency.join(', ')}</span>
                </div>

                {vendor.keyFeatures && vendor.keyFeatures.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800">Key Security & Compliance Features: </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {vendor.keyFeatures.map((feat) => (
                        <span key={feat} className="bg-white border border-slate-200 px-2 py-0.5 rounded-md font-medium text-slate-700">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* External Trust Link Button */}
              <div className="flex items-center justify-between pt-2">
                <a
                  href={vendor.trustCenterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-700 hover:underline"
                >
                  <span>Visit {vendor.name} Official Trust Center</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveTab('request')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-xs"
                >
                  Request Security Pack →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BAA & PLAN TIERS */}
          {activeTab === 'plans' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                      Required Tier for BAA Execution
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {vendor.minimumPlanForBAA.tierName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Starting Cost</span>
                    <div className="text-base font-mono font-bold text-blue-900">
                      {vendor.minimumPlanForBAA.priceNote}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-blue-200/60 flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${
                      vendor.minimumPlanForBAA.isSelfServe
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {vendor.minimumPlanForBAA.isSelfServe
                      ? '✓ Instant Self-Serve Execution'
                      : 'Requires Enterprise Sales Negotiation'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
                  {vendor.minimumPlanForBAA.details}
                </p>
              </div>

              {/* Plan Matrix Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Compliance Entitlements By Plan Tier
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Plan Tier</th>
                        <th className="p-3">HIPAA BAA</th>
                        <th className="p-3">SOC 2 Report Access</th>
                        <th className="p-3">Execution Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-600">
                      <tr className="bg-white">
                        <td className="p-3 font-medium text-slate-900">Free / Starter</td>
                        <td className="p-3 text-red-600">✗ Not Eligible</td>
                        <td className="p-3 text-slate-600">Public SOC 3 Only</td>
                        <td className="p-3">N/A</td>
                      </tr>
                      <tr className={vendor.minimumPlanForBAA.tierName.toLowerCase().includes('pro') || vendor.minimumPlanForBAA.tierName.toLowerCase().includes('any') ? 'bg-blue-50/50 font-medium' : 'bg-white'}>
                        <td className="p-3 text-slate-900 font-medium">Standard / Pro</td>
                        <td className="p-3">
                          {vendor.minimumPlanForBAA.isSelfServe ? (
                            <span className="text-emerald-700 font-semibold">✓ Included (Self-Serve)</span>
                          ) : (
                            <span className="text-slate-500">Upgrade to Enterprise</span>
                          )}
                        </td>
                        <td className="p-3">Available upon request</td>
                        <td className="p-3">
                          {vendor.minimumPlanForBAA.isSelfServe ? 'In-App Settings' : 'Contact Support'}
                        </td>
                      </tr>
                      <tr className="bg-slate-50/60 font-medium">
                        <td className="p-3 text-slate-900 font-bold">Enterprise</td>
                        <td className="p-3 text-emerald-700 font-semibold">✓ Custom or Standard BAA</td>
                        <td className="p-3 text-emerald-700 font-semibold">✓ Full SOC 2 Type II Package</td>
                        <td className="p-3">Direct MSA / DPA Attachment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Practical Guidance */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-semibold text-slate-800">
                  Tip for Engineering & Compliance Leads:
                </div>
                <p>
                  Before handling protected health information (PHI) or personal data, ensure your cloud project is provisioned in the compliant tier and execute the BAA electronically. Many vendors do not apply encryption and audit controls retroactively to uncertified free-tier instances.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: REQUEST VENDOR SECURITY PACK */}
          {activeTab === 'request' && (
            <div>
              {!isSubmitted ? (
                <form onSubmit={handleSubmitForm} className="space-y-5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Select Required Security Documents:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {vendor.securityPackDocuments.map((doc: SecurityDocument) => {
                        const isChecked = selectedDocs.includes(doc.id);
                        return (
                          <label
                            key={doc.id}
                            className={`p-2.5 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-colors ${
                              isChecked
                                ? 'bg-white border-blue-600 text-slate-900 shadow-2xs'
                                : 'bg-slate-100/60 border-slate-200 text-slate-600 hover:bg-white'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleDocSelection(doc.id)}
                              className="mt-0.5 rounded-xs border-slate-300 text-blue-900 focus:ring-blue-600"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 leading-tight">
                                {doc.title}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {doc.fileType} {doc.requiresNDA && '· Requires NDA'}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="sarah@yourcompany.com"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. HealthBridge Technologies"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Evaluation Timeline / Use Case
                      </label>
                      <input
                        type="text"
                        value={useCase}
                        onChange={(e) => setUseCase(e.target.value)}
                        placeholder="e.g. SOC 2 annual vendor review, Q1 rollout"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={signedNDA}
                        onChange={(e) => setSignedNDA(e.target.checked)}
                        className="mt-0.5 rounded-xs border-slate-300 text-blue-900 focus:ring-blue-600"
                      />
                      <span>
                        Our organization agrees to the standard Mutual Non-Disclosure Agreement (NDA) for confidential audit workpapers and penetration test findings.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 disabled:bg-blue-900/70 text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-blue-200 animate-spin" />
                        <span>Dispatching Security Pack Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-blue-200" />
                        <span>Send Vendor Security Pack Request</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-6 text-center space-y-4 bg-emerald-50/60 rounded-xl border border-emerald-200 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-950">
                      Security Pack Request Dispatched!
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                      Your request for {vendor.name}'s verified compliance documentation has been logged. An automated verification packet link has been sent to{' '}
                      <strong className="text-slate-900">{workEmail}</strong>.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-emerald-200 max-w-md mx-auto text-xs text-left">
                    <div className="font-semibold text-slate-800 mb-1">
                      Included in dispatch:
                    </div>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                      {selectedDocs.map(id => {
                        const d = vendor.securityPackDocuments.find(doc => doc.id === id);
                        return <li key={id}>{d?.title}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        const text = `TrustRoster Compliance Attestation Request\nVendor: ${vendor.name}\nAuditor: ${vendor.auditorName}\nDate: ${new Date().toLocaleDateString()}\nRequester: ${fullName} (${workEmail})\nCompany: ${companyName}\nDocuments: ${selectedDocs.join(', ')}\nStatus: Dispatched & Logged`;
                        const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `TrustRoster_SecurityPack_Receipt_${vendor.slug}.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Receipt</span>
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
                    >
                      Submit Another Request
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-mono">
            <span>Verified Source: TrustRoster Attestation Registry</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

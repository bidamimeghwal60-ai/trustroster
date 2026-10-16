import React from 'react';
import { Vendor } from '../types/vendor';
import { X, Check, Minus, Download, ExternalLink, Scale, Building2, ShieldCheck } from 'lucide-react';

interface CompareModalProps {
  vendors: Vendor[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveVendor: (vendorId: string) => void;
  onViewAuditDetails: (vendor: Vendor) => void;
  onClearAll: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  vendors,
  isOpen,
  onClose,
  onRemoveVendor,
  onViewAuditDetails,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const exportComparisonCSV = () => {
    if (vendors.length === 0) return;

    const headers = [
      'Vendor Name',
      'Category',
      'Minimum Plan For BAA',
      'Starting Price',
      'Self-Serve BAA',
      'SOC 2 Type II',
      'ISO 27001',
      'HIPAA Signs BAA',
      'GDPR DPA',
      'Auditor Name',
      'Last Audit Date',
      'Encryption Standard',
      'Data Residency',
      'Key Security Features'
    ];

    const rows = vendors.map(v => [
      `"${v.name}"`,
      `"${v.category}"`,
      `"${v.minimumPlanForBAA.tierName}"`,
      `"${v.minimumPlanForBAA.priceNote}"`,
      v.minimumPlanForBAA.isSelfServe ? 'Yes' : 'No',
      v.complianceBadges.some(b => b.type === 'SOC2') ? 'Yes' : 'No',
      v.complianceBadges.some(b => b.type === 'ISO27001') ? 'Yes' : 'No',
      v.complianceBadges.some(b => b.type === 'HIPAA') ? 'Yes' : 'No',
      v.gdprDPAAvailable ? 'Yes' : 'No',
      `"${v.auditorName}"`,
      `"${v.lastAuditDate}"`,
      `"${v.encryptionStandard}"`,
      `"${v.dataResidency.join(', ')}"`,
      `"${v.keyFeatures ? v.keyFeatures.join(', ') : ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `TrustRoster_Vendor_Comparison_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-slate-900 my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="compare-modal-title" className="text-xl font-bold text-white">
                Vendor Compliance Matrix Comparison
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing {vendors.length} selected B2B vendor{vendors.length === 1 ? '' : 's'} side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {vendors.length > 0 && (
              <button
                onClick={exportComparisonCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-300" />
                <span>Export CSV</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {vendors.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Scale className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-base font-semibold text-slate-700">
                No vendors selected for comparison
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Click the "Compare" button on any vendor card to add them here and evaluate their compliance posture side-by-side.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
              >
                Browse Directory
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 w-48 font-bold text-slate-500 uppercase tracking-wider bg-slate-50 sticky left-0 z-10">
                      Criteria
                    </th>
                    {vendors.map(v => (
                      <th key={v.id} className="p-3 min-w-[220px] bg-white align-top">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                              style={{ backgroundColor: v.logoBg, color: v.logoTextColor }}
                            >
                              {v.logoInitial}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm leading-tight">
                                {v.name}
                              </div>
                              <div className="text-[11px] text-slate-500 font-normal">
                                {v.category}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveVendor(v.id)}
                            className="p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {/* Row: Minimum Plan For BAA */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      Minimum Plan for BAA
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3">
                        <div className="font-bold text-slate-900">
                          {v.minimumPlanForBAA.tierName}
                        </div>
                        <div className="text-[11px] text-blue-900 font-mono font-medium">
                          {v.minimumPlanForBAA.priceNote}
                        </div>
                        <span
                          className={`inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.2 rounded-xs ${
                            v.minimumPlanForBAA.isSelfServe
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {v.minimumPlanForBAA.isSelfServe ? 'Self-Serve Sign' : 'Sales Contract Required'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Key Security & Compliance Features */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      Key Features
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3">
                        {v.keyFeatures && v.keyFeatures.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {v.keyFeatures.map((feat) => (
                              <span
                                key={feat}
                                className="text-[10px] font-medium text-slate-700 bg-slate-100 border border-slate-200/80 px-1.5 py-0.5 rounded-sm"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: HIPAA BAA */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      HIPAA (Signs BAA)
                    </td>
                    {vendors.map(v => {
                      const hasHipaa = v.complianceBadges.some(b => b.type === 'HIPAA');
                      return (
                        <td key={v.id} className="p-3">
                          {hasHipaa ? (
                            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                              <Check className="w-4 h-4 text-emerald-600" />
                              <span>Verified (Signs BAA)</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Minus className="w-4 h-4" />
                              <span>Not Supported</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: SOC 2 Type II */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      SOC 2 Type II
                    </td>
                    {vendors.map(v => {
                      const hasSoc2 = v.complianceBadges.some(b => b.type === 'SOC2');
                      return (
                        <td key={v.id} className="p-3">
                          {hasSoc2 ? (
                            <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
                              <Check className="w-4 h-4 text-blue-600" />
                              <span>Type II Certified</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Minus className="w-4 h-4" />
                              <span>None</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: ISO 27001 */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      ISO 27001
                    </td>
                    {vendors.map(v => {
                      const hasIso = v.complianceBadges.some(b => b.type === 'ISO27001');
                      return (
                        <td key={v.id} className="p-3">
                          {hasIso ? (
                            <div className="flex items-center gap-1.5 text-indigo-900 font-semibold">
                              <Check className="w-4 h-4 text-indigo-600" />
                              <span>ISO/IEC 27001</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Minus className="w-4 h-4" />
                              <span>Not Certified</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: GDPR DPA */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      GDPR & DPA
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3">
                        {v.gdprDPAAvailable ? (
                          <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>Standard DPA Available</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Minus className="w-4 h-4" />
                            <span>No</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Auditor */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      Auditor Firm
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3 font-medium text-slate-800">
                        {v.auditorName}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Last Audit Date */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      Last Audit Date
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3 font-mono text-slate-600">
                        {v.lastAuditDate}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Encryption Standards */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      Encryption
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3 text-[11px] text-slate-600">
                        {v.encryptionStandard}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Data Residency */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      Data Residency
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3 text-[11px] text-slate-700">
                        <div className="flex flex-wrap gap-1">
                          {v.dataResidency.map((region) => (
                            <span
                              key={region}
                              className="inline-block bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-xs font-mono text-[10px]"
                            >
                              {region}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Pen Test Cadence */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      Penetration Testing
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3 text-[11px] text-slate-600">
                        {v.penTestFrequency}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Action Buttons */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-900 bg-slate-50 sticky left-0">
                      Actions
                    </td>
                    {vendors.map(v => (
                      <td key={v.id} className="p-3">
                        <div className="space-y-1.5">
                          <button
                            onClick={() => {
                              onClose();
                              onViewAuditDetails(v);
                            }}
                            className="w-full py-1.5 px-2 text-center text-xs font-semibold rounded-md bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                          >
                            View Audit Details
                          </button>
                          <a
                            href={v.trustCenterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 px-2 text-center text-xs font-medium rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Trust Center</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <button
            onClick={onClearAll}
            className="text-slate-500 hover:text-red-600 transition-colors cursor-pointer font-medium"
          >
            Clear Selected Vendors
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

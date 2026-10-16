import React from 'react';
import { Vendor } from '../types/vendor';
import { Check, Minus, ExternalLink, FileBadge, Building2, Calendar, Scale } from 'lucide-react';

interface ComplianceMatrixViewProps {
  vendors: Vendor[];
  onViewAuditDetails: (vendor: Vendor) => void;
  onToggleCompare: (vendorId: string) => void;
  comparedVendorIds: string[];
}

export const ComplianceMatrixView: React.FC<ComplianceMatrixViewProps> = ({
  vendors,
  onViewAuditDetails,
  onToggleCompare,
  comparedVendorIds,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white font-semibold">
            <tr>
              <th className="p-3.5 pl-4 min-w-[200px]">Vendor & Category</th>
              <th className="p-3.5 text-center min-w-[130px]">HIPAA (BAA)</th>
              <th className="p-3.5 text-center min-w-[130px]">SOC 2 Type II</th>
              <th className="p-3.5 text-center min-w-[120px]">ISO 27001</th>
              <th className="p-3.5 text-center min-w-[110px]">GDPR DPA</th>
              <th className="p-3.5 min-w-[180px]">Minimum Plan for BAA</th>
              <th className="p-3.5 min-w-[160px]">Auditor & Date</th>
              <th className="p-3.5 text-right pr-4 min-w-[170px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {vendors.map((vendor) => {
              const hasHipaa = vendor.complianceBadges.some(b => b.type === 'HIPAA');
              const hasSoc2 = vendor.complianceBadges.some(b => b.type === 'SOC2');
              const hasIso = vendor.complianceBadges.some(b => b.type === 'ISO27001');
              const hasGdpr = vendor.gdprDPAAvailable;
              const isCompared = comparedVendorIds.includes(vendor.id);

              return (
                <tr key={vendor.id} className="hover:bg-blue-50/40 transition-colors">
                  {/* Vendor Name & Category */}
                  <td className="p-3.5 pl-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                        style={{
                          backgroundColor: vendor.logoBg,
                          color: vendor.logoTextColor,
                        }}
                      >
                        {vendor.logoInitial}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>{vendor.name}</span>
                          {vendor.featured && (
                            <span className="text-[10px] bg-blue-50 text-blue-800 px-1 py-0.2 rounded-xs border border-blue-200">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {vendor.category}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* HIPAA BAA */}
                  <td className="p-3.5 text-center">
                    {hasHipaa ? (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 font-semibold px-2 py-0.5 rounded-sm">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Signs BAA</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 inline-flex items-center gap-1">
                        <Minus className="w-3 h-3" />
                        <span>No</span>
                      </span>
                    )}
                  </td>

                  {/* SOC 2 Type II */}
                  <td className="p-3.5 text-center">
                    {hasSoc2 ? (
                      <span className="inline-flex items-center gap-1 text-blue-900 bg-blue-50 border border-blue-200 font-semibold px-2 py-0.5 rounded-sm">
                        <Check className="w-3 h-3 text-blue-600" />
                        <span>Type II</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 inline-flex items-center gap-1">
                        <Minus className="w-3 h-3" />
                        <span>No</span>
                      </span>
                    )}
                  </td>

                  {/* ISO 27001 */}
                  <td className="p-3.5 text-center">
                    {hasIso ? (
                      <span className="inline-flex items-center gap-1 text-indigo-900 bg-indigo-50 border border-indigo-200 font-semibold px-2 py-0.5 rounded-sm">
                        <Check className="w-3 h-3 text-indigo-600" />
                        <span>Certified</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 inline-flex items-center gap-1">
                        <Minus className="w-3 h-3" />
                        <span>No</span>
                      </span>
                    )}
                  </td>

                  {/* GDPR DPA */}
                  <td className="p-3.5 text-center">
                    {hasGdpr ? (
                      <span className="inline-flex items-center gap-1 text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>DPA</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 inline-flex items-center gap-1">
                        <Minus className="w-3 h-3" />
                        <span>No</span>
                      </span>
                    )}
                  </td>

                  {/* Minimum Plan for BAA */}
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900">
                      {vendor.minimumPlanForBAA.tierName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {vendor.minimumPlanForBAA.priceNote}
                    </div>
                    <span
                      className={`inline-block mt-0.5 text-[10px] font-semibold px-1 py-0.2 rounded-xs ${
                        vendor.minimumPlanForBAA.isSelfServe
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {vendor.minimumPlanForBAA.isSelfServe ? 'Self-Serve' : 'Enterprise'}
                    </span>
                  </td>

                  {/* Auditor & Date */}
                  <td className="p-3.5">
                    <div className="font-medium text-slate-800 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{vendor.auditorName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{vendor.lastAuditDate}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 pr-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleCompare(vendor.id)}
                        className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
                          isCompared
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                        title={isCompared ? 'Remove from compare' : 'Add to compare'}
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onViewAuditDetails(vendor)}
                        className="py-1 px-2.5 rounded-md bg-blue-900 text-white hover:bg-blue-800 font-semibold transition-colors flex items-center gap-1"
                      >
                        <FileBadge className="w-3.5 h-3.5" />
                        <span>Audit</span>
                      </button>

                      <a
                        href={vendor.trustCenterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Visit Trust Center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

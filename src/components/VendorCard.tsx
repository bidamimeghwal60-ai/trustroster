import React from 'react';
import { Vendor, ComplianceBadge } from '../types/vendor';
import { ExternalLink, ShieldCheck, Check, Building2, Calendar, FileBadge, CheckCircle, Scale } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
  onViewAuditDetails: (vendor: Vendor) => void;
  onToggleCompare: (vendorId: string) => void;
  isCompared: boolean;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  vendor,
  onViewAuditDetails,
  onToggleCompare,
  isCompared,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Header Card Content */}
      <div className="p-5">
        {/* Row 1: Brand & Compare Toggle */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Custom Brand Emblem */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 shadow-2xs border border-black/5"
              style={{
                backgroundColor: vendor.logoBg,
                color: vendor.logoTextColor,
              }}
              aria-label={`${vendor.name} logo`}
            >
              {vendor.logoInitial}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {vendor.name}
                </h3>
                {vendor.featured && (
                  <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-1.5 py-0.5 rounded-sm">
                    Verified Partner
                  </span>
                )}
              </div>

              {/* Clean Unboxed Metadata: Category · HQ */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="font-medium text-slate-700">{vendor.category}</span>
                <span aria-hidden="true">·</span>
                <span>{vendor.headquarters}</span>
              </div>
            </div>
          </div>

          {/* Compare Checkbox Button */}
          <button
            onClick={() => onToggleCompare(vendor.id)}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all cursor-pointer border ${
              isCompared
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-slate-50 text-slate-500 hover:text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
            title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
            aria-pressed={isCompared}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isCompared ? 'Selected' : 'Compare'}</span>
          </button>
        </div>

        {/* 1-Line Tagline */}
        <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {vendor.description}
        </p>

        {/* Compliance Badges Grid with Clear Status */}
        <div className="mt-4 pt-3.5 border-t border-slate-100">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
            <span>Verified Attestations</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {vendor.complianceBadges.map((badge: ComplianceBadge) => {
              const isVerified = badge.status === 'Verified' || badge.status === 'Certified' || badge.status === 'Current';
              return (
                <div
                  key={badge.type}
                  className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                    badge.type === 'HIPAA'
                      ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                      : badge.type === 'SOC2'
                      ? 'bg-blue-50/60 border-blue-200/80 text-blue-950'
                      : 'bg-slate-50 border-slate-200/90 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold leading-tight truncate">
                      {badge.label}
                    </span>
                    <span
                      className={`inline-flex items-center text-[10px] font-semibold px-1 py-0.2 rounded-xs shrink-0 ${
                        isVerified
                          ? 'bg-white/80 text-emerald-800 shadow-2xs'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Check className="w-2.5 h-2.5 mr-0.5" />
                      {badge.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {badge.details}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Auditor & Recency Details */}
        <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              Auditor: <strong className="font-semibold text-slate-800">{vendor.auditorName}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 shrink-0 ml-2 font-mono text-[11px]">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{vendor.lastAuditDate}</span>
          </div>
        </div>

        {/* Minimum Plan Requirement Callout */}
        <div className="mt-3 p-3 rounded-lg border border-blue-100 bg-blue-50/40 text-xs">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-slate-500 font-medium text-[11px]">
                Minimum Plan Required for Compliance & BAA:
              </div>
              <div className="text-slate-900 font-bold text-xs mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>{vendor.minimumPlanForBAA.tierName}</span>
                <span className="text-blue-900 font-mono font-semibold">
                  ({vendor.minimumPlanForBAA.priceNote})
                </span>
              </div>
            </div>

            {/* Self-serve vs Enterprise Badge */}
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0 ${
                vendor.minimumPlanForBAA.isSelfServe
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {vendor.minimumPlanForBAA.isSelfServe ? 'Self-Serve Sign' : 'Sales Contract'}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">
            {vendor.minimumPlanForBAA.details}
          </p>
        </div>
      </div>

      {/* Card Actions Footer: View Audit Details & Visit Trust Center */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onViewAuditDetails(vendor)}
          className="flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        >
          <FileBadge className="w-4 h-4 text-blue-200" />
          <span>View Audit Details</span>
        </button>

        <a
          href={vendor.trustCenterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-3 text-xs sm:text-sm font-medium rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-center gap-1.5 shrink-0"
          title={`Visit ${vendor.name} Trust Center`}
        >
          <span>Trust Center</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </a>
      </div>
    </div>
  );
};

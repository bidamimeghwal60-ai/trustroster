import React from 'react';
import { ShieldCheck, PlusCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface LeadBannerProps {
  onOpenSubmitModal: () => void;
  totalVendors?: number;
}

export const LeadBanner: React.FC<LeadBannerProps> = ({ onOpenSubmitModal, totalVendors }) => {
  return (
    <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden my-12">
      {/* Background architectural accents */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/90 border border-blue-800/60 text-xs font-semibold text-blue-300">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>{totalVendors ? `${totalVendors} Verified Vendors Indexed` : 'Vendor Directory Verification Program'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          Are you a compliant vendor? Get verified and listed on TrustRoster
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Help healthcare, fintech, and security-conscious buyers discover your compliance posture. Showcase your SOC 2 Type II, HIPAA BAA eligibility, and ISO 27001 certifications directly to buying committees.
        </p>

        {/* Action button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenSubmitModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all hover:shadow-lg cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your Vendor Listing</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Proof guarantees */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auditor report verification</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct security pack lead delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero paywalls for buyers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

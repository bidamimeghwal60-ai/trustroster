import React from 'react';
import { Search, X, CheckCircle2, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalVendors: number;
  onSelectQuickTag?: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  totalVendors,
  onSelectQuickTag,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Light Glow */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Subtle Institutional Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-medium text-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Independent Security & Attestation Registry</span>
        </div>

        {/* Clear Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto text-balance leading-tight">
          Find Verified, Compliance-Ready B2B Vendors
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto text-balance leading-relaxed">
          Search Curated & Verified B2B Tools verified for HIPAA, SOC 2 Type II, ISO 27001, and GDPR.
        </p>

        {/* Prominent Live Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white rounded-xl shadow-xl border border-slate-200/20 text-slate-900 p-1.5 focus-within:ring-3 focus-within:ring-blue-500/30 transition-all">
            <div className="pl-3.5 pr-2 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-slate-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by vendor name (e.g. Supabase, Vercel) or category..."
              className="w-full py-2.5 px-2 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
              aria-label="Search vendors by name or category"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="pr-1 hidden sm:block">
              <span className="text-xs text-slate-600 font-mono px-2 py-1 bg-slate-100 rounded-md">
                {totalVendors} indexed
              </span>
            </div>
          </div>

          {/* Quick Suggestions */}
          {onSelectQuickTag && (
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-300">
              <span className="text-slate-400">Popular searches:</span>
              <button
                onClick={() => onSelectQuickTag('Supabase')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Supabase
              </button>
              <span>·</span>
              <button
                onClick={() => onSelectQuickTag('Email & SMS')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Email & SMS
              </button>
              <span>·</span>
              <button
                onClick={() => onSelectQuickTag('Databases')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Databases
              </button>
              <span>·</span>
              <button
                onClick={() => onSelectQuickTag('Cloud & Hosting')}
                className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Cloud & Hosting
              </button>
            </div>
          )}
        </div>

        {/* Claim-to-Proof Quantitative Adjacency Strip */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Auditor Backed</div>
              <div className="text-xs text-slate-400 mt-0.5">Primary source attestations from Schellman, A-LIGN & Coalfire.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-800">
            <FileText className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Minimum Plan Transparency</div>
              <div className="text-xs text-slate-400 mt-0.5">Know whether BAA requires a $20k enterprise gate or self-serve Pro.</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Security Pack Requests</div>
              <div className="text-xs text-slate-400 mt-0.5">Direct contact forms for SOC 2 Type II reports and NDA execution.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

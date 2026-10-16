import React from 'react';
import { ComplianceFrameworkType } from '../types/vendor';
import { ShieldCheck, ArrowUpRight, Lock, CheckCircle, FileCheck, Globe, BookOpen } from 'lucide-react';

interface StandardsExplainerProps {
  onSelectFramework: (framework: ComplianceFrameworkType) => void;
}

export const StandardsExplainer: React.FC<StandardsExplainerProps> = ({ onSelectFramework }) => {
  const frameworksList = [
    {
      id: 'HIPAA' as ComplianceFrameworkType,
      title: 'HIPAA & BAA Requirements',
      shortName: 'Health Insurance Portability & Accountability Act',
      icon: ShieldCheck,
      color: 'emerald',
      summary: 'Mandates technical and administrative safeguards for electronic Protected Health Information (ePHI). A Business Associate Agreement (BAA) legally binds vendors to HIPAA compliance.',
      keyTakeaway: 'Many vendors restrict BAAs to custom $15k–$25k/yr Enterprise contracts. TrustRoster identifies tools with self-serve BAA execution on standard Pro tiers.',
      badgeLabel: 'HIPAA Signs BAA',
      criteria: [
        'End-to-end data encryption in transit & at rest',
        'Strict role-based access & immutable audit logging',
        'Signed Business Associate Agreement (BAA)',
        'Mandatory 60-day security breach notification protocol'
      ]
    },
    {
      id: 'SOC2' as ComplianceFrameworkType,
      title: 'SOC 2 Type II vs. Type I',
      shortName: 'AICPA Trust Services Criteria',
      icon: FileCheck,
      color: 'blue',
      summary: 'Type I audits only attest that security controls were designed properly at a single point in time. Type II audits verify that controls operated effectively over a 6 to 12-month period.',
      keyTakeaway: 'All vendors indexed under SOC 2 on TrustRoster have completed Type II operational examinations conducted by accredited CPA firms.',
      badgeLabel: 'SOC 2 Type II',
      criteria: [
        'Security: Perimeter firewalls, 2FA/MFA & endpoint defense',
        'Availability: Disaster recovery, failover SLAs & redundancy',
        'Confidentiality: Data segregation & least-privilege access',
        'Annual recurring third-party CPA verification'
      ]
    },
    {
      id: 'ISO27001' as ComplianceFrameworkType,
      title: 'ISO/IEC 27001 ISMS Certification',
      shortName: 'International Security Management Standard',
      icon: Lock,
      color: 'indigo',
      summary: 'The premier globally recognized specification for an Information Security Management System (ISMS), covering 93 comprehensive Annex A controls across organizational and physical safeguards.',
      keyTakeaway: 'Recognized worldwide across EU, APAC, and North America; audited by accredited certification bodies like Schellman, BSI, and Bureau Veritas.',
      badgeLabel: 'ISO 27001',
      criteria: [
        'Documented risk assessment & treatment methodology',
        'Continuous threat assessment & vulnerability management',
        'Independent registrar certification (valid for 3 years)',
        'Comprehensive supply chain & vendor governance'
      ]
    },
    {
      id: 'GDPR' as ComplianceFrameworkType,
      title: 'GDPR & Data Processing Addendums',
      shortName: 'General Data Protection Regulation',
      icon: Globe,
      color: 'sky',
      summary: 'Enforces strict requirements on how personal data of EU residents is collected, stored, and transferred. Requires Article 28 Data Processing Addendums (DPA) and Standard Contractual Clauses (SCC).',
      keyTakeaway: 'TrustRoster tracks which cloud vendors provide EU data residency pinning to comply with Schrems II transatlantic transfer rulings.',
      badgeLabel: 'GDPR Compliant',
      criteria: [
        'Article 28 compliant Data Processing Addendum (DPA)',
        'EU regional data residency pinning options',
        'Right to erasure (GDPR Art. 17) & portability APIs',
        'EU-US Data Privacy Framework (DPF) adherence'
      ]
    }
  ];

  return (
    <section id="frameworks" className="py-14 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-900 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>Compliance Standards Playbook</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Understanding B2B Security & Compliance Frameworks
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Not all compliance badges are created equal. Click any framework below to instantly filter the directory to verified providers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frameworksList.map((fw) => {
            const IconComponent = fw.icon;
            return (
              <div
                key={fw.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon + Title + Direct Filter Link */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-900 shrink-0 group-hover:bg-blue-50 transition-colors">
                        <IconComponent className="w-5 h-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug">
                          {fw.title}
                        </h3>
                        <div className="text-xs text-slate-500 font-medium">
                          {fw.shortName}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectFramework(fw.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                      title={`Filter directory for ${fw.title}`}
                    >
                      <span>Filter</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {fw.summary}
                  </p>

                  {/* Key Takeaway Callout */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                    <strong className="text-slate-900 font-semibold">Buyer Insight: </strong>
                    <span>{fw.keyTakeaway}</span>
                  </div>

                  {/* Core Verification Criteria */}
                  <div className="mt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Core Verification Criteria
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {fw.criteria.map((crit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">
                    Badge: <strong className="text-slate-800">{fw.badgeLabel}</strong>
                  </span>
                  <button
                    onClick={() => onSelectFramework(fw.id)}
                    className="font-semibold text-blue-900 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    View Verified Tools →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

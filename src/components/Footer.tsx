import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenSubmitModal: () => void;
  onFilterFramework: (framework: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubmitModal, onFilterFramework }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Wordmark & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-6 h-6 rounded-md bg-blue-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-blue-300" />
              </div>
              <span>TrustRoster</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The verified B2B compliance directory. Independent indexing of cloud tools verified for HIPAA, SOC 2 Type II, ISO 27001, and GDPR.
            </p>
          </div>

          {/* Col 2: Compliance Frameworks */}
          <div className="space-y-2.5">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">
              Frameworks
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onFilterFramework('HIPAA')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  HIPAA (Signs BAA) Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterFramework('SOC2')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  SOC 2 Type II Verified Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterFramework('ISO27001')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  ISO 27001 ISMS Certified
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterFramework('GDPR')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  GDPR & EU Data Protection
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Independent Auditors */}
          <div className="space-y-2.5">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">
              Auditor Sources
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>Schellman & Company</li>
              <li>A-LIGN Compliance</li>
              <li>Coalfire Systems</li>
              <li>Ernst & Young LLP</li>
              <li>Johanson Group LLP</li>
            </ul>
          </div>

          {/* Col 4: Vendors & Community */}
          <div className="space-y-2.5">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">
              For Vendors
            </div>
            <p className="text-slate-400 text-xs">
              List your verified attestation and receive direct buyer security review requests.
            </p>
            <button
              onClick={onOpenSubmitModal}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-800 transition-colors"
            >
              Submit Your Tool
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} TrustRoster. All company names, logos, and trademarks remain the property of their respective owners.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Methodology</span>
            <span>·</span>
            <span>Security Attestation Verification</span>
            <span>·</span>
            <span>Privacy Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

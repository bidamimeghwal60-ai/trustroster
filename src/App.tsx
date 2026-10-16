import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_VENDORS } from './data/vendors';
import { Vendor, ComplianceFrameworkType, SecurityPackRequest } from './types/vendor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { VendorCard } from './components/VendorCard';
import { AuditModal } from './components/AuditModal';
import { CompareModal } from './components/CompareModal';
import { ListVendorModal } from './components/ListVendorModal';
import { ComplianceMatrixView } from './components/ComplianceMatrixView';
import { StandardsExplainer } from './components/StandardsExplainer';
import { LeadBanner } from './components/LeadBanner';
import { Footer } from './components/Footer';
import { Scale, X, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Vendor dataset state (persists additions during session)
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFrameworks, setSelectedFrameworks] = useState<ComplianceFrameworkType[]>([]);
  const [selfServeBAAOnly, setSelfServeBAAOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'certifications' | 'alphabetical' | 'recentAudit' | 'lowestCost'>('relevance');
  const [currentView, setCurrentView] = useState<'grid' | 'matrix'>('grid');

  // Modal states
  const [selectedAuditVendor, setSelectedAuditVendor] = useState<Vendor | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Comparison tray state
  const [comparedVendorIds, setComparedVendorIds] = useState<string[]>([]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // URL Deep-Linking & History Synchronization for SEO & Sharability
  useEffect(() => {
    const handleUrlStateSync = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const vendorParam = params.get('vendor');
        if (vendorParam) {
          const matched = vendors.find(
            (v) =>
              v.slug.toLowerCase() === vendorParam.toLowerCase() ||
              v.id.toLowerCase() === vendorParam.toLowerCase()
          );
          if (matched) {
            setSelectedAuditVendor(matched);
            setIsAuditModalOpen(true);
          }
        } else {
          setIsAuditModalOpen(false);
        }
      } catch (err) {
        // Browser environment safety
      }
    };

    handleUrlStateSync();

    window.addEventListener('popstate', handleUrlStateSync);
    return () => {
      window.removeEventListener('popstate', handleUrlStateSync);
    };
  }, [vendors]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  // Toggle Framework Filter
  const handleToggleFramework = (fw: ComplianceFrameworkType) => {
    setSelectedFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((item) => item !== fw) : [...prev, fw]
    );
  };

  // Toggle Comparison Item
  const handleToggleCompare = (vendorId: string) => {
    setComparedVendorIds((prev) => {
      if (prev.includes(vendorId)) {
        return prev.filter((id) => id !== vendorId);
      } else {
        if (prev.length >= 4) {
          showToast('You can compare up to 4 vendors at a time.');
          return prev;
        }
        showToast('Added vendor to comparison.');
        return [...prev, vendorId];
      }
    });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFrameworks([]);
    setSelfServeBAAOnly(false);
    setSortBy('relevance');
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
      selectedCategory !== 'All' ||
      selectedFrameworks.length > 0 ||
      selfServeBAAOnly ||
      sortBy !== 'relevance'
  );

  // Filtered & Sorted Vendors
  const filteredVendors = useMemo(() => {
    return vendors
      .filter((v) => {
        // Search query match (name, tagline, description, category, auditor)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = v.name.toLowerCase().includes(q);
          const matchesCategory = v.category.toLowerCase().includes(q);
          const matchesTagline = v.tagline.toLowerCase().includes(q);
          const matchesAuditor = v.auditorName.toLowerCase().includes(q);
          const matchesBadge = v.complianceBadges.some((b) =>
            b.label.toLowerCase().includes(q)
          );

          if (!matchesName && !matchesCategory && !matchesTagline && !matchesAuditor && !matchesBadge) {
            return false;
          }
        }

        // Category match
        if (selectedCategory !== 'All') {
          if (v.category !== selectedCategory) {
            return false;
          }
        }

        // Frameworks match (Vendor must have ALL selected frameworks)
        if (selectedFrameworks.length > 0) {
          const vendorFrameworkTypes = v.complianceBadges.map((b) => b.type);
          const hasAllFrameworks = selectedFrameworks.every((reqFw) =>
            vendorFrameworkTypes.includes(reqFw)
          );
          if (!hasAllFrameworks) {
            return false;
          }
        }

        // Self-serve BAA filter
        if (selfServeBAAOnly) {
          if (!v.minimumPlanForBAA.isSelfServe) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'certifications') {
          return b.complianceBadges.length - a.complianceBadges.length;
        }
        if (sortBy === 'alphabetical') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'recentAudit') {
          return b.lastAuditDate.localeCompare(a.lastAuditDate);
        }
        // Default: featured first, then name
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [vendors, searchQuery, selectedCategory, selectedFrameworks, selfServeBAAOnly, sortBy]);

  // Selected compare vendors objects
  const comparedVendors = useMemo(() => {
    return vendors.filter((v) => comparedVendorIds.includes(v.id));
  }, [vendors, comparedVendorIds]);

  // Handlers with URL synchronization
  const handleOpenAudit = (vendor: Vendor) => {
    setSelectedAuditVendor(vendor);
    setIsAuditModalOpen(true);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('vendor', vendor.slug || vendor.id);
      window.history.pushState({ vendor: vendor.slug || vendor.id }, '', url.toString());
    } catch (err) {
      // browser environment safety
    }
  };

  const handleCloseAudit = () => {
    setIsAuditModalOpen(false);
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('vendor')) {
        url.searchParams.delete('vendor');
        const newUrl = url.pathname + (url.search ? url.search : '') + url.hash;
        window.history.pushState({}, '', newUrl);
      }
    } catch (err) {
      // browser environment safety
    }
  };

  const handleSelectFrameworkFromStandards = (framework: ComplianceFrameworkType) => {
    setSelectedFrameworks([framework]);
    const target = document.getElementById('directory-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleAddNewVendor = (newVendor: Vendor) => {
    setVendors((prev) => [newVendor, ...prev]);
    showToast(`${newVendor.name} successfully listed on TrustRoster!`);
  };

  const handleSecurityPackRequest = (request: SecurityPackRequest) => {
    showToast(`Security Pack requested for ${request.vendorName}. Details sent to ${request.workEmail}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium py-3 px-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract (3 Zones) */}
      <Header
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        selectedCompareCount={comparedVendorIds.length}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with prominent live search */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalVendors={vendors.length}
          onSelectQuickTag={(tag) => {
            if (['Cloud & Hosting', 'Databases & Storage', 'Email & SMS'].includes(tag)) {
              setSelectedCategory(tag);
            } else {
              setSearchQuery(tag);
            }
          }}
        />

        {/* Filter Bar with category tabs & compliance chips */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedFrameworks={selectedFrameworks}
          onToggleFramework={handleToggleFramework}
          selfServeBAAOnly={selfServeBAAOnly}
          onToggleSelfServeBAA={() => setSelfServeBAAOnly((prev) => !prev)}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          resultsCount={filteredVendors.length}
          totalCount={vendors.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        {/* Directory Section */}
        <div id="directory-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24">
          {/* Active Filters Summary Pill Ribbon */}
          {hasActiveFilters && (
            <div className="mb-6 p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-500">Active Filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedFrameworks.map((fw) => (
                <span key={fw} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200">
                  {fw}
                  <button onClick={() => handleToggleFramework(fw)} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selfServeBAAOnly && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                  Self-Serve BAA Only
                  <button onClick={() => setSelfServeBAAOnly(false)} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="ml-auto text-blue-900 hover:text-blue-700 font-semibold underline underline-offset-2"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Vendors View (Grid vs Matrix) */}
          {filteredVendors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No compliance-ready vendors matched your criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Try widening your search terms or clearing specific framework filters.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-xs"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          ) : currentView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onViewAuditDetails={handleOpenAudit}
                  onToggleCompare={handleToggleCompare}
                  isCompared={comparedVendorIds.includes(vendor.id)}
                />
              ))}
            </div>
          ) : (
            <ComplianceMatrixView
              vendors={filteredVendors}
              onViewAuditDetails={handleOpenAudit}
              onToggleCompare={handleToggleCompare}
              comparedVendorIds={comparedVendorIds}
            />
          )}

          {/* Dedicated Standards Explainer Section */}
          <StandardsExplainer onSelectFramework={handleSelectFrameworkFromStandards} />

          {/* Lead Generation / List Your Tool Banner */}
          <LeadBanner onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />
        </div>
      </main>

      {/* Floating Bottom Comparison Tray Bar (When 1+ items selected) */}
      {comparedVendorIds.length > 0 && (
        <aside
          aria-label="Vendor comparison tray"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 p-3 sm:px-5 sm:py-3 max-w-xl w-[92%] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                <span>{comparedVendorIds.length} Vendor{comparedVendorIds.length > 1 ? 's' : ''} Selected</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  ({comparedVendors.map((v) => v.name).join(', ')})
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Compare HIPAA BAA tiers and audit scopes
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setComparedVendorIds([])}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-md transition-colors"
            >
              Clear
            </button>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Interactive Audit Modal with URL Param Sync */}
      <AuditModal
        vendor={selectedAuditVendor}
        isOpen={isAuditModalOpen}
        onClose={handleCloseAudit}
        onRequestSecurityPack={handleSecurityPackRequest}
      />

      {/* Side-by-Side Comparison Modal */}
      <CompareModal
        vendors={comparedVendors}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveVendor={handleToggleCompare}
        onViewAuditDetails={handleOpenAudit}
        onClearAll={() => setComparedVendorIds([])}
      />

      {/* List Your Tool / Lead Gen Modal */}
      <ListVendorModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitVendor={handleAddNewVendor}
      />

      {/* Quiet, Clean Institutional Footer */}
      <Footer
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onFilterFramework={(fw) => {
          setSelectedFrameworks([fw]);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

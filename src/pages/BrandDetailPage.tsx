import { useParams, Link } from 'react-router-dom';
import { brandProductMap } from '../data/brands';
import { drugMap } from '../data/drugs';
import { genericPriceMap } from '../data/brands';
import type { BrandIngredient, DrugId } from '../types';
import { SEOHead } from '../components/seo/SEOHead';
import { BrandProductStructuredData } from '../components/seo/StructuredData';
import {
  brandPageTitle,
  brandPageDescription,
  generateFAQItems,
  ingredientSummary,
  genericCostPerDose,
  productTypeLabel,
} from '../utils/seo';

const TYPE_COLORS: Record<string, string> = {
  night: 'bg-indigo-100 text-indigo-700',
  pm: 'bg-purple-100 text-purple-700',
  day: 'bg-amber-100 text-amber-700',
  combo: 'bg-blue-100 text-blue-700',
  single: 'bg-gray-100 text-gray-600',
};

function calcPills(ing: BrandIngredient) {
  const id = ing.drugId || ing.substituteId;
  if (!id) return null;
  const kitPill = genericPriceMap.get(id);
  if (!kitPill || kitPill.strengthMg === 0) return null;
  const pills = Math.max(1, Math.round(ing.amountMg / kitPill.strengthMg));
  const actualMg = pills * kitPill.strengthMg;
  const exactMatch = Math.abs(actualMg - ing.amountMg) < 1;
  return { pills, exactMatch, kitPill, drugId: id as DrugId };
}

export function BrandDetailPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const product = brandId ? brandProductMap.get(brandId) : undefined;

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <SEOHead
          title="Product Not Found"
          description="This brand product could not be found on Cold Plan."
          path={`/brands/${brandId || ''}`}
          noindex
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-6">
          We could not find a product matching that URL.
        </p>
        <Link
          to="/brands"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Browse All Brand Products
        </Link>
      </div>
    );
  }

  const typeColor = TYPE_COLORS[product.type] || TYPE_COLORS.combo;
  const faqItems = generateFAQItems(product);
  const cost = genericCostPerDose(product);
  const allHaveGeneric = product.ingredients.every((i) => i.drugId || i.substituteId);

  const costPerDoseStr =
    cost.low < 1
      ? `${Math.round(cost.low * 100)}-${Math.round(cost.high * 100)} cents`
      : `$${cost.low.toFixed(2)}-$${cost.high.toFixed(2)}`;

  const brandCostPerDose = `$${product.priceRange[0]}-$${product.priceRange[1]}`;

  return (
    <div className="max-w-2xl mx-auto">
      <SEOHead
        title={brandPageTitle(product)}
        description={brandPageDescription(product)}
        path={`/brands/${product.id}`}
      />
      <BrandProductStructuredData
        brandName={product.name}
        genericDescription={`Generic equivalent of ${product.name}: ${ingredientSummary(product)}. Build the same dose from bulk generics for a fraction of the cost.`}
        brandPrice={product.priceRange}
        url={`https://cold-plan-app.web.app/brands/${product.id}`}
        faqItems={faqItems}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-400">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/brands" className="hover:text-blue-600 transition-colors">Brands</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      {/* Hero section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${typeColor}`}>
            {productTypeLabel(product.type)}
          </span>
          <span className="text-sm text-gray-400">{product.manufacturer}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {product.name} — Generic Equivalent
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {product.name} is marketed for <strong>{product.purpose.toLowerCase()}</strong>.
          It contains <strong>{product.ingredients.length} active ingredient{product.ingredients.length > 1 ? 's' : ''}</strong> that
          are all available as inexpensive generics.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
            <span className="text-red-500 font-bold">Brand price:</span>
            <span className="text-red-600 font-bold line-through">{brandCostPerDose}/box</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600 font-bold">Generic dose:</span>
            <span className="text-green-700 font-bold">{costPerDoseStr}/dose</span>
          </div>
        </div>
      </div>

      {/* What's Inside */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          What's Inside {product.name}?
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Every dose of {product.name} ({product.dosing.form}, {product.dosing.amount}) contains these active ingredients:
        </p>
        <div className="space-y-3">
          {product.ingredients.map((ing, i) => {
            const generic = ing.drugId ? drugMap.get(ing.drugId) : null;
            const substitute = ing.substituteId ? drugMap.get(ing.substituteId) : null;
            const hasGeneric = !!generic;
            const hasSubstitute = !hasGeneric && !!substitute;

            return (
              <div key={i} className="p-4 rounded-xl bg-white border border-gray-200">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="font-semibold text-gray-900">{ing.name}</span>
                    <span className="text-sm text-gray-400 ml-2">{ing.amount}</span>
                  </div>
                  {hasGeneric && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Generic available
                    </span>
                  )}
                  {hasSubstitute && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 shrink-0">
                      Substitute available
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">{ing.purpose}</p>
                {hasGeneric && generic && (
                  <div className="p-2.5 rounded-lg bg-green-50 border border-green-100">
                    <p className="text-sm text-green-800">
                      <span className="font-bold">Generic name:</span> {generic.genericName}
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      You know it as store-brand {generic.brandName}. Same active ingredient, same dose.
                    </p>
                  </div>
                )}
                {hasSubstitute && substitute && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                    <p className="text-sm text-amber-800">
                      <span className="font-bold">Close substitute:</span> {substitute.genericName}
                    </p>
                    {ing.substituteNote && (
                      <p className="text-xs text-amber-600 mt-0.5">{ing.substituteNote}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* The Generic Recipe */}
      <section className="mb-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
            </svg>
            <h2 className="text-xl font-bold text-green-800">The Generic Recipe</h2>
          </div>
          <p className="text-sm text-green-600 mb-4">
            To match one dose of {product.name}, take these generic pills:
          </p>

          {allHaveGeneric ? (
            <>
              <div className="space-y-2 mb-4">
                {product.ingredients.map((ing, i) => {
                  const result = calcPills(ing);
                  if (!result) return null;
                  const displayDrug = drugMap.get(result.drugId);
                  if (!displayDrug) return null;
                  const isSubstitute = !ing.drugId && !!ing.substituteId;

                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-green-200">
                      <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex flex-col items-center justify-center shrink-0">
                        <span className="text-lg font-black leading-none">{result.pills}</span>
                        <span className="text-[8px] font-medium leading-none">{result.kitPill?.form || 'pill'}{result.pills > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-gray-900 text-sm">{result.kitPill?.label}</span>
                          {isSubstitute && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700">SUB</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {result.pills} &times; {result.kitPill?.strengthMg}mg = {result.pills * (result.kitPill?.strengthMg || 0)}mg
                          {!result.exactMatch && (
                            <span className="text-amber-600"> (brand uses {ing.amountMg}mg)</span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-lg bg-white border border-green-200 mb-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Take this combo:</span>
                    <span className="text-gray-700 font-medium ml-1">{product.dosing.frequency}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Max:</span>
                    <span className="text-gray-700 font-medium ml-1">{product.dosing.maxDaily}</span>
                  </div>
                </div>
              </div>

              {(() => {
                const totalPills = product.ingredients
                  .map((ing) => calcPills(ing))
                  .filter(Boolean)
                  .reduce((sum, r) => sum + (r?.pills || 0), 0);
                return (
                  <p className="text-sm text-green-700 font-medium">
                    Total: {totalPills} pill{totalPills > 1 ? 's' : ''} per dose — same active ingredients as {product.name}.
                  </p>
                );
              })()}
            </>
          ) : (
            <p className="text-sm text-amber-700">
              This product contains ingredients not available as standalone generics. Partial substitution is possible — see the ingredients above.
            </p>
          )}
        </div>
      </section>

      {/* Price Comparison */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Price Comparison</h2>
        <div className="p-5 rounded-xl bg-white border border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Brand-name box ({product.name}):</span>
              <span className="font-bold text-red-500 text-lg">{brandCostPerDose}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Generic equivalent per dose (from bulk):</span>
              <span className="font-bold text-green-600 text-lg">{costPerDoseStr}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Savings per cold episode (7 days):</span>
              <span className="font-bold text-green-700 text-lg">
                ~${(product.priceRange[0] - cost.high * 28).toFixed(0)}+
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Generic prices based on bulk bottles from Amazon. A single bulk purchase covers many cold episodes.
          </p>
        </div>
      </section>

      {/* Label Dosing */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Dosing Information</h2>
        <div className="p-4 rounded-xl bg-white border border-gray-200">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-400 block text-xs mb-0.5">Form</span>
              <span className="text-gray-900 font-medium">{product.dosing.form}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-xs mb-0.5">Dose</span>
              <span className="text-gray-900 font-medium">{product.dosing.amount}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-xs mb-0.5">Frequency</span>
              <span className="text-gray-900 font-medium">{product.dosing.frequency}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-xs mb-0.5">Maximum daily</span>
              <span className="text-gray-900 font-medium">{product.dosing.maxDaily}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-gray-200 bg-white">
              <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 hover:text-blue-700 transition-colors">
                {faq.question}
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mb-8">
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Ready to build your own cold kit?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get a personalized plan based on your actual symptoms, or shop a pre-built kit with everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/planner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Build My Plan
            </Link>
            <Link
              to="/kits"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors"
            >
              Shop Kits
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Disclaimer:</strong> This information is for educational purposes only and is not medical advice.
          Generic drugs contain the same active ingredients as their brand-name counterparts.
          Always read the label and consult a doctor or pharmacist before starting any medication.
        </p>
      </div>

      {/* Back to brands */}
      <Link
        to="/brands"
        className="block w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-center"
      >
        Back to All Brands
      </Link>
    </div>
  );
}

import { useState, useMemo } from 'react';
import type { BrandProduct, BrandIngredient, DrugId } from '../types';
import { brandProducts, genericPriceMap } from '../data/brands';
import { drugMap } from '../data/drugs';
import { trackEvent } from '../firebase';

/**
 * Calculate how many kit pills to take to match a brand ingredient.
 * Returns { pills, exactMatch, kitLabel }.
 */
function calcPills(ing: BrandIngredient): {
  pills: number;
  exactMatch: boolean;
  kitPill: ReturnType<typeof genericPriceMap.get> | undefined;
  drugId: DrugId;
} | null {
  const id = ing.drugId || ing.substituteId;
  if (!id) return null;
  const kitPill = genericPriceMap.get(id);
  if (!kitPill || kitPill.strengthMg === 0) return null;

  const targetMg = ing.amountMg;
  const pills = Math.round(targetMg / kitPill.strengthMg);
  const actualMg = pills * kitPill.strengthMg;
  const exactMatch = Math.abs(actualMg - targetMg) < 1;

  return { pills: Math.max(1, pills), exactMatch, kitPill, drugId: id };
}

interface Props {
  onBack: () => void;
  onStartOver: () => void;
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  night: { label: 'Nighttime', color: 'bg-indigo-100 text-indigo-700' },
  pm: { label: 'PM / Sleep', color: 'bg-purple-100 text-purple-700' },
  day: { label: 'Daytime', color: 'bg-amber-100 text-amber-700' },
  combo: { label: 'Multi-Symptom', color: 'bg-blue-100 text-blue-700' },
  single: { label: 'Single Drug', color: 'bg-gray-100 text-gray-600' },
};

/* TYPE_ORDER reserved for future sorting */

function IngredientRow({ ing }: { ing: BrandIngredient }) {
  const generic = ing.drugId ? drugMap.get(ing.drugId) : null;
  const substitute = ing.substituteId ? drugMap.get(ing.substituteId) : null;
  const hasGeneric = !!generic;
  const hasSubstitute = !hasGeneric && !!substitute;

  return (
    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <span className="font-medium text-gray-900 text-sm">{ing.name}</span>
          <span className="text-xs text-gray-400 ml-2">{ing.amount}</span>
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
      <p className="text-xs text-gray-500">{ing.purpose}</p>

      {hasGeneric && generic && (
        <div className="mt-2 p-2 rounded bg-green-50 border border-green-100">
          <p className="text-xs text-green-800">
            <span className="font-bold">Generic:</span> {generic.genericName} (store brand {generic.brandName}) — take {ing.amount} per dose
          </p>
        </div>
      )}
      {hasSubstitute && substitute && (
        <div className="mt-2 p-2 rounded bg-amber-50 border border-amber-100">
          <p className="text-xs text-amber-800">
            <span className="font-bold">Substitute:</span> {substitute.genericName}
          </p>
          {ing.substituteNote && (
            <p className="text-[11px] text-amber-600 mt-0.5">{ing.substituteNote}</p>
          )}
        </div>
      )}
    </div>
  );
}

function BrandDetailCard({ product, onClose }: { product: BrandProduct; onClose: () => void }) {
  const typeInfo = TYPE_LABELS[product.type] || TYPE_LABELS.combo;
  const allHaveGeneric = product.ingredients.every((i) => i.drugId || i.substituteId);

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="p-5 rounded-t-2xl bg-gradient-to-r from-gray-50 to-white border-2 border-b-0 border-gray-200">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">{product.manufacturer}</span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${typeInfo.color}`}>
                {typeInfo.label}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600">{product.purpose}</p>
      </div>

      {/* Label dosing */}
      <div className="p-4 border-x-2 border-gray-200 bg-white">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Label Directions</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-400">Form:</span> <span className="text-gray-700">{product.dosing.form}</span></div>
          <div><span className="text-gray-400">Dose:</span> <span className="text-gray-700">{product.dosing.amount}</span></div>
          <div><span className="text-gray-400">Frequency:</span> <span className="text-gray-700">{product.dosing.frequency}</span></div>
          <div><span className="text-gray-400">Max daily:</span> <span className="text-gray-700">{product.dosing.maxDaily}</span></div>
        </div>
      </div>

      {/* What's inside */}
      <div className="p-4 border-x-2 border-gray-200 bg-white">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          What's Inside ({product.ingredients.length} active ingredient{product.ingredients.length > 1 ? 's' : ''})
        </h4>
        <div className="space-y-2">
          {product.ingredients.map((ing, i) => (
            <IngredientRow key={i} ing={ing} />
          ))}
        </div>
      </div>

      {/* Make Your Own — The Recipe */}
      <div className="p-5 rounded-b-2xl border-2 border-t-0 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
          </svg>
          <h4 className="font-bold text-green-800">The Recipe</h4>
        </div>
        <p className="text-xs text-green-600 mb-3">From your Cold Plan Kit, take these pills to match one dose of {product.name}:</p>

        {allHaveGeneric ? (
          <>
            <div className="space-y-2 mb-3">
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
                      {isSubstitute && ing.substituteNote && (
                        <p className="text-[10px] text-amber-600 mt-0.5">{ing.substituteNote}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dosing instructions */}
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

            {/* Total pill count per dose */}
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

        <div className="mt-3 pt-3 border-t border-green-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">Brand price per box:</span>
          <span className="text-sm font-bold text-red-500 line-through">${product.priceRange[0]}&ndash;${product.priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

/** Brand groups in display order */
const BRAND_ORDER = ['Vicks', 'Advil', 'Tylenol', 'Mucinex', 'Theraflu', 'Robitussin', 'Sudafed', 'Bayer', 'Johnson & Johnson'];

function groupByBrand(products: BrandProduct[]): { brand: string; products: BrandProduct[] }[] {
  const map = new Map<string, BrandProduct[]>();
  for (const p of products) {
    const list = map.get(p.manufacturer) || [];
    list.push(p);
    map.set(p.manufacturer, list);
  }
  // Sort brands by our preferred order, unknowns at end
  return Array.from(map.entries())
    .sort(([a], [b]) => {
      const ai = BRAND_ORDER.indexOf(a);
      const bi = BRAND_ORDER.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })
    .map(([brand, products]) => ({ brand, products }));
}

function QuickRecipe({ product }: { product: BrandProduct }) {
  const pills = product.ingredients.map((ing) => calcPills(ing)).filter(Boolean);
  if (pills.length === 0) return null;
  const total = pills.reduce((s, r) => s + (r?.pills || 0), 0);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1">
      <span className="text-[10px] text-green-600 font-bold uppercase mr-0.5">Recipe:</span>
      {pills.map((r, i) => {
        if (!r) return null;
        return (
          <span key={i} className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium">
            {r.pills}&times; {r.kitPill?.label.replace(/ (tablets|gelcaps|lozenges)/, '')}
          </span>
        );
      })}
      <span className="text-[10px] text-green-600">= {total} pills</span>
    </div>
  );
}

export function BrandLookup({ onBack, onStartOver }: Props) {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return brandProducts;
    const q = search.toLowerCase().trim();
    return brandProducts.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.manufacturer.toLowerCase().includes(q) ||
        b.purpose.toLowerCase().includes(q) ||
        b.ingredients.some((i) => i.name.toLowerCase().includes(q))
    );
  }, [search]);

  const brandGroups = useMemo(() => groupByBrand(filtered), [filtered]);
  const selectedProduct = selectedId ? brandProducts.find((b) => b.id === selectedId) : null;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        What's Really In Your Cold Medicine?
      </h2>
      <p className="text-gray-500 mb-6">
        Every brand-name remedy is just a combination of a few generic drugs. Pick any product below to see the recipe — what's inside and how to make it yourself.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSelectedId(null); }}
          placeholder="Search NyQuil, Advil PM, Mucinex, acetaminophen..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-gray-900 placeholder-gray-400 bg-white"
        />
      </div>

      {/* Selected product detail */}
      {selectedProduct && (
        <BrandDetailCard
          product={selectedProduct}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* Brand-grouped product list */}
      {!selectedProduct && (
        <div className="space-y-6 mb-6">
          {brandGroups.map(({ brand, products }) => (
            <div key={brand}>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                {brand}
              </h3>
              <div className="space-y-2">
                {products.map((product) => {
                  const typeInfo = TYPE_LABELS[product.type] || TYPE_LABELS.combo;
                  return (
                    <button
                      key={product.id}
                      onClick={() => { setSelectedId(product.id); trackEvent('view_brand', { brand_id: product.id, brand_name: product.name }); }}
                      className="w-full text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {product.name}
                            </span>
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${typeInfo.color}`}>
                              {typeInfo.label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{product.purpose}</p>
                          <QuickRecipe product={product} />
                        </div>
                        <div className="flex items-center gap-2 shrink-0 mt-1">
                          <span className="text-sm font-bold text-red-500">${product.priceRange[0]}&ndash;{product.priceRange[1]}</span>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {brandGroups.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg mb-1">No products found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onStartOver}
          className="flex-[2] py-3 rounded-xl font-semibold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { BrandProduct, BrandIngredient, DrugId } from '../types';
import { brandProducts, genericPriceMap } from '../data/brands';
import { SEOHead } from '../components/seo/SEOHead';
import { trackEvent } from '../firebase';

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  night: { label: 'Nighttime', color: 'bg-indigo-100 text-indigo-700' },
  pm: { label: 'PM / Sleep', color: 'bg-purple-100 text-purple-700' },
  day: { label: 'Daytime', color: 'bg-amber-100 text-amber-700' },
  combo: { label: 'Multi-Symptom', color: 'bg-blue-100 text-blue-700' },
  single: { label: 'Single Drug', color: 'bg-gray-100 text-gray-600' },
};

const BRAND_ORDER = ['Vicks', 'Advil', 'Tylenol', 'Mucinex', 'Theraflu', 'Robitussin', 'Sudafed', 'Bayer', 'Johnson & Johnson'];

function calcPills(ing: BrandIngredient): {
  pills: number;
  kitPill: ReturnType<typeof genericPriceMap.get> | undefined;
  drugId: DrugId;
} | null {
  const id = ing.drugId || ing.substituteId;
  if (!id) return null;
  const kitPill = genericPriceMap.get(id);
  if (!kitPill || kitPill.strengthMg === 0) return null;
  const pills = Math.round(ing.amountMg / kitPill.strengthMg);
  return { pills: Math.max(1, pills), kitPill, drugId: id };
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

function groupByBrand(products: BrandProduct[]): { brand: string; products: BrandProduct[] }[] {
  const map = new Map<string, BrandProduct[]>();
  for (const p of products) {
    const list = map.get(p.manufacturer) || [];
    list.push(p);
    map.set(p.manufacturer, list);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => {
      const ai = BRAND_ORDER.indexOf(a);
      const bi = BRAND_ORDER.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })
    .map(([brand, products]) => ({ brand, products }));
}

export function BrandsPage() {
  const [search, setSearch] = useState('');

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

  return (
    <div className="max-w-2xl mx-auto">
      <SEOHead
        title="Brand-Name Cold Medicine Ingredients — Generic Alternatives for Every Product"
        description="See what's really inside NyQuil, DayQuil, Advil PM, Mucinex, and 20+ brand-name cold medicines. Find the generic equivalent and DIY recipe for each one. Save 50-90% on OTC cold relief."
        path="/brands"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-400">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Brands</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        What's Really In Your Cold Medicine?
      </h1>
      <p className="text-gray-500 mb-6">
        Every brand-name cold remedy is just a combination of a few generic drugs.
        Pick any product below to see the exact ingredients and how to build the
        same dose from cheap generics.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search NyQuil, Advil PM, Mucinex, acetaminophen..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-gray-900 placeholder-gray-400 bg-white"
        />
      </div>

      {/* Brand-grouped product list */}
      <div className="space-y-6 mb-6">
        {brandGroups.map(({ brand, products }) => (
          <div key={brand}>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
              {brand}
            </h2>
            <div className="space-y-2">
              {products.map((product) => {
                const typeInfo = TYPE_LABELS[product.type] || TYPE_LABELS.combo;
                return (
                  <Link
                    key={product.id}
                    to={`/brands/${product.id}`}
                    onClick={() => trackEvent('view_brand', { brand_id: product.id, brand_name: product.name })}
                    className="block w-full text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all group"
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
                  </Link>
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

      <Link
        to="/"
        className="block w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-center"
      >
        Back to Home
      </Link>
    </div>
  );
}

import { Link } from 'react-router-dom';
import type { Kit } from '../types';
import { kits } from '../data/kits';
import { genericPriceMap } from '../data/brands';
import { SEOHead } from '../components/seo/SEOHead';

const COLOR_CLASSES: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200 hover:border-emerald-400', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200 hover:border-blue-400', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200 hover:border-violet-400', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200 hover:border-amber-400', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
  pink: { bg: 'bg-pink-50', border: 'border-pink-200 hover:border-pink-400', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
};

function getKitPrice(kit: Kit): { low: number; high: number } {
  let low = 0;
  let high = 0;
  for (const item of kit.drugs) {
    const price = genericPriceMap.get(item.drugId);
    if (price) {
      low += price.bulkPrice[0];
      high += price.bulkPrice[1];
    }
  }
  return { low, high };
}

function KitCard({ kit }: { kit: Kit }) {
  const colors = COLOR_CLASSES[kit.color] || COLOR_CLASSES.blue;
  const price = getKitPrice(kit);

  return (
    <Link
      to={`/kits/${kit.id}`}
      className={`block w-full text-left p-5 rounded-2xl border-2 ${colors.border} ${colors.bg} transition-all hover:shadow-lg group`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{kit.icon}</span>
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700">
              {kit.name}
            </h3>
            <p className={`text-sm font-medium ${colors.text}`}>{kit.tagline}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-bold text-gray-900">
            ${price.low}&ndash;${price.high}
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
            {kit.drugs.length} drugs
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">{kit.description}</p>

      <div className="flex items-center gap-1 text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
        <span>View kit details</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}

export function KitsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <SEOHead
        title="Cold Plan Kits — Pre-Built Generic Cold Medicine Kits for Home, Travel, College & Office"
        description="Shop curated kits of bulk generic cold medicines. Home Kit ($60-90, covers 5+ colds), Travel Kit, College Kit, and Office Kit. Same drugs as NyQuil and DayQuil at a fraction of the cost."
        path="/kits"
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-400">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Kits</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Cold Plan Kits</h1>
      <p className="text-gray-500 mb-6">
        Pre-built kits for every situation. Generic drugs in bulk — buy once, be ready for cold
        season. Each kit links directly to Amazon.
      </p>

      <div className="space-y-4 mb-8">
        {kits.map((kit) => (
          <KitCard key={kit.id} kit={kit} />
        ))}
      </div>

      <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
        <h2 className="font-semibold text-blue-800 mb-1">Why Kits?</h2>
        <p className="text-sm text-blue-700">
          Brand-name cold medicines are just combinations of these same generic ingredients at a
          3-5x markup. A NyQuil/DayQuil combo pack is $18-22 every time you get sick. A Home Kit of
          bulk generics costs $60-90 once and covers 5-10+ cold episodes. Same drugs, fraction of
          the price.
        </p>
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

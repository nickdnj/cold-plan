import { useParams, Link } from 'react-router-dom';
import { KitDetail } from '../components/KitDetail';
import { kitMap } from '../data/kits';
import type { KitId } from '../types';
import { SEOHead } from '../components/seo/SEOHead';
import { genericPriceMap } from '../data/brands';

export function KitDetailPage() {
  const { kitId } = useParams<{ kitId: string }>();
  const kit = kitId ? kitMap.get(kitId as KitId) : undefined;

  if (!kit) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <SEOHead
          title="Kit Not Found"
          description="This cold plan kit could not be found."
          path={`/kits/${kitId || ''}`}
          noindex
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Kit Not Found</h1>
        <p className="text-gray-500 mb-6">We could not find a kit matching that URL.</p>
        <Link
          to="/kits"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Browse All Kits
        </Link>
      </div>
    );
  }

  // Calculate price for description
  let priceLow = 0;
  let priceHigh = 0;
  for (const item of kit.drugs) {
    const price = genericPriceMap.get(item.drugId);
    if (price) {
      priceLow += price.bulkPrice[0];
      priceHigh += price.bulkPrice[1];
    }
  }

  const description = `${kit.name}: ${kit.tagline}. ${kit.drugs.length} generic drugs, $${priceLow}-$${priceHigh}. ${kit.description}`;

  return (
    <div className="max-w-2xl mx-auto">
      <SEOHead
        title={`${kit.name} — ${kit.tagline} | Generic Cold Medicine Kit`}
        description={description}
        path={`/kits/${kit.id}`}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-400">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/kits" className="hover:text-blue-600 transition-colors">Kits</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{kit.name}</span>
      </nav>

      <KitDetail kitId={kit.id} onBack={() => {/* handled by Link below */}} />

      <div className="mt-4">
        <Link
          to="/kits"
          className="block w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors text-center"
        >
          Back to All Kits
        </Link>
      </div>
    </div>
  );
}

import { useMemo, useEffect } from 'react';
import type { Kit, KitId, DrugId } from '../types';
import { kitMap, getAmazonLink, AMAZON_AFFILIATE_TAG } from '../data/kits';
import { drugMap } from '../data/drugs';
import { genericPriceMap } from '../data/brands';
import { trackEvent } from '../firebase';

interface Props {
  kitId: KitId;
  onBack: () => void;
}

const COLOR_STYLES: Record<string, {
  gradient: string;
  border: string;
  headerBg: string;
  headerText: string;
  accent: string;
  accentBg: string;
  btnBg: string;
  btnHover: string;
}> = {
  emerald: {
    gradient: 'from-emerald-50 to-green-50',
    border: 'border-emerald-200',
    headerBg: 'bg-emerald-100',
    headerText: 'text-emerald-800',
    accent: 'text-emerald-700',
    accentBg: 'bg-emerald-100',
    btnBg: 'bg-emerald-600',
    btnHover: 'hover:bg-emerald-700',
  },
  blue: {
    gradient: 'from-blue-50 to-sky-50',
    border: 'border-blue-200',
    headerBg: 'bg-blue-100',
    headerText: 'text-blue-800',
    accent: 'text-blue-700',
    accentBg: 'bg-blue-100',
    btnBg: 'bg-blue-600',
    btnHover: 'hover:bg-blue-700',
  },
  violet: {
    gradient: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    headerBg: 'bg-violet-100',
    headerText: 'text-violet-800',
    accent: 'text-violet-700',
    accentBg: 'bg-violet-100',
    btnBg: 'bg-violet-600',
    btnHover: 'hover:bg-violet-700',
  },
  amber: {
    gradient: 'from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    headerBg: 'bg-amber-100',
    headerText: 'text-amber-800',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-100',
    btnBg: 'bg-amber-600',
    btnHover: 'hover:bg-amber-700',
  },
  pink: {
    gradient: 'from-pink-50 to-rose-50',
    border: 'border-pink-200',
    headerBg: 'bg-pink-100',
    headerText: 'text-pink-800',
    accent: 'text-pink-700',
    accentBg: 'bg-pink-100',
    btnBg: 'bg-pink-600',
    btnHover: 'hover:bg-pink-700',
  },
};

function formatPrice(n: number): string {
  return n < 1 ? `${Math.round(n * 100)}¢` : `$${n.toFixed(2)}`;
}

export function KitDetail({ kitId, onBack }: Props) {
  const kit = kitMap.get(kitId);
  if (!kit) return <div>Kit not found.</div>;

  const style = COLOR_STYLES[kit.color] || COLOR_STYLES.blue;

  const kitData = useMemo(() => {
    const items = kit.drugs.map((kitDrug) => {
      const drug = drugMap.get(kitDrug.drugId);
      const price = genericPriceMap.get(kitDrug.drugId);
      const dose = drug?.dosing[kit.ageGroup];
      const amazonUrl = getAmazonLink(kitDrug.amazonSearch, kitDrug.asin);

      return {
        ...kitDrug,
        drug,
        price,
        dose,
        amazonUrl,
      };
    });

    const totalLow = items.reduce((s, i) => s + (i.price?.bulkPrice[0] || 0), 0);
    const totalHigh = items.reduce((s, i) => s + (i.price?.bulkPrice[1] || 0), 0);

    // Minimum episodes from bulk (limited by the drug with fewest episodes per bottle)
    const episodesPerBottle = items
      .filter((i) => i.price)
      .map((i) => Math.floor(i.price!.bulkCount / i.price!.dosesPerEpisode));
    const minEpisodes = Math.min(...episodesPerBottle);

    return { items, totalLow, totalHigh, minEpisodes };
  }, [kit]);

  useEffect(() => {
    trackEvent('view_kit', { kit_id: kitId, kit_name: kit.name });
  }, [kitId, kit.name]);

  const handleAmazonClick = (drugId: string, drugName: string) => {
    trackEvent('amazon_click', { kit_id: kitId, drug_id: drugId, drug_name: drugName });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Kit header */}
      <div className={`p-6 rounded-2xl bg-gradient-to-r ${style.gradient} border-2 ${style.border} mb-6`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{kit.icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{kit.name}</h2>
            <p className={`font-medium ${style.accent}`}>{kit.tagline}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{kit.description}</p>
        <div className="flex items-center gap-4">
          <div>
            <span className="text-3xl font-bold text-gray-900">
              ${kitData.totalLow}&ndash;${kitData.totalHigh}
            </span>
            <span className="text-sm text-gray-500 ml-2">for everything</span>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${style.accentBg} ${style.accent}`}>
            Covers {kitData.minEpisodes}+ cold episodes
          </span>
        </div>
      </div>

      {/* Shopping list with direct Amazon links */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Shopping List</h3>
        <p className="text-sm text-gray-500 mb-3">Each link goes directly to the product on Amazon.</p>
        <div className="space-y-3">
          {kitData.items.map((item) => {
            const hasDirectLink = !!item.asin;
            const isPharmacyOnly = item.drugId === 'pseudoephedrine';

            return (
              <div
                key={item.drugId}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-gray-900">
                          {item.price?.label || item.drug?.genericName || item.drugId}
                        </span>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.amPm === 'am'
                              ? 'bg-amber-100 text-amber-700'
                              : item.amPm === 'pm'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {item.amPm === 'am' ? 'AM' : item.amPm === 'pm' ? 'PM' : 'AM/PM'}
                        </span>
                      </div>
                      {item.drug?.brandName && (
                        <p className="text-xs text-blue-600 font-medium mb-1">Brand: {item.drug.brandName}</p>
                      )}
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {item.price && (
                        <>
                          <div className="text-lg font-bold text-gray-900">
                            ${item.price.bulkPrice[0]}&ndash;{item.price.bulkPrice[1]}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {item.price.bulkCount} {item.price.form}s
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {isPharmacyOnly ? (
                  <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    <span className="text-xs text-gray-500">Buy at any pharmacy counter — no prescription needed, just ask the pharmacist</span>
                  </div>
                ) : (
                  <a
                    href={item.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAmazonClick(item.drugId, item.drug?.genericName || item.drugId)}
                    className="flex items-center justify-between px-4 py-2.5 bg-[#FF9900] hover:bg-[#e88b00] text-white transition-colors"
                  >
                    <span className="text-sm font-bold">
                      {hasDirectLink ? 'Buy on Amazon' : 'Search on Amazon'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {hasDirectLink && (
                        <span className="text-[10px] opacity-80">Direct link</span>
                      )}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Kit Accessories */}
      {kit.accessories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Complete Your Kit</h3>
          <p className="text-sm text-gray-500 mb-3">Recommended accessories to go with your meds.</p>
          <div className="space-y-2">
            {kit.accessories.map((acc) => (
              <a
                key={acc.asin}
                href={`https://www.amazon.com/dp/${acc.asin}?tag=${AMAZON_AFFILIATE_TAG}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAmazonClick(acc.asin, acc.name)}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-[#FF9900] hover:shadow-md transition-all group"
              >
                <span className="text-2xl shrink-0">{acc.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm group-hover:text-[#e88b00] transition-colors">{acc.name}</div>
                  <p className="text-xs text-gray-500">{acc.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-gray-900">${acc.priceRange[0]}&ndash;{acc.priceRange[1]}</div>
                  <div className="text-[10px] text-[#FF9900] font-bold">Buy on Amazon</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Kit total + buy all */}
      <div className={`mb-6 p-5 rounded-2xl bg-gradient-to-r ${style.gradient} border-2 ${style.border}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Kit Total</h3>
            <p className="text-sm text-gray-500">{kit.drugs.length} products, all generic</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              ${kitData.totalLow}&ndash;${kitData.totalHigh}
            </div>
            <div className="text-xs text-gray-500">
              Lasts {kitData.minEpisodes}+ cold episodes
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white border border-gray-200 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Compared to NyQuil/DayQuil per cold:</span>
            <span className="font-bold text-red-500">$18&ndash;22 every time</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Your kit per cold (from bulk):</span>
            <span className="font-bold text-green-600">
              ~${Math.round(kitData.totalLow / kitData.minEpisodes)}&ndash;{Math.round(kitData.totalHigh / kitData.minEpisodes)}
            </span>
          </div>
        </div>

        {/* Quick buy links */}
        <div className="space-y-1.5">
          {kitData.items
            .filter((item) => item.asin)
            .map((item) => (
              <a
                key={item.drugId}
                href={item.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAmazonClick(item.drugId, item.drug?.genericName || item.drugId)}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-white transition-colors text-sm"
              >
                <span className="font-medium">{item.price?.label || item.drug?.genericName}</span>
                <span className="text-xs opacity-80">${item.price?.bulkPrice[0]}&ndash;{item.price?.bulkPrice[1]}</span>
              </a>
            ))}
        </div>
      </div>

      {/* AM / PM guide */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">AM / PM Guide</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">☀️</span>
              <h4 className="font-bold text-amber-800">Daytime</h4>
            </div>
            <ul className="space-y-1.5 text-sm text-amber-900">
              {kitData.items
                .filter((i) => i.amPm === 'am' || i.amPm === 'both')
                .map((item) => (
                  <li key={item.drugId} className="flex items-start gap-1.5">
                    <span className="text-amber-400 mt-0.5 text-xs">&#9679;</span>
                    <span className="text-xs">
                      <span className="font-medium">{item.drug?.genericName} <span className="font-normal opacity-70">({item.drug?.brandName})</span></span>
                      {item.dose && <span className="text-amber-600"> &middot; {item.dose.amount}</span>}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌙</span>
              <h4 className="font-bold text-indigo-800">Nighttime</h4>
            </div>
            <ul className="space-y-1.5 text-sm text-indigo-900">
              {kitData.items
                .filter((i) => i.amPm === 'pm' || i.amPm === 'both')
                .map((item) => (
                  <li key={item.drugId} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5 text-xs">&#9679;</span>
                    <span className="text-xs">
                      <span className="font-medium">{item.drug?.genericName} <span className="font-normal opacity-70">({item.drug?.brandName})</span></span>
                      {item.dose && <span className="text-indigo-600"> &middot; {item.dose.amount}</span>}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tips */}
      {kit.tips.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-2">Pro Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {kit.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">&#8226;</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-700">
          This kit is for informational purposes only. It is not medical advice.
          Generic drugs contain the same active ingredients as their brand-name counterparts.
          Consult a doctor or pharmacist before starting any medication.
          Prices are estimates. As an Amazon Associate, Cold Plan may earn from qualifying purchases.
        </p>
      </div>

      <button
        onClick={onBack}
        className="w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        Back to All Kits
      </button>
    </div>
  );
}

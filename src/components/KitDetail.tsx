import { useMemo } from 'react';
import type { Kit, KitId, DrugId } from '../types';
import { kitMap, getAmazonLink, AMAZON_AFFILIATE_TAG } from '../data/kits';
import { drugMap } from '../data/drugs';
import { genericPriceMap } from '../data/brands';

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

  // Build the all-in-one Amazon cart URL (search for multi-item)
  const allAmazonLinks = kitData.items.map((i) => i.amazonUrl);

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

      {/* Drug list with Amazon links */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">What's In The Kit</h3>
        <div className="space-y-3">
          {kitData.items.map((item) => (
            <div
              key={item.drugId}
              className="p-4 rounded-xl border border-gray-200 bg-white"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
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
                  <p className="text-xs text-gray-500 mb-1">{item.role}</p>
                  {item.dose && (
                    <p className="text-xs text-gray-400">
                      {item.dose.amount} &middot; {item.dose.frequency} &middot; Max: {item.dose.maxDaily}/day
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  {item.price && (
                    <>
                      <div className="text-sm font-bold text-gray-900">
                        ${item.price.bulkPrice[0]}&ndash;${item.price.bulkPrice[1]}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {item.price.bulkCount} {item.price.form}s &middot; {formatPrice(item.price.bulkPrice[0] / item.price.bulkCount)} each
                      </div>
                    </>
                  )}
                </div>
              </div>

              <a
                href={item.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-white text-xs font-bold transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.045 18.02c.072-.116.187-.124.348-.022 2.344 1.47 4.882 2.204 7.615 2.204 1.86 0 3.681-.337 5.465-1.012.254-.09.468-.166.643-.224.19-.064.332.024.428.266.095.24.038.44-.174.6-.942.69-2.02 1.24-3.237 1.647C9.905 21.96 8.676 22.18 7.435 22.18c-2.873 0-5.36-.87-7.467-2.6-.073-.06-.073-.13.077-.56z"/>
                  <path d="M6.394 14.736c0 .752.186 1.395.56 1.927.373.533.88.83 1.52.892.512.048.98.07 1.404.07.94 0 1.63-.116 2.07-.348.44-.232.66-.636.66-1.212 0-.454-.166-.81-.498-1.07-.332-.258-.896-.478-1.692-.658l-1.373-.31c-1.153-.266-1.97-.608-2.45-1.026-.48-.418-.72-1.028-.72-1.83 0-.974.364-1.738 1.093-2.29.728-.554 1.678-.83 2.85-.83.756 0 1.46.094 2.11.28.65.188 1.08.38 1.29.574.21.195.314.47.314.826 0 .534-.17.802-.51.802-.17 0-.45-.09-.84-.272-.73-.332-1.49-.498-2.28-.498-.634 0-1.136.142-1.508.424-.37.283-.557.68-.557 1.19 0 .404.156.73.47.974.312.246.87.456 1.674.632l1.316.294c1.165.262 2.012.626 2.54 1.092.528.466.792 1.11.792 1.93 0 1.038-.396 1.842-1.19 2.41-.794.57-1.862.854-3.203.854-.704 0-1.384-.082-2.04-.248-.655-.166-1.13-.384-1.425-.654-.296-.27-.444-.63-.444-1.082 0-.26.058-.46.175-.596.116-.137.268-.206.456-.206.188 0 .452.1.792.3.632.362 1.37.544 2.213.544z"/>
                </svg>
                Find on Amazon
              </a>
            </div>
          ))}
        </div>
      </div>

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

        <a
          href={`https://www.amazon.com/s?k=generic+cold+medicine+bulk&tag=${AMAZON_AFFILIATE_TAG}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white ${style.btnBg} ${style.btnHover} transition-colors text-lg shadow-lg`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.045 18.02c.072-.116.187-.124.348-.022 2.344 1.47 4.882 2.204 7.615 2.204 1.86 0 3.681-.337 5.465-1.012.254-.09.468-.166.643-.224.19-.064.332.024.428.266.095.24.038.44-.174.6-.942.69-2.02 1.24-3.237 1.647C9.905 21.96 8.676 22.18 7.435 22.18c-2.873 0-5.36-.87-7.467-2.6-.073-.06-.073-.13.077-.56z"/>
            <path d="M6.394 14.736c0 .752.186 1.395.56 1.927.373.533.88.83 1.52.892.512.048.98.07 1.404.07.94 0 1.63-.116 2.07-.348.44-.232.66-.636.66-1.212 0-.454-.166-.81-.498-1.07-.332-.258-.896-.478-1.692-.658l-1.373-.31c-1.153-.266-1.97-.608-2.45-1.026-.48-.418-.72-1.028-.72-1.83 0-.974.364-1.738 1.093-2.29.728-.554 1.678-.83 2.85-.83.756 0 1.46.094 2.11.28.65.188 1.08.38 1.29.574.21.195.314.47.314.826 0 .534-.17.802-.51.802-.17 0-.45-.09-.84-.272-.73-.332-1.49-.498-2.28-.498-.634 0-1.136.142-1.508.424-.37.283-.557.68-.557 1.19 0 .404.156.73.47.974.312.246.87.456 1.674.632l1.316.294c1.165.262 2.012.626 2.54 1.092.528.466.792 1.11.792 1.93 0 1.038-.396 1.842-1.19 2.41-.794.57-1.862.854-3.203.854-.704 0-1.384-.082-2.04-.248-.655-.166-1.13-.384-1.425-.654-.296-.27-.444-.63-.444-1.082 0-.26.058-.46.175-.596.116-.137.268-.206.456-.206.188 0 .452.1.792.3.632.362 1.37.544 2.213.544z"/>
          </svg>
          Shop This Kit on Amazon
        </a>
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
                      <span className="font-medium">{item.drug?.genericName.split(' (')[0]}</span>
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
                      <span className="font-medium">{item.drug?.genericName.split(' (')[0]}</span>
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

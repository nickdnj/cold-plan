interface Props {
  onStart: () => void;
  onKits: () => void;
  onBrands: () => void;
  onAbout: () => void;
}

export function LandingPage({ onStart, onKits, onBrands, onAbout }: Props) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-lg">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Cold Plan
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          Smart OTC cold relief with generic drugs.
        </p>
        <p className="text-base text-gray-500 mb-8">
          Skip the overpriced brand-name combos. Get a personalized plan using
          only the generic drugs you actually need — at a fraction of the cost.
        </p>

        {/* Three main entry points */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-200"
          >
            I Have a Cold
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBrands}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-6 py-3.5 rounded-xl transition-colors border-2 border-gray-200 hover:border-blue-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              What's In My Medicine?
            </button>
            <button
              onClick={onKits}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-6 py-3.5 rounded-xl transition-colors border-2 border-gray-200 hover:border-blue-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Shop Kits
            </button>
          </div>
        </div>

        {/* Kit quick links */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { icon: '🏠', label: 'Home', action: onKits },
            { icon: '✈️', label: 'Travel', action: onKits },
            { icon: '🎓', label: 'College', action: onKits },
            { icon: '💼', label: 'Office', action: onKits },
            { icon: '🧒', label: 'Kids', action: onKits },
          ].map((kit) => (
            <button
              key={kit.label}
              onClick={kit.action}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-blue-50 text-sm text-gray-600 hover:text-blue-700 transition-colors"
            >
              <span>{kit.icon}</span>
              <span>{kit.label} Kit</span>
            </button>
          ))}
        </div>

        {/* Founder blurb */}
        <div className="mb-8 p-5 rounded-2xl bg-white border border-gray-200 text-left">
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            "I developed Cold Plan from a habit I built over 30 years of business travel and
            1.3 million miles on United. I wanted to turn the logic behind my personal travel
            medical kit into a simple tool that helps people make sense of cold medicines
            without the confusion."
          </p>
          <button
            onClick={onAbout}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read the full story &rarr;
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            No data collected
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Save 50-80% vs brand names
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
            </svg>
            Works offline
          </span>
        </div>
      </div>
    </div>
  );
}

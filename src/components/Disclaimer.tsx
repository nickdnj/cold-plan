export function Disclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 text-amber-800 text-sm">
      <div className="flex items-start gap-2">
        <svg
          className="w-5 h-5 mt-0.5 shrink-0 text-amber-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <div>
          <p>
            <strong>Disclaimer:</strong> This app is for informational purposes
            only. It is not medical advice. If you take prescription medications
            or have chronic health conditions, consult a pharmacist or doctor
            before combining any OTC drugs. Always read the label on your
            specific product before taking it. As an Amazon Associate, Cold Plan
            earns from qualifying purchases.
          </p>
        </div>
      </div>
    </div>
  );
}

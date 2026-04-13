interface Props {
  onBack: () => void;
}

export function About({ onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Why I Built Cold Plan
      </h2>
      <p className="text-sm font-medium text-blue-600 mb-6">
        Born from 30+ years of business travel and a habit of always being prepared.
      </p>

      <div className="prose prose-gray max-w-none mb-8">
        <div className="space-y-4 text-gray-700 text-base leading-relaxed">
          <p>
            I developed Cold Plan from a habit I built over more than 30 years of business travel.
            After logging 1.3 million miles on United, I learned to be extremely efficient about
            packing and preparation. One thing I always kept ready was a travel medical kit.
          </p>

          <p>
            After reading labels and comparing ingredients, I realized I could assemble a practical
            one-week supply of generic over-the-counter medicines in small stackable pill cases.
            That way, if I started getting sick on the road, I already had a plan.
          </p>

          <p>
            That system worked well for me. It was practical, compact, and always ready to go. But
            it also made me realize how confusing cold medicine can be for most people. There are so
            many products, overlapping ingredients, and symptom combinations that it is easy to feel
            unsure about what to take and when.
          </p>

          <p>
            Cold Plan grew from that experience. I wanted to turn the logic behind my personal
            travel kit into a simple tool that helps people make sense of cold medicines, symptoms,
            and options without the confusion.
          </p>
        </div>
      </div>

      {/* The 1.3M miles callout */}
      <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl shrink-0">1.3M</div>
          <div>
            <p className="font-bold text-gray-900 mb-1">Miles on United Airlines</p>
            <p className="text-sm text-gray-600">
              Over 30 years of business travel. Hundreds of cities. Dozens of colds caught on the
              road. Cold Plan comes from real-world experience, not a textbook.
            </p>
          </div>
        </div>
      </div>

      {/* What makes Cold Plan different */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">What Makes Cold Plan Different</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="font-semibold text-gray-900 mb-1">Only what you need</div>
            <p className="text-sm text-gray-500">
              Brand-name products bundle ingredients for symptoms you might not have. Cold Plan
              recommends only the drugs that match your actual symptoms.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="font-semibold text-gray-900 mb-1">Same active ingredients</div>
            <p className="text-sm text-gray-500">
              Every brand-name cold medicine is just a combination of a handful of generic drugs.
              Cold Plan shows you exactly what those are.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="font-semibold text-gray-900 mb-1">Buy in bulk, save money</div>
            <p className="text-sm text-gray-500">
              A bulk bottle of generic acetaminophen covers 20+ cold episodes. A box of NyQuil
              covers one. The math is simple.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="font-semibold text-gray-900 mb-1">Be prepared, not panicked</div>
            <p className="text-sm text-gray-500">
              Whether it's a travel kit, a college care package, or a stocked medicine cabinet,
              Cold Plan helps you be ready before you're sick.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-700">
          Cold Plan is for informational purposes only and is not a substitute for professional
          medical advice. Always consult a doctor or pharmacist before starting any medication.
          Generic drugs contain the same active ingredients as their brand-name counterparts.
        </p>
      </div>

      <button
        onClick={onBack}
        className="w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        Back
      </button>
    </div>
  );
}

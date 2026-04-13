import { useAppState } from './hooks/useAppState';
import { Disclaimer } from './components/Disclaimer';
import { StepIndicator } from './components/StepIndicator';
import { LandingPage } from './components/LandingPage';
import { SymptomSelector } from './components/SymptomSelector';
import { DoctorCheck } from './components/DoctorCheck';
import { Recommendations } from './components/Recommendations';
import { Schedule } from './components/Schedule';
import { BrandLookup } from './components/BrandLookup';
import { KitCatalog } from './components/KitCatalog';
import { KitDetail } from './components/KitDetail';
import { About } from './components/About';

function App() {
  const state = useAppState();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 print:static print:bg-white print:border-none">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={state.startOver}
              className="flex items-center gap-2 text-gray-900 font-bold text-lg hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
              </div>
              <span className="hidden sm:inline">Cold Plan</span>
            </button>
            {state.step !== 'landing' && (
              <button
                onClick={state.startOver}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors print:hidden"
              >
                Start over
              </button>
            )}
          </div>
          <StepIndicator current={state.step} onNavigate={state.goTo} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-24">
        {/* Persistent disclaimer */}
        {state.step !== 'landing' && (
          <div className="mb-6">
            <Disclaimer />
          </div>
        )}

        {state.step === 'landing' && (
          <LandingPage
            onStart={() => state.goTo('symptoms')}
            onKits={() => state.goTo('kits')}
            onBrands={() => state.goTo('brand-lookup')}
            onAbout={() => state.goTo('about')}
          />
        )}

        {state.step === 'about' && (
          <About onBack={() => state.goTo('landing')} />
        )}

        {state.step === 'kits' && (
          <KitCatalog
            onSelectKit={state.selectKit}
            onBack={() => state.goTo('landing')}
          />
        )}

        {state.step === 'kit-detail' && state.selectedKit && (
          <KitDetail
            kitId={state.selectedKit}
            onBack={() => state.goTo('kits')}
          />
        )}

        {state.step === 'symptoms' && (
          <SymptomSelector
            selected={state.selections.symptoms}
            onToggle={state.toggleSymptom}
            onNext={state.goNext}
            onBack={state.goBack}
          />
        )}

        {state.step === 'doctor-check' && (
          <DoctorCheck onNext={state.goNext} onBack={state.goBack} />
        )}

        {state.step === 'recommendations' && state.recommendations && (
          <Recommendations
            recommendations={state.recommendations}
            ageGroup="adult"
            drugChoices={state.selections.drugChoices}
            onChoose={state.setDrugChoice}
            onNext={state.goNext}
            onBack={state.goBack}
          />
        )}

        {state.step === 'schedule' && state.resolvedDrugs.length > 0 && (
          <Schedule
            drugs={state.resolvedDrugs}
            ageGroup="adult"
            wakeTime={state.selections.wakeTime}
            sleepTime={state.selections.sleepTime}
            onWakeTimeChange={state.setWakeTime}
            onSleepTimeChange={state.setSleepTime}
            onNext={state.goNext}
            onBack={state.goBack}
          />
        )}

        {state.step === 'brand-lookup' && (
          <BrandLookup
            onBack={() => {
              if (state.resolvedDrugs.length > 0) {
                state.goBack();
              } else {
                state.goTo('landing');
              }
            }}
            onStartOver={state.startOver}
          />
        )}
      </main>

      {/* Footer - print only */}
      <footer className="hidden print:block text-center text-xs text-gray-400 py-4 border-t">
        Cold Plan - For informational purposes only. Not medical advice.
        Generated on {new Date().toLocaleDateString()}.
      </footer>
    </div>
  );
}

export default App;

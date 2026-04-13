# Cold Plan

Smart OTC cold relief with generic drugs. Stop overpaying for brand-name cold medicine.

**Live:** https://cold-plan-app.web.app

## Why Cold Plan?

Every brand-name cold medicine (NyQuil, DayQuil, Mucinex, Advil PM) is just a combination of a handful of generic drugs at a significant markup. NyQuil is 3 pills. Advil PM is 2 pills. You're paying $15-22 per box for something that costs pennies per dose when you buy generics in bulk.

Cold Plan shows you exactly what's inside every brand-name product, how to replicate it with generics, and how to build a stocked medicine cabinet for a fraction of the cost.

Born from 30+ years of business travel and 1.3 million miles on United Airlines.

## Three Ways to Use It

**I Have a Cold** -- Select your symptoms, get matched to generic drugs, choose between alternatives (AM/PM day/night combos), and get a personalized 7-day dosing schedule with proper timing, max dose limits, and interaction warnings.

**What's In My Medicine?** -- Browse 20 brand-name products organized by manufacturer (Vicks, Advil, Tylenol, Mucinex, Theraflu, Robitussin, Sudafed, Bayer). Each product shows the exact active ingredients, dosing directions from the label, and a "Recipe" -- the specific generic pills and pill counts that replicate it.

**Shop Kits** -- Four curated bulk-buy kits with direct Amazon product links:

| Kit | Who It's For |
|-----|-------------|
| Home | Family medicine cabinet. All 8 drugs in bulk. Covers 1-2 years of cold seasons. |
| Travel | Business travelers. Fits in a toiletry bag. Never buy $25 airport NyQuil again. |
| College | Send your student off prepared. Bulk bottles that last the whole school year. |
| Office | Daytime-only, zero drowsy drugs. Stay functional at work. |

## The Drug Database

9 generic drugs with adult dosing data. Each drug shows its brand-name equivalent:

| Generic | Brand Name | Pill Strength | Treats |
|---------|-----------|--------------|--------|
| Acetaminophen | Tylenol | 325mg tablet | Fever, headache, body aches |
| Ibuprofen | Advil / Motrin | 200mg tablet | Pain, inflammation, fever |
| Guaifenesin | Mucinex | 400mg tablet | Chest congestion, productive cough |
| Dextromethorphan | Robitussin / Delsym | 15mg gelcap | Dry cough |
| Pseudoephedrine | Sudafed | 30mg tablet | Nasal congestion |
| Phenylephrine | Sudafed PE | 5mg tablet | Nasal congestion (shelf-available) |
| Diphenhydramine | Benadryl | 25mg tablet | Runny nose, sneezing, sleep aid |
| Loratadine | Claritin | 10mg tablet | Runny nose, sneezing (non-drowsy) |
| Menthol/Benzocaine | Chloraseptic / Cepacol | lozenge | Sore throat |

Pill strengths are chosen to cleanly divide into brand-name formulations. For example:
- 1 NyQuil dose = 1 Acetaminophen 325mg + 1 DXM 15mg + 1 Diphenhydramine 25mg
- 1 Mucinex DM dose = 3 Guaifenesin 400mg + 2 DXM 15mg
- 1 Advil PM dose = 1 Ibuprofen 200mg + 2 Diphenhydramine 25mg

## Brand-Name Products

20 brand products with per-ingredient dosages and generic recipes:

Vicks (NyQuil, NyQuil Severe, DayQuil, DayQuil Severe, NyQuil/DayQuil Combo, ZzzQuil), Advil (Advil PM, Advil Cold & Sinus), Tylenol (Tylenol PM, Tylenol Cold+Flu Severe), Mucinex (Mucinex DM, Mucinex D), Theraflu (Daytime, Nighttime), Robitussin (DM, Max Strength), Sudafed (Original, PE), Bayer (Alka-Seltzer Plus Cold, Coricidin HBP), Benadryl, Claritin.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- PWA with offline support (vite-plugin-pwa / Workbox)
- Firebase Hosting (static, no backend)
- Firebase Analytics (GA4)
- All drug data is static TypeScript -- no database, no API calls

## Project Structure

```
src/
  firebase.ts        Firebase init + analytics tracking
  components/        UI components (one per page/feature)
    LandingPage       Three entry points: symptoms, brands, kits
    SymptomSelector   8 symptom categories with conflict detection
    DoctorCheck       Safety gate before drug recommendations
    Recommendations   Drug cards with alternative groups + AM/PM combo
    Schedule          7-day dosing planner with timeline view
    BrandLookup       Brand medicine search grouped by manufacturer
    KitCatalog        Kit cards with pricing
    KitDetail         Shopping list with direct Amazon links + AM/PM guide
    About             Founder story
    Disclaimer        Medical + FTC affiliate disclosure
  data/              Static drug, brand, and kit databases
    drugs.ts          9 generic drugs with adult dosing
    brands.ts         20 brand products with per-ingredient dosages + generic prices
    kits.ts           4 curated kits with Amazon ASINs + affiliate config
    symptoms.ts       8 symptom categories
    interactions.ts   Drug interaction rules
    alternatives.ts   Alternative groups (decongestant, pain, antihistamine)
    doctorTriggers.ts When-to-see-a-doctor conditions
  utils/             Business logic
    engine.ts         Symptom-to-drug recommendation engine
    schedule.ts       Dosing schedule builder (AM/PM, interaction-aware)
  hooks/
    useAppState.ts    Central app state management
  types/
    index.ts          All TypeScript interfaces
```

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

## Deployment

Firebase Hosting. Build and deploy:

```bash
npm run build
firebase deploy --only hosting
```

## Amazon Affiliate

Amazon Associates account: `coldplanapp` (tag: `coldplanapp-20`)

All kit product links use direct ASINs for specific bulk generic products on Amazon. Configured in `src/data/kits.ts`:

```typescript
export const AMAZON_AFFILIATE_TAG = 'coldplanapp-20';
```

Each kit drug has:
- `asin` -- Direct Amazon product link (e.g., `B091Y48B4M` for TIME-Cap Labs Acetaminophen 325mg 1000ct)
- `amazonSearch` -- Fallback search URL if no ASIN is set

Products with ASINs link directly to `amazon.com/dp/ASIN?tag=coldplanapp-20`.

Note: Pseudoephedrine has no Amazon link (behind-the-counter per CMEA). Kit pages display a pharmacy counter note instead.

## Analytics

Firebase Analytics (GA4) with measurement ID `G-FXN0HR3GCF`.

Custom events tracked:

| Event | Trigger | Data |
|-------|---------|------|
| `navigate` | Any step change | Step name |
| `view_kit` | Kit detail page opened | Kit ID, kit name |
| `amazon_click` | Amazon buy button tapped | Kit ID, drug ID, drug name |
| `view_brand` | Brand product expanded in lookup | Brand ID, brand name |

Dashboard: https://console.firebase.google.com/project/cold-plan-app/analytics

## Safety

- Medical disclaimer on every page
- Prescription medication + chronic condition warning
- "Read the label on your specific product" reminder
- "When to see a doctor" safety gate before drug recommendations
- Drug interaction warnings (APAP+ibuprofen spacing, antihistamine conflicts, sedation risks)
- Adults only -- no pediatric dosing
- Language uses "may help with" -- never "we recommend" or "you should take"
- FTC affiliate disclosure: "As an Amazon Associate, Cold Plan earns from qualifying purchases"

## Disclaimer

Cold Plan is for informational purposes only. It is not medical advice. If you take prescription medications or have chronic health conditions, consult a pharmacist or doctor before combining any OTC drugs. Always read the label on your specific product before taking it. Generic drugs contain the same active ingredients as their brand-name counterparts. As an Amazon Associate, Cold Plan earns from qualifying purchases.

## License

MIT

import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

const BASE_URL = 'https://cold-plan-app.web.app';

export function WebAppStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cold Plan',
    url: BASE_URL,
    description:
      'Free tool to find generic alternatives to brand-name cold medicines. See what active ingredients are in NyQuil, DayQuil, Advil PM, and more — then build the same relief from bulk generics at a fraction of the cost.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript. Works offline as a PWA.',
  };

  return <StructuredData data={data} />;
}

export function BrandProductStructuredData({
  brandName,
  genericDescription,
  brandPrice,
  url,
  faqItems,
}: {
  brandName: string;
  genericDescription: string;
  brandPrice: [number, number];
  url: string;
  faqItems: { question: string; answer: string }[];
}) {
  const productData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: brandName,
    description: genericDescription,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: brandPrice[0],
      highPrice: brandPrice[1],
      priceCurrency: 'USD',
      offerCount: 1,
    },
    url,
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={productData} />
      {faqItems.length > 0 && <StructuredData data={faqData} />}
    </>
  );
}

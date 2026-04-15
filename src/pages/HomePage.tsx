import { useNavigate } from 'react-router-dom';
import { LandingPage } from '../components/LandingPage';
import { SEOHead } from '../components/seo/SEOHead';
import { WebAppStructuredData } from '../components/seo/StructuredData';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="Cold Plan — Generic Cold Medicine Recipes | Save 90% on OTC Drugs"
        description="Free tool to find generic alternatives to brand-name cold medicines like NyQuil, DayQuil, Advil PM, and Mucinex. See what's inside, get the generic recipe, and save 50-90% with bulk generics. Works offline."
        path="/"
      />
      <WebAppStructuredData />
      <LandingPage
        onStart={() => navigate('/planner')}
        onKits={() => navigate('/kits')}
        onBrands={() => navigate('/brands')}
        onAbout={() => navigate('/about')}
      />
    </>
  );
}

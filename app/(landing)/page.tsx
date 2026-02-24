import { FeatureSection } from './feature-section';
import { HeroSection } from './hero-section';
import { HomeNavbar } from './landing-navbar';
import { ResourceSection } from './resources-section';

export default function Home() {
  return (
    <>
      <HomeNavbar />
      <HeroSection />
      <FeatureSection />
      <ResourceSection />
    </>
  );
}

import PageLayout from "@/components/templates/PageLayout";
import HeroSection from "@/components/organisms/HeroSection";
import DomainsSection from "@/components/organisms/DomainsSection";
import FeaturedProjects from "@/components/organisms/FeaturedProjects";
import CredibilityBanner from "@/components/organisms/CredibilityBanner";

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <DomainsSection />
      <FeaturedProjects />
      <CredibilityBanner />
    </PageLayout>
  );
}

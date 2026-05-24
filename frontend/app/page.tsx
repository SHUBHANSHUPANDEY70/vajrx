import PageLayout from "@/components/templates/PageLayout";
import HeroSection from "@/components/organisms/HeroSection";
import StatsSection from "@/components/organisms/StatsSection";
import DomainsSection from "@/components/organisms/DomainsSection";
import ProcessSection from "@/components/organisms/ProcessSection";
import FeaturedProjects from "@/components/organisms/FeaturedProjects";
import CredibilityBanner from "@/components/organisms/CredibilityBanner";
import CTABanner from "@/components/organisms/CTABanner";

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <StatsSection />
      <DomainsSection />
      <ProcessSection />
      <FeaturedProjects />
      <CredibilityBanner />
      <CTABanner />
    </PageLayout>
  );
}

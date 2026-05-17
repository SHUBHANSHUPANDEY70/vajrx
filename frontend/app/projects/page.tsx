import PageLayout from "@/components/templates/PageLayout";
import ProjectsGrid from "@/components/organisms/ProjectsGrid";
import SectionTitle from "@/components/atoms/SectionTitle";

export default function ProjectsPage() {
  return (
    <PageLayout>
      <div className="pt-24 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Everything we have built and are currently building.">
            Projects
          </SectionTitle>
          <ProjectsGrid />
        </div>
      </div>
    </PageLayout>
  );
}

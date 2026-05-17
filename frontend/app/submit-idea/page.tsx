"use client";
import PageLayout from "@/components/templates/PageLayout";
import IdeaForm from "@/components/organisms/IdeaForm";
import SectionTitle from "@/components/atoms/SectionTitle";

export default function SubmitIdeaPage() {
  return (
    <PageLayout>
      <div className="pt-24 py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionTitle subtitle="Have a project you want built? Tell us about it. We'll evaluate and reach out.">
            Submit an Idea
          </SectionTitle>
          <IdeaForm />
        </div>
      </div>
    </PageLayout>
  );
}

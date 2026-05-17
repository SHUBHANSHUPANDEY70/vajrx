"use client";
import PageLayout from "@/components/templates/PageLayout";
import ContactForm from "@/components/organisms/ContactForm";
import SectionTitle from "@/components/atoms/SectionTitle";

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="pt-24 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <SectionTitle subtitle="Reach out directly or fill the form.">
              Get in Touch
            </SectionTitle>
            <div className="flex flex-col gap-6 mt-8">
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:contact@vajrx.com" className="text-white hover:text-accent transition-colors duration-200 font-medium">
                  contact@vajrx.com
                </a>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">Phone</p>
                <a href="tel:+916266995073" className="text-white hover:text-accent transition-colors duration-200 font-medium">
                  +91 6266995073
                </a>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-1">Website</p>
                <span className="text-white font-medium">vajrx.com</span>
              </div>
              <div className="mt-4 p-6 bg-surface border border-border rounded-sm">
                <p className="text-muted text-sm leading-relaxed">
                  We typically respond within 24–48 hours. For project inquiries, consider using the{" "}
                  <a href="/submit-idea" className="text-accent hover:underline">Submit an Idea</a>{" "}
                  form for a more structured conversation.
                </p>
              </div>
            </div>
          </div>
          {/* Right */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

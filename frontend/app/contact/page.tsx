"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/templates/PageLayout";
import ContactForm from "@/components/organisms/ContactForm";

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="pt-14">
        <section className="relative py-24 px-6 border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-100" />
          <div className="relative max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-5">Contact</p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-6">
                Get in Touch
              </h1>
              <p className="text-muted text-lg leading-relaxed max-w-xl">
                Reach out directly or use the form below. We respond to all messages within 24–48 hours.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4"
            >
              <div className="flex flex-col gap-6">
                <div className="border border-white/10 glass-card shadow-sm">
                  <div className="px-5 py-3 border-b border-white/10 bg-white/5">
                    <p className="font-mono text-xs text-muted tracking-widest uppercase">Direct Contact</p>
                  </div>
                  <div className="flex flex-col divide-y divide-border">
                    <div className="px-5 py-4">
                      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Email</p>
                      <a href="mailto:contact@vajrx.com" className="text-sm text-foreground hover:text-accent transition-colors duration-200 font-medium">
                        contact@vajrx.com
                      </a>
                    </div>
                    <div className="px-5 py-4">
                      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Phone</p>
                      <div className="flex flex-col gap-1.5">
                        <a href="tel:+916266995073" className="font-mono text-sm text-foreground hover:text-accent transition-colors duration-200">
                          +91 62669 95073
                        </a>
                        <a href="tel:+918103882405" className="font-mono text-sm text-foreground hover:text-accent transition-colors duration-200">
                          +91 81038 82405
                        </a>
                      </div>
                    </div>
                    <div className="px-5 py-4">
                      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Web</p>
                      <span className="text-sm text-muted">vajrx.com</span>
                    </div>
                    <div className="px-5 py-4">
                      <p className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Location</p>
                      <span className="text-sm text-muted">Jabalpur, MP, India</span>
                    </div>
                  </div>
                </div>

                <div className="border border-white/10/50 glass-card p-5 shadow-sm">
                  <p className="font-mono text-xs text-accent/70 uppercase tracking-widest mb-3">Note</p>
                  <p className="text-muted text-sm leading-relaxed">
                    For project inquiries, using the{" "}
                    <a href="/submit-idea" className="text-accent hover:underline">Submit an Idea</a>{" "}
                    form gives us the structured information needed to assess your project quickly.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Send a Message</p>
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

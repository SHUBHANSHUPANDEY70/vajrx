"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-24 px-6 bg-navy/30 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-accent/20 bg-surface relative overflow-hidden shadow-md"
        >
          <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-accent/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-accent/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-accent/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-accent/40" />

          <div className="px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-4">Open for Collaboration</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
                Have a project that needs building?
              </h2>
              <p className="text-muted text-base leading-relaxed max-w-xl mb-2">
                We work with individuals, institutions, and organisations to turn technical ideas into engineered realities. Defence, electronics, medical — if it requires precision engineering, we want to hear about it.
              </p>
              <p className="text-muted/60 text-sm leading-relaxed max-w-xl">
                Submissions are reviewed within 24–48 hours. We evaluate every idea seriously, regardless of scale.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/submit-idea"
                className="group inline-flex items-center justify-between px-6 py-4 bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide transition-colors duration-200"
              >
                Submit Your Idea
                <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between px-6 py-4 border border-border hover:border-accent/50 text-muted hover:text-foreground text-sm font-medium tracking-wide transition-all duration-200"
              >
                Get in Touch
                <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
              </Link>
              <p className="font-mono text-xs text-muted/40 text-center mt-1">No commitment required</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

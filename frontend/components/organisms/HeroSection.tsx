"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "04", label: "Engineering domains" },
  { value: "05+", label: "Research partnerships" },
  { value: "02", label: "Active projects" },
  { value: "100%", label: "Indigenous components" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-[3]" />

      <div className="relative z-[4] max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase">Active Development</span>
              <span className="h-px flex-1 max-w-16 bg-accent/30" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-display font-bold leading-normal tracking-tight mb-6"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl hero-gradient-text">Forged for</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-accent">the Frontier.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-muted text-lg leading-relaxed max-w-xl mb-3"
            >
              VajrX Technology is an indigenous engineering startup building precision systems across Electronics, Defence, Medical, and AR/VR domains.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-muted/70 text-base leading-relaxed max-w-xl mb-10"
            >
              India imports over $13 billion in defence and electronics equipment annually. We exist to change that, one precision engineered system at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-accent hover:bg-accent-hover text-black text-sm font-semibold tracking-wide transition-colors duration-200"
              >
                Explore Projects
                <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
              </Link>
              <Link
                href="/submit-idea"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/20 hover:border-accent/60 text-muted hover:text-foreground text-sm font-medium tracking-wide transition-all duration-200 backdrop-blur-sm"
              >
                Submit an Idea
              </Link>
            </motion.div>
          </div>

          {/* Right: Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="glass-card shadow-md">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-muted tracking-widest uppercase">System Metrics</span>
                <span className="font-mono text-xs text-accent/60">v1.0</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="p-6 group hover:bg-white/5 transition-colors duration-200"
                  >
                    <div className="font-display font-bold text-5xl text-foreground tabular-nums mb-1.5 group-hover:text-accent transition-colors duration-200">
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs text-muted uppercase tracking-wide leading-snug">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-white/10">
                <p className="font-mono text-xs text-muted/60">Jabalpur, India &middot; ISRO Affiliated</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="lg:hidden mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display font-bold text-4xl text-foreground tabular-nums">{stat.value}</span>
              <span className="font-mono text-sm text-muted uppercase tracking-wide">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[4]"
      >
        <span className="font-mono text-xs text-muted/40 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-accent/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}

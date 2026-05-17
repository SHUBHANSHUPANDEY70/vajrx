# Implementation Plan: VajraX Website

## Overview

Full-stack monorepo implementation: Next.js 14 (TypeScript) frontend with Atomic Design component structure, Golang/Gin backend API, MySQL persistence, and Docker Swarm + Traefik + Jenkins infrastructure.

## Tasks

- [x] 1. Monorepo scaffold and environment setup
  - Initialise Git repo at https://github.com/SHUBHANSHUPANDEY70/vajrx.git with `frontend/` and `backend/` directories at root
  - Create root `.env.example` with all required variables: `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `NEXT_PUBLIC_API_URL`
  - Create `frontend/.env.example` with `NEXT_PUBLIC_API_URL`
  - Copy `assets/team/avani.svg`, `assets/team/shubhanshu.svg`, `assets/team/subrato.svg` to `frontend/public/team/`
  - _Requirements: 11.1, 11.5_

- [x] 2. Tailwind design system and Next.js project bootstrap
  - Initialise Next.js 14 app in `frontend/` with TypeScript, App Router, and Tailwind CSS
  - Configure `tailwind.config.ts` to extend colours: `background: "#0A0A0F"`, `olive: "#4A5240"`, `navy: "#0F172A"`, `accent: "#3B82F6"`
  - Set global CSS baseline in `frontend/app/globals.css`: dark background, font stack, scroll behaviour
  - Install Framer Motion (`framer-motion`) as a dependency
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 3. Static project data
  - Create `frontend/data/projects.ts` with the `Project`, `ProjectStatus`, and `ProjectDomain` TypeScript types
  - Populate `PROJECTS` array with both projects fully filled: "Real-Time Lightning Detection & Cloud Logging System" (slug `lightning-detection-system`, domains Electronics + Defence, status Completed, techStack, highlights, futureGoals) and "AI-Based Difficult Airway Assessment ML Model" (slug `airway-assessment-ml`, domain Medical, status In Progress, highlights)
  - _Requirements: 3.4, 4.3, 4.4_

- [-] 4. Frontend atoms
  - [x] 4.1 Create `components/atoms/Button.tsx` — variant props (primary/secondary/ghost), size props, accessible `<button>` with Tailwind accent colours
    - _Requirements: 9.1, 9.2_
  - [x] 4.2 Create `components/atoms/Badge.tsx` — domain tag pill (Electronics / Defence / Medical) with colour mapping
    - _Requirements: 3.2_
  - [x] 4.3 Create `components/atoms/StatusBadge.tsx` — "Completed" (green) / "In Progress" (amber) pill
    - _Requirements: 3.2_
  - [x] 4.4 Create `components/atoms/Input.tsx`, `components/atoms/Textarea.tsx`, `components/atoms/Label.tsx`, `components/atoms/ErrorMessage.tsx` — accessible form primitives with dark-theme styling
    - _Requirements: 6.5, 7.6_
  - [x] 4.5 Create `components/atoms/SectionTitle.tsx` — reusable `<h2>` heading with consistent typography
    - _Requirements: 9.2_
  - [x] 4.6 Create `components/atoms/Logo.tsx` — VajrX wordmark rendered as styled text or inline SVG
    - _Requirements: 9.5_

- [-] 5. Frontend molecules
  - [x] 5.1 Create `components/molecules/FormField.tsx` — composes Label + Input/Textarea + ErrorMessage; accepts `error` prop for inline validation display
    - _Requirements: 6.5, 7.6_
  - [x] 5.2 Create `components/molecules/NavLink.tsx` — single nav item with active-state highlight using Next.js `usePathname`
    - _Requirements: 9.5_
  - [x] 5.3 Create `components/molecules/AnimatedCard.tsx` — Framer Motion wrapper with `whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(59,130,246,0.3)" }}` and spring transition
    - _Requirements: 1.5, 3.5, 9.3_
  - [x] 5.4 Create `components/molecules/ProjectCard.tsx` — title + Badge + StatusBadge + hover; wraps AnimatedCard; links to `/projects/[slug]`
    - _Requirements: 3.2, 3.3, 3.5_
  - [x] 5.5 Create `components/molecules/DomainCard.tsx` — domain name + icon/description card; wraps AnimatedCard
    - _Requirements: 1.2, 1.5_
  - [x] 5.6 Create `components/molecules/TeamMemberCard.tsx` — avatar (`<Image>` from `public/team/`), name, title, bio
    - _Requirements: 2.2, 2.3_
  - [x] 5.7 Create `components/molecules/CredibilityItem.tsx` — single partner/org name badge (ISRO NRSC, Army Base Workshop 506, AAI, ISROxIITR, DRDO)
    - _Requirements: 1.4_

- [-] 6. Frontend organisms
  - [ ] 6.1 Create `components/organisms/Navbar.tsx` — Logo + NavLinks for Home, About, Projects, Services, Submit an Idea, Contact; mobile-responsive hamburger menu
    - _Requirements: 9.4, 9.5_
  - [ ] 6.2 Create `components/organisms/Footer.tsx` — company name, nav links, contact email and phone
    - _Requirements: 7.2_
  - [ ] 6.3 Create `components/organisms/HeroSection.tsx` — full-viewport section, tagline "Forged for the Frontier.", CTA button linking to `/projects`; Framer Motion entrance animation
    - _Requirements: 1.1, 9.3_
  - [ ] 6.4 Create `components/organisms/DomainsSection.tsx` — three DomainCards in a responsive row
    - _Requirements: 1.2_
  - [ ] 6.5 Create `components/organisms/FeaturedProjects.tsx` — curated ProjectCards grid (subset of PROJECTS); SectionTitle heading
    - _Requirements: 1.3_
  - [ ] 6.6 Create `components/organisms/CredibilityBanner.tsx` — horizontal strip of CredibilityItems for all five partner orgs
    - _Requirements: 1.4_
  - [ ] 6.7 Create `components/organisms/ProjectsGrid.tsx` — full responsive grid of all PROJECTS as ProjectCards
    - _Requirements: 3.1, 3.2_
  - [ ] 6.8 Create `components/organisms/TeamSection.tsx` — Shubhanshu card prominent (full-width or top row), Subrato and Avani below; uses TeamMemberCard
    - _Requirements: 2.2, 2.3, 2.4_
  - [ ] 6.9 Create `components/organisms/ContactForm.tsx` — four FormFields (name, email, phone, message), client-side validation, POST to `/api/contact`, success/error state display
    - _Requirements: 7.1, 7.3, 7.4, 7.5, 7.6_
  - [ ] 6.10 Create `components/organisms/IdeaForm.tsx` — three FormFields (name, email, idea details), client-side validation, POST to `/api/idea`, success/error state display
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [ ] 6.11 Create `components/organisms/AdminLogin.tsx` — password input + submit, calls POST `/api/admin/login`, stores JWT in `sessionStorage` on success, shows error on failure
    - _Requirements: 8.2, 8.3, 8.4_
  - [ ] 6.12 Create `components/organisms/SubmissionsTable.tsx` — generic table component accepting column definitions and row data; used for both contacts and ideas tables
    - _Requirements: 8.5, 8.6_

- [ ] 7. Frontend templates
  - [ ] 7.1 Create `components/templates/PageLayout.tsx` — wraps children with Navbar + Footer; includes `AnimatePresence` fade-slide page transition
    - _Requirements: 9.3, 9.5_
  - [ ] 7.2 Create `components/templates/AdminLayout.tsx` — minimal layout without public Navbar/Footer; used only for `/secret-admin`
    - _Requirements: 8.1_

- [ ] 8. Frontend API client utility
  - Create `frontend/lib/api.ts` with typed fetch wrappers for all four API endpoints: `postContact`, `postIdea`, `adminLogin`, `getContacts`, `getIdeas`
  - Include Bearer token injection for admin endpoints using token from `sessionStorage`
  - _Requirements: 6.2, 7.3, 8.7, 8.8_

- [ ] 9. Next.js pages (App Router)
  - [ ] 9.1 Create `frontend/app/page.tsx` (Home) — PageLayout wrapping HeroSection + DomainsSection + FeaturedProjects + CredibilityBanner; SSG
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ] 9.2 Create `frontend/app/about/page.tsx` — PageLayout wrapping mission/vision text, TeamSection, future goals section; SSG
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - [ ] 9.3 Create `frontend/app/projects/page.tsx` — PageLayout wrapping ProjectsGrid; SSG
    - _Requirements: 3.1, 3.2_
  - [ ] 9.4 Create `frontend/app/projects/[slug]/page.tsx` — SSG with `generateStaticParams` from PROJECTS; renders full project detail (title, domains, status, fullDescription, techStack, highlights, futureGoals); 404 fallback for unknown slugs
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [ ] 9.5 Create `frontend/app/services/page.tsx` — PageLayout with three domain sections (Electronics, Defence, Medical) and CTA to `/submit-idea`; SSG
    - _Requirements: 5.1, 5.2, 5.3_
  - [ ] 9.6 Create `frontend/app/submit-idea/page.tsx` — PageLayout wrapping IdeaForm; CSR (`"use client"`)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [ ] 9.7 Create `frontend/app/contact/page.tsx` — PageLayout wrapping ContactForm + contact details (contact@vajrx.com, +91-6266995073); CSR (`"use client"`)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  - [ ] 9.8 Create `frontend/app/secret-admin/page.tsx` — AdminLayout; renders AdminLogin if no JWT in sessionStorage, otherwise fetches and renders two SubmissionsTables (contacts + ideas); CSR (`"use client"`)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ] 10. Checkpoint — frontend complete
  - Ensure all pages render without TypeScript errors, all forms validate correctly, and all links resolve.
  - Run `cd frontend && npx tsc --noEmit` to confirm zero type errors.
  - Ask the user if any questions arise before proceeding to backend.

- [x] 11. Go backend project setup
  - Initialise Go module `github.com/SHUBHANSHUPANDEY70/vajrx/backend` in `backend/`
  - Add dependencies: `github.com/gin-gonic/gin`, `github.com/go-sql-driver/mysql`, `github.com/golang-jwt/jwt/v5`, `github.com/joho/godotenv`
  - Create `backend/cmd/server/main.go` entry point: load env, open DB, register routes, start server on `:8080`
  - _Requirements: 10.6, 10.7_

- [ ] 12. Backend database layer
  - Create `backend/internal/db/db.go` — opens MySQL connection using `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` env vars; exposes `*sql.DB` singleton
  - Create `backend/internal/db/migrations.go` — runs `CREATE TABLE IF NOT EXISTS` for `contact_submissions` and `idea_submissions` with the schema defined in the design document
  - _Requirements: 10.6, 6.6, 7.7_

- [ ] 13. Backend models
  - Create `backend/internal/models/contact.go` — `ContactSubmission` struct with `db` and `json` tags
  - Create `backend/internal/models/idea.go` — `IdeaSubmission` struct with `db` and `json` tags
  - _Requirements: 10.1, 10.2_

- [ ] 14. Backend handlers
  - [ ] 14.1 Create `backend/internal/handlers/contact.go` — `PostContact` handler: bind JSON, validate required fields (name, email, phone, message), INSERT into `contact_submissions`, return 201 or 400
    - _Requirements: 10.1, 10.5, 7.7_
  - [ ] 14.2 Create `backend/internal/handlers/idea.go` — `PostIdea` handler: bind JSON, validate required fields (name, email, ideaDetails), INSERT into `idea_submissions`, return 201 or 400
    - _Requirements: 10.2, 10.5, 6.6_
  - [ ] 14.3 Create `backend/internal/handlers/admin.go` — `AdminLogin` handler: compare password against `ADMIN_PASSWORD` env var, issue 24h JWT signed with `ADMIN_JWT_SECRET`, return token; `GetContacts` handler: SELECT all from `contact_submissions`; `GetIdeas` handler: SELECT all from `idea_submissions`
    - _Requirements: 8.3, 8.4, 8.7, 8.8, 8.10, 10.3, 10.4_

- [ ] 15. Backend JWT middleware
  - Create `backend/internal/middleware/auth.go` — `RequireAuth()` Gin middleware: extract Bearer token from `Authorization` header, validate JWT signature using `ADMIN_JWT_SECRET`, abort with 401 if invalid or missing
  - Wire middleware onto the `/api/admin` group (excluding `/api/admin/login`) in `main.go`
  - _Requirements: 8.9, 10.3, 10.4_

- [ ] 16. Checkpoint — backend complete
  - Ensure `go build ./...` succeeds with zero errors in `backend/`
  - Ask the user if any questions arise before proceeding to infrastructure.

- [ ] 17. Frontend Dockerfile
  - Create `frontend/Dockerfile`: multi-stage build — Node 20 Alpine builder runs `next build`, Nginx Alpine image serves the static export from `/usr/share/nginx/html`
  - _Requirements: 11.3_

- [ ] 18. Backend Dockerfile
  - Create `backend/Dockerfile`: multi-stage build — Go 1.22 Alpine builder compiles binary, minimal Alpine runtime image runs the binary
  - _Requirements: 10.7_

- [ ] 19. Nginx configuration
  - Create `nginx.conf` at repo root: serve Next.js static export, `try_files` fallback for client-side routing, gzip enabled, cache headers for static assets
  - _Requirements: 11.3_

- [ ] 20. Docker Compose (local dev)
  - Create `docker-compose.yml` at repo root with three services: `frontend` (build `./frontend`), `backend` (build `./backend`), `mysql` (image `mysql:8`); env vars loaded from `.env`; named volumes for MySQL data
  - _Requirements: 10.6, 10.7_

- [ ] 21. Docker Stack (production Swarm)
  - Create `docker-stack.yml` at repo root with Traefik labels on `frontend` and `backend` services for hostname-based routing (`vajrx.com` → frontend, `api.vajrx.com` → backend); overlay network; MySQL service with named volume
  - _Requirements: 11.2, 11.4_

- [ ] 22. Traefik configuration
  - Add Traefik static config labels in `docker-stack.yml` (or a `traefik.yml` if needed): HTTPS entrypoint on 443, HTTP→HTTPS redirect, Let's Encrypt ACME resolver
  - _Requirements: 11.4_

- [ ] 23. Jenkinsfile CI/CD pipeline
  - Create `Jenkinsfile` at repo root with stages: Checkout, Build Frontend Docker image, Build Backend Docker image, Push images to registry, Deploy via `docker stack deploy` to Swarm
  - _Requirements: 11.1, 11.2, 11.5_

- [ ] 24. Final checkpoint — full stack wired
  - Ensure `docker-compose up` starts all three services without errors
  - Confirm frontend can reach backend at `NEXT_PUBLIC_API_URL`
  - Ask the user if any questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All pages are SSG except form pages (`/submit-idea`, `/contact`) and `/secret-admin` which are CSR (`"use client"`)
- Projects data lives entirely in `frontend/data/projects.ts` — no database reads for project content
- JWT is stored in `sessionStorage` (cleared on tab close) — intentional for the admin panel
- Checkpoints at tasks 10, 16, and 24 gate progression between frontend, backend, and infrastructure phases

# Requirements Document

## Introduction

VajraX is a startup that builds custom projects across electronics, defence, and medical domains. The website (vajrx.com) serves as the public-facing presence of the company — showcasing the team, completed and in-progress projects, and the domains they operate in. It also provides a way for clients to submit project ideas and contact the team. An internal admin panel allows the team to review submissions. The site is built with Next.js (TypeScript) on the frontend, a Golang REST API on the backend, MySQL for persistence, and deployed via Docker Swarm + Traefik + Nginx + Jenkins CI/CD.

---

## Glossary

- **Website**: The VajraX public-facing Next.js application at vajrx.com
- **Admin_Panel**: The password-protected dashboard at /secret-admin
- **API**: The Golang REST API backend
- **Contact_Form**: The form on the Contact page that captures name, email, phone, and message
- **Idea_Form**: The form on the Submit an Idea page that captures name, email, and project idea details
- **Project**: A completed or in-progress build undertaken by VajraX for a client or internally
- **Slug**: A URL-safe identifier for a project used in dynamic routing (e.g., /projects/lightning-detection)
- **Domain**: One of the three verticals VajraX operates in — Electronics, Defence, or Medical
- **Submission**: A record created when a user submits a Contact_Form or Idea_Form
- **Admin_Password**: The secret value stored in the ADMIN_PASSWORD environment variable used to protect the Admin_Panel
- **CI/CD_Pipeline**: The Jenkins-based pipeline that builds and deploys the application
- **Traefik**: The reverse proxy and load balancer used in the Docker Swarm infrastructure
- **Framer_Motion**: The animation library used for smooth UI transitions and hover effects

---

## Requirements

### Requirement 1: Home Page

**User Story:** As a visitor, I want to land on a compelling home page, so that I immediately understand what VajraX does and feel confident in their capabilities.

#### Acceptance Criteria

1. THE Website SHALL display a full-viewport hero section with the tagline "Forged for the Frontier." and a call-to-action linking to the Projects page.
2. THE Website SHALL display the three Domains (Electronics, Defence, Medical) as distinct visual sections below the hero.
3. THE Website SHALL display a featured projects section showing a curated subset of Projects with title, domain tag, and status (Completed / In Progress).
4. THE Website SHALL display a credibility section listing partner/affiliated organisations: ISRO (NRSC), Army Base Workshop 506, Airports Authority of India, ISROxIITR, and DRDO-affiliated environments.
5. WHEN a visitor hovers over a domain card or featured project card, THE Website SHALL animate the card using Framer_Motion with a smooth scale or highlight transition.

---

### Requirement 2: About Page

**User Story:** As a visitor, I want to learn about the VajraX team and mission, so that I can evaluate their credibility and expertise.

#### Acceptance Criteria

1. THE Website SHALL display a mission statement and vision statement for VajraX on the About page.
2. THE Website SHALL display a team section with three members: Shubhanshu Pandey (Founder & Director), Subrato Malvia (Director), and Avani Pandit (Director).
3. THE Website SHALL render each team member card with their name, title, a brief bio, and their placeholder SVG image from the assets/team/ directory.
4. THE Website SHALL display Shubhanshu Pandey's card in a visually prominent position above the other two directors.
5. THE Website SHALL display a future goals section describing VajraX's roadmap and ambitions.

---

### Requirement 3: Projects Listing Page

**User Story:** As a visitor, I want to browse all VajraX projects, so that I can assess the range and quality of their work.

#### Acceptance Criteria

1. THE Website SHALL display all Projects in a responsive grid layout on the /projects page.
2. THE Website SHALL display each project card with title, domain tag (Electronics / Defence / Medical), and status badge (Completed / In Progress).
3. WHEN a visitor clicks a project card, THE Website SHALL navigate to the Project Detail page at /projects/[slug].
4. THE Website SHALL display the following initial projects: "Real-Time Lightning Detection & Cloud Logging System" and "AI-Based Difficult Airway Assessment ML Model".
5. WHEN a visitor hovers over a project card, THE Website SHALL animate the card using Framer_Motion.

---

### Requirement 4: Project Detail Page

**User Story:** As a visitor, I want to read the full details of a specific project, so that I can understand the technical depth and outcomes of VajraX's work.

#### Acceptance Criteria

1. THE Website SHALL resolve the dynamic route /projects/[slug] to the corresponding Project detail page.
2. THE Website SHALL display the project title, domain, status, full description, and technical details on the Project Detail page.
3. THE Website SHALL display the following details for "Real-Time Lightning Detection & Cloud Logging System": AS3935 sensor, STM32 Nucleo-F302R8, custom ferrite rod antenna tuned to 500kHz, RC notch filter for RF interference, Python backend logging to SQLite and Google Sheets, and a note on NavIC integration as a future goal.
4. THE Website SHALL display the following details for "AI-Based Difficult Airway Assessment ML Model": ML model for pre-intubation airway assessment, standardisation of pre-intubation scoring for anesthesiologists, and reduction of human error in difficult airway prediction.
5. IF a visitor navigates to a slug that does not correspond to any Project, THEN THE Website SHALL render a 404 page with a link back to /projects.

---

### Requirement 5: Services Page

**User Story:** As a potential client, I want to understand what VajraX builds, so that I can determine whether they can take on my project.

#### Acceptance Criteria

1. THE Website SHALL display a Services page at /services describing the three Domains: Electronics, Defence, and Medical.
2. THE Website SHALL describe the scope of work VajraX undertakes within each Domain.
3. THE Website SHALL include a call-to-action on the Services page linking to the Submit an Idea page.

---

### Requirement 6: Submit an Idea Page

**User Story:** As a potential client, I want to submit my project idea to VajraX, so that they can evaluate and potentially build it for me.

#### Acceptance Criteria

1. THE Website SHALL display an Idea_Form on the /submit-idea page with fields: name, email, and project idea details.
2. WHEN a visitor submits the Idea_Form with all required fields populated, THE Website SHALL send a POST request to the API endpoint POST /api/idea.
3. WHEN the API returns a success response, THE Website SHALL display a confirmation message to the visitor.
4. IF the API returns an error response, THEN THE Website SHALL display a descriptive error message without clearing the form fields.
5. IF a visitor submits the Idea_Form with any required field empty, THEN THE Website SHALL display inline validation errors and SHALL NOT submit the form.
6. THE API SHALL persist the Idea_Form Submission (name, email, project idea details, timestamp) to the MySQL database.

---

### Requirement 7: Contact Page

**User Story:** As a visitor, I want to contact VajraX directly, so that I can ask questions or start a conversation.

#### Acceptance Criteria

1. THE Website SHALL display a Contact_Form on the /contact page with fields: name, email, phone, and message.
2. THE Website SHALL display VajraX's contact details: email contact@vajrx.com and phone +91-6266995073.
3. WHEN a visitor submits the Contact_Form with all required fields populated, THE Website SHALL send a POST request to the API endpoint POST /api/contact.
4. WHEN the API returns a success response, THE Website SHALL display a confirmation message to the visitor.
5. IF the API returns an error response, THEN THE Website SHALL display a descriptive error message without clearing the form fields.
6. IF a visitor submits the Contact_Form with any required field empty, THEN THE Website SHALL display inline validation errors and SHALL NOT submit the form.
7. THE API SHALL persist the Contact_Form Submission (name, email, phone, message, timestamp) to the MySQL database.

---

### Requirement 8: Admin Panel

**User Story:** As a VajraX team member, I want a password-protected admin dashboard, so that I can review contact and idea submissions without exposing them publicly.

#### Acceptance Criteria

1. THE Website SHALL serve the Admin_Panel at the route /secret-admin.
2. WHEN a user navigates to /secret-admin without an active admin session, THE Website SHALL display a password input form and SHALL NOT render any submission data.
3. WHEN a user submits the correct Admin_Password, THE Website SHALL grant access to the Admin_Panel dashboard.
4. IF a user submits an incorrect Admin_Password, THEN THE Website SHALL display an error message and SHALL NOT grant access.
5. THE Admin_Panel SHALL display all Contact_Form Submissions in a table with columns: name, email, phone, message, and timestamp.
6. THE Admin_Panel SHALL display all Idea_Form Submissions in a table with columns: name, email, project idea details, and timestamp.
7. WHEN an authenticated admin requests GET /api/admin/contacts, THE API SHALL return all Contact_Form Submissions from the MySQL database.
8. WHEN an authenticated admin requests GET /api/admin/ideas, THE API SHALL return all Idea_Form Submissions from the MySQL database.
9. IF a request to GET /api/admin/contacts or GET /api/admin/ideas is made without valid admin credentials, THEN THE API SHALL return a 401 Unauthorized response.
10. THE Admin_Panel SHALL read the Admin_Password exclusively from the ADMIN_PASSWORD environment variable and SHALL NOT hardcode the password in source code.

---

### Requirement 9: UI Design System

**User Story:** As a visitor, I want a visually cohesive and cinematic experience, so that VajraX feels like a credible, high-calibre technology company.

#### Acceptance Criteria

1. THE Website SHALL apply a dark matte colour palette using black, olive, and navy as the primary colours across all pages.
2. THE Website SHALL use bold typography with minimal visual clutter on all pages.
3. THE Website SHALL apply Framer_Motion animations for page transitions and interactive hover states across all interactive elements.
4. THE Website SHALL be fully responsive and render correctly on mobile, tablet, and desktop viewport sizes.
5. THE Website SHALL include a consistent navigation bar on all pages linking to: Home, About, Projects, Services, Submit an Idea, and Contact.

---

### Requirement 10: Backend API

**User Story:** As a developer, I want a well-defined Golang REST API, so that the frontend can reliably persist and retrieve form submissions.

#### Acceptance Criteria

1. THE API SHALL expose the endpoint POST /api/contact accepting a JSON body with fields: name, email, phone, and message.
2. THE API SHALL expose the endpoint POST /api/idea accepting a JSON body with fields: name, email, and project idea details.
3. THE API SHALL expose the endpoint GET /api/admin/contacts protected by Admin_Password verification.
4. THE API SHALL expose the endpoint GET /api/admin/ideas protected by Admin_Password verification.
5. WHEN a POST /api/contact or POST /api/idea request is received with a missing required field, THE API SHALL return a 400 Bad Request response with a descriptive error message.
6. THE API SHALL connect to the MySQL database using connection parameters supplied exclusively via environment variables.
7. THE API SHALL be containerised and deployable as a Docker service within the Docker Swarm stack.

---

### Requirement 11: Infrastructure and Deployment

**User Story:** As a developer, I want the application deployed on a reliable, scalable infrastructure, so that the website is available and maintainable in production.

#### Acceptance Criteria

1. THE CI/CD_Pipeline SHALL build Docker images for the Website and API on every push to the main branch.
2. THE CI/CD_Pipeline SHALL deploy updated Docker images to the Docker Swarm stack without manual intervention.
3. THE Website SHALL be served via Nginx as the static file server within the Docker Swarm stack.
4. Traefik SHALL route incoming HTTPS traffic to the appropriate Docker Swarm service based on hostname rules.
5. THE CI/CD_Pipeline SHALL use Jenkins and SHALL be defined as a Jenkinsfile in the repository root.

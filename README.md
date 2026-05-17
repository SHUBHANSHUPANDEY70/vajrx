# VajrX — Forged for the Frontier

Official website for VajrX Technology — indigenous engineering across Electronics, Defence, and Medical domains.

## Stack

- **Frontend**: Next.js 14 (TypeScript), Tailwind CSS, Framer Motion — Atomic Design
- **Backend**: Golang (Gin), MySQL
- **Infra**: Docker Swarm + Traefik + Nginx + Jenkins CI/CD

## Local Development

```bash
# 1. Copy env file
cp .env.example .env
# Fill in your values

# 2. Start everything
docker-compose up --build
```

Frontend: http://localhost:3000  
Backend API: http://localhost:8080  
Admin panel: http://localhost:3000/secret-admin

## Project Structure

```
/
├── frontend/          # Next.js 14 app (Atomic Design)
│   ├── app/           # App Router pages
│   ├── components/    # atoms / molecules / organisms / templates
│   ├── data/          # Static project data
│   └── lib/           # API client
├── backend/           # Go API (Gin)
│   ├── cmd/server/    # Entry point
│   └── internal/      # handlers, middleware, models, db
├── docker-compose.yml # Local dev
├── docker-stack.yml   # Production Swarm
├── Jenkinsfile        # CI/CD pipeline
└── nginx.conf         # Nginx config
```

## Deployment

Push to `main` → Jenkins builds Docker images → pushes to GHCR → deploys to Docker Swarm via `docker stack deploy`.

## Contact

contact@vajrx.com | +91 6266995073 | vajrx.com

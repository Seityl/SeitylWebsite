# SEITYL Landing Page

A minimal, high-end landing page for SEITYL — built with Astro and TailwindCSS.

## Features

- **Framework:** Astro 5.x
- **Styling:** TailwindCSS 3.x
- **Design:** Dark-themed, geometric, architectural aesthetic
- **Performance:** Static site generation, optimized assets
- **Deployment:** Docker + Cloudflare Tunnel ready

## Project Structure

```
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── FutureStatement.astro
│   │   └── Footer.astro
│   ├── layouts/         # Page layouts
│   │   └── Layout.astro
│   ├── pages/           # Route pages
│   │   └── index.astro
│   └── styles/          # Global styles
│       └── global.css
├── public/              # Static assets
│   └── favicon.svg
├── Dockerfile           # Docker build config
├── docker-compose.yml   # Docker Compose with Cloudflare Tunnel
├── nginx.conf           # Nginx configuration
└── package.json         # Dependencies
```

## Running Locally

### Prerequisites

- Node.js 20+
- npm or pnpm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Build for production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Running with Docker

### Build and run

```bash
docker-compose up --build
```

The site will be available at `http://localhost:3000`

### Cloudflare Tunnel Setup

1. Install `cloudflared` locally or use the Docker service
2. Authenticate with Cloudflare:
   ```bash
   cloudflared tunnel login
   ```
3. Create a tunnel:
   ```bash
   cloudflared tunnel create seityl
   ```
4. Copy the tunnel token and add it to `.env`:
   ```bash
   cp .env.example .env
   # Edit .env and add your TUNNEL_TOKEN
   ```
5. Start with tunnel:
   ```bash
   docker-compose up -d
   ```

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0A0A0F` | Primary dark background |
| Text | `#FFFFFF` | Primary text |
| Accent | `#4B3CFA` | Links, highlights |
| Accent Light | `#2F5BFF` | Gradient endpoint |
| Neutral | `#A5A5A8` | Secondary text |

### Typography

- **Font:** Inter (Google Fonts)
- **Headings:** Semibold, tight tracking
- **Body:** Regular, comfortable line height
- **Labels:** Uppercase, extra-wide tracking

## Customization

### Update content

Edit the component files in `src/components/`:

- `Hero.astro` — Main headline and CTA
- `FutureStatement.astro` — Direction/About section
- `Footer.astro` — Copyright and contact info

### Update styles

Modify `tailwind.config.mjs` for theme changes or `src/styles/global.css` for custom CSS.

## License

© SEITYL. All rights reserved.

# Wedding Website Template

A beautiful, multilingual wedding website built with Astro and Tailwind CSS. Features internationalization (English, Spanish, Portuguese), RSVP form with Google Sheets integration, and automatic deployment to GitHub Pages.

> **Live Site**: [sergioybarbara.com](https://sergioybarbara.com)

---

## 🎯 Project Purpose

This is a **static wedding website** designed to:

- Display wedding details (ceremony, reception, story, travel info)
- Collect RSVPs from guests via a form that submits to Google Sheets
- Support multiple languages for international guests

---

## 📁 Project Structure

```
/
├── public/                      # Static assets served at root
│   ├── favicon.svg
│   └── hero.jpg                 # Hero image for the landing page
│
├── src/
│   ├── assets/                  # Images used in the site
│   │   └── *.jpg, *.png, *.svg
│   │
│   ├── components/              # Reusable Astro components
│   │   ├── Nav.astro            # Sticky navigation header
│   │   ├── RsvpForm.astro       # RSVP form with Google Sheets submission
│   │   └── Section.astro        # Generic section wrapper component
│   │
│   ├── data/
│   │   └── wedding.ts           # Wedding content data (couple name, venues, etc.)
│   │
│   ├── i18n/
│   │   └── ui.ts                # All UI translations (en, es, pt)
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro     # Base HTML layout with meta tags
│   │
│   ├── pages/
│   │   ├── index.astro          # Root redirect to default language
│   │   └── [lang]/
│   │       └── index.astro      # Main wedding page (dynamic per language)
│   │
│   └── styles/
│       └── global.css           # Tailwind imports + custom utility classes
│
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions workflow for deployment
│
├── astro.config.mjs             # Astro configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

---

## 🛠️ Tech Stack

| Technology                                     | Purpose                                         |
| ---------------------------------------------- | ----------------------------------------------- |
| **[Astro](https://astro.build)**               | Static site generator with islands architecture |
| **[Tailwind CSS v4](https://tailwindcss.com)** | Utility-first CSS framework                     |
| **TypeScript**                                 | Type safety for data files                      |
| **GitHub Actions**                             | CI/CD for automated deployment                  |
| **GitHub Pages**                               | Static site hosting                             |
| **Google Apps Script**                         | RSVP form backend (receives form submissions)   |

---

## 🌍 Internationalization (i18n)

The site supports **3 languages**: English (`en`), Spanish (`es`), Portuguese (`pt`).

### How it works:

1. **Route-based language switching**: Each language has its own URL path (`/en/`, `/es/`, `/pt/`)
2. **Static path generation**: `getStaticPaths()` in `[lang]/index.astro` generates all language variants at build time
3. **Default language redirect**: The root `/` redirects to `/en/` (configurable in `src/i18n/ui.ts`)

### Key files:

- **`src/i18n/ui.ts`**: Contains all UI strings (navigation labels, form labels, etc.)
- **`src/data/wedding.ts`**: Contains wedding-specific content per language (venue names, couple story, etc.)

### Adding a new language:

1. Add language code to `languages` object in `src/i18n/ui.ts`
2. Add all translation keys for the new language in `ui` object
3. Add wedding content for the new language in `src/data/wedding.ts`

---

## 📝 RSVP Form

The RSVP form submits to a **Google Apps Script web app** that saves responses to a Google Sheet.

### Configuration:

Set the `PUBLIC_RSVP_ENDPOINT` environment variable to your Google Apps Script URL:

```env
PUBLIC_RSVP_ENDPOINT="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

### Form fields submitted:

| Field       | Description                        |
| ----------- | ---------------------------------- |
| `fullName`  | Guest's full name (required)       |
| `email`     | Email address (optional)           |
| `attending` | "yes" or "no" (required)           |
| `guests`    | Number of guests (1-10)            |
| `dietary`   | Dietary restrictions (optional)    |
| `message`   | Personal message (optional)        |
| `website`   | Honeypot field for spam prevention |

### How it works:

1. Form submits via POST to a hidden iframe (cross-origin workaround)
2. Client shows optimistic success message after 600ms delay
3. Google Apps Script receives data and appends to Google Sheet

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

### Environment Variables

Create a `.env` file in the project root:

```env
# Required for RSVP form to work
PUBLIC_RSVP_ENDPOINT="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

# Optional: Override site URL and base path
SITE_URL="http://localhost:4321"
BASE_PATH="/"
```

---

## 📦 Commands

| Command           | Action                               |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`   |
| `npm run preview` | Preview production build locally     |

---

## 🌐 Deployment

The site automatically deploys to **GitHub Pages** when pushing to the `master` branch.

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`) does the following:

1. Checks out the repository
2. Builds the Astro site using `withastro/action@v3`
3. Deploys to GitHub Pages using `actions/deploy-pages@v4`

### Required GitHub Secrets

Set these in your repository settings → Secrets and variables → Actions:

| Secret                 | Description                                 |
| ---------------------- | ------------------------------------------- |
| `PUBLIC_RSVP_ENDPOINT` | Google Apps Script URL for RSVP submissions |

### Automatic URL Configuration

The workflow automatically sets:

- `SITE_URL`: `https://{username}.github.io`
- `BASE_PATH`: `/{repository-name}`

---

## 🎨 Customization Guide

### To customize this for your wedding:

1. **Update wedding data**: Edit `src/data/wedding.ts` with your:

   - Couple names
   - Wedding date
   - Venue information
   - Story text
   - Travel/hotel recommendations
   - Registry links

2. **Update translations**: Edit `src/i18n/ui.ts` for any UI text changes

3. **Replace images**:

   - `public/hero.jpg`: Main hero image at the top
   - `src/assets/`: Additional venue/couple photos

4. **Update branding**:

   - `public/favicon.svg`: Browser tab icon
   - `astro.config.mjs`: Update `site` URL to your domain

5. **Set up RSVP form**:
   - Create a Google Sheet
   - Deploy a Google Apps Script to receive form submissions
   - Set `PUBLIC_RSVP_ENDPOINT` environment variable

---

## 📋 Page Sections

The main page (`src/pages/[lang]/index.astro`) includes these sections:

| Section ID  | Description                                            |
| ----------- | ------------------------------------------------------ |
| `#details`  | Ceremony and reception cards with time/venue/map links |
| `#story`    | The couple's story text                                |
| `#travel`   | Getting there + hotel recommendations                  |
| `#registry` | Gift registry links                                    |
| `#rsvp`     | RSVP form                                              |

---

## 🧩 Components

### `Nav.astro`

- Sticky navigation header
- Shows couple name + date
- Desktop: full navigation links
- Mobile: simplified with RSVP link only

### `Section.astro`

- Wrapper component for page sections
- Props: `id` (anchor), `title` (section heading)
- Applies consistent padding and container width

### `RsvpForm.astro`

- Complete RSVP form with validation
- Internationalized labels
- Honeypot spam protection
- Client-side JavaScript for form submission feedback

### `BaseLayout.astro`

- HTML document structure
- Meta tags and viewport
- Global CSS imports

---

## 🎨 Styling

### CSS Architecture

- **Tailwind CSS v4** via Vite plugin
- **Global styles** in `src/styles/global.css`
- **CSS custom properties** for theming (e.g., `--bg` for background)

### Custom Utility Classes

| Class               | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `.container-narrow` | Centered container with max-width and padding |
| `.card`             | Frosted glass card style with blur and border |
| `.link`             | Underlined link style with hover effect       |

---

## 📄 License

This project is intended as a template. Feel free to use and modify for your own wedding website.

---

## 🤝 LLM Development Note

This codebase was created and maintained entirely by AI/LLM assistance. When working with this codebase:

1. **Wedding data** is centralized in `src/data/wedding.ts` - edit here for content changes
2. **Translations** are in `src/i18n/ui.ts` - all UI strings are here
3. **Page structure** is in `src/pages/[lang]/index.astro` - the main page template
4. **Styling** uses Tailwind classes inline + custom utilities in `global.css`
5. **RSVP form** requires the `PUBLIC_RSVP_ENDPOINT` env var to function

The architecture follows Astro conventions with clear separation between data, layout, and components.

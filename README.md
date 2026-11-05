# KindredPulse — Civic Action Network

**KindredPulse** is a community-driven social development events platform where users can create, join, and track grassroots civic service events in their local area — from winter clothes distribution in Mirpur 10, Dhaka, to blanket drives in Mohammadpur and community cleanups across the city.

> 🔗 **Live Site:** `https://kindredpulse.vercel.app` *(update this URL after deploying to Vercel)*  
> 🔗 **Server Repository:** `https://github.com/<your-username>/kindredpulse-server`

## Features

- **Create Social Events** — Logged-in users can create events with a title, description, event type (Cleanup, Plantation, Donation, Blood Donation, Food Drive, Fundraiser, Awareness Campaign, Workshop, Seminar, and more), thumbnail image, location, and a future-dated event. Each event records the creator's email so ownership is always verifiable.
- **Join Events** — Any visitor can view event details, but joining an event requires authentication. Joined events are stored in the database with the user and event data, and duplicate joins are prevented at the database level.
- **Upcoming Events Grid** — Browse all upcoming community drives in a responsive 2/3-column grid. Only future-dated events appear; past events are automatically filtered out.
- **Manage Your Events** — Event creators can view, update, and delete only the events they created. Private routes protect create, manage, and joined-events pages.
- **Authentication & Profiles** — Email/password sign-in and registration (with password strength validation), Google social login, profile picture uploads via Cloudinary, and name/email management — all powered by BetterAuth with JWT protection.
- **Theme Toggle** — Switch between light and dark modes instantly; the entire UI adapts to your preference.
- **Responsive Design** — Fully responsive layouts for mobile, tablet, and desktop views with a sticky navbar, footer, and consistent HeroUI components.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, HeroUI v3, Tailwind CSS v4 |
| Authentication | BetterAuth (MongoDB Adapter + JWT), react-toastify |
| Backend | Express 5 (JavaScript), MongoDB |
| Deployment | Vercel (frontend), Render (backend) |
| Media | Cloudinary (profile picture uploads) |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (Atlas or local)
- Cloudinary account (for profile picture uploads)

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy the environment example and fill in your values
cp .env.example .env   # or create .env manually

# Run the development server
npm run dev
```

The app runs on `http://localhost:3000`.



### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create backend/.env
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "CLIENT_URL=http://localhost:3000" >> .env

# Run the server
node index.js
```

The API runs on `http://localhost:5000`.

### Available Scripts (Frontend)

```bash
npm run dev     # Start development server (Turbopack, port 3000)
npm run build   # Production build (typecheck + compile)
npm run lint    # Run ESLint
npm run start   # Start production server
```

### Verification

Before submitting, always run:

```bash
cd frontend && npm run lint && npm run build
```

There are no backend tests; start the server with `node index.js` and watch the terminal for MongoDB connection errors.

## Project Structure

```
social-events-full-stack/
├── backend/
│   ├── index.js          # Express 5 API (single file)
│   ├── .env              # MONGODB_URI, CLIENT_URL
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # Reusable UI components
│   │   └── lib/          # Auth config, token helpers, types
│   ├── .env              # Frontend environment variables
│   ├── next.config.ts
│   └── package.json
└── AGENTS.md             # Agent instructions (keep updated)
```

## Deployment

- **Frontend:** Deploy to Vercel. Connect your GitHub repo and set all `frontend/.env` variables in the Vercel dashboard.
- **Backend:** Deploy to Render (or similar). Set `MONGODB_URI` and `CLIENT_URL` (pointing to your Vercel frontend URL) in the Render dashboard.
- After deployment, update `NEXT_PUBLIC_URL` in `frontend/.env` to your live backend URL and redeploy.

## Assignment Compliance

- ✅ No Lorem Ipsum text — all copy is original and domain-specific
- ✅ No browser `alert()` — all messages use react-toastify toasts
- ✅ Password validation (uppercase + lowercase + 6+ characters) with error toasts
- ✅ JWT-protected APIs for create, manage, and joined-events routes
- ✅ Loading skeletons on data-fetching routes
- ✅ Light/dark theme toggle across the full system
- ✅ Responsive for mobile, tablet, and desktop

---

Built with Next.js 16, HeroUI, BetterAuth, Express, and MongoDB.  
KindredPulse — mobilizing local civic action for verified social impact.

# Star Ranch Animal Sanctuary — MERN Stack Website

A production-ready MERN stack website for **Star Ranch Animal Sanctuary**, founded by Joyce and Keith Robinson in Concho, Arizona.

## Project Structure

```
project-root/
├── frontend/     # React + Vite (public site + admin panel)
└── backend/      # Express + MongoDB API
```

Frontend and backend are fully separated for independent development and deployment.

## Tech Stack

- **MongoDB** — Database
- **Express.js** — REST API
- **React.js** — Frontend (Vite)
- **Node.js** — Backend runtime
- **Cloudinary** — Image uploads
- **Nodemailer** — SMTP email notifications
- **JWT** — Admin authentication

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
npm install
npm run seed    # Creates admin user + default data
npm run dev     # Starts on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev     # Starts on http://localhost:5173
```

## Default Admin Login

After running `npm run seed`:

- **Email:** `admin@starranchanimalsanctuary.com`
- **Password:** `ChangeMe123!`

Change these immediately in production.

## Admin Panel

Access at `/admin/login` with modules for:

- Dashboard
- Help Requests / Bookings
- Services
- Gallery (Cloudinary uploads)
- Donations
- Contact Messages
- Website Content (CMS)

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for all required variables.

**Never expose** MongoDB URI, JWT secret, Cloudinary secret, or SMTP credentials in the frontend.

## Public Pages

- Home
- Our Story
- Services
- Booking / Request Help
- Gallery
- Support / Donate
- Contact
- 404

## API Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/login` | Public |
| GET | `/api/services` | Public |
| GET | `/api/gallery` | Public |
| GET | `/api/settings` | Public |
| POST | `/api/bookings` | Public |
| POST | `/api/contact` | Public |
| POST | `/api/donations` | Public |
| GET | `/api/bookings` | Admin |
| PUT | `/api/settings` | Admin |

## Deployment (Vercel)

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full step-by-step instructions.

**Quick summary:**
1. Deploy `backend/` folder as Vercel project → API at `https://your-api.vercel.app`
2. Deploy `frontend/` folder as separate Vercel project
3. Set `VITE_API_URL=https://your-api.vercel.app/api` on frontend
4. Set `CLIENT_URL=https://your-site.vercel.app` on backend


## License

Private — Star Ranch Animal Sanctuary

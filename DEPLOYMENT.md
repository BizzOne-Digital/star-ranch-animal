# Vercel Deployment Guide — Star Ranch Animal Sanctuary

Deploy **frontend** and **backend** as **two separate Vercel projects**.

---

## Prerequisites

- [Vercel account](https://vercel.com)
- [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (already configured)
- [Cloudinary](https://cloudinary.com) account
- GitHub repo (recommended) or Vercel CLI

---

## Step 1 — Deploy Backend API

### Option A: Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. **Root Directory:** `backend`
4. **Framework Preset:** Other
5. **Build Command:** leave empty (or `echo "no build"`)
6. **Output Directory:** leave empty
7. Add **Environment Variables** (see table below)
8. Click **Deploy**

### Option B: Vercel CLI

```bash
cd backend
npm i -g vercel
vercel login
vercel
```

Follow prompts. Set root to `backend` folder.

### Backend Environment Variables (Vercel Dashboard → Settings → Environment Variables)

| Variable | Example | Required |
|----------|---------|----------|
| `MONGODB_URI` | `mongodb+srv://...` | Yes |
| `JWT_SECRET` | long random string | Yes |
| `JWT_EXPIRE` | `7d` | Yes |
| `CLOUDINARY_CLOUD_NAME` | your cloud name | Yes |
| `CLOUDINARY_API_KEY` | your api key | Yes |
| `CLOUDINARY_API_SECRET` | your secret | Yes |
| `CLIENT_URL` | `https://your-site.vercel.app` | Yes |
| `SMTP_HOST` | `smtp.gmail.com` | For emails |
| `SMTP_PORT` | `587` | For emails |
| `SMTP_USER` | your email | For emails |
| `SMTP_PASS` | app password | For emails |
| `SMTP_FROM_EMAIL` | sender email | For emails |
| `SMTP_FROM_NAME` | `Star Ranch Animal Sanctuary` | For emails |
| `ADMIN_EMAIL` | admin notification email | For emails |
| `NODE_ENV` | `production` | Yes |

### MongoDB Atlas — Allow Vercel

In Atlas → Network Access → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)  
(Vercel uses dynamic IPs)

### Test Backend

After deploy, open:

```
https://YOUR-BACKEND-URL.vercel.app/api/health
```

Should return: `{ "success": true, "db": true }`

### Seed Admin (run locally once)

```bash
cd backend
# Set MONGODB_URI to same production database in .env
npm run seed
```

---

## Step 2 — Deploy Frontend

1. New Vercel project → same repo
2. **Root Directory:** `frontend`
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Add environment variable:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://YOUR-BACKEND-URL.vercel.app/api` |

7. Deploy

### Test Frontend

- Visit `https://your-site.vercel.app`
- Admin: `https://your-site.vercel.app/admin/login`

---

## Step 3 — Update CORS After Frontend Deploy

Go to **Backend** Vercel project → Environment Variables:

Update `CLIENT_URL` to your live frontend URL:

```
https://your-frontend.vercel.app
```

Multiple URLs (preview + production):

```
https://your-frontend.vercel.app,https://your-frontend-git-main.vercel.app
```

Redeploy backend after changing env vars.

---

## Project URLs Structure

```
Frontend:  https://star-ranch.vercel.app
Backend:   https://star-ranch-api.vercel.app
API:       https://star-ranch-api.vercel.app/api/health
Admin:     https://star-ranch.vercel.app/admin/login
```

---

## Local Development

```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
```

Frontend `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error | Set `CLIENT_URL` to exact frontend URL in backend env |
| `Must supply api_key` | Add Cloudinary env vars in Vercel backend settings |
| API 500 on gallery upload | Check Cloudinary credentials; max file 5MB |
| MongoDB connection failed | Whitelist `0.0.0.0/0` in Atlas |
| Admin login fails | Run `npm run seed` or `npm run reset-admin` |
| 404 on page refresh | `frontend/vercel.json` handles SPA routing |

---

## File Structure for Vercel

```
backend/
  api/index.js      ← Vercel serverless entry
  vercel.json       ← Routes all traffic to API
  server.js         ← Express app (exported)

frontend/
  vercel.json       ← SPA rewrites for React Router
  dist/             ← Build output (auto on deploy)
```

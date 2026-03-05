# Next.js + Supabase Starter

A full-stack Next.js application using Supabase for authentication, database, and row-level security with CI-based migration deployment.

---

## 🚀 Features

- Supabase Authentication
- Profile table with automatic creation trigger
- Row Level Security (RLS)
- Database migrations
- GitHub Actions CI for automatic production migration deployment
- Local development with Supabase CLI

---

## 🧱 Architecture

### Frontend
- Next.js (App Router)

### Backend
- Supabase (PostgreSQL)
- Supabase Auth
- RLS Policies

### CI/CD
- GitHub Actions
- Supabase CLI
- Production migration automation

---

## 🛠 Local Development Setup

### 1. Install dependencies
npm install

### 2. Start Supabase locally
npx supabase start

### 3. Run the app
npm run dev

---

## 🔐 Environment Variables

Create a `.env.local` file with:

NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

---

## 🗄 Database Migrations

Migrations are located in:
supabase/migrations/
To apply locally:
supabase db push

---

## 🚀 Production Deployment

On push to `main`, GitHub Actions:

1. Authenticates with Supabase
2. Links to production project
3. Runs `supabase db push`
4. Applies pending migrations automatically

Secrets required:

- SUPABASE_PROJECT_REF
- SUPABASE_DB_PASSWORD
- SUPABASE_ACCESS_TOKEN

---

## 📌 Author

Wade Kemmsies
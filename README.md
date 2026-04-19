# ⚗️ ContentForge — AI Alchemy Engine

ContentForge is a full-stack AI content repurposing platform. It transforms long-form content (URLs, PDFs, raw text) into polished, platform-specific social media posts using Google's Gemini AI — with a credit system, brand voice customization, synthesis history, and a personal content vault.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5-404D59?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Alchemy Dashboard** | Real-time credit tracking, activity log, and quick-start actions |
| **Synthesis Hub** | Repurpose URLs, PDFs, or raw text into LinkedIn, X, Newsletter posts |
| **Brand Voice Engine** | Choose your AI tone — Professional, Conversational, Witty, Story-Driven |
| **Synthesis History** | Browse, review, and revisit all past content transformations |
| **The Vault** | Save and curate your best generated content for quick reuse |
| **Notifications** | In-app notification system for synthesis job updates |
| **Activity Feed** | Timestamped log of all platform actions per user |
| **Credits System** | Per-user credit economy; debited on each synthesis run |
| **Settings** | Manage profile, API key, notification preferences, and content defaults |
| **JWT Auth** | Secure signup/login with hashed passwords and stateless JWT sessions |
| **Gemini AI** | Powered by `@google/generative-ai` using user-supplied or platform API key |
| **Dark UI** | Glassmorphism-inspired design with a premium "AI Alchemy" aesthetic |

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + `tw-animate-css` + `shadcn/ui`
- **Icons**: Lucide React
- **UI Primitives**: Base UI (`@base-ui/react`), Class Variance Authority

### Backend
- **Runtime**: Node.js (ESM)
- **Framework**: Express.js v5
- **Language**: TypeScript (executed via `tsx`)
- **ORM**: Prisma v6 (MySQL driver)
- **Auth**: JSON Web Tokens (`jsonwebtoken`) + `bcryptjs`
- **AI**: Google Generative AI (`@google/generative-ai`)
- **Validation**: Zod
- **Logging**: Morgan

### Database
- **Engine**: MySQL 8
- **Schema**: Managed by Prisma (`prisma/schema.prisma`)

---

## 🗃️ Database Schema

```
User            — auth, profile, credits, preferences, API key
SynthesisJob    — source, output, platform, voice, depth
VaultItem       — saved content with title, description, platform tag
Notification    — typed in-app notifications per user
Activity        — action log entries per user
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** v20+
- **MySQL** 8 (running locally or via a cloud provider)
- **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ContentForge.git
cd ContentForge
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env
```

**`.env` variables:**

```env
PORT=8080
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
JWT_SECRET="your_highly_secure_random_secret_here"
GEMINI_API_KEY="your_gemini_api_key_here"
```

Run database migrations and seed initial data:

```bash
npx prisma migrate dev
npm run seed
```

Start the backend dev server:

```bash
npm run dev
# Server running at http://localhost:8080
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Copy the environment template:

```bash
cp .env.local.example .env.local
```

**`.env.local` variables:**

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Start the frontend dev server:

```bash
npm run dev
# App available at http://localhost:3000
```

---

## 📂 Project Structure

```
ContentForge/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Database models
│   │   └── seed.ts             # Seed script
│   ├── src/
│   │   ├── controllers/        # Route handler logic
│   │   ├── lib/                # Prisma client, utilities
│   │   ├── middleware/         # JWT auth middleware
│   │   ├── routes/
│   │   │   ├── auth.ts         # POST /auth/signup, /auth/login
│   │   │   ├── user.ts         # GET/PUT /user (profile, settings)
│   │   │   ├── synthesis.ts    # POST /synthesis (AI generation)
│   │   │   ├── history.ts      # GET /history
│   │   │   ├── vault.ts        # GET/POST/DELETE /vault
│   │   │   ├── notifications.ts# GET/PUT /notifications
│   │   │   └── activity.ts     # GET /activity
│   │   └── index.ts            # Express app entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx            # Dashboard
    │   │   ├── new-repurpose/      # Synthesis workflow
    │   │   ├── history/            # Synthesis history
    │   │   ├── vault/              # Saved content
    │   │   ├── activity/           # Activity feed
    │   │   ├── notifications/      # Notifications
    │   │   ├── settings/           # User settings
    │   │   ├── pricing/            # Pricing page
    │   │   ├── login/              # Auth pages
    │   │   └── signup/
    │   ├── components/             # Shared UI (Sidebar, etc.)
    │   └── lib/                    # API helpers, utils
    ├── .env.local.example
    └── package.json
```

---

## 🔌 API Reference

All routes (except auth) require a `Bearer <token>` header.

| Method | Route | Description |
|---|---|---|
| `POST` | `/auth/signup` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT |
| `GET` | `/user` | Get authenticated user profile |
| `PUT` | `/user` | Update profile or settings |
| `POST` | `/synthesis` | Run an AI synthesis job |
| `GET` | `/history` | List user's synthesis jobs |
| `GET` | `/vault` | Get saved vault items |
| `POST` | `/vault` | Save an item to the vault |
| `DELETE` | `/vault/:id` | Remove a vault item |
| `GET` | `/notifications` | Get user notifications |
| `PUT` | `/notifications/:id/read` | Mark notification as read |
| `GET` | `/activity` | Get user activity log |

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

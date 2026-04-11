# 🛠️ ContentForge: AI Alchemy Engine

ContentForge is a high-fidelity content repurposing platform designed to transform long-form content into platform-ready social media masterpieces. Built with a modern, "AI Alchemy" aesthetic, it provides creators with a seamless workflow to scale their digital presence.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

## ✨ Features

- **Alchemy Dashboard**: Real-time usage tracking, content momentum stats, and quick-start actions.
- **Synthesis Hub**: Transform URLs, PDFs, or raw text into platform-specific posts (LinkedIn, X, Newsletters).
- **The Vault**: Curate and store your most impactful generated content.
- **Synthesis History**: Revisit, edit, and refine previous content transformations.
- **Brand Voice Engine**: Customize the AI's tone—from "Professional Expert" to "Witty & Sharp."
- **Credits System**: Transparent billing and credit management for high-scale production.
- **Modern Dark UI**: A professional, "Glassmorphism" inspired interface with custom animations and a premium feel.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (Turbopack enabled)
- **Styling**: Tailwind CSS (v4) with custom "AI Alchemy" theme
- **Icons**: Lucide React
- **Typography**: Inter (Sans) & Manrope (Heading)
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Environment**: ESM (ECMAScript Modules)

## 🛠️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ContentForge.git
   cd ContentForge
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *The server will start on `http://localhost:8080`*

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   *The application will be available at `http://localhost:3000`*

## 📂 Project Structure

```text
ContentForge/
├── backend/            # Express.js API
│   ├── index.js        # Server entry point
│   └── package.json    # Backend dependencies
└── frontend/           # Next.js Application
    ├── src/
    │   ├── app/        # App Router (Pages & Layouts)
    │   ├── components/ # Shared UI Components
    │   └── lib/        # Utility functions
    ├── public/         # Static assets
    └── tailwind.config # Styling configuration
```

## 🗺️ Roadmap
- [ ] Implement actual AI Synthesis (OpenAI/Anthropic integration)
- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Real-time job status tracking via WebSockets
- [ ] Full Auth implementation (NextAuth/Clerk)
- [ ] Multi-user Workspace support

## 📄 License
This project is licensed under the ISC License.

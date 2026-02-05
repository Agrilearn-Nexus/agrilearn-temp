# 🌱 Agrilearn Nexus

**Transforming Agriculture Through Knowledge, Innovation, and Training**

Agrilearn Nexus is a comprehensive platform designed to empower the agricultural community through education and research. It connects farmers, students, and researchers with resources, workshops, and training programs to foster a sustainable future.

---

## 🚀 Features

* **Educational Platform**
  Resources and training modules for farmers and students.

* **Event Management**
  Registration system for workshops and agricultural events.

* **Digital Magazine**
  Access to the latest agricultural articles and research papers.

* **Secure Authentication**
  User management powered by NextAuth.js.

* **Background Processing**
  Robust event-driven architecture using Inngest for notifications and background tasks.

* **Email Notifications**
  Automated emails for registrations and updates using Nodemailer and React Email.

---

## 🛠 Tech Stack

### Frontend

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
* **UI Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
* **Icons**: React Icons, Lucide React

### Backend & Database

* **Database**: PostgreSQL
* **ORM**: [Prisma](https://www.prisma.io/)
* **Authentication**: [NextAuth.js (v5)](https://authjs.dev/)
* **Serverless Queue**: [Inngest](https://www.inngest.com/)

### Infrastructure

* **Containerization**: Docker & Docker Compose
* **Storage**: AWS S3 / Cloudflare R2
* **Email**: Nodemailer & React Email

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (LTS version)
* pnpm (Package Manager)
* Docker & Docker Compose (optional, for local DB and Inngest)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/agrilearn-nexus.git
cd agrilearn-nexus
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/agrilearn"

# Authentication (NextAuth)
AUTH_SECRET="your_generated_secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_client_id"

# Inngest (Background Jobs)
INNGEST_EVENT_KEY="local"
INNGEST_SIGNING_KEY="local"

# Storage (R2 / S3)
R2_ACCESS_KEY_ID="your_r2_key_id"
```

### 4. Database Migration

```bash
pnpm prisma:migrate
```

---

## ▶️ Running the Project

### Development Mode

```bash
pnpm dev
```

The app will run at: **[http://localhost:3000](http://localhost:3000)**

### Run Inngest Dev Server

In a separate terminal:

```bash
pnpm inngest
```

Inngest dashboard will run at: **[http://localhost:8288](http://localhost:8288)**

---

## 🚀 Production Build

```bash
pnpm build
pnpm start
```

---

## 📜 Scripts

* `pnpm dev` – Starts the Next.js development server
* `pnpm build` – Builds the application for production
* `pnpm start` – Starts the production server
* `pnpm lint` – Runs ESLint checks
* `pnpm prisma:migrate` – Runs database migrations
* `pnpm email` – Starts the React Email development preview
* `pnpm inngest` – Starts the Inngest local development server

---

## 👥 Developers

* **Aditya Singh** – Frontend
  GitHub: *[link](https://github.com/aditya-singhOfficial)*

* **Aryan Kumar** – Backend
  GitHub: *[link](https://github.com/AryanKumarOfficial)*

---

## © License

© 2026 **Agrilearn Nexus**. All rights reserved.

# Twitter Demo

<div align="center">

A full-stack Twitter-like application built with modern technologies.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-red?logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.15-2D3748?logo=prisma)](https://www.prisma.io/)

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Development](#development)

</div>

---

## 📋 Features

- 🔐 User authentication and profiles
- 📝 Create, read, update, and delete posts
- ❤️ Like and unlike posts
- 👥 Follow/unfollow users
- 🎨 Modern, responsive UI
- ⚡ Real-time updates
- 🏗️ Monorepo architecture with Turborepo

## 🛠 Tech Stack

### Frontend

- **Framework:** Next.js 15.5 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom component library

### Backend

- **Framework:** NestJS 11
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** class-validator & class-transformer

### Development

- **Monorepo:** Turborepo
- **Package Manager:** pnpm
- **Code Quality:** ESLint, Prettier
- **Testing:** Jest

## 📁 Project Structure

```
twitter-demo/
├── apps/
│ ├── backend/ # NestJS API server
│ │ ├── prisma/ # Database schema and migrations
│ │ ├── src/ # Source code
│ │ └── scripts/ # Utility scripts
│ └── frontend/ # Next.js web application
├── packages/
│ └── ui/ # Shared UI components
├── package.json # Root package configuration
├── turbo.json # Turborepo configuration
└── pnpm-workspace.yaml # pnpm workspace configuration
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **pnpm** >= 8.0.0 ([Install](https://pnpm.io/installation))
- **PostgreSQL** >= 13 ([Download](https://www.postgresql.org/download/))

### Installation

1. **Clone the repository**

```shell
   git clone https://github.com/yourusername/twitter-demo.git
   cd twitter-demo
```

2. **Install dependencies**

```shell
pnpm install
```

This will:

- Install all project dependencies
- Automatically generate Prisma Client

3. **Update prisma database**

```shell
cd apps/backend
npx prisma migrate dev
```

Edit apps/backend/.env and set your database connection:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/twitter_demo?schema=public"
```

> Note: Replace YOUR_USERNAME and YOUR_PASSWORD with your PostgreSQL credentials.

4. Start development servers

```shell
pnpm dev
```

The application will be available at:

Frontend: http://localhost:3000
Backend API: http://localhost:3001

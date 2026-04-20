# HG Real Estate Backend

## Overview
This is the Express/Node.js backend for the **HG Real Estate** platform. It provides a RESTful API for properties, categories, users, enquiries, and authentication.

## Prerequisites
- Node.js >= 20
- npm (comes with Node)
- MongoDB instance (local or remote)

## Setup
```bash
# Clone the repo (if not already)
git clone <repo-url>
cd HGReal_estate

# Install backend dependencies
npm install --prefix backend

# Create a .env file (copy from .env.example)
cp backend/.env.example backend/.env
# Edit backend/.env with your credentials

# Run the development server
npm run dev --prefix backend
```

The server will start on `http://localhost:5000` (or the port defined in `.env`).

## Scripts
- `npm run dev` – Starts the server with nodemon for hot‑reloading.
- `npm start` – Starts the server in production mode.
- `npm run lint` – Lints the code with ESLint.
- `npm run format` – Formats the code with Prettier.

## API Documentation
- Health check: `GET /api/health`
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Properties: CRUD under `/api/properties`
- Categories: `GET /api/categories`
- Users: profile endpoints under `/api/users`
- Enquiries: `POST /api/enquiries`

## Testing
(Tests can be added later with Jest & Supertest.)

---
*Happy coding!*

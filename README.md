# Task Management App

A full-stack task management application built with React, Vite, Node.js, Express, and MongoDB. It includes authenticated task workflows, admin visibility, API documentation, and Docker support.

## Features

- Login and signup with JWT authentication
- Protected dashboard route and public-only auth routes
- Persisted auth using `localStorage` with current-user restore on reload
- Create, edit, delete, search, filter, sort, and paginate tasks
- Mark tasks as completed or pending
- Dashboard stats for all, completed, and pending tasks
- Admin overview with workspace user count
- Admin scope switch between personal tasks and all workspace tasks
- Task cards with owner, due date, updated date, tags, priority, and status
- Loading, empty, and error states
- Saved light/dark theme preference
- Responsive auth and app shell layouts
- Not-found route for unknown pages
- Swagger API documentation
- Backend tests with Jest, Supertest, and MongoDB Memory Server

## Tech Stack

- Frontend: React 18, Vite, React Router, Axios, CSS Modules, Tabler Icons
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- API tooling: Swagger UI, express-validator
- Security and middleware: Helmet, CORS, Morgan
- Testing: Jest, Supertest, MongoDB Memory Server
- DevOps: Docker and Docker Compose

## Project Structure

```text
Task_Managment_Web/
  backend/
    src/
      config/
      controllers/
      docs/
      middleware/
      models/
      routes/
      services/
      tests/
      utils/
      app.js
      server.js
    .env.example
    package.json
  frontend/
    src/
      api/
      app/
      components/
      contexts/
      hooks/
      layouts/
      pages/
      styles/
      utils/
    .env.example
    package.json
    vite.config.js
  docker-compose.yml
```

## Local Setup

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB running locally, or a MongoDB connection string

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend runs at `http://localhost:3000` by default.

Backend scripts:

- `npm run dev`: start the API with Nodemon
- `npm start`: start the API with Node
- `npm test`: run backend tests

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

Frontend environment variables:

```text
VITE_API_BASE_URL=http://localhost:3000/api
```

Frontend scripts:

- `npm run dev`: start the Vite development server
- `npm run build`: create a production build
- `npm run preview`: preview the production build locally

## API Overview

Base API URL:

```text
http://localhost:3000/api
```

Health and documentation:

- `GET /api/health`
- `GET /api/docs`

Authentication:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

Tasks:

- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `PATCH /api/tasks/:id/status`
- `DELETE /api/tasks/:id`

Users:

- `GET /api/users` admin only
- `GET /api/users/overview` admin only

Swagger docs are available at `http://localhost:3000/api/docs`.

## Auth And Roles

Users can sign up and log in with email and password. The backend returns a JWT, and the frontend stores it in `localStorage` under `task_manager_token`.

To create an admin account, set `ADMIN_INVITE_CODE` in the backend `.env`, then provide the same invite code during signup. Admin users can switch dashboard scope between `My tasks` and `All workspace tasks`.

## Docker Setup

Run all services with Docker Compose:

```bash
docker compose up --build
```

## Development Notes

- The frontend uses CSS Modules for component-level styling.
- Axios attaches the JWT bearer token through a shared API client.
- The backend protects task and user routes with auth middleware.
- Non-admin users can only access their own tasks.
- Admin users can view workspace-wide task data and user overview data.

## Common Commands

Run backend tests:

```bash
cd backend
npm test
```

Build frontend:

```bash
cd frontend
npm run build
```

Preview frontend build:

```bash
cd frontend
npm run preview
```

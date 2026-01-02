# NestJS + React Film Project

This is a local-only film management project with a NestJS backend and React frontend.

## Prerequisites

- Node.js (v16+)
- npm

## Setup & Installation

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` (or use the one provided):
   ```
   PORT=3000
   JWT_SECRET=supersecretkey
   JWT_EXPIRES_IN=1d
   CORS_ORIGIN=http://localhost:5173
   SQLITE_PATH=./data/database.sqlite
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ADMIN_NAME=SuperAdmin
   ```
4. Start the backend server:
   ```bash
   npm run start:dev
   ```
   *The server will run on http://localhost:3000*
   *On first run, it will automatically create the SQLite database and seed the default Admin user.*

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The app will run on http://localhost:5173*

## Demo Walkthrough

Follow these steps to verify the application features:

### 1. Admin Seeding & Setup
- **Action:** Start the backend server.
- **Verification:** Check the terminal output. You should see "Admin user created: admin@example.com" (if running for the first time).

### 2. Admin Actions
- **Login:** Go to `/login` and log in with the admin credentials (default: `admin@example.com` / `admin123`).
- **Manage Metadata:**
  - Go to **Admin > Manage Genres**. Add a few genres (e.g., "Sci-Fi", "Drama"). Edit one to fix a typo.
  - Go to **Admin > Manage People**. Add a few people (e.g., "Christopher Nolan", "Leonardo DiCaprio").
- **Create Film:**
  - Go to **Admin > Add Film**.
  - Fill in details (Title: "Inception", Year: 2010, etc.).
  - Select genres (checkboxes).
  - Add credits: Select "Christopher Nolan" as DIRECTOR, "Leonardo DiCaprio" as ACTOR (Character: "Cobb").
  - Add an Admin Review: Rating 9, Text "Masterpiece".
  - Click **Save Film**.
- **Verify:** You will be redirected to the film list. The new film should appear.

### 3. User Actions
- **Register:** Log out (if logged in). Go to `/register`. Create a new user (e.g., `user@test.com`).
- **Login:** Log in with the new user credentials.
- **View Film:** Go to the Home page (`/`). Click on "Inception".
- **Check Details:** Verify you see the genres, cast/crew, and the Admin Review (Rating 9).
- **Comment:**
  - Scroll to the Comments section.
  - Write a comment: "Amazing movie!" and click **Post Comment**.
  - Your comment should appear immediately.
- **Delete Comment:**
  - You should see a "Delete" button next to *your* comment.
  - Click it to delete the comment.
  - **Check:** Ensure you *cannot* see a delete button for other users' comments (if any existed).

### 4. Public Access
- **Logout:** Log out completely.
- **Home:** Visit `/`. You should see the film list.
- **Detail:** Click a film. You can see all details and comments, but the "Leave a comment" form is hidden, replaced by a login link.

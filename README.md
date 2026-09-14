# Municipal Emissions Analytics Platform (Utslipp-App)

[![Stack](https://shields.io)](https://github.com)
[![Database](https://shields.io)](https://github.com)
[![Target](https://shields.io)](https://github.com)

A secure, enterprise-grade geospatial web application engineered for a **Norwegian municipality** to monitor, analyze, and report regional environmental emissions data. 

Built end-to-end as a **Solo Full-Stack Developer**, this platform bridges a high-performance backend infrastructure with an intuitive, interactive dashboard designed to handle complex spatial calculations and strict municipal data privacy standards.

---

## 🛠️ Modern Architecture & Tech Stack

This project leverages a highly optimized monolithic-SPA architecture, utilizing the latest major versions of modern web frameworks:

*   **Backend:** Laravel 12 (PHP 8.3+) — Robust API routing, proxy handling, and security.
*   **Database:** PostgreSQL + PostGIS Extension — Native server-side spatial indexing and geometric operations.
*   **Frontend:** React 19 & TypeScript — Modern, strictly typed component architecture.
*   **Styling:** CSS Modules — Scoped, modular component styling to prevent global style leakage.
*   **SPA Bridge:** Inertia.js 2.0 — Delivers a single-page application experience with lightning-fast data loading, eliminating the complexity of a separate client/server API lifecycle.
*   **Geospatial Processing:** Mapbox GL / Leaflet + Turf.js.

---

## 🧠 Advanced Technical Deep-Dives

### 1. Robust Spatial Database Engine (PostgreSQL + PostGIS)
To manage municipal geographic data efficiently, the application uses **PostgreSQL with the PostGIS extension**. 
*   Stores complex geographic features (Polygons, MultiPolygons, Points) natively.
*   Leverages spatial indexing (`GIST`) to execute ultra-fast server-side location queries.
*   Combines with **Turf.js** on the frontend to create a hybrid geospatial processing model (server-side persistence + client-side real-time rendering).

### 2. Secure Web Map Service (WMS) Proxy
To strictly comply with public sector regulations and shield internal municipal data infrastructures:
*   Engineered a **custom Laravel proxy layer** to interface with restricted government Web Map Services.
*   Prevents token and API key leakage by ensuring client-side requests never communicate directly with upstream mapping servers.
*   Includes built-in backend caching mechanisms to drastically minimize external API network latency.

### 3. Maintainable UI Isolation (CSS Modules)
*   Implements **CSS Modules** on the React 19 frontend to guarantee that styles remain completely scoped to their respective components.
*   Eliminates class-name collisions and side-effects, making the UI highly modular, maintainable, and easy to scale.

---

## 📁 Project Structure & Architecture

The project follows a standard Laravel + Inertia.js directory convention, cleanly dividing the backend routing and database layers from the component-driven frontend application:

```text
utslipp-app/
├── app/                      # Backend Core Logic
│   ├── Http/                 # Controllers & Middleware (Inertia Responses)
│   └── Models/               # Eloquent Models (handling PostGIS geometric data)
├── database/                 # Database Layer
│   ├── migrations/           # Schemas (defining PostGIS geometry columns)
│   └── seeders/              # Municipal mock data engines
├── resources/                # Frontend Application (React 19 / TypeScript)
│   ├── js/
│   │   ├── Components/       # Reusable UI items (Maps, Charts, Filters)
│   │   ├── Pages/            # Inertia-rendered application views
│   │   └── app.tsx           # Frontend application bootstrap entry point
│   └── css/                  # Base styles and global configurations
├── routes/                   # Web & Proxy API Route definitions
├── vite.config.js            # Asset compiler configuring React & CSS Modules
└── README.md
```

---

## 🏗️ Local Development Setup

### Prerequisites
*   PHP 8.3+ & Composer
*   Node.js 20+ & NPM
*   PostgreSQL with PostGIS installed locally (or via Docker)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com.git
   cd utslipp-app
   ```

2. **Backend Configuration:**
   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   ```
   *(Configure your PostgreSQL connection and mapping API keys inside the `.env` file.)*

3. **Frontend Configuration:**
   ```bash
   npm install
   ```

4. **Database Migrations & Seeders:**
   ```bash
   php artisan migrate --seed
   ```

5. **Run the Application:**
   Open two terminal tabs to run the concurrent development servers:
   ```bash
   # Terminal 1: Vite Core (Frontend asset compilation)
   npm run dev

   # Terminal 2: Laravel Local Server
   php artisan serve
   ```

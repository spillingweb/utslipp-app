# Utslipp App

A Laravel application with React frontend for managing emission monitoring objects (tilsyn objects) with interactive map visualization.

## 🚀 Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 with TypeScript
- **Bridge**: Inertia.js 2.0
- **Styling**: CSS modules + shadcn/ui components
- **Build Tool**: Vite
- **Database**: PostgreSQL
- **Maps**: Leaflet with WMS support
- **Authentication**: Laravel Socialite (Microsoft Azure AD)

## 📋 Features

- **Interactive Map Interface**: Leaflet-based map with WMS layers for geographical data visualization
- **Tilsyn Object Management**: Create, read, update, and delete emission monitoring objects
- **Project Management**: Organize monitoring activities into projects
- **Role-Based Access Control**: Comprehensive permission and role system
- **Microsoft Azure AD Integration**: Single sign-on authentication
- **CSV Export**: Export data for reporting and analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- PostgreSQL
- Git

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd utslipp-app
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install JavaScript dependencies

```bash
npm install
```

### 4. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configure your `.env` file

Update the following variables:

```env
APP_NAME="Utslipp App"
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=utslipp-app
DB_USERNAME=root
DB_PASSWORD=

# Microsoft Azure AD credentials
AZURE_CLIENT_ID=your_client_id
AZURE_CLIENT_SECRET=your_client_secret
AZURE_REDIRECT_URI=http://localhost/auth/callback/azure
AZURE_TENANT_ID=your_tenant_id
```

### 6. Run database migrations and seeders

```bash
php artisan migrate
php artisan db:seed
```

### 7. Build frontend assets

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
```

For SSR support:
```bash
npm run build:ssr
```

### 8. Start the development server

```bash
php artisan serve
```

Visit `http://localhost:8000` in your browser.


## 📁 Project Structure

```
├── app/
│   ├── Http/Controllers/    # Laravel controllers
│   ├── Models/              # Eloquent models (User, Project, Role, etc.)
│   └── Providers/           # Service providers
├── database/
│   ├── migrations/          # Database migrations
│   └── seeders/             # Database seeders
├── resources/
│   ├── js/
│   │   ├── components/      # React components
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Inertia pages
│   │   ├── types/           # TypeScript type definitions
│   │   └── app.tsx          # Main React entry point
│   └── css/                 # Stylesheets
├── routes/
│   ├── web.php              # Main web routes
│   ├── auth.php             # Authentication routes
│   ├── admin.php            # Admin routes
│   ├── projects.php         # Project routes
│   └── tilsynObjects.php    # Tilsyn object routes
└── tests/                   # Pest test files
```

## 🔐 Authentication

The application uses Microsoft Azure AD for authentication via Laravel Socialite. Users can sign in using their Microsoft organizational accounts.

## 👥 User Roles & Permissions

The application includes a comprehensive role-based access control system with the following entities:

- **Users**: Application users
- **Roles**: User roles (e.g., Admin, Manager, Viewer)
- **Permissions**: Granular permissions for specific actions
- **Projects**: Organizational units for tilsyn objects

## 🗺️ Map Features

- Interactive Leaflet-based map interface
- WMS (Web Map Service) layer support
- GeoJSON data visualization
- Point-in-polygon calculations using Turf.js
- Custom WMS proxy for secure layer access

## 🚢 Deployment

### Production Build

1. Set environment to production in `.env`:
```env
APP_ENV=production
APP_DEBUG=false
```

2. Optimize Laravel:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

3. Build frontend assets:
```bash
npm run build
```

## 👤 Support

For issues and questions, please create an issue in the repository.

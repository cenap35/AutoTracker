# AutoTracker

AutoTracker is a full-stack vehicle tracking application.

It helps users manage vehicles, maintenance records, expenses, reports, and vehicle notes from a single dashboard.

## Tech Stack

### Frontend

- React
- Vite
- Bootstrap
- Axios
- React Router

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- Mailtrap SMTP

## Environment Setup

This project uses local environment/config files for development.

### Frontend

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5101/api
```

You can look at `frontend/.env.example` as an example.

### Backend

Create an `appsettings.Development.json` file inside:

```txt
backend/AutoTracker.Api/
```

You can look at `backend/AutoTracker.Api/appsettings.Development.example.json` as an example.

Then update your local values:

- PostgreSQL username/password
- JWT secret key
- Mailtrap email/password
- Frontend base URL
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

### Frontend Environment

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5101/api
```

You can look at `frontend/.env.example` as an example.

### Backend Environment

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

## Database Setup

AutoTracker uses PostgreSQL.

Create a PostgreSQL database locally. Example database name:

```txt
autotrackerdb
```

Then update your backend connection string inside:

```txt
backend/AutoTracker.Api/appsettings.Development.json
```

Example connection string:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=autotrackerdb;Username=YOUR_USERNAME;Password=YOUR_PASSWORD"
}
```

## Backend Setup

Go to the backend project folder:

```bash
cd backend/AutoTracker.Api
```

Restore packages:

```bash
dotnet restore
```

Apply database migrations:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run
```

Default API URL:

```txt
http://localhost:5101
```

## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Default frontend URL:

```txt
http://localhost:5173
```

## Mail Setup

AutoTracker uses Mailtrap SMTP for development email testing.

Mailtrap is used for:

- Email confirmation
- Resend confirmation email
- Forgot password / reset password

Update these values inside:

```txt
backend/AutoTracker.Api/appsettings.Development.json
```

```json
"MailSettings": {
  "Host": "sandbox.smtp.mailtrap.io",
  "Port": 2525,
  "Email": "YOUR_MAILTRAP_USERNAME",
  "Password": "YOUR_MAILTRAP_PASSWORD"
}
```

## Notes

Sensitive local configuration files are not committed to the repository.

Use the example files as templates:

- `frontend/.env.example`
- `backend/AutoTracker.Api/appsettings.Development.example.json`
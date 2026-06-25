<p align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/ASP.NET%20Core-.NET%2010-512BD4?logo=dotnet&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Entity%20Framework-Core-68217A?logo=.net&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/License-Portfolio-green" />

</p>

<img src="https://readme-typing-svg.herokuapp.com/?lines=AutoTracker&center=true&width=500&height=50">

# 🚗 AutoTracker

## Vehicle Lifecycle & Automotive Service Management Platform

AutoTracker is a full-stack vehicle lifecycle and automotive service management platform designed for both individual vehicle owners and automotive service businesses.

The platform centralizes vehicle records, maintenance history, mileage tracking, expenses, reminders, reports, customer management, service workflows, inventory tracking, part sales, financial statistics, and internal service notes within a single modern application.

Built with React, ASP.NET Core Web API, PostgreSQL, and Docker, AutoTracker focuses on secure authentication, scalable architecture, user-based data isolation, validated API workflows, and real-world software engineering practices.

AutoTracker supports two main platform areas:

- **Vehicle Owner Platform** — For managing personal vehicles, maintenance records, mileage, expenses, reminders, notes, and reports.
- **Automotive Service Platform** — For service centers and repair shops to manage customers, customer vehicles, work orders, inventory, part sales, financial reports, and service notes.

## 🚀 Platform Modules

AutoTracker consists of two integrated platforms designed for different user groups while sharing the same secure backend infrastructure.

### 🚘 Vehicle Owner Portal

- Vehicle Management
- Maintenance Records
- Mileage Tracking
- Dashboard Analytics
- Maintenance Reports
- Expenses
- Reminders
- Notes
- PDF Reports

### 🔧 Automotive Service Portal

- Customer Management
- Customer Vehicle Management
- Inventory & Stock Management
- Part Sales
- Financial Dashboard
- Business Statistics
- Service Notes
- PDF Financial Reports

## ✨ Key Highlights


| Category                           | Technologies & Features                                                                                                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔐 Security & Authentication       | JWT Authentication & Authorization, Password Hashing, Email Verification, Password Recovery, User-Based Data Isolation, Global Exception Handling, DTO Validation |
| 🚗 Vehicle Management              | Vehicle Registration, Vehicle Profiles, Mileage Tracking, Vehicle Lifecycle Management, Maintenance History                                                       |
| 🛠️ Automotive Service Platform    | Customer Management, Customer Vehicles, Inventory Management, Part Sales, Financial Dashboard, Service Notes, PDF Reports, Business Statistics                    |
| 💰 Business & Financial Management | Expense Tracking, Part Profit Calculation, Revenue Statistics, Financial Dashboard, PDF Financial Reports                                                         |
| 📊 Analytics & Reporting           | Interactive Dashboards, Monthly Statistics, Operational Reports, PDF Export, Business Insights                                                                    |
| ⚛️ Full-Stack Engineering          | React, React Router, Axios, Bootstrap, ASP.NET Core Web API, RESTful API Architecture, SPA Routing, Swagger/OpenAPI Documentation                                 |
| 🗄️ Data Management                | PostgreSQL, Relational Database Design, Entity Framework Core ORM, Automated Database Migrations, Health Checks                                                   |
| 🐳 DevOps & Deployment             | Dockerized Frontend, Backend & Database, Docker Compose, Nginx, Persistent Volumes, Containerized Deployment                                                      |
| 🏗️ Architecture                   | Layered Architecture, Modular Project Structure, Environment-Based Configuration, Scalable Full-Stack Architecture, Production-Ready Environment                  |


## 💡 Why AutoTracker?

Vehicle-related information is often scattered across spreadsheets, paper records, notebooks, and disconnected software solutions. Automotive service businesses also face challenges in managing customers, vehicle histories, inventory, and financial operations through a single centralized system.

AutoTracker was developed to bring these workflows together into one modern platform. It enables individual vehicle owners to manage their vehicles, maintenance history, expenses, reminders, and reports, while providing automotive service businesses with tools for customer management, service operations, inventory tracking, part sales, financial reporting, and internal documentation.

Beyond solving real-world operational problems, AutoTracker serves as a portfolio-grade full-stack software engineering project demonstrating modern development practices including secure authentication, RESTful API design, layered architecture, relational database modeling, DTO-based validation, Dockerized deployment, and scalable application design.

## **🚀 Core Features**


| **Feature Area**                         | **Description**                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔐 **Authentication & Security**         | Secure user registration and login with JWT authentication, password hashing, email verification, password recovery, DTO validation, and user-based authorization.                    |
| 🚘 **Vehicle Management**                | Manage vehicle profiles, maintenance history, mileage records, expenses, reminders, notes, and complete vehicle lifecycle information.                                                |
| 🔧 **Automotive Service Management**     | Manage customers, customer vehicles, maintenance operations, repair history, service notes, and daily service workflows.                                                              |
| 📦 **Inventory & Part Management**       | Track spare parts inventory, monitor stock levels, register part sales, manage stock movements, and calculate inventory profit.                                                       |
| 💰 **Financial Management**              | Monitor maintenance expenses, calculate revenue and profit from part sales, analyze financial performance, and track business statistics.                                             |
| 📊 **Dashboards & Analytics**            | Interactive dashboards featuring monthly statistics, operational summaries, inventory insights, financial analytics, and business reports.                                            |
| 📝 **Notes & Reminder System**           | Organize vehicle notes, service notes, maintenance reminders, and operational tasks within a centralized workspace.                                                                   |
| 📄 **PDF Reporting**                     | Generate professional PDF reports for maintenance history, inventory, financial summaries, operational records, and vehicle information.                                              |
| 👥 **Multi-User Data Isolation**         | Ensure every user and service business can securely access and manage only their own vehicles, customers, inventory, and operational data.                                            |
| 🏗️ **Scalable Full-Stack Architecture** | Built with React, [ASP.NET](http://ASP.NET) Core Web API, Entity Framework Core, PostgreSQL, Docker, and Nginx using a modular, layered, scalable, and production-ready architecture. |


## 🏗️ System Architecture


| Layer             | Technology                         |
| ----------------- | ---------------------------------- |
| 🎨 Frontend       | React, Vite, Nginx                 |
| ⚙️ Backend        | ASP.NET Core Web API               |
| 🔐 Authentication | JWT Authentication & Authorization |
| 🗄️ Database      | PostgreSQL                         |
| 🔄 ORM            | Entity Framework Core              |
| 🐳 Infrastructure | Docker & Docker Compose            |
| 💾 Persistence    | Docker Volumes                     |


### Architecture Overview

AutoTracker follows a modern full-stack architecture where a React frontend communicates with an ASP.NET Core Web API through RESTful endpoints. Authentication is handled using JWT, data access is managed with Entity Framework Core, and PostgreSQL provides persistent relational storage.

The entire application stack is containerized with Docker and orchestrated through Docker Compose, creating a scalable, maintainable, and deployment-ready environment.

## 🛠️ Technology Stack

AutoTracker is built using a modern full-stack technology ecosystem designed for scalability, maintainability, security, and real-world deployment scenarios.

### 🎨 Frontend Technologies

- React — Component-based user interface development
- Vite — Fast development environment and optimized production builds
- React Router — Client-side routing and navigation
- Axios — HTTP communication with backend services
- Bootstrap — Responsive and modern user interface design
- JavaScript (ES6+) — Modern frontend development

### ⚙️ Backend Technologies

- ASP.NET Core Web API (.NET 10) — High-performance backend framework
- Entity Framework Core — Object-relational mapping (ORM)
- JWT Authentication — Secure authentication and authorization
- RESTful API Design — Scalable service-oriented architecture
- DTO-Based Data Transfer — Clean and maintainable API contracts
- Swagger / OpenAPI Documentation
- Global Exception Handling Middleware
- Health Check Monitoring

### 🗄️ Database Layer

- PostgreSQL — Enterprise-grade relational database system
- Relational Database Design — Structured and scalable data modeling
- Database Migrations — Version-controlled schema management

### 🐳 Infrastructure & Deployment

- Docker — Containerized application deployment
- Docker Compose — Multi-container service orchestration
- Nginx — Frontend hosting and SPA routing support
- Docker Volumes — Persistent database storage

### 🔒 Security & Communication

- JWT Bearer Authentication
- Password Hashing
- Email Verification Workflow
- Password Recovery & Reset System
- Gmail SMTP Integration
- Custom HTML Email Templates

### 🧰 Development & Productivity Tools

- Git & GitHub — Version control and collaboration
- Postman — API testing and validation
- pgAdmin — PostgreSQL administration
- VS Code / Cursor — Development environment

### 🏛️ Architectural Principles

- Separation of Concerns (SoC)
- Layered Architecture
- RESTful Service Design
- User-Based Data Isolation
- Containerized Development Environment
- Scalable and Maintainable Project Struct

## 📸 Screenshots











## 🐳 Docker & Deployment

AutoTracker is fully containerized using Docker, providing a consistent development and deployment environment across different machines and operating systems.

The application is orchestrated with Docker Compose and consists of multiple independent services working together as a complete full-stack platform.

### Included Services

- React Frontend — User interface served through Nginx
- ASP.NET Core Web API — Backend business logic and REST API services
- PostgreSQL Database — Persistent relational data storage
- Docker Volumes — Database persistence across container restarts
- Docker Network — Internal communication between services

### Deployment Flow


| Stage        | Component            |
| ------------ | -------------------- |
| 🎨 Frontend  | React + Nginx        |
| ⚙️ API Layer | ASP.NET Core Web API |
| 🗄️ Database | PostgreSQL           |
| 💾 Storage   | Docker Volumes       |


### Key Benefits

- Consistent development environment
- Simplified project setup
- Isolated application services
- Persistent database storage
- Production-ready containerized architecture
- Easy deployment and scalability

### Containerized Services

- autotracker-frontend
- autotracker-api
- autotracker-postgres

### Start the Application

```bash

docker compose up --build

```

Once started, all required services are automatically created, configured, and connected through Docker Compose.

## 📂 Project Structure

```text
AutoTracker
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── constants
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend
│   └── AutoTracker.Api
│       ├── Controllers
│       ├── DTOs
│       ├── Data
│       ├── Models
│       ├── Services
│       ├── Migrations
│       ├── Properties
│       ├── Program.cs
│       ├── Dockerfile
│       └── AutoTracker.Api.csproj
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

### Structure Overview

- frontend/ — React-based user interface and client-side application logic.
- backend/ — ASP.NET Core Web API containing business logic, authentication, data access, and API endpoints.
- Migrations/ — Entity Framework Core database migration history and schema management.
- docker-compose.yml — Multi-container application orchestration and service configuration.
- README.md — Project documentation and setup instructions.

## 🚀 Getting Started

### Prerequisites

Before running the application, make sure the following tools are installed:

- Docker
- Docker Compose
- Git

### Clone Repository

```bash
git clone <repository-url>
cd AutoTracker
```

### Configure Environment Files

Create the required local configuration files using the provided examples:

```text
frontend/.env
backend/AutoTracker.Api/appsettings.Development.json
```

Use the following template files as references:

```text
frontend/.env.example
backend/AutoTracker.Api/appsettings.Development.example.json
```

Update your local configuration values such as:

- PostgreSQL Credentials
- JWT Secret Key
- SMTP Email Settings
- Frontend URL Configuration

### Start the Application

Build and start all services:

```bash
docker compose up --build
```

### Available Services


| Service        | URL                                            |
| -------------- | ---------------------------------------------- |
| 🚗 Frontend    | [http://localhost:5173](http://localhost:5173) |
| ⚙️ Backend API | [http://localhost:8080](http://localhost:8080) |
| 🗄️ PostgreSQL | Docker Container                               |


### Stop the Application

```bash
docker compose down
```

### Rebuild Containers

```bash
docker compose up --build
```

## 🔒 Security Features

AutoTracker implements multiple security mechanisms to protect user accounts and application data.

### Authentication & Authorization

- JWT-based Authentication
- Protected API Endpoints
- User-Based Authorization
- Secure Access Control

### Account Security

- Password Hashing
- Email Verification
- Password Recovery Workflow
- Password Reset Functionality

### Data Protection

- User-Specific Data Isolation
- Secure Database Access
- Server-Side Validation
- DTO-Based Data Transfer

### Infrastructure Security

- Environment-Based Configuration
- Isolated Docker Containers
- Internal Service Networking
- Secure API Communication
- Global Exception Handling Middleware
- API Health Monitoring Endpoint

## 🔮 Future Roadmap

AutoTracker is designed as a long-term vehicle management platform with plans to expand beyond basic vehicle tracking and evolve into a comprehensive ecosystem for both individual users and businesses.

### 🚗 Vehicle Management Enhancements

- Fuel Consumption Tracking
- Vehicle Expense Tracking
- Tire Maintenance Management
- Vehicle Document & Record Archive

### 📊 Reporting & Analytics

- Advanced PDF Reporting
- Excel Export Support
- Vehicle Cost Analysis
- Expense Monitoring & Insights

### 👨‍💼 Commercial & Fleet Features

- Fleet Management System
- Driver & Personnel Management
- Business-Oriented Vehicle Operations

### 📱 Multi-Platform Support

- React Native Mobile Application
- Desktop Application Support

### 🤖 AI-Powered Features

- Intelligent Maintenance Recommendations
- Vehicle Health Analysis
- AI-Assisted Expense Analysis
- Automated Report Generation
- AI Vehicle Assistant

### ☁️ SaaS & Cloud Platform

- Subscription-Based Plans
- Cloud Deployment Infrastructure
- Commercial SaaS Platform

## 👨‍💻 Author

### Cenap Bayram

Computer Engineer focused on full-stack development, backend systems, data-driven applications, and AI technologies.

AutoTracker was developed as a portfolio-grade software engineering project to demonstrate practical experience in modern web development, API design, database architecture, authentication systems, Docker-based deployment, and full-stack application development.

The project reflects a long-term interest in building scalable software solutions and exploring the intersection of web technologies, data systems, and artificial intelligence.

### Connect With Me

- Email: [autotrackercarcare@gmail.com](mailto:autotrackercarcare@gmail.com)
- GitHub: [https://github.com/cenap35](https://github.com/cenap35)
- LinkedIn: [https://www.linkedin.com/in/cenapbayram-dev/](https://www.linkedin.com/in/cenapbayram-dev/)

## 💬 Feedback & Support

AutoTracker is an actively developed project and continuous improvements are being made.

If you discover a bug, have a feature suggestion, or would like to provide feedback, feel free to:

- Open an Issue on GitHub
- Contact me via LinkedIn
- Reach out via email

Your feedback helps improve the project and shape future development.

## 📄 License

Copyright © 2026 Cenap Bayram

Developed as a portfolio project.
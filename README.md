# 🚗 AutoTracker

AutoTracker is a modern full-stack vehicle management platform designed to help individuals and businesses organize maintenance history, mileage records, expenses, reminders, reports, and vehicle-related information in one centralized system.

Built with React, ASP.NET Core Web API, PostgreSQL, and Docker, the project focuses on clean architecture, secure authentication, scalable backend design, and real-world software engineering practices.

Instead of relying on spreadsheets, paper records, scattered notes, or memory, AutoTracker provides a centralized dashboard where users can manage the complete lifecycle of their vehicles.

The platform is suitable for both personal and commercial use cases, including individual vehicle owners, automotive service centers, repair shops, fleet operators, rental car companies, insurance-related vehicle tracking processes, and businesses that require organized vehicle maintenance and operational records.

AutoTracker enables users to maintain detailed service histories, track maintenance costs, monitor mileage, manage reminders, store vehicle-specific notes, and generate structured records that can support reporting, inspections, and long-term vehicle management processes.

The long-term vision of the project is to evolve into a comprehensive vehicle management ecosystem that combines operational tracking, reporting, analytics, and intelligent decision support tools within a modern web-based platform.


### Key Highlights

- Secure JWT Authentication & Authorization
- Password Hashing & Identity Security
- Email Verification and Password Recovery
- User-Specific Data Isolation
- Vehicle Management & Mileage Tracking
- Maintenance History and Cost Tracking
- Vehicle Notes and Reminder System
- Relational Database Design with PostgreSQL
- Entity Framework Core ORM Integration
- RESTful API Architecture
- Full-Stack React & ASP.NET Core Application
- Dockerized Frontend, Backend, and Database
- Docker Compose Orchestration
- Persistent Database Storage with Docker Volumes
- Nginx-Powered Frontend Delivery
- SPA Routing Support for React Applications
- Environment-Based Configuration Management
- Automated Database Migration Support
- Scalable and Modular Project Structure
- Production-Ready Containerized Environment

## Why AutoTracker?

Vehicle-related information is often scattered across spreadsheets, notes, paper records, and different applications. AutoTracker was created to centralize maintenance history, mileage records, expenses, reminders, and vehicle data into a single, organized platform.

In addition to solving a real-world problem, the project serves as a portfolio-grade full-stack application showcasing modern software engineering practices such as secure authentication, RESTful APIs, relational database design, and Docker-based deployment.




## 🚀 Core Features

### 🔐 Authentication & Account Security

Secure account management with user registration, login, JWT authentication, password hashing, email verification, password recovery, and account protection mechanisms.

### 🚘 Vehicle Management
Create, update, and manage vehicle records while maintaining detailed vehicle information, mileage tracking, and ownership history in a centralized dashboard.

### 🔧 Maintenance & Service Management
Track maintenance operations, repair history, service details, maintenance costs, and mileage-based service records to maintain a complete vehicle lifecycle history.

### 💰 Expense Tracking
Monitor vehicle-related expenses and maintenance costs to maintain a clear financial overview of vehicle ownership and operations.

### 📝 Notes & Documentation
Store custom notes, observations, important vehicle information, and operational documentation related to each vehicle.

### ⏰ Reminder Management
Create and manage reminders for maintenance schedules, inspections, service intervals, and other vehicle-related tasks.

### 📄 Reporting & PDF Export
Generate downloadable PDF reports containing vehicle information, maintenance history, mileage records, expenses, notes, and operational data for documentation, record keeping, and business workflows.

### 👥 User-Based Data Isolation
Ensure secure access control by allowing users to manage and view only their own vehicles, maintenance records, notes, reminders, and related data.

### 🏗️ Scalable Full-Stack Architecture
Built with React, ASP.NET Core Web API, PostgreSQL, Docker, and Nginx using a modular architecture designed for maintainability, scalability, and future expansion.

## 🏗️ System Architecture

text ┌─────────────────────────┐ │      React Frontend     │ │      (Vite + Nginx)     │ └───────────┬─────────────┘             │             │ HTTP / REST API             ▼ ┌─────────────────────────┐ │ ASP.NET Core Web API    │ │ JWT Authentication      │ │ Business Logic Layer    │ │ Entity Framework Core   │ └───────────┬─────────────┘             │             │ ORM             ▼ ┌─────────────────────────┐ │      PostgreSQL DB      │ │ Relational Data Storage │ └───────────┬─────────────┘             │             ▼ ┌─────────────────────────┐ │     Docker Volume       │ │ Persistent Data Storage │ └─────────────────────────┘ 

### Architecture Overview

AutoTracker follows a modern full-stack architecture where the React frontend communicates with an ASP.NET Core Web API through RESTful endpoints. Authentication and authorization are handled using JWT-based security mechanisms, while Entity Framework Core manages database operations and object-relational mapping.

All application services are containerized using Docker and orchestrated through Docker Compose. The frontend is served through Nginx, the backend runs as an independent API service, and PostgreSQL provides persistent relational data storage through Docker volumes.

This architecture provides a clean separation of concerns, scalability, maintainability, and a deployment-ready development environment.


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
- Mailtrap SMTP Integration

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


## 🐳 Docker & Deployment

AutoTracker is fully containerized using Docker, providing a consistent development and deployment environment across different machines and operating systems.

The application is orchestrated with Docker Compose and consists of multiple independent services working together as a complete full-stack platform.

### Included Services

- React Frontend — User interface served through Nginx
- ASP.NET Core Web API — Backend business logic and REST API services
- PostgreSQL Database — Persistent relational data storage
- Docker Volumes — Database persistence across container restarts
- Docker Network — Internal communication between services

### Deployment Architecture

text Frontend (React + Nginx)           │           ▼ ASP.NET Core Web API           │           ▼      PostgreSQL           │           ▼    Docker Volume 

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

bash docker compose up --build 

Once started, all required services are automatically created, configured, and connected through Docker Compose.

## 📂 Project Structure

text AutoTracker │ ├── frontend │   ├── src │   │   ├── pages │   │   ├── components │   │   ├── services │   │   ├── routes │   │   └── assets │   │ │   ├── public │   └── Dockerfile │ ├── backend │   └── AutoTracker.Api │       ├── Controllers │       ├── Models │       ├── DTOs │       ├── Data │       ├── Services │       ├── Migrations │       ├── Helpers │       └── Program.cs │ ├── docker-compose.yml ├── README.md └── .gitignore 

### Structure Overview

- frontend/ — React-based user interface and client-side application logic.
- backend/ — ASP.NET Core Web API containing business logic, authentication, data access, and API endpoints.
- Migrations/ — Entity Framework Core database migration history and schema management.
- docker-compose.yml — Multi-container application orchestration and service configuration.
- README.md — Project documentation and setup instructions.

## 🚀 Getting Started

Follow the steps below to set up and run AutoTracker in your local environment.

### Prerequisites

Before getting started, make sure the following tools are installed:

- Docker
- Docker Compose
- Git

### Clone the Repository

bash git clone <repository-url> cd AutoTracker 

### Run the Application

Build and start all services:

bash docker compose up --build 

Docker Compose will automatically:

- Create the PostgreSQL database container
- Build the ASP.NET Core API container
- Build the React frontend container
- Configure networking between services
- Mount persistent database volumes

### Access the Application

Frontend:

text http://localhost:5173 

Backend API:

text http://localhost:8080 

### Stopping the Application

bash docker compose down 

### Rebuilding After Changes

bash docker compose up --build 

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
- Commercial SaaS Platfo


## 👨‍💻 Author

### Cenap Bayram

Computer Engineer focused on full-stack development, backend systems, data-driven applications, and AI technologies.

AutoTracker was developed as a portfolio-grade software engineering project to demonstrate practical experience in modern web development, API design, database architecture, authentication systems, Docker-based deployment, and full-stack application development.

The project reflects a long-term interest in building scalable software solutions and exploring the intersection of web technologies, data systems, and artificial intelligence.

### Connect With Me

- GitHub: https://github.com/cenap35
- LinkedIn: https://www.linkedin.com/in/cenapbayram-dev/




## 📸 Screenshots

The following screenshots demonstrate the main features and user experience of AutoTracker.

### 🔐 Authentication & Account Security

> User registration, login, email verification, and password recovery workflows.

Authentication

---

### 🚘 Vehicle Dashboard

> Centralized vehicle management dashboard with mileage tracking and vehicle information.

Vehicle Dashboard

---

### 🔧 Maintenance & Service Management

> Maintenance history, service records, cost tracking, and vehicle lifecycle management.

Maintenance Management

---

### 📝 Notes & Documentation

> Vehicle-specific notes, documentation, and operational records.

Vehicle Notes

---

### ⏰ Reminder Management

> Maintenance reminders, inspections, and scheduled vehicle tasks.

Reminders

---

### 📄 Reporting & PDF Export

> Downloadable PDF reports containing vehicle information, maintenance history, mileage records, expenses, and documentation.

PDF Reports

---

### 🐳 Dockerized Full-Stack Architecture

> React frontend, ASP.NET Core Web API, PostgreSQL database, and Docker-based deployment environment.

Docker Architecture

![AutoTracker Banner](./screenshots/banner.png)
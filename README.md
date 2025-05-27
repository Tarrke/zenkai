# Zenkai

A modern task management application with a React frontend and Express backend.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Setup

1. Install dependencies for all projects:
```bash
npm run install:all
```

2. Start the development environment:
```bash
npm start
```

This will:
- Start the PostgreSQL database using Docker
- Start the server in development mode
- Start the client in development mode

## Available Scripts

- `npm start` - Starts everything (database, server, and client)
- `npm run dev` - Starts both server and client in development mode
- `npm run server` - Starts only the server
- `npm run client` - Starts only the client
- `npm run docker:up` - Starts the database
- `npm run docker:down` - Stops the database

## Project Structure

- `WebApp/` - React frontend application
- `ServerApp/` - Express backend application
- `WebApp/docker-compose.yml` - Docker configuration for the database 
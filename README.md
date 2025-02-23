# PRO_TH

## Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)
- Prisma CLI

## Installation

1. Clone the repository:
    ```bash
    git clone /C:/DataBryan/ProjectPersonal/PRO_THT
    cd PRO_THT
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## How to Migrate Using Prisma

1. If you are using local, set the database to local in your `.env` file.

2. Run the migration to create the database tables:
    ```bash
    npx prisma db seed
    ```

## How to Use

1. Start the application:
    ```bash
    npm run start
    ```

   If you want to start the application in development mode, use:
    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

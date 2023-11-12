# 4Truckers API

## Getting Started

### Step 1: Install Dependencies

First, install project dependencies using NPM:

```bash
npm i
```

### Step 2: Set Up Docker

Start the project by running the following command to spin up the Docker instances:

```bash
docker-compose up -d
```

This will create and start the necessary containers in the background.

### Step 3: Run Migrations

Apply the database migrations using Prisma:

```bash
npx prisma migrate dev
```

This will ensure that your database is set up correctly.

### Step 4: Start the Server

Now, you can start the server:

```bash
npm run start:dev
```

This command will launch the development server.
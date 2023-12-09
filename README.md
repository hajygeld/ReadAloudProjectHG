# ReadAloud

## Frontend

Located in the `frontend` directory.

### Requirements

Node.js

### Setup

```sh
npm install
```

Also create a `.env.local` environment variables file in the base `frontend` directory.
Add the following contents:

```
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"
```

This informs the frontend of which URL to make backend API requests to.
In development, this should be the locally running server (see **Backend** below).

### Run Development Server

Development server reloads when code changes are made.

```sh
npm run dev
```

### Run Production Server

First, create a production build.

```sh
npm run build
```

Then, run the build.

```sh
npm run start
```

## Backend

Located in the base directory.

### Requirements

Python 3.10

### Setup

```sh
make install
```

### Run Development Server

Development server reloads when code changes are made.

```sh
make dev
```

### Run Production Server

```sh
make run
```

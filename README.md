# 🧱 Bun + Hono Backend Boilerplate with Session Auth Schema

A fast, modern backend boilerplate powered by [Bun](https://bun.sh), [Hono](https://hono.dev), [Drizzle ORM](https://orm.drizzle.team/), and PostgreSQL — with secure JWT authentication via [`jose`](https://github.com/panva/jose).

---

## ✨ Features

- ⚡ Ultra-fast backend runtime using **Bun**
- 🔥 Minimal and type-safe HTTP API with **Hono**
- 🗃 Database access with **Drizzle ORM** + **PostgreSQL**
- 🔐 **JWT Authentication** (access + refresh tokens with cookies)
- 🧩 Session middleware using cookies
- 💡 Clean, modular TypeScript project structure

---

## 📦 Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/dstrygwyr/bun-hono-boilerplate.git your-project-name
cd your-project-name
```

### 2. Install dependencies

```bash
bun install
```

### 3. Setup environment variables

Create a `.env` file in the root of the project:

```env
# PostgreSQL connection
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=mydb

# JWT secrets
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret

```

### 4. Run the development server

```bash
bun run dev
```

---

## 🧰 Database Scripts (Drizzle ORM)

Here are custom `package.json` scripts to manage your PostgreSQL database with **Drizzle Kit**:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:pull": "drizzle-kit pull",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

```bash
| Script         | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| `db:generate`  | Generates SQL migration files based on changes in your schema.             |
| `db:migrate`   | Applies generated migrations to the database.                              |
| `db:pull`      | Introspects your existing database schema and generates Drizzle schema.    |
| `db:push`      | Pushes your current schema directly to the database (no migration needed). |
| `db:studio`    | Opens Drizzle Studio — a UI to inspect and interact with your DB.          |

> 💡 `db:push` is great for local/dev workflows, while `db:generate` + `db:migrate` is ideal for production workflows.

```

> Make sure your `drizzle.config.ts` is correctly pointing to `src/db`.

---

## 🔐 Authentication Overview

Authentication is handled manually using [`jose`](https://github.com/panva/jose):

- Access & Refresh JWTs
- Session stored in HTTP-only cookie
- Auth middleware to protect routes

### Main files:
| Path | Description |
|------|-------------|
| `src/lib/jwt.ts`        | JWT sign & verify helpers |
| `src/lib/auth.ts`       | Login logic, password handling, session |
| `src/middleware/auth.ts`| Protects routes using access token |
| `src/routers/auth.ts`   | Auth endpoints (register, login, refresh) |

---

## 📁 Folder Structure

```
src/
├── db/             # Drizzle ORM schema and db setup
│   ├── schema.ts
│   └── index.ts
├── lib/            # Utilities (JWT, session)
│   ├── auth.ts
│   └── jwt.ts
├── middleware/     # Middlewares (auth, etc.)
│   └── auth.ts
├── routers/        # Route handlers (auth, users, etc.)
│   └── auth.ts
└── index.ts        # App entry point (Hono + routing)
```

---

## 💪 Commands

### Development:

```bash
bun run dev
```

---

## 🚀 Future Enhancements (coming soon)

- 🔍 Request validation with `zod`
- 📦 Docker & Docker Compose
- 📄 API Docs (OpenAPI/Swagger)
- 🧪 Add testing setup (e.g., Vitest)

---

## 📚 Resources

- [Bun](https://bun.sh/docs)
- [Hono](https://hono.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [`jose`](https://github.com/panva/jose)

---

## 🪪 License

[MIT](./LICENSE)

# POSTGRES_SETUP — HG Labs — Midnight Space

This document explains the PostgreSQL model for HG Labs. It includes schema planning, table relationships, naming conventions, and migration strategy for the Supabase-managed database.

## PostgreSQL overview

PostgreSQL is a reliable relational database engine used by Supabase. It stores structured data and supports queries, relationships, indexing, and realtime change tracking.

## Schema planning

Design the schema around the app’s core entities:

- `users`
- `guestbook`
- `focus_sessions`
- `presence`
- `projects`

### Principles

- Keep tables normalized.
- Use clear naming conventions.
- Add timestamps to all records.
- Keep references explicit with foreign keys.
- Use JSON columns sparingly for optional metadata.

## Naming conventions

- Table names: singular or plural consistently. Example: `users`, `guestbook`, `focus_sessions`.
- Column names: lower_case_with_underscores.
- Timestamps: `created_at`, `updated_at`.
- Foreign keys: `<entity>_id`, e.g. `user_id`.

## Relationships between tables

- `users` is the primary identity table.
- `guestbook.user_id` references `users.id`.
- `focus_sessions.user_id` references `users.id`.
- `presence.user_id` references `users.id` and tracks live status.
- `projects` may be a static catalog with no strict foreign keys.

## Migration strategy

- Use Supabase SQL editor or migration tooling.
- Start with one migration file for the initial schema.
- Keep migrations readable and versioned.
- Apply migrations in a staging environment before production.

### Migration best practices

- Create new migration files for schema changes.
- Avoid destructive changes without backups.
- Use `ALTER TABLE` carefully when adding or modifying columns.
- Test schema changes locally if possible.

## Table schemas

### Users

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

Notes:
- Supabase Auth already manages user identities; this table can store profile data and metadata.
- Use `id` as UUID consistent with Supabase user IDs.

### Guestbook

```sql
CREATE TABLE guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  message text NOT NULL,
  mood text,
  created_at timestamptz DEFAULT now()
);
```

Notes:
- Allow `user_id` to be nullable for anonymous or guest entries if desired.
- Add `mood` or tag fields for future filtering.

### FocusSessions

```sql
CREATE TABLE focus_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  start_at timestamptz NOT NULL,
  end_at timestamptz,
  duration_seconds integer,
  tags text[],
  note text,
  created_at timestamptz DEFAULT now()
);
```

Notes:
- Store session timing and optional notes.
- Use `tags` to classify session mood or task type.

### Presence

```sql
CREATE TABLE presence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  room text NOT NULL,
  status text NOT NULL,
  last_seen timestamptz DEFAULT now(),
  meta jsonb,
  created_at timestamptz DEFAULT now()
);
```

Notes:
- Use `room` to track which UI space the visitor is in.
- `meta` can hold additional session details.

### Projects

```sql
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  stack text[] DEFAULT ARRAY[]::text[],
  github_url text,
  live_url text,
  tags text[],
  created_at timestamptz DEFAULT now()
);
```

Notes:
- This table can be used for the Project Explorer and future hidden experiments.
- Keep the schema flexible enough for additional metadata.

## Migration example

1. Create migration SQL file with the initial schema.
2. Apply it in Supabase SQL editor or using CLI.
3. Verify table creation and relationships.
4. Validate with test data.

## Future schema considerations

- Add `user_preferences` or `settings` tables for personalization.
- Add `analytics_events` table for lightweight metrics.
- Add `hidden_rooms` or `easter_eggs` metadata if the project grows.

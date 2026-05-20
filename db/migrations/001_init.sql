-- Initial Supabase schema for HG Labs — Midnight Space

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Guestbook entries (public or authenticated guest posts)
CREATE TABLE IF NOT EXISTS guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NULL,
  username text NULL,
  message text NOT NULL,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS guestbook_created_at_idx ON guestbook (created_at DESC);

-- Focus session records for Pomodoro-style tracking and analytics
CREATE TABLE IF NOT EXISTS focus_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NULL,
  session_name text NULL,
  tags text[] NOT NULL DEFAULT ARRAY[]::text[],
  started_at timestamptz NOT NULL,
  ended_at timestamptz NULL,
  duration_seconds integer NULL,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS focus_sessions_user_id_idx ON focus_sessions (user_id);
CREATE INDEX IF NOT EXISTS focus_sessions_started_at_idx ON focus_sessions (started_at DESC);

-- Presence table for realtime room/activity tracking
CREATE TABLE IF NOT EXISTS presence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NULL,
  room text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  last_seen timestamptz NOT NULL DEFAULT now(),
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS presence_user_room_idx ON presence (user_id, room) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS presence_last_seen_idx ON presence (last_seen DESC);

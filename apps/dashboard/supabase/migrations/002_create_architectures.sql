-- SBC Dashboard: architectures table with RLS
-- Run this in your Supabase SQL editor

-- Architectures table (saved graph designs)
CREATE TABLE IF NOT EXISTS architectures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled',
  graph_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE architectures ENABLE ROW LEVEL SECURITY;

-- Architectures policies
CREATE POLICY "Users can view own architectures" ON architectures
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own architectures" ON architectures
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own architectures" ON architectures
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own architectures" ON architectures
  FOR DELETE USING (auth.uid() = user_id);

-- Index for faster queries by user
CREATE INDEX IF NOT EXISTS architectures_user_id_idx ON architectures(user_id);

-- Auto-update updated_at on row update
CREATE TRIGGER architectures_updated_at
  BEFORE UPDATE ON architectures
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

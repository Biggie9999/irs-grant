-- IRS Grant Program Database Schema
-- Run this against your Neon Postgres database to set up the tables

CREATE TABLE IF NOT EXISTS winners (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  ssn_last4 VARCHAR(4) NOT NULL,
  grant_amount INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS claims (
  id SERIAL PRIMARY KEY,
  winner_id VARCHAR(50),
  method VARCHAR(30) NOT NULL DEFAULT 'unknown',
  unique_code VARCHAR(50),
  amount VARCHAR(20),
  data JSONB NOT NULL DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) NOT NULL DEFAULT 'submitted'
);

-- Seed a test winner (optional)
-- INSERT INTO winners (first_name, last_name, dob, ssn_last4, grant_amount, status)
-- VALUES ('John', 'Doe', '1955-03-15', '1234', 25000, 'pending');

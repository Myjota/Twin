-- Medical Twin MVP Database Schema
-- Creates tables for users, documents, health records, timeline, and insights

-- Users table (basic auth info)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical documents (uploaded files)
CREATE TABLE IF NOT EXISTS medical_documents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL, -- 'prescription', 'lab_result', 'medical_report', 'sick_leave', 'other'
  title VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL, -- Vercel Blob URL
  file_name VARCHAR(255),
  file_size INTEGER,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  document_date DATE, -- Date on the actual document
  extracted_data JSONB, -- AI-extracted structured data
  processing_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  notes TEXT
);

-- Health records (structured health data)
CREATE TABLE IF NOT EXISTS health_records (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  record_type VARCHAR(50) NOT NULL, -- 'diagnosis', 'medication', 'procedure', 'symptom', 'vital_sign'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  record_date DATE NOT NULL,
  data JSONB, -- Flexible structured data (dosage, measurements, etc.)
  source_document_id INTEGER REFERENCES medical_documents(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Health timeline events (for visualization)
CREATE TABLE IF NOT EXISTS timeline_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'appointment', 'diagnosis', 'treatment', 'symptom', 'test'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  severity VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
  related_document_id INTEGER REFERENCES medical_documents(id),
  related_record_id INTEGER REFERENCES health_records(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI-generated health insights
CREATE TABLE IF NOT EXISTS health_insights (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  insight_type VARCHAR(50) NOT NULL, -- 'warning', 'recommendation', 'trend', 'prediction'
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  severity VARCHAR(20), -- 'info', 'warning', 'critical'
  confidence_score DECIMAL(3,2), -- 0.00 to 1.00
  is_read BOOLEAN DEFAULT FALSE,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  related_records JSONB -- Array of related record IDs
);

-- Reminders for check-ups and medications
CREATE TABLE IF NOT EXISTS reminders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  reminder_type VARCHAR(50) NOT NULL, -- 'medication', 'checkup', 'test', 'appointment'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern VARCHAR(50), -- 'daily', 'weekly', 'monthly', 'yearly'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_medical_documents_user_id ON medical_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_documents_document_date ON medical_documents(document_date);
CREATE INDEX IF NOT EXISTS idx_health_records_user_id ON health_records(user_id);
CREATE INDEX IF NOT EXISTS idx_health_records_record_date ON health_records(record_date);
CREATE INDEX IF NOT EXISTS idx_timeline_events_user_id ON timeline_events(user_id);
CREATE INDEX IF NOT EXISTS idx_timeline_events_event_date ON timeline_events(event_date);
CREATE INDEX IF NOT EXISTS idx_health_insights_user_id ON health_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON reminders(due_date);

-- =============================================
-- Quick Drop Registration Table Schema
-- Database: Neon PostgreSQL
-- =============================================

-- Create enum types for constrained values
CREATE TYPE stack_type AS ENUM (
    'fullstack',
    'frontend',
    'backend',
    'mobile',
    'data',
    'other'
);

CREATE TYPE timezone_type AS ENUM (
    'et',
    'ct',
    'mt',
    'pt',
    'gmt3',
    'gmt',
    'cet'
);

CREATE TYPE demo_type AS ENUM (
    'yes',
    'no'
);

CREATE TYPE registration_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'waitlist'
);

-- Main registration table
CREATE TABLE quickdrop_registrations (
    id              SERIAL PRIMARY KEY,
    
    -- Core information (required fields)
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    timezone        timezone_type NOT NULL,
    stack           stack_type NOT NULL,
    github_url      VARCHAR(500) NOT NULL,
    demo_interest   demo_type NOT NULL,
    fairplay_agreed BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Optional social links
    x_url           VARCHAR(500),
    linkedin_url    VARCHAR(500),
    
    -- Drop association
    drop_id         VARCHAR(100),
    
    -- Status tracking
    status          registration_status NOT NULL DEFAULT 'pending',
    
    -- Timestamps
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Payment tracking (for future use)
    payment_status  VARCHAR(50) DEFAULT 'unpaid',
    payment_id      VARCHAR(255),
    paid_at         TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_github CHECK (github_url ~* '^https?://(www\.)?github\.com/.+'),
    CONSTRAINT valid_x CHECK (x_url IS NULL OR x_url ~* '^https?://(www\.)?(twitter|x)\.com/.+'),
    CONSTRAINT valid_linkedin CHECK (linkedin_url IS NULL OR linkedin_url ~* '^https?://(www\.)?linkedin\.com/.+'),
    CONSTRAINT fairplay_must_agree CHECK (fairplay_agreed = TRUE)
);

-- Create index for faster lookups
CREATE INDEX idx_registrations_email ON quickdrop_registrations(email);
CREATE INDEX idx_registrations_drop_id ON quickdrop_registrations(drop_id);
CREATE INDEX idx_registrations_status ON quickdrop_registrations(status);
CREATE INDEX idx_registrations_created_at ON quickdrop_registrations(created_at DESC);

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quickdrop_registrations_updated_at
    BEFORE UPDATE ON quickdrop_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Useful queries for reference
-- =============================================

-- Count registrations by status
-- SELECT status, COUNT(*) FROM quickdrop_registrations GROUP BY status;

-- Get all approved gladiators for a specific drop
-- SELECT * FROM quickdrop_registrations WHERE drop_id = 'drop_001' AND status = 'approved';

-- Check if email already registered
-- SELECT EXISTS(SELECT 1 FROM quickdrop_registrations WHERE email = 'test@example.com');

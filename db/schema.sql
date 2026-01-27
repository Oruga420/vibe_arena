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
    'invited',
    'paid',
    'rejected',
    'waitlist'
);

-- Main registration table
CREATE TABLE quickdrop_registrations (
    id              SERIAL PRIMARY KEY,
    
    -- Core information (required fields)
    name            VARCHAR(255) NOT NULL,
    colosseum_name  VARCHAR(255),
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
    
    -- Stats tracking
    wins            INTEGER NOT NULL DEFAULT 0,
    losses          INTEGER NOT NULL DEFAULT 0,
    
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
-- Competitors Table (Global history)
-- =============================================
CREATE TABLE competitors (
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    email             VARCHAR(255) NOT NULL UNIQUE,
    last_tournament   VARCHAR(255),
    last_payment      VARCHAR(255),
    last_project_name VARCHAR(255),
    last_team_name    VARCHAR(255),
    competitor_story  TEXT,
    other_details     TEXT,
    added_to_drop     BOOLEAN DEFAULT FALSE,
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_competitors_email ON competitors(email);

CREATE TRIGGER update_competitors_updated_at
    BEFORE UPDATE ON competitors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Waitlist Table
-- =============================================

CREATE TABLE waitlist_entries (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    role        VARCHAR(50) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    welcome_email_sent BOOLEAN DEFAULT FALSE,
    welcome_email_sent_at TIMESTAMPTZ
);

CREATE INDEX idx_waitlist_email ON waitlist_entries(email);
CREATE INDEX idx_waitlist_created_at ON waitlist_entries(created_at DESC);
CREATE INDEX idx_waitlist_email_sent ON waitlist_entries(welcome_email_sent);

-- =============================================
-- Sponsor Applications Table
-- =============================================

CREATE TABLE sponsor_applications (
    id                  SERIAL PRIMARY KEY,
    company_name        VARCHAR(255) NOT NULL,
    contact_name        VARCHAR(255) NOT NULL,
    email               VARCHAR(255) NOT NULL,
    website             VARCHAR(255),
    areas_of_interest   TEXT, -- Stored as comma separated or JSON if needed, but simple text for now
    suggested_theme     TEXT,
    pain_point          TEXT,
    sponsor_type        VARCHAR(100),
    budget_range        VARCHAR(100),
    desired_visibility  VARCHAR(100),
    timeline            VARCHAR(255),
    notes               TEXT,
    status              VARCHAR(50) DEFAULT 'pending',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sponsor_email ON sponsor_applications(email);
CREATE INDEX idx_sponsor_company ON sponsor_applications(company_name);

-- =============================================
-- Spectators Table
-- =============================================

CREATE TABLE spectators (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'spectator',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_spectators_email ON spectators(email);


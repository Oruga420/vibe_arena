-- =============================================
-- Drop Results & Champions Table
-- Database: Neon PostgreSQL
-- Created: 2026-01-29
-- =============================================

-- Table to store competition results
CREATE TABLE drop_results (
    id              SERIAL PRIMARY KEY,
    drop_id         VARCHAR(100) NOT NULL,
    drop_name       VARCHAR(255) NOT NULL,
    drop_date       TIMESTAMPTZ NOT NULL,
    
    -- Winner info
    champion_email  VARCHAR(255) NOT NULL,
    champion_name   VARCHAR(255) NOT NULL,
    champion_avatar VARCHAR(500),
    champion_project_name VARCHAR(255),
    champion_github_url VARCHAR(500),
    
    -- Competition stats
    total_gladiators INTEGER NOT NULL DEFAULT 0,
    prize_pool      DECIMAL(10,2),
    prize_currency  VARCHAR(10) DEFAULT 'CAD',
    
    -- Metadata
    status          VARCHAR(50) DEFAULT 'completed',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_drop_results_drop_id ON drop_results(drop_id);
CREATE INDEX idx_drop_results_date ON drop_results(drop_date DESC);

-- Table to store all participants in each drop
CREATE TABLE drop_participants (
    id              SERIAL PRIMARY KEY,
    drop_id         VARCHAR(100) NOT NULL,
    
    -- Participant info
    email           VARCHAR(255) NOT NULL,
    name            VARCHAR(255) NOT NULL,
    colosseum_name  VARCHAR(255),
    avatar_url      VARCHAR(500),
    
    -- Result
    placement       INTEGER, -- 1 = winner, 2 = second, etc. NULL = participated
    is_champion     BOOLEAN DEFAULT FALSE,
    
    -- Project submitted
    project_name    VARCHAR(255),
    project_url     VARCHAR(500),
    
    -- Timestamps
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(drop_id, email)
);

CREATE INDEX idx_drop_participants_drop_id ON drop_participants(drop_id);
CREATE INDEX idx_drop_participants_champion ON drop_participants(is_champion);

-- =============================================
-- INSERT FIRST DROP DATA: Alpha Drop - Jan 24, 2026
-- Champion: Victhor
-- =============================================

INSERT INTO drop_results (
    drop_id,
    drop_name,
    drop_date,
    champion_email,
    champion_name,
    champion_project_name,
    total_gladiators,
    status
) VALUES (
    'alpha_drop_001',
    'Alpha Drop',
    '2026-01-24 21:00:00-05',  -- 9 PM Toronto time
    'victhor@example.com',     -- Update with real email
    'Victhor',
    'TBD',                     -- Update with project name
    1,                         -- Update with actual count
    'completed'
);

-- Add champion as participant
INSERT INTO drop_participants (
    drop_id,
    email,
    name,
    colosseum_name,
    placement,
    is_champion
) VALUES (
    'alpha_drop_001',
    'victhor@example.com',
    'Victhor',
    'Victhor',
    1,
    TRUE
);

-- =============================================
-- Useful Queries
-- =============================================

-- Get latest champion
-- SELECT * FROM drop_results ORDER BY drop_date DESC LIMIT 1;

-- Get all champions
-- SELECT champion_name, drop_name, drop_date FROM drop_results ORDER BY drop_date DESC;

-- Get participants for a drop with champion highlighted
-- SELECT 
--     dp.name,
--     dp.colosseum_name,
--     dp.avatar_url,
--     dp.is_champion,
--     dp.placement
-- FROM drop_participants dp
-- WHERE dp.drop_id = 'alpha_drop_001'
-- ORDER BY dp.is_champion DESC, dp.placement ASC;

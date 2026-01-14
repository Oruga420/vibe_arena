-- Add tracking columns for welcome emails
ALTER TABLE waitlist_entries 
ADD COLUMN IF NOT EXISTS welcome_email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS welcome_email_sent_at TIMESTAMPTZ;

-- Add index for faster querying of unsent emails
CREATE INDEX IF NOT EXISTS idx_waitlist_email_sent ON waitlist_entries(welcome_email_sent);

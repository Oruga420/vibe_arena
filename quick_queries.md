# Quick Queries - Neon DB

Useful SQL snippets for managing the Vibe Arena database.

## 📊 Monitoring Registrations

### Count all registrations by status

```sql
SELECT status, COUNT(*)
FROM quickdrop_registrations
GROUP BY status;
```

### View latest 10 registrations

```sql
SELECT name, email, stack, created_at
FROM quickdrop_registrations
ORDER BY created_at DESC
LIMIT 10;
```

### Check registrations for a specific drop

```sql
SELECT name, email, status
FROM quickdrop_registrations
WHERE drop_id = 'drop_001';
```

## 🛠️ Management Operations

### Approve a gladiator by email

```sql
UPDATE quickdrop_registrations
SET status = 'approved'
WHERE email = 'user@example.com';
```

### Move a gladiator to waitlist

```sql
UPDATE quickdrop_registrations
SET status = 'waitlist'
WHERE email = 'user@example.com';
```

### Find duplicate emails

```sql
SELECT email, COUNT(*)
FROM quickdrop_registrations
GROUP BY email
HAVING COUNT(*) > 1;
```

## 🧹 Maintenance

### Delete test records

```sql
DELETE FROM quickdrop_registrations
WHERE email LIKE '%test%';
```

### Reset table (DANGER)

```sql
-- TRUNCATE quickdrop_registrations;
```

## 🕒 Waitlist Monitoring

### Count total waitlist entries

```sql
SELECT COUNT(*) FROM waitlist_entries;
```

### Count by role (arena vs spectator)

```sql
SELECT role, COUNT(*)
FROM waitlist_entries
GROUP BY role;
```

### View latest 20 waitlist signups

```sql
SELECT name, email, role, created_at
FROM waitlist_entries
ORDER BY created_at DESC
LIMIT 20;
```

### Search for someone in the waitlist

```sql
SELECT * FROM waitlist_entries
WHERE email = 'user@example.com'
   OR name ILIKE '%name%';
```

### Find duplicate emails in waitlist

```sql
SELECT email, COUNT(*)
FROM waitlist_entries
GROUP BY email
HAVING COUNT(*) > 1;
```

## 🤝 Sponsor Applications

### View latest 10 sponsor applications

```sql
SELECT company_name, contact_name, email, status, created_at
FROM sponsor_applications
ORDER BY created_at DESC
LIMIT 10;
```

### Count sponsors by status

```sql
SELECT status, COUNT(*)
FROM sponsor_applications
GROUP BY status;
```

### Approve a sponsor

```sql
UPDATE sponsor_applications
SET status = 'approved'
WHERE email = 'sponsor@example.com';
```

### Export all sponsor details for contact

```sql
SELECT company_name, contact_name, email, website, timeline, notes
FROM sponsor_applications
WHERE status = 'pending';
```

### Find duplicate emails in sponsors

```sql
SELECT email, COUNT(*)
FROM sponsor_applications
GROUP BY email
HAVING COUNT(*) > 1;
```

### Search sponsor by company name

```sql
SELECT * FROM sponsor_applications
WHERE company_name ILIKE '%vibe%';
```

## 🧪 Testing Queries (Direct Inserts)

### Insert a test waitlist entry

```sql
INSERT INTO waitlist_entries (name, email, role)
VALUES ('Test User', 'test@example.com', 'arena');
```

### Insert a test sponsor application

```sql
INSERT INTO sponsor_applications (
    company_name,
    contact_name,
    email,
    website,
    areas_of_interest,
    sponsor_type,
    budget_range
)
VALUES (
    'Vibe Corp',
    'Alex Vibe',
    'sponsors@vibecorp.com',
    'https://vibecorp.com',
    'Prizes, Marketing',
    'cash',
    'mid'
);
```

### Delete test data (Waitlist)

```sql
DELETE FROM waitlist_entries WHERE email = 'test@example.com';
```

### Delete test data (Sponsors)

```sql
DELETE FROM sponsor_applications WHERE email = 'sponsors@vibecorp.com';
```

## 🧹 General Maintenance (All tables)

### Delete all records containing 'test' in email

```sql
DELETE FROM quickdrop_registrations WHERE email LIKE '%test%';
DELETE FROM waitlist_entries WHERE email LIKE '%test%';
DELETE FROM sponsor_applications WHERE email LIKE '%test%';
```

### Check daily signup volume (Waitlist)

```sql
SELECT DATE(created_at) as day, COUNT(*)
FROM waitlist_entries
GROUP BY day
ORDER BY day DESC;
```

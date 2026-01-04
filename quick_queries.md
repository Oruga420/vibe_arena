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

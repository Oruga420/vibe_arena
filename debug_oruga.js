const sql = require('./lib/db.js');

async function checkGladiator() {
    try {
        const results = await sql`
            SELECT id, name, email, avatar_url, 'registration' as source FROM quickdrop_registrations WHERE name ILIKE '%oruga%'
            UNION
            SELECT id, name, email, avatar_url, 'competitor' as source FROM competitors WHERE name ILIKE '%oruga%'
            UNION
            SELECT id, name, email, NULL as avatar_url, 'waitlist' as source FROM waitlist_entries WHERE name ILIKE '%oruga%'
        `;
        console.log('Gladiator results:', results);

        if (results.length > 0) {
             const email = results[0].email;
             const tokens = await sql`SELECT * FROM avatar_tokens WHERE email = ${email}`;
             console.log('Avatar tokens:', tokens);
        }

    } catch (err) {
        console.error(err);
    }
}

checkGladiator();

# 📊 Gladiator Stats & Winner System

## Resumen

Sistema de estadísticas de gladiadores que calcula y expone:
- **Drops Played**: Cuántos drops ha participado un gladiador
- **Wins**: Cuántos drops ha ganado (basado en votos)
- **Losses**: Cuántos drops perdió (drops cerrados - wins)
- **Win Rate**: Porcentaje de victorias

## Flujo del Ganador

1. Admin crea Drop → `Competition` con `status: OPEN`
2. Gladiadores votan → Votos se registran en `votes`
3. Admin cierra Drop → `toggleCompetitionStatus()`:
   - Calcula quién tiene más votos (`calculateWinner()`)
   - Guarda `winnerId` en la `Competition`
   - Envía feedback emails con `isWinner: true` al ganador
4. Stats se calculan en tiempo real basado en `winnerId`

## API Endpoints

### `GET /api/gladiators/stats?email=xxx`
Retorna stats individuales de un gladiador.

```json
{
  "success": true,
  "stats": {
    "email": "gladiador@example.com",
    "name": "El Andariñhoz",
    "dropsPlayed": 5,
    "wins": 2,
    "losses": 3,
    "winRate": 40,
    "totalVotesReceived": 156,
    "recentDrops": [...]
  }
}
```

### `POST /api/gladiators/stats/bulk`
Retorna stats para múltiples gladiadores (max 100).

```json
// Request
{ "emails": ["email1@example.com", "email2@example.com"] }

// Response
{
  "success": true,
  "stats": {
    "email1@example.com": { "wins": 2, "losses": 1, "dropsPlayed": 3, "winRate": 67 },
    "email2@example.com": { "wins": 0, "losses": 3, "dropsPlayed": 3, "winRate": 0 }
  }
}
```

### `GET /api/gladiators/available`
Ahora incluye stats reales (wins, losses, drops_played, win_rate) en vez de hardcodear 0.

## Schema Change

```prisma
model Competition {
  ...
  winnerId   String?      // NEW: ID of the winning Competitor
  winner     Competitor?  @relation("CompetitionWinner", fields: [winnerId], references: [id])
}

model Competitor {
  ...
  wonCompetitions   Competition[] @relation("CompetitionWinner")
}
```

## Migración SQL

Ejecutar `scripts/migrate-add-winner.sql` en Neon **antes** de hacer deploy.
El script incluye backfill para calcular ganadores retroactivos de drops ya cerrados.

## Integración con Coliseo Main

El sitio principal puede llamar a estos endpoints desde el Admin API:

```typescript
// En el componente de perfil del gladiador
const res = await fetch(`${ADMIN_URL}/api/gladiators/stats?email=${gladiator.email}`);
const { stats } = await res.json();

// Ahora puedes mostrar:
// WINS: stats.wins
// LOSSES: stats.losses  
// WIN RATE: stats.winRate + '%'
// DROPS PLAYED: stats.dropsPlayed
```

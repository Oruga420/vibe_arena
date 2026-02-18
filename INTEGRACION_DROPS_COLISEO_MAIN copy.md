# 🏟️ Integración de Drops - Coliseo Main

## Endpoint

`GET /api/competitions/active` - Drops con status OPEN

```json
[{"id": "xxx", "name": "Drop Enero 2026", "status": "OPEN", "_count": {"competitors": 8, "votes": 156}}]
```

## Prisma Query

```typescript
const drop = await prisma.competition.findFirst({
  where: { status: 'OPEN' },
  orderBy: { createdAt: 'desc' }
});
```

## Schema

```prisma
model Competition {
  id        String @id @default(cuid())
  name      String
  status    CompetitionStatus @default(OPEN) // OPEN | CLOSED
  createdAt DateTime @default(now())
}
```

## Env Required
```
DATABASE_URL="postgresql://..."
```

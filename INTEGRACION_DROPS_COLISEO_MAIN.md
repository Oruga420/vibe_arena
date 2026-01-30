# 🏟️ Integración de Drops - Coliseo Main

## Resumen

Este documento describe cómo el módulo **Coliseo Main** puede integrarse con la base de datos de Vibe Arena para:

1. ✅ Saber si hay **drops abiertos** o no
2. 📅 Obtener la **fecha del drop actual**
3. 📊 Obtener información detallada de competencias activas

---

## Arquitectura de Base de Datos

### Conexión Principal (Prisma/Neon PostgreSQL)

```
DATABASE_URL="postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require"
```

### Schema Relevante

```prisma
model Competition {
  id         String            @id @default(cuid())
  name       String            // Nombre del drop (ej: "Drop Enero 2026")
  status     CompetitionStatus @default(OPEN)
  createdAt  DateTime          @default(now())
  updatedAt  DateTime          @updatedAt
  
  competitors Competitor[]
  votes       Vote[]
}

enum CompetitionStatus {
  OPEN    // Drop activo - votación abierta
  CLOSED  // Drop cerrado - votación finalizada
}
```

---

## Endpoints Disponibles

### 1. Verificar Drops Abiertos

**Endpoint**: `GET /api/competitions/active`

**Propósito**: Obtiene los drops con status `OPEN`

**Response**:
```json
[
  {
    "id": "cm5xyz123abc",
    "name": "Drop Enero 2026",
    "status": "OPEN",
    "_count": {
      "competitors": 8,
      "votes": 156
    }
  }
]
```

**Ejemplo de uso (fetch)**:
```typescript
const response = await fetch('https://vibe-arena.vercel.app/api/competitions/active');
const drops = await response.json();

const hasOpenDrops = drops.length > 0;
const currentDrop = drops[0]; // El más reciente
```

---

## Consultas Directas (Prisma)

Si Coliseo Main tiene acceso directo a la base de datos:

### Verificar si hay drops abiertos

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Método 1: Contar drops abiertos
async function hasOpenDrops(): Promise<boolean> {
  const count = await prisma.competition.count({
    where: { status: 'OPEN' }
  });
  return count > 0;
}

// Método 2: Obtener drop actual
async function getCurrentDrop() {
  return await prisma.competition.findFirst({
    where: { status: 'OPEN' },
    orderBy: { createdAt: 'desc' },
    include: {
      competitors: true,
      _count: { select: { votes: true } }
    }
  });
}
```

### Obtener fecha del drop actual

```typescript
async function getCurrentDropDate(): Promise<Date | null> {
  const drop = await prisma.competition.findFirst({
    where: { status: 'OPEN' },
    orderBy: { createdAt: 'desc' },
    select: { createdAt: true }
  });
  
  return drop?.createdAt ?? null;
}
```

### Obtener todos los drops (activos + históricos)

```typescript
async function getAllDrops(page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize;

  const [total, competitions] = await Promise.all([
    prisma.competition.count(),
    prisma.competition.findMany({
      skip,
      take: pageSize,
      include: {
        competitors: true,
        _count: { select: { votes: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return {
    drops: competitions,
    metadata: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
  };
}
```

---

## Conexión Directa con Neon (sin Prisma)

Si prefieren usar **Neon Serverless Driver** directamente:

```typescript
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Verificar drops abiertos
async function hasOpenDrops(): Promise<boolean> {
  const result = await sql`
    SELECT COUNT(*) as count 
    FROM competitions 
    WHERE status = 'OPEN'
  `;
  return Number(result[0].count) > 0;
}

// Obtener drop actual con fecha
async function getCurrentDrop() {
  const drops = await sql`
    SELECT 
      id,
      name,
      status,
      created_at,
      updated_at
    FROM competitions
    WHERE status = 'OPEN'
    ORDER BY created_at DESC
    LIMIT 1
  `;
  return drops[0] || null;
}

// Obtener gladiadores del drop actual
async function getCurrentDropWithGladiators() {
  const drop = await sql`
    SELECT 
      c.id,
      c.name as drop_name,
      c.status,
      c.created_at as drop_date,
      json_agg(
        json_build_object(
          'id', comp.id,
          'name', comp.name,
          'avatar_url', comp.avatar_url
        )
      ) as gladiators
    FROM competitions c
    LEFT JOIN competitors comp ON comp.competition_id = c.id
    WHERE c.status = 'OPEN'
    GROUP BY c.id, c.name, c.status, c.created_at
    ORDER BY c.created_at DESC
    LIMIT 1
  `;
  return drop[0] || null;
}
```

---

## Tipos TypeScript

```typescript
// Tipos para integración
type CompetitionStatus = 'OPEN' | 'CLOSED';

interface Drop {
  id: string;
  name: string;
  status: CompetitionStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface DropWithDetails extends Drop {
  competitors: Competitor[];
  _count: {
    votes: number;
  };
}

interface Competitor {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
  competitionId: string;
  createdAt: Date;
}

// Estado del sistema de drops
interface DropsState {
  hasOpenDrops: boolean;
  currentDrop: Drop | null;
  currentDropDate: Date | null;
  totalGladiators: number;
  totalVotes: number;
}
```

---

## Helper Function Recomendada

Crear un módulo utilitario para Coliseo Main:

```typescript
// lib/dropsIntegration.ts

export async function getDropsState(): Promise<DropsState> {
  const drop = await getCurrentDrop();
  
  return {
    hasOpenDrops: drop !== null,
    currentDrop: drop,
    currentDropDate: drop?.createdAt ?? null,
    totalGladiators: drop?.competitors?.length ?? 0,
    totalVotes: drop?._count?.votes ?? 0
  };
}

export function isDropActive(drop: Drop | null): boolean {
  return drop?.status === 'OPEN';
}

export function getDropDisplayDate(drop: Drop): string {
  return new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(drop.createdAt));
}
```

---

## Variables de Entorno Requeridas

```env
# Conexión a la base de datos de Vibe Arena
DATABASE_URL="postgresql://user:pass@ep-xxx.aws.neon.tech/arena_db?sslmode=require"

# (Opcional) Para consultas directas sin Prisma
NEON_DATABASE_URL="postgresql://user:pass@ep-xxx.aws.neon.tech/arena_db?sslmode=require"
```

---

## Ejemplo de Implementación en Componente

```tsx
// components/DropStatus.tsx
'use client'

import { useEffect, useState } from 'react';

interface DropInfo {
  hasOpenDrops: boolean;
  dropName: string | null;
  dropDate: string | null;
  gladiatorCount: number;
}

export function DropStatus() {
  const [info, setInfo] = useState<DropInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDrops() {
      try {
        const res = await fetch('/api/competitions/active');
        const drops = await res.json();
        
        if (drops.length > 0) {
          const current = drops[0];
          setInfo({
            hasOpenDrops: true,
            dropName: current.name,
            dropDate: new Date(current.createdAt).toLocaleDateString('es-CO'),
            gladiatorCount: current._count.competitors
          });
        } else {
          setInfo({
            hasOpenDrops: false,
            dropName: null,
            dropDate: null,
            gladiatorCount: 0
          });
        }
      } catch (err) {
        console.error('Error fetching drops:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDrops();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="drop-status">
      {info?.hasOpenDrops ? (
        <>
          <span className="status-badge active">🔴 DROP ACTIVO</span>
          <h3>{info.dropName}</h3>
          <p>Fecha: {info.dropDate}</p>
          <p>{info.gladiatorCount} gladiadores compitiendo</p>
        </>
      ) : (
        <span className="status-badge inactive">Sin drops activos</span>
      )}
    </div>
  );
}
```

---

## Flujo de Estados de un Drop

```
┌─────────────────┐
│   DROP CREADO   │
│  status: OPEN   │
│  createdAt: NOW │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   VOTACIÓN EN   │◄──── Los usuarios votan
│     CURSO       │      (status sigue OPEN)
└────────┬────────┘
         │
         ▼ (Admin cierra el drop)
┌─────────────────┐
│  DROP CERRADO   │
│ status: CLOSED  │
│ updatedAt: NOW  │
└─────────────────┘
```

---

## Notas Importantes

1. **Timezone**: Las fechas se guardan en UTC. Convertir a timezone local al mostrar.

2. **Caché**: El endpoint `/api/competitions/active` tiene `dynamic = 'force-dynamic'` (sin caché).

3. **Límite**: Por defecto solo retorna los últimos 5 drops abiertos.

4. **Naming**: En el código interno usamos "Competition", pero para usuarios es "Drop".

5. **Tabla en DB**: 
   - Prisma model: `Competition`
   - Tabla PostgreSQL: `competitions`

---

## Contacto

Para acceso a las credenciales de la base de datos o dudas de integración, contactar al equipo de Vibe Arena.

---

*Documento de Integración - Enero 2026*
*Vibe Arena × Coliseo Main*

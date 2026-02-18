# 🏟️ Guía de Integración: Gladiator Stats en el Proyecto Main (vibe_arena)

## Objetivo
Hacer que las cards del **Gladiator DEX** muestren stats reales (wins, losses, win%) en vez de ceros.

![Cards actuales mostrando 0-0-0%](https://i.imgur.com/placeholder.png)

---

## ⚡ TL;DR — Lo Mínimo que Necesitas Hacer

El **Admin Coliseo** ya tiene los endpoints listos. Solo necesitas hacer **UN fetch** desde tu API route.

---

## 📡 Endpoints Disponibles (Admin Coliseo API)

Base URL: `https://vibe-arena-qrvoting.vercel.app`

### 1. Stats de un gladiador individual
```
GET /api/gladiators/stats?email=vvazquezcolina@gmail.com
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "email": "vvazquezcolina@gmail.com",
    "name": "VICTOR MANUEL VAZQUEZ COLINA",
    "dropsPlayed": 1,
    "wins": 1,
    "losses": 0,
    "winRate": 100,
    "totalVotesReceived": 4,
    "recentDrops": [
      {
        "dropName": "ALPHA DROP WHERE IT ALL STARTS",
        "status": "CLOSED",
        "votesReceived": 4,
        "isWinner": true,
        "date": "2026-01-29T..."
      }
    ]
  }
}
```

### 2. Stats en bulk (recomendado para el DEX)
```
POST /api/gladiators/stats/bulk
Content-Type: application/json

{
  "emails": ["email1@example.com", "email2@example.com", ...]
}
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "vvazquezcolina@gmail.com": { "wins": 1, "losses": 0, "dropsPlayed": 1, "winRate": 100 },
    "hernanjulian8@hotmail.com": { "wins": 0, "losses": 1, "dropsPlayed": 1, "winRate": 0 },
    "juanjhs@gmail.com": { "wins": 0, "losses": 1, "dropsPlayed": 1, "winRate": 0 }
  },
  "count": 3
}
```

---

## 🔧 Implementación Paso a Paso

### Paso 1: Modificar `app/api/gladiators/route.js`

Tu API route actual hace un query a la DB de QuickDrop para listar gladiadores. Necesitas agregarle un segundo fetch al Admin API para obtener los stats.

**Archivo:** `app/api/gladiators/route.js`

```javascript
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// URL del Admin Coliseo API
const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://vibe-arena-qrvoting.vercel.app';

export async function GET(request) {
  const sql = neon(process.env.QUICKDROP_DATABASE_URL);
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  try {
    // 1. Fetch gladiators from QuickDrop DB (tu query actual)
    let gladiators;
    if (search) {
      gladiators = await sql`
        SELECT DISTINCT ON (email) *
        FROM quickdrop_registrations
        WHERE name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'}
        ORDER BY email, created_at DESC
        LIMIT 100
      `;
    } else {
      gladiators = await sql`
        SELECT DISTINCT ON (email) *
        FROM quickdrop_registrations
        ORDER BY email, created_at DESC
        LIMIT 100
      `;
    }

    // 2. Fetch stats from Admin Coliseo API
    const emails = gladiators.map(g => g.email).filter(Boolean);
    let statsMap = {};
    
    try {
      const statsResponse = await fetch(`${ADMIN_API_URL}/api/gladiators/stats/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails }),
        // Cache for 60 seconds to avoid hitting the API too much
        next: { revalidate: 60 }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        statsMap = statsData.stats || {};
      }
    } catch (statsError) {
      console.error('Error fetching stats from Admin API:', statsError);
      // Stats fetch failed, continue with zeros — non-blocking
    }

    // 3. Merge gladiator data with stats
    const result = gladiators.map((g, index) => {
      const email = g.email?.toLowerCase()?.trim();
      const stats = statsMap[email] || { wins: 0, losses: 0, dropsPlayed: 0, winRate: 0 };

      return {
        id: g.id,
        number: String(index + 1).padStart(4, '0'),
        name: g.name,
        email: g.email,
        colosseum_name: g.colosseum_name || g.name,
        stack: g.stack || null,
        github_url: g.github_url || null,
        avatar_url: g.avatar_url || null,
        // ✅ Stats reales del Admin Coliseo
        wins: stats.wins,
        losses: stats.losses,
        drops_played: stats.dropsPlayed,
        win_rate: stats.winRate,
      };
    });

    return NextResponse.json({ 
      success: true, 
      gladiators: result, 
      total: result.length 
    });

  } catch (error) {
    console.error('Error fetching gladiators:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gladiators' },
      { status: 500 }
    );
  }
}
```

### Paso 2: Actualizar el componente `GladiatorInterface.jsx`

Tu componente ya está preparado para mostrar los stats. Solo asegúrate de que las propiedades que mapeas coincidan con los nombres del API:

```jsx
// En la parte donde mapeas los gladiators del API response:
const wins = gladiator.wins || 0;
const losses = gladiator.losses || 0;
const totalMatches = wins + losses;
const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
```

**Esto ya debería estar funcionando en tu componente.** Los stats que el API retorna son:
- `wins` → número de drops ganados
- `losses` → número de drops perdidos (participó pero no ganó)
- `drops_played` → total de drops en los que participó
- `win_rate` → porcentaje de victorias (ya calculado)

### Paso 3: Variable de Entorno

Agrega esto en tu `.env.local` y en **Vercel Environment Variables**:

```bash
NEXT_PUBLIC_ADMIN_URL=https://vibe-arena-qrvoting.vercel.app
```

---

## 📊 Datos Actuales en la DB (después del cleanup)

Solo queda 1 drop:

| Drop | Status | Ganador |
|------|--------|---------|
| ALPHA DROP WHERE IT ALL STARTS | CLOSED | VICTOR MANUEL VAZQUEZ COLINA |

**Stats esperados después de la integración:**

| Gladiador | Wins | Losses | Win% |
|-----------|------|--------|------|
| VICTOR MANUEL VAZQUEZ COLINA | 1 | 0 | 100% |
| Hernan Julian Sanchez Avila | 0 | 1 | 0% |
| Magno Gouveia | 0 | 1 | 0% |
| Juan Herrera | 0 | 1 | 0% |
| Pam | 0 | 1 | 0% |
| Dinora Hernández | 0 | 1 | 0% |
| *(gladiadores que no participaron en ningún drop)* | 0 | 0 | 0% |

---

## 🧪 Cómo Testear

### Opción A: Directo en el browser
```
https://vibe-arena-qrvoting.vercel.app/api/gladiators/stats?email=vvazquezcolina@gmail.com
```
Deberías ver: `{ wins: 1, losses: 0, dropsPlayed: 1, winRate: 100 }`

### Opción B: Con curl (bulk)
```bash
curl -X POST https://vibe-arena-qrvoting.vercel.app/api/gladiators/stats/bulk \
  -H "Content-Type: application/json" \
  -d '{"emails": ["vvazquezcolina@gmail.com", "hernanjulian8@hotmail.com"]}'
```

### Opción C: En tu dev local
1. Agrega `NEXT_PUBLIC_ADMIN_URL=https://vibe-arena-qrvoting.vercel.app` a `.env.local`
2. Modifica `route.js` como se indica arriba
3. `npm run dev`
4. Navega a `/gladiators` → deberías ver los stats reales

---

## ⚙️ Cómo se Actualizan los Stats Automáticamente

No hay que hacer nada manual. El flujo es:

```
1. Admin crea un nuevo Drop → status: OPEN
2. Gladiadores son agregados al Drop
3. Gente vota durante el Drop abierto
4. Admin cierra el Drop → status: CLOSED
   └→ El sistema automáticamente:
      • Cuenta votos por gladiador
      • Asigna winnerId al que tenga más votos
      • Envía emails de feedback (winner gets isWinner: true)
5. La próxima vez que el DEX cargue, los stats se recalculan
   └→ El gladiador ganador muestra +1 win
   └→ Los demás participantes muestran +1 loss
```

---

## 🔑 Notas Importantes

1. **Los stats son calculados en tiempo real** — no se cachean en la DB. Cada vez que llamas al endpoint, se recalculan desde los datos de competitions/votes.

2. **El bulk endpoint tiene un límite de 100 emails** por request. Si tienes más gladiadores, haz múltiples requests.

3. **Si el fetch de stats falla, las cards siguen funcionando** — simplemente muestran 0. El error es non-blocking.

4. **CORS**: El Admin API está en un dominio diferente. Si necesitas llamarlo desde el cliente (browser), usa tu API route como proxy (como en el ejemplo de arriba). Si llamas server-side (API route o Server Component), no hay problema de CORS.

5. **Para el modal de dossier (PR #68)**: Puedes usar el endpoint individual para obtener el historial de drops recientes:
```javascript
const res = await fetch(`${ADMIN_API_URL}/api/gladiators/stats?email=${gladiator.email}`);
const { stats } = await res.json();
// stats.recentDrops contiene el history de participaciones
```

---

## 📁 Archivos que Necesitas Modificar

| Archivo | Cambio |
|---------|--------|
| `app/api/gladiators/route.js` | Agregar fetch al Admin stats API y mergear con gladiator data |
| `.env.local` | Agregar `NEXT_PUBLIC_ADMIN_URL` |
| Vercel Env Vars | Agregar `NEXT_PUBLIC_ADMIN_URL` |

**Eso es todo. El componente GladiatorInterface.jsx ya sabe cómo mostrar wins/losses/winRate.** Solo necesitas que el API le mande datos reales en vez de ceros. 🚀

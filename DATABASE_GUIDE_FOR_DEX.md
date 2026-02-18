# 🗄️ Guía de Base de Datos — Gladiator Cage → vibecodingcolosseum.com/dex

> **Autor:** Equipo Gladiator Cage  
> **Fecha:** 2026-02-17  
> **Propósito:** Documentar la estructura de la base de datos de Gladiator Cage (esta app) para que el desarrollador del sitio principal (`vibecodingcolosseum.com/dex`) pueda extraer y mostrar la ficha completa de cada gladiador cuando un usuario haga click en su nombre.

---

## 📋 Resumen del Flujo

```
┌─────────────────────────┐         ┌──────────────────────────────┐
│    GLADIATOR CAGE       │         │   vibecodingcolosseum.com    │
│    (Esta App)           │         │          /dex                │
│                         │         │                              │
│  • Registros gladiador  │─────────│  • Lista de gladiadores      │
│  • Generación de avatar │  Neon   │  • Click en nombre →         │
│  • Perfil + atributos   │  DB     │    muestra ficha completa    │
│  • Power ups, stack     │ (shared)│  • Avatar, stats, history    │
│  • Imágenes generadas   │─────────│  • Power ups, weaknesses     │
└─────────────────────────┘         └──────────────────────────────┘
```

**Base de datos:** PostgreSQL (Neon Serverless)  
**Driver/SDK:** `@neondatabase/serverless` (npm)  
**Connection string:** Variable de entorno `DATABASE_URL`

---

## 🗃️ TABLAS DE LA BASE DE DATOS

La app usa **4 tablas principales**. A continuación se detalla cada una.

---

### 1. `quickdrop_registrations`

> **Descripción:** Tabla de registros de gladiadores que se inscriben a los "quick drops" (competencias). Es la fuente primaria de registro de participantes.

| Columna | Tipo | Nullable | Descripción |
|---------|------|----------|-------------|
| `email` | `VARCHAR` | NOT NULL | Email del gladiador (key de búsqueda principal). Case-insensitive en consultas. |
| `name` | `VARCHAR` | YES | Nombre del gladiador (nombre visible/display name). |
| `colosseum_name` | `VARCHAR` | YES | Nombre del coliseo/equipo/clan al que pertenece. |
| `stack` | `VARCHAR` | YES | Stack tecnológico del gladiador (ej: "React, Node, Python"). Comma-separated string. |
| `avatar_url` | `TEXT` | YES | URL o Base64 data URL del avatar del gladiador. Se actualiza desde Gladiator Cage cuando el usuario guarda su avatar. |
| `updated_at` | `TIMESTAMPTZ` | YES | Timestamp de última actualización. |

**Uso en /dex:** Esta tabla contiene los datos básicos de identidad de cada gladiador. Si el gladiador se registró vía quick drop, sus datos estarán aquí.

---

### 2. `competitors`

> **Descripción:** Tabla alternativa de competidores. Algunos gladiadores se registran por esta vía en vez de `quickdrop_registrations`. Contiene datos similares + una historia del competidor.

| Columna | Tipo | Nullable | Descripción |
|---------|------|----------|-------------|
| `email` | `VARCHAR` | NOT NULL | Email del competidor (key de búsqueda). |
| `name` | `VARCHAR` | YES | Nombre del gladiador. |
| `colosseum_name` | `VARCHAR` | YES | Nombre del coliseo/equipo. |
| `competitor_story` | `TEXT` | YES | Historia/bio del competidor ("¿por qué compites?"). |
| `avatar_url` | `TEXT` | YES | URL o Base64 data URL del avatar. Se sincroniza desde Gladiator Cage. |
| `updated_at` | `TIMESTAMPTZ` | YES | Timestamp de última actualización. |

**Uso en /dex:** Fuente alternativa de identidad. Si no se encuentra en `quickdrop_registrations`, se busca aquí.

---

### 3. `avatar_profiles` ⭐ (TABLA PRINCIPAL PARA /DEX)

> **Descripción:** Tabla más rica en datos. Contiene el perfil completo del gladiador incluyendo avatar, atributos generados por IA, power ups, imágenes generadas, y más. **Esta es la tabla que más datos aporta al /dex.**

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `email` | `VARCHAR(255)` | **PK** | — | Email del gladiador. **Primary Key**. |
| `gladiator_name` | `VARCHAR(255)` | YES | — | Nombre de gladiador (editable por el usuario en la app). |
| `colosseum_name` | `VARCHAR(255)` | YES | — | Nombre del coliseo/clan. |
| `power_ups` | `JSONB` | YES | — | Array JSON de power ups. Ej: `["React", "Node.js", "TypeScript"]` |
| `attributes` | `JSONB` | YES | — | Objeto JSON con atributos generados por IA. Ver estructura abajo. |
| `avatar_url` | `TEXT` | YES | — | URL o Base64 data URL del avatar seleccionado/final. |
| `generated_images` | `JSONB` | YES | — | Array JSON de URLs/Base64 de imágenes generadas (máx 4). |
| `reference_image_url` | `TEXT` | YES | — | URL de la imagen de referencia usada para generar el avatar. |
| `created_at` | `TIMESTAMPTZ` | YES | `NOW()` | Fecha de creación del perfil. |
| `updated_at` | `TIMESTAMPTZ` | YES | `NOW()` | Fecha de última actualización. |

#### Estructura del campo `attributes` (JSONB):

```json
{
  "title": "El Destructor de Bugs",
  "archetype": "Fullstack Feroz",
  "powerUps": ["React Mastery", "Node.js Expert", "TypeScript Ninja"],
  "weaknesses": ["CSS sin Tailwind", "Documentación insuficiente"],
  "battleCry": "¡Mi código no tiene bugs, tiene features no documentadas!"
}
```

| Campo del JSON | Tipo | Descripción |
|----------------|------|-------------|
| `title` | `string` | Título del gladiador (generado por IA vía Groq/LLaMA 3.3). |
| `archetype` | `string` | Arquetipo del gladiador (ej: "Fullstack Feroz", "Backend Berserker"). |
| `powerUps` | `string[]` | Array de habilidades/power ups sugeridos por la IA. |
| `weaknesses` | `string[]` | Array de debilidades del gladiador. |
| `battleCry` | `string` | Grito de batalla del gladiador. |

#### Estructura del campo `generated_images` (JSONB):

```json
[
  "data:image/jpeg;base64,/9j/4AAQSkZ...",
  "data:image/webp;base64,UklGRl4AAA...",
  "data:image/jpeg;base64,/9j/4AAQSkZ...",
  "data:image/jpeg;base64,/9j/4AAQSkZ..."
]
```

Es un array de strings. Cada string es un **Base64 data URL** de la imagen generada. Máximo 4 imágenes por gladiador.

#### Estructura del campo `power_ups` (JSONB):

```json
["React", "Node.js", "Python", "Docker"]
```

Array simple de strings representando las habilidades/tecnologías del gladiador.

---

### 4. `avatar_tokens`

> **Descripción:** Tabla de tokens de autenticación para controlar el acceso a la generación de imágenes.

| Columna | Tipo | Nullable | Descripción |
|---------|------|----------|-------------|
| `email` | `VARCHAR` | NOT NULL | Email del gladiador. |
| `current_token` | `VARCHAR` | YES | Token actual del usuario para autenticar generaciones. |
| `token_used` | `BOOLEAN` | YES | Si el token ya fue usado/finalizado. |

**Uso en /dex:** Esta tabla es principalmente de autenticación. Probablemente no necesitas extraer datos de aquí para la vista del /dex, a menos que quieras verificar si el gladiador tiene acceso activo.

---

## 🔗 RELACIONES ENTRE TABLAS

```
                    ┌─────────────────────┐
                    │   avatar_profiles    │ ← TABLA PRINCIPAL para /dex
                    │   (PK: email)        │
                    └────────┬────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
   │ quickdrop_   │  │ competitors  │  │ avatar_      │
   │ registrations│  │              │  │ tokens       │
   │              │  │              │  │              │
   └──────────────┘  └──────────────┘  └──────────────┘
```

**Relación:** Todas las tablas se relacionan por `email` (case-insensitive). No hay foreign keys formales; la app hace JOINs implícitos buscando por email.

**Patrón COALESCE para resolución de datos:**

La app usa un patrón de "cascada" (COALESCE) para resolver datos:

1. **`avatar_profiles`** → Fuente principal (más completa)
2. **`competitors`** → Fallback si no hay datos en avatar_profiles
3. **`quickdrop_registrations`** → Último fallback

---

## 📊 MAPEO DE CAMPOS: App → Vista /dex

Aquí está el mapeo de qué campos de la BD corresponden a qué elementos visuales en la pantalla del /dex:

### Ficha del Gladiador (Vista Grande al hacer click)

| Elemento Visual en /dex | Tabla Fuente | Campo(s) | Fallback | Notas |
|--------------------------|-------------|----------|----------|-------|
| **Avatar (imagen grande)** | `avatar_profiles` | `avatar_url` | `competitors.avatar_url` → `quickdrop_registrations.avatar_url` | Puede ser URL normal o Base64 data URL. Usar como `src` de `<img>`. |
| **Nombre del Gladiador** | `avatar_profiles` | `gladiator_name` | `competitors.name` → `quickdrop_registrations.name` | — |
| **Nombre del Coliseo** | `avatar_profiles` | `colosseum_name` | `competitors.colosseum_name` → `quickdrop_registrations.colosseum_name` | — |
| **Título** | `avatar_profiles` | `attributes->>'title'` | — | Extraído del campo JSONB `attributes`. |
| **Arquetipo** | `avatar_profiles` | `attributes->>'archetype'` | — | Extraído del campo JSONB `attributes`. |
| **Power Ups (badges)** | `avatar_profiles` | `attributes->'powerUps'` | `power_ups` (campo directo) | El campo `attributes` tiene los power ups generados por IA. El campo `power_ups` tiene los ingresados manualmente. Puedes combinarlos. |
| **Debilidades** | `avatar_profiles` | `attributes->'weaknesses'` | — | Array JSON dentro de `attributes`. |
| **Grito de Batalla** | `avatar_profiles` | `attributes->>'battleCry'` | — | String dentro de `attributes`. |
| **Stack Tecnológico** | `quickdrop_registrations` | `stack` | — | Comma-separated string. Solo existe en `quickdrop_registrations`. |
| **Historia del Competidor** | `competitors` | `competitor_story` | — | Solo existe en `competitors`. |
| **Galería de Imágenes** | `avatar_profiles` | `generated_images` | — | Array JSONB con hasta 4 imágenes Base64. |
| **Imagen de Referencia** | `avatar_profiles` | `reference_image_url` | — | Imagen usada como referencia para generar el avatar. |
| **Fecha de creación** | `avatar_profiles` | `created_at` | — | — |
| **Fecha de actualización** | `avatar_profiles` | `updated_at` | — | — |

---

## 🔍 QUERIES SUGERIDAS PARA /DEX

### Query 1: Obtener TODOS los gladiadores (para la lista del /dex)

```sql
SELECT DISTINCT ON (LOWER(COALESCE(ap.email, c.email, qr.email)))
  COALESCE(ap.email, c.email, qr.email) AS email,
  COALESCE(ap.gladiator_name, c.name, qr.name) AS gladiator_name,
  COALESCE(ap.colosseum_name, c.colosseum_name, qr.colosseum_name) AS colosseum_name,
  COALESCE(ap.avatar_url, c.avatar_url, qr.avatar_url) AS avatar_url,
  ap.attributes,
  ap.power_ups,
  ap.generated_images,
  qr.stack,
  c.competitor_story,
  ap.created_at,
  ap.updated_at
FROM avatar_profiles ap
FULL OUTER JOIN competitors c ON LOWER(c.email) = LOWER(ap.email)
FULL OUTER JOIN quickdrop_registrations qr ON LOWER(qr.email) = LOWER(COALESCE(ap.email, c.email))
ORDER BY LOWER(COALESCE(ap.email, c.email, qr.email));
```

### Query 2: Obtener UN gladiador específico (cuando hacen click en el nombre)

```sql
-- Paso 1: Buscar en avatar_profiles
SELECT 
  email,
  gladiator_name,
  colosseum_name,
  avatar_url,
  power_ups,
  attributes,
  generated_images,
  reference_image_url,
  created_at,
  updated_at
FROM avatar_profiles
WHERE LOWER(email) = LOWER($1)
LIMIT 1;

-- Paso 2: Si no se encontró o para datos complementarios
SELECT name, colosseum_name, email, stack, avatar_url
FROM quickdrop_registrations
WHERE LOWER(email) = LOWER($1)
LIMIT 1;

-- Paso 3: Datos adicionales de competitor
SELECT name, colosseum_name, email, competitor_story, avatar_url
FROM competitors
WHERE LOWER(email) = LOWER($1)
LIMIT 1;
```

### Query 3: Query simple - Solo lista con nombre y avatar

```sql
SELECT 
  COALESCE(ap.gladiator_name, qr.name, c.name) AS display_name,
  COALESCE(ap.avatar_url, qr.avatar_url, c.avatar_url) AS avatar,
  COALESCE(ap.colosseum_name, qr.colosseum_name, c.colosseum_name) AS colosseum,
  ap.attributes->>'title' AS title,
  ap.attributes->>'archetype' AS archetype,
  COALESCE(ap.email, qr.email, c.email) AS email
FROM avatar_profiles ap
FULL OUTER JOIN quickdrop_registrations qr ON LOWER(qr.email) = LOWER(ap.email)
FULL OUTER JOIN competitors c ON LOWER(c.email) = LOWER(COALESCE(ap.email, qr.email))
WHERE COALESCE(ap.gladiator_name, qr.name, c.name) IS NOT NULL
ORDER BY COALESCE(ap.updated_at, ap.created_at) DESC;
```

---

## 🔌 API EXISTENTE (Referencia)

La app Gladiator Cage ya tiene estos endpoints API que interactúan con la BD. El dev del /dex puede usarlos como referencia o crear sus propios:

### `POST /api/profile`
- **Input:** `{ email: string }`
- **Output:** 
```json
{
  "profile": {
    "email": "user@example.com",
    "gladiatorName": "El Destructor",
    "colosseumName": "Arena Central",
    "stack": "React, Node",
    "competitorStory": "...",
    "avatarUrl": "data:image/jpeg;base64,...",
    "generatedImages": ["data:...", "data:..."]
  },
  "attributes": {
    "title": "El Destructor de Bugs",
    "archetype": "Fullstack Feroz",
    "powerUps": ["React", "Node.js"],
    "weaknesses": ["CSS sin Tailwind"],
    "battleCry": "¡Mi código no tiene bugs!"
  }
}
```
- **Nota:** Los `attributes` son generados al vuelo por IA (Groq/LLaMA 3.3) cada vez que se llama este endpoint. Si el dev del /dex quiere datos estáticos, debe usar los `attributes` guardados en `avatar_profiles.attributes`.

### `POST /api/validate-email`
- **Input:** `{ email: string }`
- **Output:** `{ authorized: boolean, email: string, source: string, generatedCount: number }`

### `POST /api/avatar`
- **Input:** `{ email, avatarUrl, profile, attributes, generatedImages, referenceImage }`
- **Output:** `{ success: true }`
- **Acción:** Guarda/actualiza el perfil completo en `avatar_profiles` y sincroniza `avatar_url` a `quickdrop_registrations` y `competitors`.

---

## ⚠️ NOTAS IMPORTANTES

### 1. Imágenes en Base64
Las imágenes (`avatar_url`, `generated_images`) se guardan como **Base64 data URLs** (no URLs externas) porque las URLs de Replicate expiran después de ~1 hora. Pueden ser strings muy largos (varios MB). Asegúrate de que tu frontend pueda manejar imágenes Base64 en tags `<img src="data:image/...">`.

### 2. Case-Insensitive Email Matching
Todas las búsquedas por email usan `LOWER(email)` para ignorar mayúsculas. Además, hay una variante que ignora puntos: `REPLACE(LOWER(email), '.', '')` para matching más flexible.

### 3. Los Attributes pueden estar en formato JSON o vacíos
Si un gladiador nunca usó Gladiator Cage (solo se registró), no tendrá fila en `avatar_profiles` y por lo tanto no tendrá `attributes`. El /dex debe manejar este caso mostrando valores por defecto.

### 4. El campo `stack` solo existe en `quickdrop_registrations`
No está en `avatar_profiles` ni en `competitors`.

### 5. El campo `competitor_story` solo existe en `competitors`
No está en las otras tablas.

### 6. No hay tabla dedicada de "drops" o "competencias" en esta app
Los datos de competencias (drops won, drops competed, etc.) actualmente son **mock data** en el frontend. Si el sitio principal tiene esa data, deberá juntarla por su lado.

---

## 🎯 RESUMEN PARA EL DEV DEL /DEX

**¿Qué necesitas mostrar cuando hacen click en un gladiador?**

| Dato | Dónde encontrarlo | Prioridad |
|------|-------------------|-----------|
| 🖼️ Avatar grande | `avatar_profiles.avatar_url` | **ALTA** - Es lo principal |
| 📛 Nombre | `avatar_profiles.gladiator_name` (fallback: `quickdrop_registrations.name` o `competitors.name`) | **ALTA** |
| 🏟️ Coliseo | `avatar_profiles.colosseum_name` | **ALTA** |
| 🏷️ Título | `avatar_profiles.attributes->>'title'` | **MEDIA** |
| ⚔️ Arquetipo | `avatar_profiles.attributes->>'archetype'` | **MEDIA** |
| ⚡ Power Ups | `avatar_profiles.attributes->'powerUps'` (array JSON) | **MEDIA** |
| 💀 Debilidades | `avatar_profiles.attributes->'weaknesses'` (array JSON) | **BAJA** |
| 📢 Grito de Batalla | `avatar_profiles.attributes->>'battleCry'` | **MEDIA** |
| 🛠️ Stack | `quickdrop_registrations.stack` | **MEDIA** |
| 📖 Historia | `competitors.competitor_story` | **BAJA** |
| 🖼️ Galería | `avatar_profiles.generated_images` (array de hasta 4 Base64) | **MEDIA** |
| 📅 Fecha | `avatar_profiles.created_at` / `updated_at` | **BAJA** |

**Conéctate a la misma base Neon usando `DATABASE_URL` y haz las queries directamente. 👊**

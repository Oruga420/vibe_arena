# 📚 Diccionario de Datos - Vibe Arena

Este documento describe la estructura de la base de datos utilizada en Vibe Arena. La base de datos es **PostgreSQL** (alojada en Neon).

## 🗂️ Visión General

La base de datos consta principalmente de cuatro tablas clave:

1.  **`quickdrop_registrations`**: Controla el registro de gladiadores para los "drops" actuales.
2.  **`competitors`**: Tabla maestra que guarda el historial de cada competidor.
3.  **`waitlist_entries`**: Gestiona la lista de espera para interesados.
4.  **`sponsor_applications`**: Almacena las solicitudes de patrocinadores.

---

## 🏗️ Detalles de las Tablas

### 1. `quickdrop_registrations`

Almacena la información de los participantes (gladiadores) registrados.

| Columna           | Tipo                       | Requerido | Descripción                                          |
| :---------------- | :------------------------- | :-------: | :--------------------------------------------------- |
| `id`              | SERIAL                     |    ✅     | Identificador único (Primary Key).                   |
| `name`            | VARCHAR(255)               |    ✅     | Nombre completo del gladiador.                       |
| `colosseum_name`  | VARCHAR(255)               |    ❌     | Nombre de batalla / apodo (Visible en leaderboards). |
| `email`           | VARCHAR(255)               |    ✅     | Correo electrónico (Debe ser único).                 |
| `timezone`        | ENUM `timezone_type`       |    ✅     | Zona horaria del participante.                       |
| `stack`           | ENUM `stack_type`          |    ✅     | Especialidad técnica (fullstack, frontend, etc.).    |
| `github_url`      | VARCHAR(500)               |    ✅     | Enlace al perfil de GitHub.                          |
| `demo_interest`   | ENUM `demo_type`           |    ✅     | Interés en demostrar el proyecto (`yes`/`no`).       |
| `fairplay_agreed` | BOOLEAN                    |    ✅     | Aceptación de las reglas de juego limpio.            |
| `x_url`           | VARCHAR(500)               |    ❌     | Enlace a perfil de X/Twitter (Opcional).             |
| `linkedin_url`    | VARCHAR(500)               |    ❌     | Enlace a perfil de LinkedIn (Opcional).              |
| `drop_id`         | VARCHAR(100)               |    ❌     | Identificador del evento al que se inscribe.         |
| `status`          | ENUM `registration_status` |    ✅     | Estado de la inscripción (Default: `pending`).       |
| `wins`            | INTEGER                    |    ✅     | Número de victorias (Default: 0).                    |
| `losses`          | INTEGER                    |    ✅     | Número de derrotas (Default: 0).                     |
| `payment_status`  | VARCHAR(50)                |    ❌     | Estado del pago (e.g., 'unpaid', 'paid').            |
| `created_at`      | TIMESTAMPTZ                |    ✅     | Fecha de creación.                                   |
| `updated_at`      | TIMESTAMPTZ                |    ✅     | Fecha de última actualización.                       |

### 2. `competitors`

Almacena el perfil histórico del competidor, persistente a través de múltiples torneos.

| Columna             | Tipo         | Requerido | Descripción                                                       |
| :------------------ | :----------- | :-------: | :---------------------------------------------------------------- |
| `id`                | SERIAL       |    ✅     | Identificador único.                                              |
| `name`              | VARCHAR(255) |    ✅     | Nombre del competidor.                                            |
| `email`             | VARCHAR(255) |    ✅     | Email único (Primary Key lógica para usuario).                    |
| `last_tournament`   | VARCHAR(255) |    ❌     | Nombre del último torneo donde participó.                         |
| `last_payment`      | VARCHAR(255) |    ❌     | Info del último pago ("Paid $20" o fecha).                        |
| `last_project_name` | VARCHAR(255) |    ❌     | Nombre del último proyecto entregado.                             |
| `last_team_name`    | VARCHAR(255) |    ❌     | Nombre del último equipo.                                         |
| `competitor_story`  | TEXT         |    ❌     | Historia o bio del competidor.                                    |
| `other_details`     | TEXT         |    ❌     | Notas adicionales.                                                |
| `added_to_drop`     | BOOLEAN      |    ❌     | Si el competidor ya fue agregado al drop actual (`TRUE`/`FALSE`). |
| `created_at`        | TIMESTAMPTZ  |    ✅     | Fecha de creación del perfil.                                     |
| `updated_at`        | TIMESTAMPTZ  |    ✅     | Última actualización.                                             |

### 3. `waitlist_entries`

... (Sin cambios)

### 4. `sponsor_applications`

... (Sin cambios)

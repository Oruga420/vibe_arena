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

... (Sin cambios, ver schema)

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

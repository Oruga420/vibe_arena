# 📚 Diccionario de Datos - Vibe Arena

Este documento describe la estructura de la base de datos utilizada en Vibe Arena. La base de datos es **PostgreSQL** (alojada en Neon).

## 🗂️ Visión General

La base de datos consta principalmente de tres tablas clave:

1.  **`quickdrop_registrations`**: Controla el registro de gladiadores para los "drops" (eventos/torneos).
2.  **`waitlist_entries`**: Gestiona la lista de espera para interesados (gladiadores o espectadores).
3.  **`sponsor_applications`**: Almacena las solicitudes de patrocinadores.

---

## 🏗️ Detalles de las Tablas

### 1. `quickdrop_registrations`

Almacena la información de los participantes (gladiadores) registrados.

| Columna           | Tipo                       | Requerido | Descripción                                       |
| :---------------- | :------------------------- | :-------: | :------------------------------------------------ |
| `id`              | SERIAL                     |    ✅     | Identificador único (Primary Key).                |
| `name`            | VARCHAR(255)               |    ✅     | Nombre completo del gladiador.                    |
| `email`           | VARCHAR(255)               |    ✅     | Correo electrónico (Debe ser único).              |
| `timezone`        | ENUM `timezone_type`       |    ✅     | Zona horaria del participante.                    |
| `stack`           | ENUM `stack_type`          |    ✅     | Especialidad técnica (fullstack, frontend, etc.). |
| `github_url`      | VARCHAR(500)               |    ✅     | Enlace al perfil de GitHub.                       |
| `demo_interest`   | ENUM `demo_type`           |    ✅     | Interés en demostrar el proyecto (`yes`/`no`).    |
| `fairplay_agreed` | BOOLEAN                    |    ✅     | Aceptación de las reglas de juego limpio.         |
| `x_url`           | VARCHAR(500)               |    ❌     | Enlace a perfil de X/Twitter (Opcional).          |
| `linkedin_url`    | VARCHAR(500)               |    ❌     | Enlace a perfil de LinkedIn (Opcional).           |
| `drop_id`         | VARCHAR(100)               |    ❌     | Identificador del evento al que se inscribe.      |
| `status`          | ENUM `registration_status` |    ✅     | Estado de la inscripción (Default: `pending`).    |
| `wins`            | INTEGER                    |    ✅     | Número de victorias (Default: 0).                 |
| `losses`          | INTEGER                    |    ✅     | Número de derrotas (Default: 0).                  |
| `payment_status`  | VARCHAR(50)                |    ❌     | Estado del pago (e.g., 'unpaid', 'paid').         |
| `created_at`      | TIMESTAMPTZ                |    ✅     | Fecha de creación.                                |
| `updated_at`      | TIMESTAMPTZ                |    ✅     | Fecha de última actualización.                    |

### 2. `waitlist_entries`

Captura leads de personas interesadas en el proyecto antes o durante los eventos.

| Columna      | Tipo         | Requerido | Descripción                                |
| :----------- | :----------- | :-------: | :----------------------------------------- |
| `id`         | SERIAL       |    ✅     | Identificador único.                       |
| `name`       | VARCHAR(255) |    ✅     | Nombre del interesado.                     |
| `email`      | VARCHAR(255) |    ✅     | Correo electrónico.                        |
| `role`       | VARCHAR(50)  |    ✅     | Rol de interés (ej: 'arena', 'spectator'). |
| `created_at` | TIMESTAMPTZ  |    ✅     | Fecha de registro.                         |

### 3. `sponsor_applications`

Solicitudes de empresas o personas interesadas en patrocinar.

| Columna        | Tipo         | Requerido | Descripción                                  |
| :------------- | :----------- | :-------: | :------------------------------------------- |
| `id`           | SERIAL       |    ✅     | Identificador único.                         |
| `company_name` | VARCHAR(255) |    ✅     | Nombre de la empresa.                        |
| `contact_name` | VARCHAR(255) |    ✅     | Persona de contacto.                         |
| `email`        | VARCHAR(255) |    ✅     | Correo de contacto.                          |
| `status`       | VARCHAR(50)  |    ❌     | Estado de la solicitud (Default: 'pending'). |
| `budget_range` | VARCHAR(100) |    ❌     | Rango de presupuesto ofrecido.               |
| `created_at`   | TIMESTAMPTZ  |    ✅     | Fecha de solicitud.                          |

---

## 🔢 Enums (Tipos Personalizados)

### `stack_type`

Define el perfil técnico del desarrollador.

- `fullstack`
- `frontend`
- `backend`
- `mobile`
- `data`
- `other`

### `timezone_type`

Zonas horarias simplificadas permitidas.

- `et`, `ct`, `mt`, `pt` (US)
- `gmt3`, `gmt`, `cet` (Europe/Other)

### `registration_status`

El ciclo de vida de un registro.

- `pending`: Registrado, esperando revisión.
- `approved`: Aprobado para participar.
- `invited`: Se le ha enviado la invitación oficial.
- `paid`: Ha pagado la cuota de entrada.
- `rejected`: No seleccionado.
- `waitlist`: Movido a lista de espera.

---

## 🔗 Relaciones y Notas

- **Unique Constraints**: El `email` es único en `quickdrop_registrations`.
- **Validaciones**: Existen constraints de regex para validar formatos de Email, GitHub, X, y LinkedIn directamente a nivel de base de datos.
- **Triggers**: `quickdrop_registrations` tiene un trigger para actualizar automáticamente `updated_at`.

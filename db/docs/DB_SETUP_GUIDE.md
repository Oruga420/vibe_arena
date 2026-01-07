# 🚀 Guía de Configuración e Instalación de Base de Datos

Esta guía ayuda a los nuevos desarrolladores a configurar y conectar la base de datos para Vibe Arena.

## 📋 Requisitos Previos

- **Node.js** instalado.
- **Cuenta en Neon** (o acceso a una instancia PostgreSQL).
- Acceso al repositorio del proyecto.

---

## ⚙️ 1. Configuración de Variables de Entorno

El proyecto utiliza **dotenv** para manejar las credenciales. Necesitas crear o actualizar tu archivo `.env`.

1.  Copia el archivo de ejemplo:

    ```bash
    cp .env.example .env
    ```

2.  Edita el archivo `.env` y asegúrate de tener la variable `DATABASE_URL`:

    ```env
    # Conexión a Neon PostgreSQL
    DATABASE_URL="postgresql://user:password@ep-tu-endpoint.region.aws.neon.tech/dbname?sslmode=require"
    ```

    > **Nota:** Solicita la `DATABASE_URL` al líder técnico o crea tu propia base de datos en Neon para desarrollo local.

---

## 🛠️ 2. Inicialización de la Base de Datos

Si estás configurando una base de datos nueva (vacía), necesitas ejecutar el script de esquema para crear las tablas y tipos.

### Opción A: Vía SQL Runner (Recomendado para Neon)

1.  Ve al dashboard de Neon.
2.  Abre el **SQL Editor**.
3.  Copia el contenido del archivo `db/schema.sql`.
4.  Ejecuta el script completo.

### Opción B: Vía Cliente SQL (DBeaver, TablePlus)

1.  Conéctate usando tu `DATABASE_URL`.
2.  Ejecuta el contenido de `db/schema.sql`.

---

## 🔌 3. Conexión en el Código

La conexión se maneja en `lib/db.js`. Usamos `@neondatabase/serverless` para conexiones eficientes en entornos serverless (como Vercel).

**Ejemplo de uso en un componente o API route:**

```javascript
import { query } from "@/lib/db";

// Ejecutar una consulta
const users = await query(
  "SELECT * FROM quickdrop_registrations WHERE drop_id = $1",
  ["drop_001"]
);
```

---

## 🧪 4. Consultas Comunes y Testing

Puedes encontrar una lista de queries útiles para probar tu configuración en el archivo:
📄 **`quick_queries.md`** (en la raíz del proyecto).

Este archivo incluye queries para:

- Verificar registros.
- Simular aprobaciones de usuarios.
- Limpiar datos de prueba.

---

## ⚠️ Solución de Problemas

- **Error: `DATABASE_URL environment variable is not set`**:
  Asegúrate de que estás cargando las variables de entorno correctamente. En Next.js, reinicia el servidor de desarrollo (`npm run dev`) después de editar el `.env`.

- **Errores de SSL**:
  Asegúrate de que tu string de conexión incluya `?sslmode=require` al final.

- **Tipos de datos incorrectos (Enums)**:
  Si obtienes errores al insertar `status` o `stack`, verifica en `db/docs/DATABASE_DICTIONARY.md` que estás usando uno de los valores permitidos (ej. 'pending', no 'Pending').

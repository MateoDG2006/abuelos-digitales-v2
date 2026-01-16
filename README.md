# Abuelos Digitales

Plataforma que une adultos mayores con jóvenes voluntarios para aprender habilidades digitales. Conectando generaciones, aprendiendo juntos.

## Tecnologías

- [Next.js 16](https://nextjs.org) - Framework React con App Router
- [TypeScript](https://www.typescriptlang.org) - Tipado estático
- [Tailwind CSS 4](https://tailwindcss.com) - Estilos utilitarios
- [Radix UI](https://www.radix-ui.com) - Componentes UI accesibles
- [Lucide React](https://lucide.dev) - Iconos
- [React Hook Form](https://react-hook-form.com) - Manejo de formularios
- [Sonner](https://sonner.emilkowal.ski) - Notificaciones toast

## Getting Started

Primero, instala las dependencias:

```bash
npm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del Proyecto

- `app/` - Páginas y layouts de Next.js App Router
- `components/` - Componentes React reutilizables
- `context/` - Contextos de React para estado global
- `types/` - Definiciones de tipos TypeScript
- `utils/` - Utilidades y funciones auxiliares

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Docker

### Desarrollo - App + Base de Datos en Docker (Por defecto)

Ejecuta todo en Docker con hot-reload habilitado:

```bash
# Levantar app + PostgreSQL (hot-reload activado)
docker-compose up

# En otro terminal, ejecutar migraciones cuando postgres esté listo
docker-compose exec app npm run db:push

# Acceder a Drizzle Studio (opcional)
docker-compose exec app npm run db:studio

# Ver logs
docker-compose logs -f app

# Detener servicios
docker-compose down
```

**Ventajas:**
- ✅ Entorno completamente aislado
- ✅ Hot-reload automático (cambios en código se reflejan)
- ✅ Mismo entorno para todo el equipo
- ✅ No necesitas instalar Node.js localmente

### Producción - Build Completo

Para producción con build optimizado:

```bash
# Construir y ejecutar (build completo de Next.js)
docker-compose -f docker-compose.build.yml up -d

# Ver logs
docker-compose -f docker-compose.build.yml logs -f app

# Ejecutar migraciones
docker-compose -f docker-compose.build.yml exec app npm run db:push

# Detener servicios
docker-compose -f docker-compose.build.yml down
```

**Características:**
- ✅ Build optimizado de Next.js (standalone)
- ✅ Imagen de producción más pequeña
- ✅ Sin hot-reload (producción)

### Opcional - Solo Base de Datos (Desarrollo Local)

Si prefieres ejecutar solo PostgreSQL en Docker y tu app localmente:

```bash
# Levantar solo PostgreSQL
docker-compose -f docker-compose.db-only.yml up -d

# En otro terminal, ejecutar tu aplicación localmente
npm run dev

# Tu app local se conecta a PostgreSQL en localhost:5433
```

**Configuración en `.env.local`:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/abuelos_digitales
```

**Ventajas:**
- ✅ Hot-reload más rápido (sin Docker)
- ✅ Debugging más fácil
- ✅ Menos recursos de Docker

### Scripts de Drizzle

El proyecto incluye scripts útiles para trabajar con Drizzle:

```bash
# Generar archivos de migración
npm run db:generate

# Aplicar cambios directamente a la base de datos (desarrollo)
npm run db:push

# Ejecutar migraciones guardadas
npm run db:migrate

# Abrir Drizzle Studio (UI para la base de datos)
npm run db:studio
```

### Construcción manual de Docker

```bash
# Construir la imagen
docker build -t abuelos-digitales .

# Ejecutar el contenedor (necesitarás PostgreSQL por separado)
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  abuelos-digitales
```

### Variables de Entorno

Para desarrollo local (sin Docker), crea un archivo `.env.local`:

```env
# Base de datos PostgreSQL
# Si usas Docker Compose, el puerto externo es 5433 para evitar conflictos
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/abuelos_digitales

# Variables públicas (opcionales)
NEXT_PUBLIC_API_URL=https://api.example.com
```

**Nota**: 
- En Docker Compose, `DATABASE_URL` se configura automáticamente para conectarse al servicio `postgres` usando el puerto interno (5432).
- El puerto externo expuesto es **5433** (para evitar conflictos si tienes PostgreSQL local).
- Para conectarte desde fuera de Docker (ej: cliente SQL), usa el puerto **5433**.

## Deploy

La aplicación está lista para desplegarse en:
- [Vercel](https://vercel.com) - Plataforma recomendada para Next.js
- Docker - Usando el Dockerfile incluido
- Cualquier plataforma que soporte Node.js y Next.js

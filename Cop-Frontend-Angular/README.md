# Cop-Frontend Angular 20 (Dashboard Odontología)

Proyecto migrado a Angular 20 con diseño moderno y Angular Material.

## Requisitos
- Node.js v20.19.0
- npm 10+

## Instalación
1. Instala Node 20.19.0:
   - Opción 1 (NVM para Windows): instala NVM y luego:
     - `nvm install 20.19.0`
     - `nvm use 20.19.0`
   - Opción 2 (MSI oficial): descarga el instalador de Node v20.19.0 para Windows x64 desde nodejs.org e instálalo.
2. En la carpeta `Cop-Frontend-Angular`:
   - `npm install`
   - `npx ng serve --open`

## Configuración de API
- Edita `src/environments/environment.ts` para apuntar al backend (por defecto `http://localhost:8080/api`).

## Funcionalidades
- Dashboard inicial con acceso a:
  - Gestión de Citas (listar y crear): `Citas`
  - Registro del Odontograma / Chart Dental: `Odontograma`

## Estructura
- `src/app/features/citas/cita-page.component.ts`: Tabla y formulario para citas
- `src/app/features/odontograma/odontograma-page.component.ts`: Grid de dientes y formulario de registro
- `src/app/core/services/*`: Servicios HTTP (citas, odontograma)
- `src/assets`: Imágenes migradas desde la versión anterior
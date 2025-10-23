# ProyectoAula

Proyecto full-stack para gestión odontológica con:
- Frontend Angular (`Cop-Frontend-Angular`)
- Backend Spring Boot (`Backend`)
- Worker Spring Boot para tareas programadas (`Worker`)
- Base de datos MySQL (remoto)

## Estructura
- `Backend/`: API REST (Java 17, Spring Boot)
- `Cop-Frontend-Angular/`: UI web (Angular 16+, Node 20)
- `Worker/`: Recordatorios de citas (scheduler + correo)
- `Backend.sql`: Script de base de datos (si aplica)

## Prerrequisitos
- `Java 17` y `Maven` (o Maven Wrapper `mvnw`)
- `Node 20.19.0` y `@angular/cli`
- `Docker` (opcional para despliegue)
- Acceso a MySQL remoto y whitelist de IP en el proveedor

## Configuración de Base de Datos (Backend)
Usa variables de entorno para credenciales y evita poner contraseñas en texto plano.

Ejemplo (`Backend/src/main/resources/application.properties`):
```
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```
Variables sugeridas:
- `DB_URL=jdbc:mysql://<host>:3306/<db>?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true`
- `DB_USER=<usuario>`
- `DB_PASS=<password>`

Notas:
- Autoriza tu IP pública en cPanel/Remote MySQL/Access Hosts (o equivalente).
- Verifica conectividad: `Test-NetConnection <host> -Port 3306`.
- Si requieres SSL, usa `useSSL=true` y certificados válidos.

## Backend (API)
Arranque local:
```
cd Backend
./mvnw clean package -DskipTests
java -jar target/Backend-0.0.1-SNAPSHOT.jar
```

Endpoints principales (`/api`):
- `GET /api/pacientes` | `GET /api/pacientes/{id}` | `POST/PUT/DELETE`
- `GET /api/medicos` | `GET /api/medicos/{id}` | `POST/PUT/DELETE`
- `GET /api/servicios` | `GET /api/servicios/{id}` | `POST/PUT/DELETE`
- `GET /api/dientes` | `GET /api/dientes/{id}` | `POST/PUT/DELETE`
- `GET /api/odontogramas` | `GET /api/odontogramas/{id}` | `POST/PUT/DELETE`
- `GET /api/detalles-odontograma` | `GET /api/detalles-odontograma/{id}`
- `GET /api/citas` | `GET /api/citas/{id}` | `POST/PUT/DELETE`

CORS: controladores con `@CrossOrigin(origins = "*")` para facilitar desarrollo.

## Frontend (Angular)
Desarrollo local con proxy a backend:
```
cd Cop-Frontend-Angular
npm install
ng serve --proxy-config proxy.conf.json
```
- Proxy `proxy.conf.json` redirige `/api` → `http://localhost:8080`
- Ajusta `src/environments/*.ts` para `apiUrl` cuando despliegues.

Docker (producción estática con Nginx):
```
cd Cop-Frontend-Angular
docker build -t cop-frontend:latest .
docker run -d -p 80:80 --name cop-frontend cop-frontend:latest
```

## Worker (Recordatorios)
Función: consulta `GET /api/citas` y envía/simula correos para las citas del día siguiente.

Configuración en `Worker/src/main/resources/application.properties`:
```
worker.backend.base-url=http://localhost:8080/api
worker.reminders.enabled=true
worker.reminders.cron=0 0 7 * * *
# SMTP opcional
spring.mail.host=
spring.mail.port=
spring.mail.username=
spring.mail.password=
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.from=
```

Arranque:
```
cd Worker
./mvnw clean package -DskipTests
java -jar target/Worker-0.0.1-SNAPSHOT.jar
```
- El scheduler corre diario 07:00; puedes probar con un cron más frecuente.

## Despliegue del Backend con Docker (opcional)
Hay un `Dockerfile` en `Backend/` que construye el jar dentro de la imagen:
```
cd Backend
docker build -t backend-app:latest .
docker run -d -p 8080:8080 --name backend-app backend-app:latest
```
Asegura variables de entorno para DB en despliegue.

## Solución de Problemas
- Error `HikariPool` al arrancar backend:
  - Verifica credenciales y whitelist de IP.
  - Prueba conectividad: `Test-NetConnection <host> -Port 3306`.
  - Si usas hostname con SSL, requiere certificado válido y `useSSL=true`.
- CORS en Angular dev:
  - Usa `proxy.conf.json`; no llames directamente `http://localhost:8080` desde el navegador.

## Seguridad
- Evita almacenar contraseñas en texto plano en el repo.
- Usa perfiles (`spring.profiles.active`) y variables de entorno para producción.

## Próximos Pasos
- Añadir perfiles `dev` (H2/local) y `prod` (MySQL remoto).
- Integrar autenticación (Spring Security) si se requiere.
- CI/CD para build y despliegue automático.
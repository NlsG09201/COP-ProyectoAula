# syntax=docker/dockerfile:1

# Etapa de build: usa Node 20.19.0 para compilar Angular
ARG NODE_VERSION=20.19.0
ARG APP_NAME=cop-frontend-angular

FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

# Instala dependencias con package-lock para builds reproducibles
COPY package*.json ./
RUN npm ci

# Copia el resto del código y compila en modo producción
COPY . .
# Si tu script de build requiere configuración, usa: --configuration production
RUN npm run build -- --configuration production

# Etapa de runtime: sirve estáticos con Nginx
FROM nginx:1.25-alpine AS runner

# Asegura que APP_NAME esté disponible en esta etapa
ARG APP_NAME

# Copia los artefactos generados por Angular al root de Nginx
# Para Angular 16+ el output suele estar en dist/<app>/browser
COPY --from=builder /app/dist/${APP_NAME}/browser /usr/share/nginx/html

# Expone el puerto de Nginx
EXPOSE 80

# Inicia Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
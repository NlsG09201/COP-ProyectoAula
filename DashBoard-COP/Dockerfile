# Etapa de construcción
FROM node:20.19.0 as builder

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa de builder
COPY --from=builder /app/dist/dashboard-cop/browser /usr/share/nginx/html

# Exponer el puerto 4200
EXPOSE 4200

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
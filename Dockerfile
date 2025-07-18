# Usa la imagen oficial de nginx, bien pequeña
FROM nginx:alpine

# Copia todos los archivos de web-build/ a la carpeta estática de nginx
COPY web-build/ /usr/share/nginx/html

# Expón el puerto 80
EXPOSE 80

# Arranca nginx (CMD ya está definido en la imagen base)

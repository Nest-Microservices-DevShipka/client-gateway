## Cliente Gateway
El gateway es el punto de comunicacion entre nuestros clientes y nuestros servicios.
Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta al cliente.

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear archivo `.env` basado en el `env.template`
4. Levantar el servidor de NATS

```
## Nats
docker run -d --name nats-server -p 4222:4222 -p 8222:822
2 nats
```
5. Ejecutar migracion de prisma `npx prima midrate dev`
6. Ejecutar `npm run start:dev` 

## Nats
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats

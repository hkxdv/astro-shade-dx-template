# AstroShadeDX Template - Adaptador Node.js (SSR) para Zerops

Este proyecto muestra cómo configurar una aplicación [Astro](https://astro.build/) con renderizado del lado del servidor (SSR) para ser desplegada en [Zerops](https://zerops.io), una plataforma PaaS moderna que facilita el despliegue y la gestión de aplicaciones.

## Características

- **Server-Side Rendering (SSR)**: Implementado con el adaptador `@astrojs/node`
- **Zerops Ready**: Configuración completa para despliegue inmediato

## Configuración

Se han realizado las siguientes configuraciones para permitir el despliegue en Zerops:

1. **Adaptador Node.js**: Se ha añadido `@astrojs/node` para habilitar SSR

   ```bash
   bun add -D @astrojs/node
   ```

2. **Output Mode**: Se ha configurado Astro en modo servidor

   ```javascript
   // astro.config.mjs
   export default defineConfig({
     output: "server",
     adapter: node({
       mode: "standalone",
     }),
     // ...
   });
   ```

3. **Archivo zerops.yml**: Define la configuración para el servicio Zerops

   ```yaml
   project:
     name: astro-shade-project

   services:
     - id: app
       type: nodejs
       buildFromGit:
         buildCommand: |
           corepack enable
           bun install
           bun run build
         enable: true
       hostname: app
       minContainers: 1
       maxContainers: 3
       port: 4321
       envSecrets:
         NODE_ENV: production
       runCommand: node ./dist/server/entry.mjs
   ```

## Pasos para desplegar

1. Crea una cuenta en [Zerops](https://zerops.io/)
2. Conecta tu repositorio Git a Zerops
3. Importa el proyecto utilizando el archivo `zerops.yml` incluido en este repositorio

El servicio se configurará automáticamente con:

- Servidor Node.js optimizado
- Escalado automático de contenedores (1-3)
- Puerto 4321 para la aplicación
- Subdominio para acceso público

## Estructura del servidor

La aplicación se ejecuta como una aplicación SSR de Astro, lo que significa:

- El servidor Node.js sirve páginas renderizadas dinámicamente
- El punto de entrada del servidor es `./dist/server/entry.mjs`
- Cada solicitud es procesada por el servidor de Astro
- El renderizado ocurre en el servidor para cada visita

## Variables de entorno

El archivo `zerops.yml` incluye una configuración básica de variables de entorno:

```yaml
envSecrets:
  NODE_ENV: production
```

Puedes añadir variables adicionales según sea necesario para tu aplicación.

## Desarrollo local

Para ejecutar este proyecto localmente:

```bash
# Instalar dependencias
bun i

# Iniciar servidor de desarrollo
bun dev

# Construir para producción
bun run build

# Probar la build de producción localmente
bun run preview

# Iniciar el servidor de producción
bun run start
```

## Recursos adicionales

- [Documentación de Astro SSR](https://docs.astro.build/en/guides/server-side-rendering/)
- [Documentación de Zerops](https://docs.zerops.io/)

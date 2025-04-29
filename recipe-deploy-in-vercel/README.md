# AstroShadeDX Template - Adaptador Vercel (SSR)

Este proyecto muestra cómo configurar una aplicación [Astro](https://astro.build/) con renderizado del lado del servidor (SSR) para ser desplegada en [Vercel](https://vercel.com), una plataforma moderna que facilita el despliegue y la gestión de aplicaciones.

## Características

- **Server-Side Rendering (SSR)**: Implementado con el adaptador `@astrojs/vercel`
- **Vercel Ready**: Configuración completa para despliegue inmediato

## Configuración

Se han realizado las siguientes configuraciones para permitir el despliegue en Vercel:

1. **Adaptador Vercel**: Se ha añadido `@astrojs/vercel` para habilitar SSR

   ```bash
   bun add @astrojs/vercel
   ```

2. **Output Mode**: Se ha configurado Astro en modo servidor

   ```javascript
   // astro.config.mjs
   export default defineConfig({
     output: "server",
     adapter: vercel(),
     // ...
   });
   ```

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
```

## Recursos adicionales

- [Documentación de Astro SSR](https://docs.astro.build/en/guides/server-side-rendering/)
- [Adaptador de Vercel para Astro](https://docs.astro.build/en/guides/integrations-guide/vercel/)
- [Documentación de Vercel](https://vercel.com/docs)

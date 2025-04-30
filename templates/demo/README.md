# Astro Shade DX Template - Demo

Plantilla de demostración de Astro con React, TailwindCSS, y una colección de componentes shadcn/ui. Esta versión incluye todos los componentes y características para mostrar las capacidades completas del template.

## Linting y Formato (Opcional)

Esta plantilla demo no incluye un linter por defecto. Para agregar soporte de linting, puedes elegir entre:

### ESLint + Prettier

Para configurar ESLint y Prettier, ejecuta:

```bash
# Instalar dependencias
bun add -d @eslint/js typescript-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks globals prettier prettier-plugin-astro prettier-plugin-tailwindcss

# Copiar archivos de configuración (opcional)
# Puedes descargarlos desde:
# https://github.com/hkxdev/astro-shade-dx-template/tree/main/templates/linters/eslint
```

### Biome

Para configurar Biome, ejecuta:

```bash
# Instalar dependencias
bun add -d @biomejs/biome

# Crear configuración básica (o usar migración automática)
bunx @biomejs/biome init
# Alternativamente, puedes migrar configuraciones existentes
# bunx @biomejs/biome migrate eslint --write
# bunx @biomejs/biome migrate prettier --write
```

Biome ofrece varias ventajas sobre ESLint + Prettier:

- Una única herramienta para formateo y linting
- Significativamente más rápido
- Configuración más sencilla
- Sin conflictos entre herramientas

Los scripts de Biome se añadirán a tu package.json:

```json
{
  "scripts": {
    "format": "biome format --write ./src",
    "lint": "biome lint ./src",
    "check": "biome check ./src"
  }
}
```

## Comenzando

1. Instala las dependencias:

   ```bash
   bun install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   bun dev
   ```

3. Abre [http://localhost:4321](http://localhost:4321) para ver tu aplicación.

## Estructura del Proyecto

```
├── public/         # Archivos estáticos
├── src/
│   ├── components/ # Componentes UI avanzados y ejemplos
│   │   └── ui/     # Componentes base de shadcn/ui
│   ├── hooks/      # Custom hooks de React
│   ├── layouts/    # Layouts de página
│   ├── lib/        # Utilidades y funciones
│   ├── pages/      # Rutas de la aplicación
│   └── styles/     # Estilos globales
├── astro.config.mjs
├── tsconfig.json
└── components.json # Configuración de shadcn/ui
```

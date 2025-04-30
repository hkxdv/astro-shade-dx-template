# Configuración de ESLint y Prettier para Astro

Esta carpeta contiene la configuración optimizada de ESLint y Prettier para proyectos Astro con React y TypeScript.

## Scripts configurados

Los siguientes scripts se añadirán automáticamente a tu `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,astro}\"",
    "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,astro}\"",
    "format:astro": "prettier --write \"src/**/*.astro\"",
    "lint": "eslint --ext .js,.jsx,.ts,.tsx --ignore-pattern \"**/*.astro\" src",
    "lint:fix": "eslint --ext .js,.jsx,.ts,.tsx --ignore-pattern \"**/*.astro\" src --fix",
    "lint:report": "eslint --ext .js,.jsx,.ts,.tsx --ignore-pattern \"**/*.astro\" src --format html --output-file ./eslint-report.html"
  }
}
```

## Uso

```bash
# Formatear todos los archivos
bun format

# Formatear solo archivos Astro
bun format:astro

# Verificar problemas de linting
bun lint

# Corregir automáticamente problemas de linting
bun lint:fix

# Generar un reporte HTML de problemas
bun lint:report
```

## Limitaciones

### Archivos Astro

Actualmente, ESLint 9 tiene problemas de compatibilidad con archivos `.astro` debido a limitaciones con el plugin `eslint-plugin-astro`. Por esta razón:

- Los archivos `.astro` son ignorados por ESLint
- Se utiliza Prettier para formatear archivos `.astro`
- No se realizan comprobaciones de linting en archivos `.astro`

Esta limitación se resolverá cuando `eslint-plugin-astro` se actualice completamente para ser compatible con la configuración plana de ESLint 9.

## Configuración implementada

### ESLint (eslint.config.js)

- **Configuración global**: Ignora archivos innecesarios y establece globals
- **TypeScript**: Reglas optimizadas para TypeScript
- **React**: Configuración específica para componentes React modernos y shadcn/ui
- **Reglas globales**: Manejo mejorado de imports, variables no utilizadas, etc.

### Prettier (.prettierrc)

- Configuración para consistencia en el formateo
- Integración con Tailwind CSS para ordenar clases
- Soporte para archivos Astro

## Diferencias con Biome

A diferencia de Biome, esta configuración:

1. Separa el formateo (Prettier) del linting (ESLint)
2. Tiene reglas más específicas para React y TypeScript
3. Proporciona mejor soporte para componentes shadcn/ui
4. Tiene mejor integración con Tailwind CSS

Sin embargo, Biome ofrece mejor rendimiento y una experiencia más integrada. 
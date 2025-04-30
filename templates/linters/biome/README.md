# Configuración de Biome para Astro

Esta carpeta contiene la configuración optimizada de Biome para proyectos Astro con React y TypeScript. Biome es una herramienta todo-en-uno que reemplaza ESLint y Prettier, ofreciendo formateo, linting y organización de importaciones con mejor rendimiento.

## Scripts configurados

Los siguientes scripts se añadirán automáticamente a tu `package.json`:

```json
{
  "scripts": {
    "format": "biome format --write ./src",
    "lint": "biome lint ./src",
    "check": "biome check ./src"
  }
}
```

## Uso

```bash
# Formatear todos los archivos
bun format

# Verificar problemas de linting
bun lint

# Ejecutar formateo y linting a la vez
bun check

# Aplicar correcciones automáticas
bunx @biomejs/biome check --apply ./src
```

## Compatibilidad con Astro

Biome funciona bien con archivos Astro, pero hay algunas consideraciones:

- Se han configurado reglas específicas para archivos `.astro` en la sección `overrides`
- Se desactivan reglas problemáticas como `useConst` y `useImportType` para archivos Astro
- La integración con VCS (Git) está habilitada para respetar archivos ignorados

## Configuración implementada

### Biome (biome.json)

- **Configuración global**: Ignora archivos innecesarios y establece comportamiento general
- **Formateo**: Espacios para indentación, ancho de línea de 100 caracteres
- **Linting**: Reglas optimizadas para React, TypeScript y accesibilidad
- **JavaScript**: Preferencia por comillas dobles, punto y coma obligatorio
- **Overrides**: Configuraciones específicas para diferentes tipos de archivos

### Reglas destacadas

Biome incluye reglas para:

- **Accesibilidad**: Asegura que tus componentes sean accesibles
- **Rendimiento**: Detecta patrones que pueden causar problemas de rendimiento
- **Correctness**: Previene errores comunes en el código
- **Style**: Mantiene consistencia en el estilo de código

## Diferencias con ESLint + Prettier

Comparado con la configuración de ESLint + Prettier:

1. Biome es **significativamente más rápido** en proyectos grandes
2. Ofrece una **experiencia integrada** sin conflictos entre herramientas
3. Tiene una **configuración más sencilla** con menos dependencias
4. Proporciona **mejor retroalimentación** con mensajes de error más claros

## Limitaciones

- Algunas reglas específicas de ESLint pueden no tener un equivalente exacto en Biome
- El ecosistema de plugins es menor que el de ESLint
- Puede requerir ajustes específicos para proyectos más complejos

## Migración

Si ya tienes configurados ESLint y Prettier, puedes migrar fácilmente a Biome con:

```bash
bunx @biomejs/biome migrate eslint --write
bunx @biomejs/biome migrate prettier --write
```

Esto convertirá automáticamente tus reglas existentes al formato de Biome.

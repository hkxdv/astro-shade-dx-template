# Astro Shade DX Template

> **English** | [Español](#español)

<div align="center">
  <a href="https://www.npmjs.com/package/@hkxdv/astro-shade-dx-template">
    <img src="https://img.shields.io/npm/v/@hkxdv/astro-shade-dx-template.svg?style=flat-square" alt="npm version">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
  &nbsp;&nbsp;&nbsp;
  <div>
    <code style="background: none; color: white; display: block; text-align: center; font-size: 1.1em;">bunx @hkxdv/astro-shade-dx-template</code>
  </div>
</div>

---

<div align="center">
  <a href="https://astro.build/">
    <img src="./svgs/astro_dark.svg" alt="Astro" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://react.dev/">
    <img src="./svgs/react_dark.svg" alt="React" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://tailwindcss.com/">
    <img src="./svgs/tailwindcss.svg" alt="TailwindCSS" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.typescriptlang.org/">
    <img src="./svgs/typescript.svg" alt="TypeScript" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://bun.sh/">
    <img src="./svgs/bun.svg" alt="Bun" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://ui.shadcn.com/">
    <img src="./svgs/shadcn-ui_dark.svg" alt="shadcn/ui" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://biomejs.dev/">
    <img src="./svgs/biomejs.svg" alt="Biome" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://prettier.io/">
    <img src="./svgs/prettier_dark.svg" alt="Prettier" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://eslint.org/">
    <img src="./svgs/eslint.svg" alt="ESLint" width="50" height="50">
  </a>
</div>

---

Astro template with React, shadcn/ui, Bun, Biome & ESLint. Pre-configured TypeScript, Tailwind CSS, dark/light themes, and optimized DX.

## Features

- **Astro**: Modern web framework for static sites and applications
- **shadcn/ui**: Beautiful, accessible components pre-configured
- **TailwindCSS**: Utility-first CSS framework
- **React**: Full support for React components
- **Optional Linting**: Configure ESLint + Prettier or Biome based on your preference
- **Dark/Light Theme**: Fully implemented theme system
- **Interactive CLI**: User-friendly interface to configure your project
- **Modular Code**: Organized and maintainable structure

## Installation

You don't need to install this package permanently. You can use it directly through `bunx`:

```bash
bunx @hkxdv/astro-shade-dx-template my-project
```

## Usage

### Interactive Mode

Simply run the command without additional arguments to start the interactive wizard:

```bash
bunx @hkxdv/astro-shade-dx-template
```

The wizard will guide you through the configuration of your project.

### Command Line Options

```bash
bunx @hkxdv/astro-shade-dx-template <project-name> [options]
```

**Options:**

- `--demo` - Use the complete template with all components (default)
- `--base` - Use the minimal template with just the essentials
- `--eslint` - Configure ESLint + Prettier for linting
- `--biome` - Configure Biome for linting (recommended for performance)
- `--no-color` - Disable colors in the output
- `--help` - Show help

**Examples:**

```bash
# Demo template without linter
bunx @hkxdv/astro-shade-dx-template my-project

# Basic template with Biome
bunx @hkxdv/astro-shade-dx-template my-project --empty --biome

# Complete template with ESLint + Prettier
bunx @hkxdv/astro-shade-dx-template my-blog --demo --eslint
```

## Available Templates

- **demo**: Complete template with all shadcn/ui components, page examples, theme system, and advanced UI features
- **base**: Minimal template with essential dependencies and basic components

### Linter Options

Both templates can be configured with either:

- **Biome**: Single tool for formatting and linting with superior performance
- **ESLint + Prettier**: Traditional setup with extensive rule customization

## Project Structure

The CLI source code is organized as follows:

```
├── src/
│   ├── types/        # TypeScript types and interfaces
│   ├── utils/        # Utilities for colors, file system, etc.
│   ├── cli/          # Terminal commands and UI
│   ├── project/      # Project creation logic
├── templates/        # Project templates
│   ├── base/         # Basic template
│   ├── demo/         # Complete template
│   └── linters/      # Linter configurations
└── index.ts          # Entry point
```

---

<a name="español"></a>

# Astro Shade DX Template

> [English](#astro-shade-dx-template) | **Español**

<div align="center">
  <a href="https://www.npmjs.com/package/@hkxdv/astro-shade-dx-template">
    <img src="https://img.shields.io/npm/v/@hkxdv/astro-shade-dx-template.svg?style=flat-square" alt="npm version">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
  &nbsp;&nbsp;&nbsp;
  <div>
    <code style="background: none; color: white; display: block; text-align: center; font-size: 1.1em;">bunx @hkxdv/astro-shade-dx-template</code>
  </div>
</div>

---

<div align="center">
  <a href="https://astro.build/">
    <img src="./svgs/astro_dark.svg" alt="Astro" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://react.dev/">
    <img src="./svgs/react_dark.svg" alt="React" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://tailwindcss.com/">
    <img src="./svgs/tailwindcss.svg" alt="TailwindCSS" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.typescriptlang.org/">
    <img src="./svgs/typescript.svg" alt="TypeScript" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://bun.sh/">
    <img src="./svgs/bun.svg" alt="Bun" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://ui.shadcn.com/">
    <img src="./svgs/shadcn-ui_dark.svg" alt="shadcn/ui" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://biomejs.dev/">
    <img src="./svgs/biomejs.svg" alt="Biome" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://prettier.io/">
    <img src="./svgs/prettier_dark.svg" alt="Prettier" width="50" height="50">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://eslint.org/">
    <img src="./svgs/eslint.svg" alt="ESLint" width="50" height="50">
  </a>
</div>

---

Plantilla para Astro con shadcn/ui preconfigurado, soporte para React, TailwindCSS y opciones de linting (ESLint + Prettier o Biome). Diseñado para una excelente experiencia de desarrollo (DX).

## Características

- **Astro**: Framework web moderno para sitios estáticos y aplicaciones
- **shadcn/ui**: Componentes hermosos y accesibles preconfigurados
- **TailwindCSS**: Utility-first CSS framework
- **React**: Soporte completo para componentes React
- **Linting opcional**: Configura ESLint + Prettier o Biome según tus preferencias
- **Tema oscuro/claro**: Sistema de temas completamente implementado
- **CLI interactivo**: Interfaz amigable para configurar tu proyecto
- **Código modular**: Estructura organizada y mantenible

## Instalación

No necesitas instalar este paquete permanentemente. Puedes usarlo directamente a través de `bunx`:

```bash
bunx @hkxdv/astro-shade-dx-template mi-proyecto
```

## Uso

### Modo Interactivo

Simplemente ejecuta el comando sin argumentos adicionales para iniciar el asistente interactivo:

```bash
bunx @hkxdv/astro-shade-dx-template
```

El asistente te guiará a través de la configuración de tu proyecto.

### Opciones de Línea de Comandos

```bash
bunx @hkxdv/astro-shade-dx-template <nombre-proyecto> [opciones]
```

**Opciones:**

- `--demo` - Usar plantilla completa con todos los componentes (predeterminado)
- `--empty` - Usar plantilla mínima con solo lo esencial
- `--eslint` - Configurar ESLint + Prettier para linting
- `--biome` - Configurar Biome para linting (recomendado para rendimiento)
- `--no-color` - Desactivar colores en la salida
- `--help` - Mostrar ayuda

**Ejemplos:**

```bash
# Plantilla demo sin linter
bunx @hkxdv/astro-shade-dx-template mi-proyecto

# Plantilla básica con Biome
bunx @hkxdv/astro-shade-dx-template mi-proyecto --empty --biome

# Plantilla completa con ESLint + Prettier
bunx @hkxdv/astro-shade-dx-template mi-blog --demo --eslint
```

## Plantillas disponibles

- **demo**: Plantilla completa con todos los componentes de shadcn/ui, ejemplos de páginas, sistema de temas y características UI avanzadas
- **base**: Plantilla mínima con las dependencias esenciales y componentes básicos

### Opciones de Linter

Ambas plantillas pueden configurarse con:

- **Biome**: Herramienta única para formateo y linting con rendimiento superior
- **ESLint + Prettier**: Configuración tradicional con amplia personalización de reglas

## Estructura del Proyecto

El código fuente del CLI está organizado de la siguiente manera:

```
├── src/
│   ├── types/        # Tipos e interfaces TypeScript
│   ├── utils/        # Utilidades para colores, sistema de archivos, etc.
│   ├── cli/          # Comandos y UI de terminal
│   ├── project/      # Lógica de creación de proyectos
├── templates/        # Plantillas de proyectos
│   ├── base/         # Plantilla básica
│   ├── demo/         # Plantilla completa
│   └── linters/      # Configuraciones de linters
└── index.ts          # Punto de entrada
```

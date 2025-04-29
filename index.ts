#!/usr/bin/env bun

/**
 * AstroShadeDX Template
 * Herramienta CLI para generar proyectos con Astro + shadcn/ui y más.
 *
 * @author hkxdv
 * @license MIT
 * @version 1.0.2
 */

import path from "path";
import { parseArguments } from "./src/cli/args";
import { showBanner } from "./src/cli/banner";
import { showHelp } from "./src/cli/help";
import { runInteractiveMode } from "./src/cli/interactive";
import { createProject } from "./src/project/creator";
import { colors } from "./src/utils/colors";
import { LinterType, TemplateType } from "./src/types";

/**
 * Función principal
 */
async function main(): Promise<void> {
  try {
    // Parsear argumentos
    const { flags, projectName } = parseArguments();

    // Desactivar colores si se especifica
    if (flags.noColor) {
      colors.disable();
    }

    // Mostrar banner
    showBanner();

    // Mostrar ayuda si se solicita
    if (flags.help) {
      showHelp();
      process.exit(0);
    }

    // Validar que se haya proporcionado un nombre de proyecto
    if (!projectName && !flags.interactive) {
      console.error(
        `${colors.red}${colors.bright}❌ Error: Debes proporcionar un nombre para el proyecto${colors.reset}`
      );
      console.log(
        `${colors.cyan}Ejecuta 'bun index.ts --help' para ver las opciones disponibles${colors.reset}`
      );
      process.exit(1);
    }

    let options;

    // Obtener configuración del proyecto (modo interactivo o argumentos)
    if (flags.interactive) {
      options = await runInteractiveMode(projectName);
    } else {
      // Configuración por argumentos
      const templateType: TemplateType = flags.demo ? "demo" : "base";
      const linterType: LinterType = flags.biome
        ? "biome"
        : flags.eslint
        ? "eslint"
        : "ninguno";
      const currentDir = process.cwd();
      const projectDir = path.join(currentDir, projectName);

      options = {
        projectName,
        templateType,
        linterType,
        projectDir,
      };
    }

    // Crear el proyecto
    await createProject(options);
  } catch (error) {
    console.error(
      `${colors.red}${colors.bright}❌ Error inesperado: ${
        error instanceof Error ? error.message : String(error)
      }${colors.reset}`
    );
    process.exit(1);
  }
}

// Ejecutar la función principal
await main();

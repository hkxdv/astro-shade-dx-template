#!/usr/bin/env bun

/**
 * AstroShadeDX Template
 * Herramienta CLI para generar proyectos con Astro + shadcn/ui y más.
 *
 * @author hkxdv
 * @license MIT
 * @version 2.0.0
 */

import path from "path";
import { parseArguments } from "./cli/args";
import { showBanner } from "./cli/banner";
import { showHelp } from "./cli/help";
import { runInteractiveMode } from "./cli/interactive";
import { createProject } from "./project/creator";
import { colors } from "./utils/colors";
import { LinterType, TemplateType } from "./types";

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

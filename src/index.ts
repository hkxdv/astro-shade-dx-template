#!/usr/bin/env bun

/**
 * AstroShadeDX Template
 * Herramienta CLI para generar proyectos con Astro + shadcn/ui y más.
 *
 * @author hkxdv
 * @license MIT
 * @version 2.1.1
 */

// Imports
import chalk from "chalk";
import ora from "ora";
import { showBanner } from "./cli/banner";
import { runInteractiveMode } from "./cli/interactive";
import { createProject } from "./project/creator";
import type { ProjectOptions } from "./types";

/**
 * Función principal
 */
async function main(): Promise<void> {
  try {
    // Mostrar banner
    showBanner();

    // Ejecutar modo interactivo
    const options: ProjectOptions = await runInteractiveMode();

    // Mostrar spinner durante la creación - estilo más sobrio
    const spinner = ora({
      text: chalk.blue.dim("Preparando proyecto..."),
      color: "blue",
    }).start();

    // Crear el proyecto
    await createProject(options);

    // No necesitamos succeed aquí porque createProject ya muestra su propio resumen
    spinner.stop();
  } catch (error) {
    // Manejo de errores con estilo más sobrio
    console.error(chalk.red(`\nError: ${error instanceof Error ? error.message : String(error)}`));

    // Salir si hay error no relacionado con cancelación
    if (!(error instanceof Error && error.message === "Operación cancelada")) {
      process.exit(1);
    }
  }
}

// Ejecutar la función principal
await main();

import * as readline from "readline";
import { colors } from "./colors";

/**
 * Crea una interfaz de readline para la entrada/salida estándar
 * @returns Interfaz de readline
 */
export function createInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Función para preguntar al usuario
 * @param question Pregunta a mostrar
 * @param defaultValue Valor por defecto (opcional)
 * @returns Promesa con la respuesta
 */
export async function promptUser(
  question: string,
  defaultValue: string = ""
): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface();
    const defaultText = defaultValue ? ` (${defaultValue})` : "";
    rl.question(
      `${colors.cyan}${question}${defaultText}${colors.reset}: `,
      (answer) => {
        rl.close();
        resolve(answer.trim() || defaultValue);
      }
    );
  });
}

/**
 * Función para preguntar al usuario (opción múltiple)
 * @param question Pregunta a mostrar
 * @param options Opciones disponibles
 * @returns Promesa con la opción seleccionada
 */
export async function promptSelect(
  question: string,
  options: string[]
): Promise<string> {
  console.log(`${colors.cyan}${question}${colors.reset}`);

  options.forEach((option, index) => {
    console.log(`${colors.cyan}  ${index + 1}.${colors.reset} ${option}`);
  });

  return new Promise((resolve) => {
    const rl = createInterface();
    rl.question(
      `${colors.cyan}Elige una opción (1-${options.length})${colors.reset}: `,
      (answer) => {
        rl.close();
        const selection = parseInt(answer.trim(), 10);

        if (isNaN(selection) || selection < 1 || selection > options.length) {
          console.log(
            `${colors.yellow}Opción inválida. Usando la opción por defecto (1).${colors.reset}`
          );
          resolve(options[0]);
        } else {
          resolve(options[selection - 1]);
        }
      }
    );
  });
}

/**
 * Función para confirmar con el usuario
 * @param question Pregunta a mostrar
 * @param defaultValue Valor por defecto (opcional)
 * @returns Promesa con la respuesta (boolean)
 */
export async function promptConfirm(
  question: string,
  defaultValue: boolean = true
): Promise<boolean> {
  return new Promise((resolve) => {
    const rl = createInterface();
    const defaultText = defaultValue ? " (S/n)" : " (s/N)";
    rl.question(
      `${colors.cyan}${question}${defaultText}${colors.reset}: `,
      (answer) => {
        rl.close();

        if (answer.trim() === "") {
          resolve(defaultValue);
        } else {
          resolve(answer.trim().toLowerCase() === "s");
        }
      }
    );
  });
}

/**
 * Muestra una barra de progreso en la consola
 * @param current Valor actual
 * @param total Valor total
 * @param size Tamaño de la barra
 */
export async function showProgressBar(
  current: number,
  total: number,
  size: number = 20
): Promise<void> {
  const percent = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * size);
  const bar = "█".repeat(filled) + "░".repeat(size - filled);

  process.stdout.write(`\r${colors.cyan}   ${bar} ${percent}% ${colors.reset}`);

  if (current === total) {
    process.stdout.write("\n");
  }
}

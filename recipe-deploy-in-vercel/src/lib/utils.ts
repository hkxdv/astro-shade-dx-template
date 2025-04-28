/**
 * Utilidades generales para la aplicación
 * @module utils
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Función para combinar clases de Tailwind CSS de manera eficiente
 * @param {...ClassValue} inputs - Clases CSS a combinar
 * @returns {string} Clases combinadas y optimizadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

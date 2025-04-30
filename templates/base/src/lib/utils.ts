import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de manera eficiente con clsx y tailwind-merge
 * @param inputs Clases a combinar
 * @returns String de clases combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 
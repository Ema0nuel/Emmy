import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines classnames with clsx and merges tailwind classes
 * Prevents tailwind class conflicts
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

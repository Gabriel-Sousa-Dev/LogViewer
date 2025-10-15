/**
 * Generates a UUID v4 using the native browser/Node API.
 * @returns  {string} A universally unique identifier (UUID).
 */
export function generateUUID() {
    return crypto.randomUUID();
}

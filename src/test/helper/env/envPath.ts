import path from 'path';

/**
 * se devuelve la ruta absoluta al archivo .env según el entorno definido.
 * Si no se define ENV, usa '.env.test' por defecto.
 */
export const getEnvPath = (): string => {
    const envFile = `.env.${process.env.ENV || 'test'}`;
    return path.resolve(process.cwd(), envFile);
};
/**
 * @description: 开发环境
 */
export const devMode = 'development';

/**
 * @description: 生产环境
 */
export const prodMode = 'production';

/**
 * @description:  开发环境
 */
export function isDevMode(): boolean {
    return process.env.NODE_ENV === 'development';
}

/**
 * @description:  生产环境
 */
export function isProdMode(): boolean {
    return process.env.NODE_ENV === 'production';
}

export type NODE_ENV = 'development' | 'test' | 'staging' | 'production';

export const getEnvironment = (): NODE_ENV => (process.env.NODE_ENV || 'development') as NODE_ENV;

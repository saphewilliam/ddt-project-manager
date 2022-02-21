export interface Endpoints {
  self: string;
}

export interface Environment {
  nodeEnv: string;
  env: string;
  endpoints: Endpoints;
}

export const environment: Environment = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.ENVIRONMENT ?? 'no_environment_specified',
  endpoints: {
    self: process.env.API_ROOT_SELF ?? 'http://localhost:5000',
  },
};

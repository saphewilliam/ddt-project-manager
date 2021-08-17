export interface Endpoints {
  self: string;
}

export interface Environment {
  env: string;
  endpoints: Endpoints;
}

export const environment: Environment = {
  env: process.env.ENVIRONMENT ?? 'no_environment_specified',
  endpoints: {
    self: process.env.API_ROOT_SELF ?? 'http://localhost:5000',
  },
};

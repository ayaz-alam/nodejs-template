export default interface IDatabaseConfig {
  mongoUri: string;
  port: number | undefined;
  env: string | undefined;
}
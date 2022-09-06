import * as constants from '../utils/constant';
import IConfig from 'interfaces/IConfig';

let configurations = Object.freeze({
  env: process.env.NODE_ENV,
  apiPrefix: constants.API_PREFIX,
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/node-template',
  corsOrigin: process.env.CORS_ORIGIN || `["http://localhost"]`
}) as IConfig;

export default configurations;
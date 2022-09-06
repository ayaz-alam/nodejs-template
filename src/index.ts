import 'dotenv/config';
import 'module-alias/register';
import config from './config/configuration';
import Server from './Server';

const server = new Server(config);
server.startServer();
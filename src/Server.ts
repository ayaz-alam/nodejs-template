import express from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import methodOverride from 'method-override';
import helmet from 'helmet';
import IRouteEnv from 'interfaces/IRouteEnv';
import errorMiddleware from '@middlewares/errorMiddleware';
import log from './libs/Logger';
import router from './router';
import Database from 'libs/Database';
import IDatabaseConfig from 'interfaces/IDatabaseConfig';

class Server {
  private app: express.Express;
  private logger;
  constructor (private config: any) {
    this.app = express();
    this.config = config;
    this.logger = log;
    this.initMiddlewares();
    this.setUpRoutes();
    // this.initSwagger();
  };

  get application () {
    return this.app;
  };

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   * @memberof Server
   */
  private initMiddlewares (): void {
    /*
     * this allows us to relax the security applied to an API
     * this is done by bypassing the Access-Control-Allow-Origin headers, which specify which origins can access the API
     */
    this.app.use(cors());
    // used to set up/secure various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS) & clickjacking
    this.app.use(helmet());
    // used to log http request and errors
    this.app.use(morgan('dev'));
    // used to compress response bodies for all request
    this.app.use(compression());
    // this lets us use HTTP verbs like PUT and DELETE with clients that don’t support it
    this.app.use(methodOverride());
    // used to parse the incoming requests with JSON payloads
    this.app.use(express.json());
    // usedto recognize the incoming Request Object as strings or arrays
    this.app.use(express.urlencoded({ extended: true }));
    // used to log errors
    this.initErrorHandlers();
  }

  /**
   * This will Setup all the routes in the system
   *
   * @returns -Instance of Current Object
   * @memberof Server
   */
  private setUpRoutes(): void {
    const { apiPrefix }: IRouteEnv = this.config;
    this.app.use(apiPrefix, router);
  }

  /**
   * This will handle error messages from the server
   *
   * @returns -Instance of Current Object
   * @memberof Server
   */
  private initErrorHandlers(): void {
    this.app.use(errorMiddleware);
  }

  /**
   * This will run the server at specified port after opening up of Database
   *
   * @returns -Instance of Current Object
   * @memberof Server
   */
  public startServer(): void {
    const { mongoUri, port, env }: IDatabaseConfig = this.config;
    Database.openConnection({ mongoUri, port, env }).then(() => {
      this.app.listen(port, () => {
        this.logger.info(`--- App is listening on ${port} in ${env} mode ---`);
        this.logger.info('Press CTRL-C to stop');
      });
    })
  }

  /**
   * Close the connected Database
   *
   * @returns Promise
   * @memberof Server
   */
  public closeDatabase() {
    return Database.closeConnection();
  }
}

export default Server;
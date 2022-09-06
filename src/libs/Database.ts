import logger from './Logger';
import mongoose from 'mongoose';
import IDatabaseConfig from 'interfaces/IDatabaseConfig';

class Database {
  public static openConnection({ mongoUri }: IDatabaseConfig) {
    return mongoose.connect(mongoUri)
      .catch((err) => {
        logger.error(`Error connecting to database: ${mongoUri} ${JSON.stringify(err)}`);
        throw new Error(`Error connecting to database: ${mongoUri}`);
      });
  }

  public static closeConnection(): void {
    mongoose.disconnect();
  }
}

export default Database;

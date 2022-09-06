import { Router, Request, Response, NextFunction } from 'express';
import logger from './libs/Logger';
const appInfo = require('../package.json');

const router: Router = Router();
// const logger = new Logger().log;

router.get('/version', (req: Request, res: Response) => {
  const { version, name, description } = appInfo;
  logger.info(`version = ${version}, name = ${name}, description = ${description}`);

  if (!(typeof version && version)) {
    logger.error('An error occurred while trying to get version: Version not defined');
    res.status(400).send(new Error('Version not defined'));
  }

  res.status(200).json({
    description,
    name,
    version,
  });
});

export default router;
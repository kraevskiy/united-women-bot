import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => {
  const node_env = configService.get('NODE_ENV');
  return {
    uri: node_env === 'development' ?getMongoDevString(configService) : getMongoProdString(configService),
  };
};

const getMongoProdString = (configService: ConfigService) =>
  'mongodb+srv://' +
  configService.get('MONGO_INITDB_ROOT_USERNAME') +
  ':' +
  configService.get('MONGO_INITDB_ROOT_PASSWORD') +
  '@telegram.yemwiax.mongodb.net/?retryWrites=true&w=majority&appName=Telegram';

const getMongoDevString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGO_INITDB_ROOT_USERNAME') +
  ':' +
  configService.get('MONGO_INITDB_ROOT_PASSWORD') +
  '@' +
  configService.get('DB_HOST') +
  ':' +
  configService.get('DB_PORT') +
  '/' +
  configService.get('MONGO_DB')+
  '?authSource=admin';

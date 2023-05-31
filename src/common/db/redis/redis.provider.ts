import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';

const clientRedis = async () => {
  const client = await createClient({ url: 'redis://localhost:6379' });
  await client.connect();
  console.log('redis连接');
  return client;
};

export const redisProvider: FactoryProvider = {
  provide: 'REDIS_PROVIDER',
  useFactory: clientRedis,
};

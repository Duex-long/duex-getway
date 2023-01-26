import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';

const clientRedis = async () => {
  console.log('redis连接');
  const client = await createClient({ url: 'redis://localhost:6379' });
  await client.connect();
  return client;
};

export const redisProvider: FactoryProvider = {
  provide: 'REDIS_PROVIDER',
  useFactory: clientRedis,
};

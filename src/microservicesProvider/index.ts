import { FactoryProvider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const testMicoProvider: FactoryProvider[] = [
  {
    provide: 'TEST_PROVIDER',
    useFactory: () => {
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          port: 4100,
        },
      });
    },
  },
];
export { testMicoProvider };

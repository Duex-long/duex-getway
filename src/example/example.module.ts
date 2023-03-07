import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { testMicoProvider } from 'src/microservicesProvider';

@Module({
  controllers: [ExampleController],
  providers: [...testMicoProvider],
})
export class ExampleModule {}

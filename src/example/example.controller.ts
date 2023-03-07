import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('example')
export class ExampleController {
  constructor(@Inject('TEST_PROVIDER') private client: ClientProxy) {}
  @Get('testGet')
  async exampleTest() {
    // return 'example test success';
    const res = await firstValueFrom(this.client.send('example_testget', {}));
    console.log(res);
    return res;
  }
}

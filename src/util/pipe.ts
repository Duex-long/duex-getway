import { HttpException, HttpStatus } from '@nestjs/common';

const transformtoNumber = {
  transform(value) {
    const result = Number(value);
    if (isFinite(result)) {
      return result;
    } else {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
  },
};

export { transformtoNumber };

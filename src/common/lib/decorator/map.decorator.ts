import { applyDecorators } from '@nestjs/common';
import { Expose, Type } from 'class-transformer';

export const Mapped = (...args: Parameters<typeof Type>): PropertyDecorator => {
  const decorators = [Expose()];
  if (args.length) Type(...args);
  return applyDecorators(...decorators);
};

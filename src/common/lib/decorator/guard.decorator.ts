import { applyDecorators, UseGuards } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';

export const UseGuard = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  ...guards: (CanActivate | Function)[]
): MethodDecorator & ClassDecorator => {
  return applyDecorators(UseGuards(...guards));
};

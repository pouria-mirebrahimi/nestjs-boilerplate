import { SetMetadata } from '@nestjs/common';

export const Permission = (Permission: string[]) =>
  SetMetadata('permission', Permission);

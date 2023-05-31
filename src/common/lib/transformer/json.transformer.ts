import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const JsonParse = () => {
  return applyDecorators(
    Transform(({ value }) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }),
  );
};

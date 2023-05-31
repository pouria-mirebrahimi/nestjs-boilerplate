import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const RemoveScriptTags = () => {
  return applyDecorators(
    Transform(({ value }) =>
      value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
    ),
  );
};

export const AddPrefix = (symbol: string) => {
  return applyDecorators(
    Transform(({ value }) => {
      return symbol + value;
    }),
  );
};

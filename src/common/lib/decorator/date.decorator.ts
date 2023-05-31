import { applyDecorators } from '@nestjs/common';
import * as moment from 'moment-timezone';
import {
  IsDateString,
  ValidationOptions,
  buildMessage,
  registerDecorator,
} from 'class-validator';

export const IsDate = () => {
  return applyDecorators(IsDateString());
};

export function MinYears(options: {
  validationOptions?: ValidationOptions;
  response?: string;
  years?: number;
}) {
  return function (object: any, propertyKey: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyKey,
      options: options.validationOptions,
      validator: {
        validate(date: Date) {
          return moment().diff(date, 'years') >= (options?.years || 18);
        },
        defaultMessage: buildMessage(
          () => options?.response || 'The years is less than the valid value.',
          options?.validationOptions,
        ),
      },
    });
  };
}

export function NotExpired(options?: {
  validationOptions?: ValidationOptions;
  response?: string;
}) {
  return function (object: any, propertyKey: string) {
    registerDecorator({
      name: 'NotExpired',
      target: object.constructor,
      propertyName: propertyKey,
      options: options?.validationOptions,
      validator: {
        validate(date: Date) {
          return moment().diff(moment(date)) <= 0;
        },
        defaultMessage: buildMessage(() => options?.response || 'Expired.'),
      },
    });
  };
}

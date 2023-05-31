import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';

type MapReturn<T, V> = V extends Array<any> ? T[] : T;

@Injectable()
export class MapperService {
  public map<T, V>(
    sourceObj: V,
    destinationClass: ClassConstructor<T>,
  ): MapReturn<T, V> {
    return plainToInstance<T, V>(destinationClass, sourceObj, {
      excludeExtraneousValues: true,
      enableImplicitConversion: false,
      exposeUnsetFields: false,
      enableCircularCheck: true,
      strategy: 'exposeAll',
    }) as MapReturn<T, V>;
  }

  public mapAndDeserializeJSON<T, V>(
    sourceObj: any,
    destinationClass: ClassConstructor<T>,
  ): MapReturn<T, V> {
    return this.map(JSON.parse(sourceObj) as V, destinationClass);
  }
}

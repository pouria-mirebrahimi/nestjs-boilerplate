import {
  CallHandler,
  ExecutionContext,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MapperService } from './mapper.service';

export function MapInterceptor(destinationClass: any): Type<NestInterceptor> {
  @Injectable()
  class MapperInterceptor implements NestInterceptor {
    constructor(private readonly mapper: MapperService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(map((sourceObj) => this.mapper.map(sourceObj, destinationClass)));
    }
  }

  return mixin(MapperInterceptor);
}

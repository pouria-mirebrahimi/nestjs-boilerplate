import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Repository, UpdateResult, FindOneOptions } from 'typeorm';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  ObjectID,
} from 'typeorm';

export abstract class AbsRepository<E> extends Repository<E> {
  abstract queryOneById(id: number): Promise<E | undefined>;
  abstract queryOneByOption(option: FindOneOptions<E>): Promise<E | undefined>;
  abstract queryManyByOption(
    option: FindManyOptions<E>,
  ): Promise<E[] | undefined>;
  abstract queryCreate(entityLike: DeepPartial<E>): Promise<E>;
  abstract queryUpdate(
    criteria:
      | string
      | number
      | FindOptionsWhere<E>
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[],
    partialEntity: QueryDeepPartialEntity<E>,
  ): Promise<UpdateResult>;
  abstract queryDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<E>,
  ): void;
}

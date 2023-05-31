import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { DataSource, EntitySchema, ObjectType } from 'typeorm';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { ValidatorConstraintInterface } from 'class-validator';

interface ExistIdValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    (
      | ((validationArguments: ValidationArguments) => FindOptionsWhere<E>)
      | keyof E
    ),
  ];
}

export class EntityIdValidator implements ValidatorConstraintInterface {
  protected constructor(protected readonly dataSource: DataSource) {}

  public async validate<E>(
    id: number,
    args: ExistIdValidationArguments<E>,
  ): Promise<boolean> {
    const [EntityClass] = args.constraints;
    return (
      (await this.dataSource
        .getRepository<E>(EntityClass)
        .countBy({ id } as any)) > 0
    );
  }

  public defaultMessage(args: ValidationArguments): string {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `${entity} with id ${args.value} doesn't exist.`;
  }
}

@ValidatorConstraint({ name: 'IdExists', async: true })
@Injectable()
export class IdExists extends EntityIdValidator {
  constructor(@InjectDataSource() protected readonly dataSource: DataSource) {
    super(dataSource);
  }
}

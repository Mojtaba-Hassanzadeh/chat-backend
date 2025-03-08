import { AggregateRoot } from '@nestjs/cqrs';

export interface ModelEntityFactory<TEntity, TModel extends AggregateRoot> {
  createFromModel(model: TModel): TEntity;
  createFromEntity(entity: TEntity): TModel;
}

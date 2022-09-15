import { ApplicationException } from '@app/app.exception';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<Entity, CreateDto = unknown> {
  constructor(private readonly repository: Repository<Entity>) {}

  getQueryBuilder(alias?: string) {
    return this.repository.createQueryBuilder(alias);
  }

  abstract create(createCategoryDto: CreateDto): Promise<Entity>;

  findAll(
    where: FindOneOptions<Entity>['where'] = {},
    relations: FindOneOptions<Entity>['relations'] = []
  ): Promise<Entity[]> {
    return this.repository.find({
      where,
      relations,
    });
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, updateCategoryDto: QueryDeepPartialEntity<Entity>) {
    const entity = await this.findOne(id);
    if (!entity) {
      throw ApplicationException.objectNotFound('Invalid update id. Entity not found');
    }

    try {
      await this.repository.update(id, updateCategoryDto);
      return this.findOne(id);
    } catch (error) {
      throw ApplicationException.executionException('Unable to update', error);
    }
  }

  async remove(criteria: FindConditions<Entity> | string) {
    return this.repository.delete(criteria);
  }
}

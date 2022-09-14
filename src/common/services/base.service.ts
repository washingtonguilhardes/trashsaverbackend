import { FindConditions, FindOneOptions, Repository } from 'typeorm';

export abstract class BaseService<Entity, CreateDto = unknown, UpdateDto = unknown> {
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

  async update(id: string, updateCategoryDto: UpdateDto) {
    await this.repository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(criteria: FindConditions<Entity> | string) {
    return this.repository.delete(criteria);
  }
}

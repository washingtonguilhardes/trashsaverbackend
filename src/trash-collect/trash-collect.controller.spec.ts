import { Test, TestingModule } from '@nestjs/testing';
import { TrashCollectController } from './trash-collect.controller';
import { TrashCollectService } from './trash-collect.service';

describe('TrashCollectController', () => {
  let controller: TrashCollectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrashCollectController],
      providers: [TrashCollectService],
    }).compile();

    controller = module.get<TrashCollectController>(TrashCollectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

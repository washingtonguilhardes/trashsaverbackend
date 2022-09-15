import { Test, TestingModule } from '@nestjs/testing';
import { TrashShareController } from './trash-share.controller';
import { TrashShareService } from './trash-share.service';

describe('TrashShareController', () => {
  let controller: TrashShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrashShareController],
      providers: [TrashShareService],
    }).compile();

    controller = module.get<TrashShareController>(TrashShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

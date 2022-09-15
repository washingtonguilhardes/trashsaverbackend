import { Test, TestingModule } from '@nestjs/testing';
import { TrashCollectService } from './trash-collect.service';

describe('TrashCollectService', () => {
  let service: TrashCollectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrashCollectService],
    }).compile();

    service = module.get<TrashCollectService>(TrashCollectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

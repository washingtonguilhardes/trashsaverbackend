import { Test, TestingModule } from '@nestjs/testing';
import { TrashShareService } from './trash-share.service';

describe('TrashShareService', () => {
  let service: TrashShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrashShareService],
    }).compile();

    service = module.get<TrashShareService>(TrashShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

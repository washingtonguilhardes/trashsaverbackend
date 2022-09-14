import { Test, TestingModule } from '@nestjs/testing';
import { UserAccessControlService } from './user-access-control.service';

describe('UserAccessControlService', () => {
  let service: UserAccessControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAccessControlService],
    }).compile();

    service = module.get<UserAccessControlService>(UserAccessControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

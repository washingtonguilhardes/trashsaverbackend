import { Test, TestingModule } from '@nestjs/testing';
import { UserAccessControlController } from './user-access-control.controller';
import { UserAccessControlService } from './user-access-control.service';

describe('UserAccessControlController', () => {
  let controller: UserAccessControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAccessControlController],
      providers: [UserAccessControlService],
    }).compile();

    controller = module.get<UserAccessControlController>(UserAccessControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

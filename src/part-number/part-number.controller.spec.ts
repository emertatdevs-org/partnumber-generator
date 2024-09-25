import { Test, TestingModule } from '@nestjs/testing';
import { PartNumberController } from './part-number.controller';

describe('PartNumberController', () => {
  let controller: PartNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartNumberController],
    }).compile();

    controller = module.get<PartNumberController>(PartNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

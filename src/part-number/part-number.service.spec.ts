import { Test, TestingModule } from '@nestjs/testing';
import { PartNumberService } from './part-number.service';

describe('PartNumberService', () => {
  let service: PartNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartNumberService],
    }).compile();

    service = module.get<PartNumberService>(PartNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

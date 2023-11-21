import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrationUnitService } from './concentration-unit.service';

describe('ConcentrationUnitService', () => {
  let service: ConcentrationUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcentrationUnitService],
    }).compile();

    service = module.get<ConcentrationUnitService>(ConcentrationUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConcentrationUnitController } from './concentration-unit.controller';
import { ConcentrationUnitService } from './concentration-unit.service';

describe('ConcentrationUnitController', () => {
  let controller: ConcentrationUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcentrationUnitController],
      providers: [ConcentrationUnitService],
    }).compile();

    controller = module.get<ConcentrationUnitController>(ConcentrationUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DrugstoreController } from './drugstore.controller';
import { DrugstoreService } from './drugstore.service';

describe('DrugstoreController', () => {
  let controller: DrugstoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugstoreController],
      providers: [DrugstoreService],
    }).compile();

    controller = module.get<DrugstoreController>(DrugstoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

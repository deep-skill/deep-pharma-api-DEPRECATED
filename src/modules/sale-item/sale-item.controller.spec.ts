import { Test, TestingModule } from '@nestjs/testing';
import { SaleItemController } from './sale-item.controller';
import { SaleItemService } from './sale-item.service';

describe('SaleItemController', () => {
  let controller: SaleItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleItemController],
      providers: [SaleItemService],
    }).compile();

    controller = module.get<SaleItemController>(SaleItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SupplyInvoiceController } from './supply-invoice.controller';

describe('SupplyInvoiceController', () => {
  let controller: SupplyInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyInvoiceController],
    }).compile();

    controller = module.get<SupplyInvoiceController>(SupplyInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SupplyInvoiceService } from './supply-invoice.service';

describe('SupplyInvoiceService', () => {
  let service: SupplyInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplyInvoiceService],
    }).compile();

    service = module.get<SupplyInvoiceService>(SupplyInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

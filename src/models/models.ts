import { Brand } from '@/modules/brand/entities/brand.entity';
import { ConcentrationUnitController } from '@/modules/concentration-unit/concentration-unit.controller';
import { DrugstoreController } from '@/modules/drugstore/drugstore.controller';
import { InventoryController } from '@/modules/inventory/inventory.controller';
import { ProductTag } from '@/modules/product/entities/product-tag.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { Provider } from '@/modules/provider/entities/provider.entity';
import { SaleItem } from '@/modules/sale-item/entities/sale-item.entity';
import { StockItem } from '@/modules/stock-item/entities/stock-item.entity';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { Venue } from '@/modules/venue/entities/venue.entity';
import { SupplyInvoice } from '@/modules/supply-invoice/entities/supply-invoice.entity';

export const models = [
  ConcentrationUnitController,
  DrugstoreController,
  InventoryController,
  Provider,
  SaleItem,
  StockItem,
  SupplyInvoice,
  Venue,
  Product,
  Brand,
  Tag,
  ProductTag,
];

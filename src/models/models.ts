import { Brand } from './brand.entity';
import { ConcentrationUnit } from './concentration-unit.entity';
import { Drugstore } from './drugstore.entity';
import { Inventory } from './inventory.entity';
import { ProductTag } from './product-tag.entity';
import { Product } from './product.entity';
import { Provider } from './provider.entity';
import { SaleItem } from './sale-item.entity';
import { StockItem } from './stock-item.entity';
import { SupplyInvoice } from './supply-invoice.entity';
import { Tag } from './tag.entity';
import { Venue } from './venue.entity';

export const models = [
  ConcentrationUnit,
  Drugstore,
  Inventory,
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

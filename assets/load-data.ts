import { Brand } from '@/modules/brand/entities/brand.entity';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { ProductTag } from '@/modules/product/entities/product-tag.entity';

const brandBulk = require('./bulks/brand-bulk.json');
const tagBulk = require('./bulks/tag-bulk.json');
const productBulk = require('./bulks/product-bulk.json');

export const seedDatabaseWithMockInformation = async () => {
  try {
    const brands = brandBulk.map((brand) => {
      return {
        name: brand.name,
      };
    });
    await Brand.bulkCreate(brands);
    console.log('Brands bulk created successfully');

    const tags = tagBulk?.map((tag) => {
      return {
        name: tag.name,
        category: tag.category,
      };
    });
    await Tag.bulkCreate(tags);
    console.log('Tags bulk created successfully');

    const productTags = [];
    const products = productBulk?.map((product, index) => {
      product.tagIds.forEach((tagId) => {
        productTags.push({
          products_id: index + 1,
          tags_id: tagId,
        });
      });

      return {
        name: product.name,
        description: product.description,
        prescription_required: product.prescriptionRequired,
        brand_id: product.brandId,
      };
    });
    await Product.bulkCreate(products);
    await ProductTag.bulkCreate(productTags);
    console.log('Products bulk created successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

import { Brand } from '@/modules/brand/entities/brand.entity';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { Product } from '@/modules/product/entities/product.entity';
import { ProductTag } from '@/modules/product/entities/product-tag.entity';

import * as fs from 'fs';

export const seedDatabaseWithMockInformation = async () => {
  const brandsExists = await Brand.findAll();

  if (!brandsExists.length) {
    try {
      const brandBulk = JSON.parse(
        fs.readFileSync('src/assets/bulks/brand-bulk.json', 'utf8'),
      );
      const tagBulk = JSON.parse(
        fs.readFileSync('src/assets/bulks/tag-bulk.json', 'utf8'),
      );
      const productBulk = JSON.parse(
        fs.readFileSync('src/assets/bulks/product-bulk.json', 'utf8'),
      );

      const brands = brandBulk.map((brand: Brand) => {
        return {
          name: brand.name,
        };
      });
      await Brand.bulkCreate(brands);
      console.log('Brands bulk created successfully');

      const tags = tagBulk?.map((tag: Tag) => {
        return {
          name: tag.name,
          category: tag.category,
        };
      });
      await Tag.bulkCreate(tags);
      console.log('Tags bulk created successfully');

      const productTags = [];
      const products = productBulk?.map((product: any, index: number) => {
        product.tagIds.forEach((tagId: number) => {
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
  } else {
    console.log('Data already exists!');
  }
};

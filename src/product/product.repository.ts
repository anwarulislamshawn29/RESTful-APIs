import { NotFoundException } from '@nestjs/common';
import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import {
  EntityRepository,
  getConnection,
  getRepository,
  In,
  Repository,
} from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseCreateProductDto } from './dto/response-create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InventoryStatusEnum } from './enum/inventory-status.enum';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(
    createProductDto: CreateProductDto,
    code: string,
  ): Promise<ResponseCreateProductDto> {
    let product: ResponseCreateProductDto;
    try {
      product = this.create({
        name: createProductDto.name,
        brandName: createProductDto.brandName,
        code,
        inventoryStatus: createProductDto.inventoryStatus,
        price: createProductDto.price,
        createdBy: createProductDto.createdBy,
        updatedBy: createProductDto.createdBy,
      });

      await this.save(product);
    } catch (err) {
      return Promise.reject(err);
    }
    return product;
  }

  async findProductListByIds(productIds: any) {
    try {
      const Ids = productIds.toString().split(',');
      const products = getRepository(Product)
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.inventory', 'inventory')
        .where({
          id: In(Ids),
        });
      products.andWhere('product.inventoryStatus= :value', {
        value: InventoryStatusEnum.AVAILABLE,
      });
      return await products.getMany();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findAProduct(id: string) {
    try {
      const products = getRepository(Product)
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.inventory', 'inventory')
        .where({
          id: id,
        });
      products.andWhere('LOWER(product.inventoryStatus) LiKE :value', {
        value: InventoryStatusEnum.AVAILABLE,
      });
      return await products.getOne();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findProductList(
    listParametersDto: ListParametersDto,
  ): Promise<[Product[], number]> {
    let result: any;
    try {
      const qb = getRepository(Product)
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.inventory', 'inventory')
        .select([
          'product.id',
          'product.name',
          'product.brandName',
          'product.code',
          'product.price',
          'product.updated',
          'product.createdBy',
          'inventory.id',
          'inventory.totalQty',
          'inventory.availableQty',
        ]);
      if (listParametersDto.q) {
        const query = listParametersDto.q.toLowerCase();
        qb.where(
          'LOWER(product.name) LiKE :query OR LOWER(product.brandName) LiKE :query OR LOWER(product.code) LiKE :query',
          {
            query: `%${query}%`,
          },
        );
      }

      if (listParametersDto.offset) {
        qb.offset(listParametersDto.offset);
      }

      if (listParametersDto.limit) {
        qb.limit(listParametersDto.limit);
      }

      if (listParametersDto.sort) {
        let sort = listParametersDto.sort;
        if (sort.match(/\-[a-z]+/)) {
          sort = sort.replace(/\-/, '');
          qb.orderBy(`${sort}`, 'DESC');
        } else {
          qb.orderBy(`${sort}`, 'ASC');
        }
      }

      result = await qb.getManyAndCount();
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    let updatedProduct: Product;
    try {
      const product = await this.findAProduct(id);
      if (!product) {
        throw new NotFoundException(`No product found with productId "${id}"`);
      }
      const { name, brandName, price, inventoryStatus } = updateProductDto;

      updatedProduct = this.create({
        id: product.id,
        name,
        brandName,
        price,
        inventoryStatus,
      });

      await this.save(updatedProduct);
    } catch (err) {
      return Promise.reject(err);
    }
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    let result;
    try {
      result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where('id = :id', { id })
        .execute();
    } catch (err) {
      return Promise.reject(err);
    }
    return result.affected;
  }
}

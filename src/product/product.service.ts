import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import { CodeLengthEnum } from '../shared/enum/code-length.enum';
import { UtilsService } from '../shared/services/utils/utils.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseAProductDto } from './dto/response-a-product.dto';
import { ResponseCreateProductDto } from './dto/response-create-product.dto';
import { ResponseProductsDto } from './dto/response-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private readonly utilsService: UtilsService,
  ) { }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResponseCreateProductDto> {
    const code = this.utilsService.generatCode(
      createProductDto.codePrefix,
      CodeLengthEnum.PRODUCTCODELENGTH,
    );
    const productExists = await this.isProductExists(
      createProductDto.name,
      createProductDto.brandName,
      createProductDto.price,
    );
    if (productExists) {
      throw new ForbiddenException(
        {
          code: 'BAD_REQUEST',
          message: `Product already exist`,
          details: [
            {
              id: productExists.id,
              code: productExists.code,
            },
          ],
          timeStamp: new Date().toISOString(),
        },
        'This operation is not permitted',
      );
    }

    return this.productRepository.createProduct(createProductDto, code);
  }

  async findAProduct(id: string): Promise<ResponseAProductDto> {
    return await this.productRepository.findAProduct(id);
  }

  async isProductExists(
    name: string,
    brandName: string,
    price: number,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        name,
        brandName,
        price,
      },
    });
    return product;
  }

  async findAll(
    listParametersDto: ListParametersDto,
  ): Promise<ResponseProductsDto> {
    const response = await this.productRepository.findProductList(
      listParametersDto,
    );
    const { q, offset, limit, sort } = listParametersDto;
    const productMeta = this.utilsService.getMetaData(
      response[1],
      offset,
      limit,
      q,
      sort,
    );
    return {
      items: response[0],
      metadata: productMeta,
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseAProductDto> {
    const updatedProduct = await this.productRepository.updateProduct(
      id,
      updateProductDto,
    );
    return updatedProduct;
  }

  async remove(id: string) {
    return await this.productRepository.deleteProduct(id);
  }
}

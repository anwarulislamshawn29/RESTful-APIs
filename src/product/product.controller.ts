import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseCreateProductDto } from './dto/response-create-product.dto';
import { ResponseAProductDto } from './dto/response-a-product.dto';
import { ResponseProductsDto } from './dto/response-products.dto';
import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import { CreateInventoryDto } from '../inventory/dto/create-inventory.dto';
import { ResponseCreateInventoryDto } from './dto/response-create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ResponseUpdateInventoryDto } from './dto/response-update-inventory.dto';

@ApiTags('products')
@Controller({ path: 'products', version: '1' })
export class ProductController {
  constructor(private readonly productsService: ProductService) { }
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ description: 'This API performs to create product' })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({
    description: 'Successfully created',
    type: ResponseCreateProductDto,
  })
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ResponseCreateProductDto> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'get the list of all records',
    type: ResponseProductsDto,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query() listParametersDto: ListParametersDto) {
    return this.productsService.findAll(listParametersDto);
  }

  @ApiOkResponse({
    description: 'Success',
    type: ResponseAProductDto,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findAProduct(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    description: 'Success',
    type: UpdateProductDto,
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ResponseAProductDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}

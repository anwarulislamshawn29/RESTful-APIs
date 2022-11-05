import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { ResponseCreateProductDto } from '../product/dto/response-create-product.dto';
import { ResponseCreateInventoryDto } from '../product/dto/response-create-inventory.dto';
import { ResponseUpdateInventoryDto } from '../product/dto/response-update-inventory.dto';

@ApiTags('inventory')
@Controller({ path: 'inventory', version: '1' })
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    description: 'This API performs to create inventory of a product',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({
    description: 'Successfully created',
    type: ResponseCreateProductDto,
  })
  @Post()
  createInventory(
    @Body() createInventoryDto: CreateInventoryDto,
  ): Promise<ResponseCreateInventoryDto> {
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    description: 'Success',
    type: ResponseUpdateInventoryDto,
  })
  @Patch(':id')
  updateInventory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ): Promise<ResponseUpdateInventoryDto> {
    return this.inventoryService.updateInventory(id, updateInventoryDto);
  }
}

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ResponseInvoicesDto } from './dto/response-invoices.dto';
import { CustomerDto } from './dto/customer.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-type.dto';
import { ResponseCreateCustomerDto } from './dto/response-create-customer.dto';
import { ResponseCustomersDto } from './dto/response-customers.dto';
import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import { ResponseACustomerDto } from './dto/response-a-customer.dto';
import { ResponseCreatePurchaseDto } from './dto/response-create-purchase.dto';

@ApiTags('Purchase')
@Controller({ path: 'purchase', version: '1' })
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }
  @ApiOkResponse({
    description: 'Success.',
    type: ResponseCreatePurchaseDto,
  })
  @ApiOperation({
    description:
      'This API performs, to make purchase.',
  })
  @ApiBody({ type: CreatePurchaseDto })
  @Post()
  @HttpCode(HttpStatus.OK)
  purchaes(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Query('customerId', ParseUUIDPipe) customerId: string,
  ): Promise<ResponseCreatePurchaseDto> {
    return this.purchaseService.purchase(customerId, createPurchaseDto);
  }

  @ApiCreatedResponse({
    description: 'Initiate sell for a customer.',
    type: ResponseCreateCustomerDto,
  })
  @ApiOperation({
    description:
      'This API performs to create customer by inserting customer detail.',
  })
  @ApiBody({ type: CustomerDto })
  @Post('/customer')
  @HttpCode(HttpStatus.CREATED)
  createCustomer(
    @Body() customerDto: CustomerDto,
  ): Promise<ResponseCreateCustomerDto> {
    return this.purchaseService.createCustomer(customerDto);
  }

  @ApiOkResponse({
    description: 'Update a customer.',
    type: CustomerDto,
  })
  @ApiOperation({
    description: 'This API performs, to update customer information.',
  })
  @ApiBody({ type: CustomerDto })
  @Patch('/customer/:id')
  @HttpCode(HttpStatus.OK)
  customerStatusUpdate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerTypeDto: UpdateCustomerTypeDto,
  ): Promise<CustomerDto> {
    return this.purchaseService.customerStatusUpdate(id, updateCustomerTypeDto);
  }

  @ApiOkResponse({
    description: 'Get customer list.',
    type: ResponseCustomersDto,
  })
  @ApiOperation({
    description: 'This API performs, to get customer list.',
  })
  @ApiBody({ type: CustomerDto })
  @Get('/customers')
  @HttpCode(HttpStatus.OK)
  findAllCustomers(
    @Query() listParametersDto: ListParametersDto,
  ): Promise<ResponseCustomersDto> {
    return this.purchaseService.findAllCustomers(listParametersDto);
  }

  @ApiOkResponse({
    description: 'Get invoice.',
    type: ResponseInvoicesDto,
  })
  @ApiOperation({ description: 'This API performs, to return invoice.' })
  @ApiBody({ type: CustomerDto })
  @Get('/invoice')
  @HttpCode(HttpStatus.OK)
  findInvoice(
    @Query() listParametersDto: ListParametersDto,
  ): Promise<ResponseInvoicesDto> {
    return this.purchaseService.findInvoice(listParametersDto);
  }

  @ApiOkResponse({
    description: 'Success',
    type: ResponseACustomerDto,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/customers/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.purchaseService.findACustomer(id);
  }
}

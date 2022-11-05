import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PurchaseRepository } from './purchase.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDto } from './dto/customer.dto';
import { ResponseCreateCustomerDto } from './dto/response-create-customer.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-type.dto';
import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import { ResponseCustomersDto } from './dto/response-customers.dto';
import { UtilsService } from '../shared/services/utils/utils.service';
import { ResponseACustomerDto } from './dto/response-a-customer.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ProductRepository } from '../product/product.repository';
import { RequestCreatePurchaseDto } from './dto/request-create-purchase.dto';
import { UpdateInventoryDto } from '../inventory/dto/update-inventory.dto';
import { UpdateProductDto } from '../product/dto/update-product.dto';
import { InventoryStatusEnum } from '../product/enum/inventory-status.enum';
import { CodeLengthEnum } from '../shared/enum/code-length.enum';
import { PrefixProductCode } from '../product/enum/prefix-product-code.enum';
import { Purchase } from './entities/purchase.entity';
import { ResponseInvoicesDto } from './dto/response-invoices.dto';
import { ResponseCreatePurchaseDto } from './dto/response-create-purchase.dto';
import { getConnection } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { SoldProduct } from './entities/soldProduct.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseRepository)
    private purchaseRepository: PurchaseRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private readonly utilsService: UtilsService,
  ) { }

  async purchase(
    customerId: string,
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<ResponseCreatePurchaseDto> {

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let total = 0;
    let soldProduct: SoldProduct;
    let purchase: Purchase;
    let updateProduct: Product;
    let updateInventory: Inventory;
    const soldProductResponse = [];
    const idQtyPrice = [];
    const idList = [];
    try {
      const idAndQtys = createPurchaseDto.productList;
      const customer = await this.purchaseRepository.findACustomer(customerId);
      if (!customer) {
        throw new NotFoundException(`Invalid customerId "${customerId}"`);
      }
      for (const idAndQty of idAndQtys) {
        const product = await this.productRepository.findAProduct(idAndQty.id);

        if (product) {
          idList.push(idAndQty.id);

          idQtyPrice.push({
            id: idAndQty.id,
            qty: idAndQty.qty,
            price: product.price,
          });

          const quantity = idAndQty.qty;
          const price = await this.priceCalculate(product.price, quantity);

          total += price;

          const availableQty = product.inventory.availableQty;

          if (availableQty < idAndQty.qty) {
            throw new ForbiddenException(
              {
                code: 'BAD_REQUEST',
                message: `Insufficient inventory`,
                details: [
                  `${idAndQty.qty} requested item for ${product.name} is not available, available quantity is ${product.inventory.availableQty}`,
                ],
                timeStamp: new Date().toISOString(),
              },
              'This operation is not permitted',
            );
          }

          const newQty = availableQty - Number(idAndQty.qty);

          if (newQty === 0) {
            const updateProductDto = new UpdateProductDto();
            updateProductDto.id = product.id
            updateProductDto.name = product.name
            updateProductDto.brandName = product.brandName
            updateProductDto.price = product.price
            updateProductDto.inventoryStatus = InventoryStatusEnum.OUTOFSTOCK;

            updateProduct = queryRunner.manager.getRepository(Product).create(updateProductDto);
            await queryRunner.manager.save(updateProduct)
          }

          const updateInventoryDto = new UpdateInventoryDto();
          updateInventoryDto.id = product.inventory.id,
            updateInventoryDto.availableQty = newQty;

          updateInventory = queryRunner.manager.getRepository(Inventory).create(updateInventoryDto);
          await queryRunner.manager.save(updateInventory)
        }
      }

      const discountAmount = await this.discountCalculate(
        total,
        createPurchaseDto.discountInPercentage,
      );

      const vatAmount = await this.vatCalculate(
        total,
        createPurchaseDto.vatInPercentage,
      );

      const payable = await this.payableCalculate(
        vatAmount,
        discountAmount,
        total,
      );

      const products = await this.productRepository.findProductListByIds(
        idList,
      );

      if (products.length > 0) {
        const purchaseCode = this.utilsService.generatCode(
          PrefixProductCode.QA,
          CodeLengthEnum.PURCHASECODELENGTH,
        );

        const requestCreatePurchaseDto = new RequestCreatePurchaseDto();
        requestCreatePurchaseDto.createdBy = createPurchaseDto.createdBy;
        requestCreatePurchaseDto.customerId = customer.id;
        requestCreatePurchaseDto.purchaseCode = purchaseCode;
        requestCreatePurchaseDto.status = createPurchaseDto.status;
        requestCreatePurchaseDto.total = total;
        requestCreatePurchaseDto.discount = discountAmount;
        requestCreatePurchaseDto.vat = vatAmount;
        requestCreatePurchaseDto.payable = payable;

        purchase = queryRunner.manager.getRepository(Purchase).create(requestCreatePurchaseDto);
        await queryRunner.manager.save(purchase)

        for (const val of idQtyPrice) {
          const productObj = {
            productId: val.id,
            purchaseId: purchase.id,
            qty: val.qty,
            unitPrice: val.price,
          };
          soldProduct = queryRunner.manager.getRepository(SoldProduct).create(productObj);
          await queryRunner.manager.save(soldProduct)
          soldProductResponse.push(productObj)
        }
      }
      await queryRunner.commitTransaction()
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
    return {
      detail: purchase,
      products: soldProductResponse,
    };
  }

  async findInvoice(
    listParametersDto: ListParametersDto,
  ): Promise<ResponseInvoicesDto> {
    const rawData = await this.purchaseRepository.findInvoice(
      listParametersDto,
    );
    const items = rawData[0];

    const response = items.map((item) => {
      const productDetail = item.soldProducts.map((soldProducts) => {
        return {
          PRODUCT_CODE: soldProducts.product.code,
          NAME: soldProducts.product.name,
          BRAND: soldProducts.product.brandName,
          PRICE: soldProducts.product.price,
          QUANTITY: soldProducts.qty,
        };
      });
      return {
        DATE: item.created,
        INVOICE_ID: item.purchaseCode,
        CUSTOMER_NAME: item.customer.name,
        CUSTOMER_CONTACT: item.customer.contactNumber,
        CUSTOMER_ADDRESS: item.customer.address,
        CUSTOMER_TYPE: item.customer.type,
        PRODUCTS: productDetail,
        TOTAL: Number(item.total).toFixed(2),
        DISCOUNT: Number(item.discount).toFixed(2),
        SUB_TOTAL: Number(item.total - item.discount).toFixed(2),
        VAT: Number(item.vat).toFixed(2),
        PAYABLE: Number(item.payable).toFixed(2),
        STATUS: item.status,
      };
    });
    return response;
  }

  async priceCalculate(unitPrice: number, qty: number) {
    return unitPrice * qty;
  }

  async discountCalculate(discountPercentage: number, price: number) {
    return (price * discountPercentage) / 100;
  }

  async vatCalculate(vatPercentage: number, price: number) {
    return (price * vatPercentage) / 100;
  }

  async payableCalculate(
    vatAmount: number,
    discountAmount: number,
    total: number,
  ) {
    return total + vatAmount - discountAmount;
  }

  async findACustomer(id: string): Promise<ResponseACustomerDto> {
    return await this.purchaseRepository.findACustomer(id);
  }

  async createCustomer(
    customerDto: CustomerDto,
  ): Promise<ResponseCreateCustomerDto> {
    return await this.purchaseRepository.createCustomer(customerDto);
  }

  async customerStatusUpdate(
    id: string,
    updateCustomerTypeDto: UpdateCustomerTypeDto,
  ) {
    return await this.purchaseRepository.customerStatusUpdate(
      id,
      updateCustomerTypeDto,
    );
  }

  async findAllCustomers(
    listParametersDto: ListParametersDto,
  ): Promise<ResponseCustomersDto> {
    const response = await this.purchaseRepository.findAllCustomers(
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
}

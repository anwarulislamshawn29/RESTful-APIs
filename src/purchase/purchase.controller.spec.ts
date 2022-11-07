import { Test, TestingModule } from '@nestjs/testing';
import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { CustomerDto } from './dto/customer.dto';
import { ResponseCreateCustomerDto } from './dto/response-create-customer.dto';
import { ResponseCreatePurchaseDto } from './dto/response-create-purchase.dto';
import { ResponseCustomersDto } from './dto/response-customers.dto';
import { ResponseInvoicesDto } from './dto/response-invoices.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-type.dto';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

const mockPurchaseService = () => ({
  purchase: jest.fn(),
  createCustomer: jest.fn(),
  customerStatusUpdate: jest.fn(),
  findAllCustomers: jest.fn(),
  findInvoice: jest.fn(),
  findACustomer: jest.fn()
})
describe('PurchaseController', () => {
  let purchaseController: PurchaseController;
  let purchaseService: PurchaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseController],
      providers: [{
        provide: PurchaseService,
        useFactory: mockPurchaseService
      }],
    }).compile();

    purchaseController = module.get<PurchaseController>(PurchaseController);
    purchaseService = module.get<PurchaseService>(PurchaseService);
  });

  describe('should be defined', () => {
    it('should be defined the purchaseController', () => {
      expect(purchaseController).toBeDefined();
    });
    it('should be defined the purchaseService', () => {
      expect(purchaseService).toBeDefined();
    });
  })

  describe('should call purchaseController.purchase with purchaseService.purchaes', () => {
    it('should call purchaseController.purchase and purchaseService.purchaes once', async () => {
      jest.spyOn(purchaseService, 'purchase').mockResolvedValue(new ResponseCreatePurchaseDto)
      await purchaseController.purchase(new CreatePurchaseDto, '')
      expect(purchaseService.purchase).toHaveBeenCalledTimes(1);
    });
    it('should call purchaseController.purchase and purchaseService.purchase and return proper result', async () => {
      jest.spyOn(purchaseService, 'purchase').mockResolvedValue(new ResponseCreatePurchaseDto)
      const result = await purchaseController.purchase(new CreatePurchaseDto, '')
      expect(result).toEqual(new ResponseCreatePurchaseDto);
    });
  })

  describe('should call purchaseController.createCustomer with purchaseService.createCustomer', () => {
    it('should call purchaseController.findAll and purchaseService.findAll once', async () => {
      jest.spyOn(purchaseService, 'createCustomer').mockResolvedValue(new ResponseCreateCustomerDto)
      await purchaseController.createCustomer(new CustomerDto)
      expect(purchaseService.createCustomer).toHaveBeenCalledTimes(1);
    });
    it('should call purchaseController.createCustomer and purchaseService.createCustomer and return proper result', async () => {
      jest.spyOn(purchaseService, 'createCustomer').mockResolvedValue(new ResponseCreateCustomerDto)
      const result = await purchaseController.createCustomer(new CustomerDto)
      expect(result).toEqual(new ResponseCreateCustomerDto);
    });
  })

  describe('should call purchaseController.customerStatusUpdate with purchaseService.customerStatusUpdate', () => {
    it('should call purchaseController.customerStatusUpdate and purchaseService.customerStatusUpdate once', async () => {
      jest.spyOn(purchaseService, 'customerStatusUpdate').mockResolvedValue(new CustomerDto)
      await purchaseController.customerStatusUpdate('3fa85f64-5717-4562-b3fc-2c963f66afa6', new UpdateCustomerTypeDto)
      expect(purchaseService.customerStatusUpdate).toHaveBeenCalledTimes(1);
    });
    it('should call purchaseController.customerStatusUpdate and purchaseService.customerStatusUpdate and return proper result', async () => {
      jest.spyOn(purchaseService, 'customerStatusUpdate').mockResolvedValue(new CustomerDto)
      const result = await purchaseController.customerStatusUpdate('3fa85f64-5717-4562-b3fc-2c963f66afa6', new UpdateCustomerTypeDto)
      expect(result).toEqual(new CustomerDto);
    });
  })

  describe('should call purchaseController.findAllCustomers with purchaseService.findAllCustomers', () => {
    it('should call purchaseController.findAllCustomers and purchaseService.findAllCustomers once', async () => {
      jest.spyOn(purchaseService, 'findAllCustomers').mockResolvedValue(new ResponseCustomersDto)
      await purchaseController.findAllCustomers(new ListParametersDto)
      expect(purchaseService.findAllCustomers).toHaveBeenCalledTimes(1);
    });
    it('should call purchaseController.findAllCustomers and purchaseService.findAllCustomers and return proper result', async () => {
      jest.spyOn(purchaseService, 'findAllCustomers').mockResolvedValue(new ResponseCustomersDto)
      const result = await purchaseController.findAllCustomers(new ListParametersDto)
      expect(result).toEqual(new ResponseCustomersDto);
    });
  })

  describe('should call purchaseController.findInvoice with purchaseService.findInvoice', () => {
    it('should call purchaseController.findInvoice and purchaseService.findInvoice once', async () => {
      jest.spyOn(purchaseService, 'findInvoice').mockResolvedValue(new ResponseInvoicesDto)
      await purchaseController.findInvoice(new ListParametersDto)
      expect(purchaseService.findInvoice).toHaveBeenCalledTimes(1);
    });
    it('should call purchaseController.findInvoice and purchaseService.findInvoice and return proper result', async () => {
      jest.spyOn(purchaseService, 'findInvoice').mockResolvedValue(new ResponseInvoicesDto)
      const result = await purchaseController.findInvoice(new ListParametersDto)
      expect(result).toEqual(new ResponseInvoicesDto);
    });
  })

  describe('should call purchaseController.findOne with purchaseService.findOne', () => {
    it('should call purchaseController.findOne and purchaseService.findOne once', async () => {
      jest.spyOn(purchaseService, 'findACustomer').mockResolvedValue(null)
      await purchaseController.findOne('3fa85f64-5717-4562-b3fc-2c963f66afa6')
      expect(purchaseService.findACustomer).toHaveBeenCalledTimes(1);
    });
    it('should call purchaseController.findOne and purchaseService.findOne and return proper result', async () => {
      jest.spyOn(purchaseService, 'findACustomer').mockResolvedValue(null)
      const result = await purchaseController.findOne('3fa85f64-5717-4562-b3fc-2c963f66afa6')
      expect(result).toEqual(null);
    });
  })
});

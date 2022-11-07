import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '../product/product.repository';
import { UtilsService } from '../shared/services/utils/utils.service';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';

const mockPurchaseRepository = () => ({
  findACustomer: jest.fn(),
  findInvoice: jest.fn(),
  createCustomer: jest.fn(),
  customerStatusUpdate: jest.fn()
})
const mockUtilsService = () => ({
  generatCode: jest.fn(),
  getMetaData: jest.fn()
})
const mockProductRepository = () => ({
  findAProduct: jest.fn(),
  findProductListByIds: jest.fn()
})
describe('PurchaseService', () => {
  let purchaseService: PurchaseService;
  let purchaseRepository: PurchaseRepository;
  let productRepository: ProductRepository;
  let utilsService: UtilsService;


  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseService,
        {
          provide: PurchaseRepository,
          useFactory: mockPurchaseRepository

        },
        {
          provide: UtilsService,
          useFactory: mockUtilsService
        },
        {
          provide: ProductRepository,
          useFactory: mockProductRepository
        }],
    }).compile();

    purchaseService = module.get<PurchaseService>(PurchaseService);
    purchaseRepository = module.get<PurchaseRepository>(PurchaseRepository);
    productRepository = module.get<ProductRepository>(ProductRepository);
    utilsService = module.get<UtilsService>(UtilsService);

  });
  describe('Should define the functions in PurchaseService', () => {
    it('should be defined the purchaseService.create', () => {
      expect(purchaseService.purchase).toBeDefined();
    });
    it('should be defined the PurchaseService.findAPurchase', () => {
      expect(purchaseService.findInvoice).toBeDefined();
    });
    it('should be defined the purchaseService.findAll', () => {
      expect(purchaseService.priceCalculate).toBeDefined();
    });
    it('should be defined the purchaseService.update', () => {
      expect(purchaseService.discountCalculate).toBeDefined();
    });
    it('should be defined the purchaseService.remove', () => {
      expect(purchaseService.vatCalculate).toBeDefined();
    });
    it('should be defined the purchaseService.remove', () => {
      expect(purchaseService.payableCalculate).toBeDefined();
    });
    it('should be defined the purchaseService.remove', () => {
      expect(purchaseService.findACustomer).toBeDefined();
    });
    it('should be defined the purchaseService.remove', () => {
      expect(purchaseService.createCustomer).toBeDefined();
    });
    it('should be defined the purchaseService.remove', () => {
      expect(purchaseService.customerStatusUpdate).toBeDefined();
    });
    it('should be defined the purchaseService.remove', () => {
      expect(purchaseService.findAllCustomers).toBeDefined();
    });
    it('should be defined the purchaseService.remove', () => {
      expect(purchaseService.createCustomer).toBeDefined();
    });
  })
})


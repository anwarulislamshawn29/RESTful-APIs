import { CustomerTypeEnum } from "../enum/customer-type.enum"
import { PurchaseEnum } from "../enum/purchase-status.enum";

export interface InvoiceFormat {
  DATE: Date,
  INVOICE_ID: string,
  CUSTOMER_NAME: string,
  CUSTOMER_CONTACT: string,
  CUSTOMER_ADDRESS: string,
  CUSTOMER_TYPE: CustomerTypeEnum,
  PRODUCTS: {},
  TOTAL: string,
  DISCOUNT: string,
  SUB_TOTAL: string,
  VAT: string,
  PAYABLE: string,
  STATUS: PurchaseEnum,
}
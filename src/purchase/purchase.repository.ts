import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { CustomerDto } from './dto/customer.dto';
import { ResponseACustomerDto } from './dto/response-a-customer.dto';
import { ResponseCreateCustomerDto } from './dto/response-create-customer.dto';
import { ResponseCustomersDto } from './dto/response-customers.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-type.dto';
import { Customer } from './entities/customer.entity';
import { Purchase } from './entities/purchase.entity';

@EntityRepository(Purchase)
export class PurchaseRepository extends Repository<Purchase> {
  async createCustomer(
    customerDto: CustomerDto,
  ): Promise<ResponseCreateCustomerDto> {
    const customer = {
      name: customerDto.name,
      address: customerDto.address,
      contactNumber: customerDto.contactNumber,
      type: customerDto.type,
      createdBy: customerDto.createdBy,
    };
    let newCustomer: any;
    try {
      newCustomer = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Customer)
        .values(customer)
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);
    } catch (err) {
      return Promise.reject(err);
    }
    const result = {
      id: newCustomer.id,
      name: newCustomer.name,
      address: newCustomer.address,
      contactNumber: newCustomer.contactNumber,
      type: newCustomer.type,
    };
    return result;
  }

  async findACustomer(id: string): Promise<ResponseACustomerDto> {
    let result: ResponseACustomerDto;
    try {
      const qb = getRepository(Customer)
        .createQueryBuilder('customer')
        .where('customer.id = :id', { id });
      result = await qb.getOne();
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }
  async findInvoice(listParametersDto: ListParametersDto) {
    let result;
    try {
      const qb = getRepository(Purchase)
        .createQueryBuilder('purchase')
        .leftJoinAndSelect('purchase.soldProducts', 'soldProduct')
        .leftJoinAndSelect('soldProduct.product', 'product')
        .leftJoinAndSelect('purchase.customer', 'customer');
      if (listParametersDto.q) {
        const query = listParametersDto.q.toLowerCase();
        qb.where(
          'LOWER(purchase.status) LiKE :query OR LOWER(purchase.purchaseCode) LiKE :query OR LOWER(customer.type) LiKE :query OR LOWER(customer.contactNumber) LiKE :query OR LOWER(product.name) LiKE :query OR LOWER(product.code) LiKE :query',
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

  async findAllCustomers(
    listParametersDto: ListParametersDto,
  ): Promise<ResponseCustomersDto> {
    {
      let result: any;
      try {
        const qb = getRepository(Customer)
          .createQueryBuilder('customer')
          .leftJoinAndSelect('customer.purchases', 'purchase')
          .select([
            'customer.id',
            'customer.name',
            'customer.address',
            'customer.type',
            'customer.contactNumber',
            'customer.created',
            'purchase.id',
          ]);
        if (listParametersDto.q) {
          const query = listParametersDto.q.toLowerCase();
          qb.where(
            'LOWER(customer.name) LiKE :query OR LOWER(customer.type) LiKE :query OR LOWER(customer.contactNumber) LiKE :query',
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
  }
  async customerStatusUpdate(
    id: string,
    updateCustomerTypeDto: UpdateCustomerTypeDto,
  ) {
    try {
      const updatedCustomer = await this.createQueryBuilder()
        .update(Customer)
        .set(updateCustomerTypeDto)
        .where('id = :id', { id: id })
        .returning('*')
        .execute()
        .then((response) => response.raw[0]);
      return updatedCustomer;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

import { EntityRepository, Repository, getConnection, getRepository } from 'typeorm';

import { PaymentHistory } from './entities/paymentHistory.entity';
import { PurchaseDto } from './dto/purchase.dto';
import { User } from './user/entities/user.entity';
import * as moment from 'moment'

@EntityRepository(PaymentHistory)
export class PurchaseRepository extends Repository<PaymentHistory> {

  async getUserIdByUserName(userName: string) {
    const userId = getRepository(User)
      .createQueryBuilder('User')
      .select('User.id', 'userId')
      .where('User.name = :userName', {
        userName: userName
      })
    const result = await userId.getOne();
    return result;
  }
}
import { EntityRepository, Repository } from 'typeorm';

import { PaymentHistory } from './entities/paymentHistory.entity';

@EntityRepository(PaymentHistory)
export class PurchaseRepository extends Repository<PaymentHistory> {

}
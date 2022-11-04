import { Exclude } from 'class-transformer';
import { Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { SoldProduct } from './soldProduct.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  purchaseCode: string;

  @Column()
  customerId: string;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 8,
    default: null,
    nullable: true,
  })
  @Min(0)
  discount: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 8,
    default: null,
    nullable: true,
  })
  @Min(0)
  total: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 8,
    default: null,
    nullable: true,
  })
  @Min(0)
  vat: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 8,
    default: null,
    nullable: true,
  })
  @Min(0)
  payable: number;

  @Column()
  status: string;

  @CreateDateColumn()
  @Exclude()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn({ select: false })
  @Exclude()
  deletedAt?: Date;

  @Column('uuid')
  @Exclude()
  createdBy: string;

  @Column('uuid', { nullable: true })
  updatedBy: string;

  @ManyToOne(() => Customer, (customer) => customer.purchases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => SoldProduct, (soldProduct) => soldProduct.purchase)
  soldProducts: SoldProduct[];

  constructor(partial: Partial<Purchase>) {
    Object.assign(this, partial);
  }
}

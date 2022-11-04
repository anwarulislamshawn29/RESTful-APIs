import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  DATE: string;

  @Column()
  INVOICE_ID: string;

  @Column()
  CUSTOMER_NAME: string;

  @Column()
  CUSTOMER_CONTACT: string;

  @Column()
  CUSTOMER_ADDRESS: string;

  @Column()
  PURCHASE_ID: string;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 8,
    default: null,
    nullable: true,
  })
  TOTAL_PRICE: number;

  @Column()
  STATUS: string;

  @CreateDateColumn()
  @Exclude()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  @Column('uuid')
  @Exclude()
  createdBy: string;

  @Column('uuid', { nullable: true })
  updatedBy: string;
}

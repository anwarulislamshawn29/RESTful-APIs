import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contactNumber: string;

  @Column()
  type: string;

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

  @OneToMany(() => Purchase, (purchase) => purchase.customer)
  purchases: Purchase[];

}

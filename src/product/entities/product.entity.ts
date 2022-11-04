import { Exclude } from 'class-transformer';
import { Inventory } from '../inventory/entities/inventory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SoldProduct } from '../../purchase/entities/soldProduct.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brandName: string;

  @Column()
  code: string;

  @Column()
  inventoryStatus: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  price: number;

  @CreateDateColumn()
  @Exclude()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn({ select: false })
  @Exclude()
  deletedAt?: Date;

  @Column('uuid')
  createdBy: string;

  @Column('uuid', { select: false })
  updatedBy: string;

  @OneToOne(() => Inventory, (inventory) => inventory.product, {
    onDelete: 'CASCADE',
  })
  inventory: Inventory;

  @OneToMany(() => SoldProduct, (soldProduct) => soldProduct.purchase)
  soldProducts: SoldProduct[];

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}

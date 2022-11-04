import { Exclude } from 'class-transformer';
import { Product } from '../../product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity()
export class SoldProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  purchaseId: string;

  @Column()
  qty: number;

  @Column({
    type: 'decimal',
    precision: 16,
    scale: 8,
    default: null,
    nullable: true,
  })
  unitPrice: number;

  @CreateDateColumn()
  @Exclude()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  @ManyToOne(() => Purchase, (purchase) => purchase.soldProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;

  @ManyToOne(() => Product, (product) => product.soldProducts)
  @JoinColumn({ name: 'productId' })
  product: Product;
}

import { Exclude } from 'class-transformer';
import { Product } from '../../product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalQty: number;

  @Column()
  availableQty: number;

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

  @Column('uuid')
  productId: string;

  @OneToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;

  constructor(partial: Partial<Inventory>) {
    Object.assign(this, partial);
  }
}

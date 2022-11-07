import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessRepository } from './access.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccessRepository
    ]),
  ],
})
export class AccessModule { }

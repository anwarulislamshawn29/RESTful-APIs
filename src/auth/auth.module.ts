import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessRepository } from '../access/access.repository';
import { JwtStrategy } from './jwt.strategy';
import * as secret from "./keys/jwt-key.json"

@Module({

  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: secret.key,
      signOptions: {
        expiresIn: secret.expire.duration,
      },
    }),
    TypeOrmModule.forFeature([AccessRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }

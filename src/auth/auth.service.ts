import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AccessRepository } from '../access/access.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../access/interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccessRepository)
    private accessRepository: AccessRepository,
    private jwtService: JwtService,
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.accessRepository.createCredentials(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const credential = await this.accessRepository.findOne({ username });

    if (credential && (await bcrypt.compare(password, credential.password))) {
      const payload: JwtPayload = { username, password };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
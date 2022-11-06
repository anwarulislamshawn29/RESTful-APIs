import {
  EntityRepository,
  Repository,
} from 'typeorm';
import { AuthCredentials } from './entities/auth-credentials.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(AuthCredentials)
export class AccessRepository extends Repository<AuthCredentials> {
  async createCredentials(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const credentials = this.create({ username, password: hashedPassword });

    try {
      await this.save(credentials);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate error handle username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
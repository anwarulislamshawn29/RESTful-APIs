import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class CreateCredentialsDto {

  @ApiProperty({
    type: String,
    example: 'User name',
    description: 'Username for access',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    example: 'Password',
    description: 'Password for access',
  })
  @IsString()
  password: string;
}
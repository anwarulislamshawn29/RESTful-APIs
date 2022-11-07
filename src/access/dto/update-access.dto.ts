import { PartialType } from '@nestjs/swagger';
import { CredentialsDto } from './credentails.dto';

export class UpdateAccessDto extends PartialType(CredentialsDto) { }

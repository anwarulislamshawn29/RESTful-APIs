import { UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { readFileSync } from "fs";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { join } from "path";
import { AccessRepository } from "src/access/access.repository";
import { AuthCredentials } from "src/access/entities/auth-credentials.entity";
import { JwtPayload } from "src/access/interface/jwt-payload.interface";
import * as secret from "./keys/jwt-key.json"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AccessRepository)
    private accessRepository: AccessRepository,
  ) {
    super({
      secretOrKey: secret.key,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }
  async validate(payload: JwtPayload): Promise<AuthCredentials> {
    const { username } = payload
    const creds: AuthCredentials = await this.accessRepository.findOne({ username });
    if (!creds) {
      throw new UnauthorizedException();
    }
    return creds
  }
}

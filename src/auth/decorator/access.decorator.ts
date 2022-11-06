import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthCredentials } from "../../access/entities/auth-credentials.entity";

export const GetCredentials = createParamDecorator((_data, ctx: ExecutionContext): AuthCredentials => {
  const req = ctx.switchToHttp().getRequest();
  return req.authCredentials
});
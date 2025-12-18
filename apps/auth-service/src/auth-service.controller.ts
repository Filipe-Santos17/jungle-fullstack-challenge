import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AllTokensRequest, LoginRequest, RefreshRequest, RegisterRequest } from '@app/packages';

import { AuthServiceService } from './auth-service.service';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) { }

  @MessagePattern("auth_login")
  signIn(@Payload() userLogin: LoginRequest) {
    return this.authServiceService.signInLogin(userLogin);
  }

  @MessagePattern("auth_register")
  register(@Payload() userRegister: RegisterRequest) {
    return this.authServiceService.registerAuth(userRegister);
  }

  @MessagePattern("auth_refresh")
  refreshToken(@Payload() token: RefreshRequest) {
    return this.authServiceService.refreshAuth(token);
  }

  @MessagePattern("auth_logout")
  deleteTokens(@Payload() tokens: AllTokensRequest) {
    return this.authServiceService.deleteAuth(tokens);
  }
}
import { Injectable } from '@nestjs/common';

import { LoginRequest, RegisterRequest } from '@app/packages';

@Injectable()
export class AuthServiceService {
  signInLogin(userLogin: LoginRequest) {
    return 'login';
  }

  registerAuth(userRegister: RegisterRequest) {
    return 'register';
  }

  refreshAuth(){
    return 'refresh'
  }
}

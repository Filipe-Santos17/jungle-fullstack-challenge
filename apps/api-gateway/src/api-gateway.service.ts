import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from "express";

interface iUser {
  user: {
    id: string;
    email: string;
    username: string;
  };
  token: string;
  refreshToken: string;
}

@Injectable()
export class AuthServiceService {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  saveCookiesInRequest({ refreshToken, token, user }: iUser, resp: Response) {
    const jwtExpirationMinutes = +this.configService.getOrThrow('JWT_EXPIRATION_MINUTES')
    const jwtRefreshExpirationDays = +this.configService.getOrThrow('JWT_REFRESH_EXPIRATION_DAYS')

    const limitToken = jwtExpirationMinutes * 60 * 1000
    const limitRefreshToken = jwtRefreshExpirationDays * 60 * 60 * 24 * 1000

    resp.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: limitToken,
    })

    resp.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: limitRefreshToken
    })

    return { user }
  }
}
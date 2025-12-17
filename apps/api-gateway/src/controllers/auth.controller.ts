import { Controller, Post, Body, Req, HttpCode, HttpStatus, Res } from "@nestjs/common"
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import type { Request, Response } from "express";

import { LoginRequest, RegisterRequest, RmqService } from '@app/packages';
import { AuthServiceService } from '../api-gateway.service'

@Controller("/api/auth")
export class AuthController {
    private client: ClientProxy;

    constructor(
        private readonly rmqService: RmqService,
        private readonly authService: AuthServiceService
    ) {
        this.client = this.rmqService.getClientProxy("AUTH")
    }

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() registerUser: RegisterRequest) {
        return await lastValueFrom(
            this.client.send("auth_register", registerUser)
        )
    }

    @Post("login")
    async loginUser(@Body() loginRequest: LoginRequest, @Res({ passthrough: true }) res: Response) {
        const { token, refreshToken, user } = await lastValueFrom(
            this.client.send("auth_login", loginRequest)
        )

        return this.authService.saveCookiesInRequest({ token, refreshToken, user }, res)
    }

    @Post("refresh")
    async refreshTokenUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const token = {
            refresh_token: req.cookies['refresh_token']
        }

        const { access_token } = await lastValueFrom(
            this.client.send("auth_refresh", token)
        )

        return this.authService.sendNewAccessCookie(access_token, res)
    }
}
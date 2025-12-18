import { Controller, Post, Body, Req, HttpCode, HttpStatus, Res } from "@nestjs/common"
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
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

    @ApiOperation({ summary: "Cria um novo usuário" })
    @ApiResponse({ status: 200, description: "Sucesso", type: RegisterRequest })
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() registerUser: RegisterRequest) {
        return await lastValueFrom(
            this.client.send("auth_register", registerUser)
        )
    }

    @ApiOperation({ summary: "Retorna dados do usuário" })
    @ApiResponse({ status: 200, description: "Sucesso", type: LoginRequest })
    @Post("login")
    async loginUser(@Body() loginRequest: LoginRequest, @Res({ passthrough: true }) res: Response) {
        const { token, refreshToken, user } = await lastValueFrom(
            this.client.send("auth_login", loginRequest)
        )

        return this.authService.saveCookiesInRequest({ token, refreshToken, user }, res)
    }

    @ApiOperation({ summary: "Recarrega token de acesso" })
    @ApiResponse({ status: 200, description: "Sucesso" })
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

    @ApiOperation({ summary: "Encerra sessão do usuário" })
    @ApiResponse({ status: 200, description: "Sucesso" })
    @Post("logout")
    async logoutUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const tokens = {
            access_token: req.cookies['access_token'],
            refresh_token: req.cookies['refresh_token']
        }

        await lastValueFrom(
            this.client.send("auth_logout", tokens)
        )

        return this.authService.deleteCookies(res)
    }
}
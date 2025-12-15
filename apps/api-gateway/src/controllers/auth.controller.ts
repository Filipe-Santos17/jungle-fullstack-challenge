import { Controller, Post, Body, Req, UnauthorizedException } from "@nestjs/common"
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import type { Request } from "express";

import { LoginRequest, RegisterRequest, RmqService } from '@app/packages';

@Controller("/api/auth")
export class AuthController {
    private client: ClientProxy;

    constructor(private readonly rmqService: RmqService) {
        this.client = this.rmqService.getClientProxy("AUTH")
    }

    @Post("register")
    async registerUser(@Body() registerUser: RegisterRequest) {
        return await lastValueFrom(
            this.client.send("auth_register", registerUser)
        )
    }

    @Post("login")
    async loginUser(@Body() loginRequest: LoginRequest) {
        return await lastValueFrom(
            this.client.send("auth_login", loginRequest)
        )
    }

    @Post("refresh")
    async refreshTokenUser(@Req() req: Request) {
        const token = {
            refresh_token: req.cookies['refresh_token']
        } 

        return await lastValueFrom(
            this.client.send("auth_refresh", token)
        )
    }
}
import { Controller, Post } from "@nestjs/common"

@Controller("/api/auth")
export class AuthController {
    //constructor(private readonly authService: any){}

    @Post("register")
    async registerUser(){
        return "Hello r"
    }

    @Post("login")
    async loginUser(){
        return "Hello l"
    }

    @Post("refresh")
    async refreshTokenUser(){
        return "Hello t"
    }
}
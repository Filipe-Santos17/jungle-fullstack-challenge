import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";

import { JwtStrategy } from "./jwt.strategys";

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    exports: [JwtStrategy],
    providers: [JwtStrategy]
})
export class StrategyModule { }
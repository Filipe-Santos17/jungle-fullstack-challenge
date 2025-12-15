import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from "@nestjs/config";

import { JwtAuthGuard } from "./jwt-auth.guard";
import { StrategyModule } from '../strategies/strategy.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PassportModule,
        StrategyModule,
        PassportModule,
    ],
    providers: [JwtAuthGuard],
    exports: [JwtAuthGuard]
})
export class GuardModule { }
import { Injectable, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository, DataSource } from 'typeorm';
import bcrypt from "bcrypt"
import { randomUUID } from 'node:crypto';

import { EntityUsers, EntityRefreshToken, LoginRequest, RegisterRequest, RefreshRequest } from '@app/packages';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(EntityUsers)
    private readonly entityUsers: Repository<EntityUsers>,

    @InjectRepository(EntityRefreshToken)
    private readonly entityRefreshToken: Repository<EntityRefreshToken>,

    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async signInLogin(userLogin: LoginRequest) {
    const { email, password } = userLogin

    const user = await this.entityUsers.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Usuário ou email invalidos',
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Usuário ou email invalidos',
      })
    }

    const jwtExpirationMinutes = +this.configService.getOrThrow('JWT_EXPIRATION_MINUTES')
    const jwtRefreshExpirationDays = +this.configService.getOrThrow('JWT_REFRESH_EXPIRATION_DAYS')

    const limitToken = jwtExpirationMinutes * 60
    const limitRefreshToken = jwtRefreshExpirationDays * 60 * 60 * 24

    const expiresAt = new Date(Date.now() + limitRefreshToken * 1000);

    const jti = randomUUID()

    await this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(EntityRefreshToken);

      await repo.delete({ user_id: user.id });

      await repo.insert({
        user_id: user.id,
        jti,
        expires_at: expiresAt,
      });
    });

    const accessPayload = {
      sub: user.id,
      type: 'access',
    };

    const refreshPayload = {
      sub: user.id,
      type: 'refresh',
      jti,
    };

    const token = this.jwtService.sign(accessPayload, { expiresIn: limitToken })
    const refreshToken = this.jwtService.sign(refreshPayload, { expiresIn: limitRefreshToken })

    const clearUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    return {
      user: clearUser,
      token,
      refreshToken
    }
  }

  async registerAuth(userRegister: RegisterRequest) {
    const { email, password, username } = userRegister

    const user = await this.entityUsers.findOne({
      where: {
        email
      }
    })

    if (user) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Usuário com esse email já existe',
      })
    }

    const saltOrRounds = +this.configService.get('SALT_OR_ROUNDS');
    const encryptedPassword = await bcrypt.hash(password, saltOrRounds)

    await this.entityUsers.insert({
      email,
      password: encryptedPassword,
      username
    })

    return {
      message: `Usuário ${username} criado com sucesso`
    }
  }

  async refreshAuth(token: RefreshRequest) {
    try {
      const refresh = token.refresh_token

      if (!refresh) {
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Token invalido',
        })
      }

      const tokenUuidRefresh = this.jwtService.verify(refresh);

      const idUser = tokenUuidRefresh.sub;
      const codeRefresh = tokenUuidRefresh.jti;

      const refreshTokenExists = await this.entityRefreshToken.findOne({
        where: {
          jti: codeRefresh,
          user_id: idUser,
        }
      })

      if (!refreshTokenExists) {
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Token invalido',
        })
      }

      const accessPayload = {
        sub: idUser,
        type: 'access',
      };

      const jwtExpirationMinutes = +this.configService.getOrThrow('JWT_EXPIRATION_MINUTES')
      const limitToken = jwtExpirationMinutes * 60

      const access_token = this.jwtService.sign(accessPayload, { expiresIn: limitToken })

      return { access_token }
    } catch (e) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Token invalido',
      })
    }
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { RpcException } from '@nestjs/microservices';
import { Response } from "express";

interface iErrorException {
    status: number;
    message: string;
}

@Catch(RpcException)
export class RpcToHttpExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const error = exception.getError() as iErrorException;

        const status: number = typeof error === 'object' && error?.status
            ? error.status
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = typeof error === 'object' && error?.message
            ? error.message
            : 'Erro interno';

        response.status(status).json({
            statusCode: status,
            message,
        });
    }
}

import MissingParamError from '../presentation/helpers/missing-param-error';
import ServerError from '../presentation/helpers/server-error';
import UnauthorizedError from '../presentation/helpers/unauthorized-error';

export interface HttpResponseOkInterface {
    statusCode: number;
    body: { accessToken: string };
}

export interface BadRequestInterface {
    statusCode: number;
    body: MissingParamError;
}

export interface ServerErrorInterface {
    statusCode: number;
    body: ServerError;
}

export interface UnauthorizedErrorInterface {
    statusCode: number;
    body: UnauthorizedError;
}

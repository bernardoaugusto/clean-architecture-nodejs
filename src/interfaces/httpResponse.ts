import MissingParamError from '../presentation/helpers/missing-param-error';
import UnauthorizedError from '../presentation/helpers/unauthorized-error';

export interface BadRequestInterface {
    statusCode: number;
    body: MissingParamError;
}

export interface ServerErrorInterface {
    statusCode: number;
    body: 'server error';
}

export interface UnauthorizedErrorInterface {
    statusCode: number;
    body: UnauthorizedError;
}

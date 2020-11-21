import MissingParamError from '../presentation/helpers/missing-param-error';
import UnauthorizedError from '../presentation/helpers/unauthorized-error';

export interface HttpResponseInterface {
    statusCode: number;
    body: string | MissingParamError | UnauthorizedError;
}

export interface HttpResponseOkInterface extends HttpResponseInterface {
    statusCode: number;
    body: string;
}

export interface BadRequestInterface extends HttpResponseInterface {
    statusCode: number;
    body: MissingParamError;
}

export interface ServerErrorInterface {
    statusCode: number;
    body: string;
}

export interface UnauthorizedErrorInterface {
    statusCode: number;
    body: UnauthorizedError;
}

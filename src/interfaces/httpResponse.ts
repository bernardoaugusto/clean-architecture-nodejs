import MissingParamError from '../presentation/helpers/missing-param-error';

export interface BadRequestInterface {
    statusCode: number;
    body: MissingParamError;
}

export interface ServerErrorInterface {
    statusCode: number;
    body: 'server error';
}

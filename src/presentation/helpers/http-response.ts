import {
    BadRequestInterface,
    ServerErrorInterface,
    UnauthorizedErrorInterface,
} from '../../interfaces/httpResponse';
import MissingParamError from './missing-param-error';
import UnauthorizedError from './unauthorized-error';

export default class HttpResponse {
    static badRequest(paramName: string): BadRequestInterface {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName),
        };
    }

    static serverError(): ServerErrorInterface {
        return {
            statusCode: 500,
            body: 'server error',
        };
    }

    static unauthorizedError(): UnauthorizedErrorInterface {
        return {
            statusCode: 401,
            body: new UnauthorizedError(),
        };
    }
}

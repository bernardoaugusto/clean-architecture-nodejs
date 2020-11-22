import {
    BadRequestInterface,
    HttpResponseOkInterface,
    ServerErrorInterface,
    UnauthorizedErrorInterface,
} from '../../interfaces/httpResponse';
import MissingParamError from './missing-param-error';
import ServerError from './server-error';
import UnauthorizedError from './unauthorized-error';

export default class HttpResponse {
    static badRequest(error: Error): BadRequestInterface {
        return {
            statusCode: 400,
            body: error,
        };
    }

    static serverError(): ServerErrorInterface {
        return {
            statusCode: 500,
            body: new ServerError(),
        };
    }

    static unauthorizedError(): UnauthorizedErrorInterface {
        return {
            statusCode: 401,
            body: new UnauthorizedError(),
        };
    }

    static ok(accessToken: string): HttpResponseOkInterface {
        return {
            statusCode: 200,
            body: { accessToken },
        };
    }
}

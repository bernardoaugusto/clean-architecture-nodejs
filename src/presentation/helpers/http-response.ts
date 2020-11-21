import {
    BadRequestInterface,
    ServerErrorInterface,
} from '../../interfaces/httpResponse';
import MissingParamError from './missing-param-error';

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
}

import { HttpRequestInterface } from '../../interfaces/httpRequest';
import MissingParamError from '../helpers/missing-param-error';
import HttpResponse from '../helpers/http-response';

export default class LoginRouter {
    route(
        httpRequest: HttpRequestInterface,
    ): { statusCode: number; body: string | MissingParamError } {
        if (!httpRequest || !httpRequest.body) return HttpResponse.serverError();

        const { email, password } = httpRequest.body;

        if (!email) return HttpResponse.badRequest('email');
        if (!password) return HttpResponse.badRequest('password');

        return { statusCode: 200, body: 'ok' };
    }
}

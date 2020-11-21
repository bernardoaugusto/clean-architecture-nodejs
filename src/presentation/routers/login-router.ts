import { HttpRequestInterface } from '../../interfaces/httpRequest';
import MissingParamError from '../helpers/missing-param-error';
import HttpResponse from '../helpers/http-response';

export default class LoginRouter {
    authUseCase: any;

    constructor(authUseCase: any) {
        this.authUseCase = authUseCase;
    }

    route(
        httpRequest: HttpRequestInterface,
    ): { statusCode: number; body: string | MissingParamError } {
        if (
            !httpRequest ||
            !httpRequest.body ||
            !this.authUseCase ||
            !this.authUseCase.auth
        )
            return HttpResponse.serverError();

        const { email, password } = httpRequest.body;

        if (!email) return HttpResponse.badRequest('email');
        if (!password) return HttpResponse.badRequest('password');

        this.authUseCase.auth(email, password);

        return HttpResponse.unauthorizedError();
    }
}

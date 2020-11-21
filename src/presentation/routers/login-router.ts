import { HttpRequestInterface } from '../../interfaces/httpRequest';
import HttpResponse from '../helpers/http-response';
import {
    BadRequestInterface,
    ServerErrorInterface,
    HttpResponseOkInterface,
    UnauthorizedErrorInterface,
} from '../../interfaces/httpResponse';

export default class LoginRouter {
    authUseCase: any;

    constructor(authUseCase: any) {
        this.authUseCase = authUseCase;
    }

    route(
        httpRequest: HttpRequestInterface,
    ):
        | HttpResponseOkInterface
        | BadRequestInterface
        | ServerErrorInterface
        | UnauthorizedErrorInterface {
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

        const accessToken = this.authUseCase.auth(email, password);

        if (!accessToken) return HttpResponse.unauthorizedError();

        return HttpResponse.ok(accessToken);
    }
}

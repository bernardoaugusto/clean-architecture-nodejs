import { HttpRequestInterface } from '../../interfaces/httpRequest';
import HttpResponse from '../helpers/http-response';
import {
    BadRequestInterface,
    ServerErrorInterface,
    HttpResponseOkInterface,
    UnauthorizedErrorInterface,
} from '../../interfaces/httpResponse';
import MissingParamError from '../helpers/missing-param-error';
import InvalidParamError from '../helpers/invalid-param-error copy';

export default class LoginRouter {
    authUseCase: any;

    emailValidator: any;

    constructor(authUseCase: any, emailValidator: any) {
        this.authUseCase = authUseCase;
        this.emailValidator = emailValidator;
    }

    async route(
        httpRequest: HttpRequestInterface,
    ): Promise<
        | HttpResponseOkInterface
        | BadRequestInterface
        | ServerErrorInterface
        | UnauthorizedErrorInterface
    > {
        try {
            const { email, password } = httpRequest.body;

            if (!email)
                return HttpResponse.badRequest(new MissingParamError('email'));

            if (!this.emailValidator.isValid(email))
                return HttpResponse.badRequest(new InvalidParamError('email'));

            if (!password)
                return HttpResponse.badRequest(new MissingParamError('password'));

            const accessToken = await this.authUseCase.auth(email, password);

            if (!accessToken) return HttpResponse.unauthorizedError();

            return HttpResponse.ok(accessToken);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            return HttpResponse.serverError();
        }
    }
}

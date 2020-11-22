import { HttpRequestInterface } from '../../interfaces/httpRequest';
import HttpResponse from '../helpers/http-response';
import {
    BadRequestInterface,
    ServerErrorInterface,
    HttpResponseOkInterface,
    UnauthorizedErrorInterface,
} from '../../interfaces/httpResponse';
import MissingParamError from '../helpers/missing-param-error';

export default class LoginRouter {
    authUseCase: any;

    constructor(authUseCase: any) {
        this.authUseCase = authUseCase;
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

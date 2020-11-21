import { HttpRequestInterface } from '../../../interfaces/httpRequest';
import { HttpResponseOkInterface } from '../../../interfaces/httpResponse';
import MissingParamError from '../../../presentation/helpers/missing-param-error';
import UnauthorizedError from '../../../presentation/helpers/unauthorized-error';
import LoginRouter from '../../../presentation/routers/login-router';

const makeSut = () => {
    class AuthUseCaseSpy {
        email: string;

        password: string;

        accessToken: string | null;

        auth(email: string, password: string): string | null {
            this.email = email;
            this.password = password;
            return this.accessToken;
        }
    }

    const authUseCaseSpy = new AuthUseCaseSpy();
    authUseCaseSpy.accessToken = 'valid_token';
    const sut = new LoginRouter(authUseCaseSpy);

    return { sut, authUseCaseSpy };
};

describe('Login Router', () => {
    test('Should return 400 if no email is provided', () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                password: 'any_password',
            },
        };

        const httpResponse = sut.route(<any>httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });

    test('Should return 400 if no password is provided', () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
            },
        };

        const httpResponse = sut.route(<any>httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'));
    });

    test('Should return 500 if no httpRequest is provided', () => {
        const { sut } = makeSut();
        const httpResponse = sut.route(<any>undefined);

        expect(httpResponse.statusCode).toBe(500);
    });

    test('Should return 500 if no httpRequest has no body', () => {
        const { sut } = makeSut();
        const httpResponse = sut.route(<any>{});

        expect(httpResponse.statusCode).toBe(500);
    });

    test('Should call AuthUseCase with correct params', () => {
        const { sut, authUseCaseSpy } = makeSut();
        const httpRequest: HttpRequestInterface = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };

        sut.route(httpRequest);

        expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
        expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
    });

    test('Should return 200 when valid credentials are provided', () => {
        const { sut, authUseCaseSpy } = makeSut();

        const httpRequest: HttpRequestInterface = {
            body: {
                email: 'valid_email@mail.com',
                password: 'valid_password',
            },
        };

        const httpResponse = sut.route(httpRequest) as HttpResponseOkInterface;

        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken);
    });

    test('Should return 401 when invalid credentials are provided', () => {
        const { sut, authUseCaseSpy } = makeSut();
        authUseCaseSpy.accessToken = null;

        const httpRequest: HttpRequestInterface = {
            body: {
                email: 'invalid_email@mail.com',
                password: 'invalid_password',
            },
        };

        const httpResponse = sut.route(httpRequest);

        expect(httpResponse.statusCode).toBe(401);
        expect(httpResponse.body).toEqual(new UnauthorizedError());
    });

    test('Should return 500 if no AuthUseCase is provided', () => {
        const sut = new LoginRouter(<any>undefined);
        const httpRequest: HttpRequestInterface = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };

        const httpResponse = sut.route(httpRequest);

        expect(httpResponse.statusCode).toBe(500);
    });

    test('Should return 500 if AuthUseCase has no auth method', () => {
        const sut = new LoginRouter(<any>{});
        const httpRequest: HttpRequestInterface = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };

        const httpResponse = sut.route(httpRequest);

        expect(httpResponse.statusCode).toBe(500);
    });
});

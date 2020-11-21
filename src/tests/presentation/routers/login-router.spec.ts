import { HttpRequestInterface } from '../../../interfaces/httpRequest';
import MissingParamError from '../../../presentation/helpers/missing-param-error';
import LoginRouter from '../../../presentation/routers/login-router';

const makeSut = () => {
    class AuthUseCaseSpy {
        email: string;

        password: string;

        auth(email: string, password: string): void {
            this.email = email;
            this.password = password;
        }
    }

    const authUseCaseSpy = new AuthUseCaseSpy();
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

    test('Should return 401 when invalid credentials are provided', () => {
        const { sut } = makeSut();
        const httpRequest: HttpRequestInterface = {
            body: {
                email: 'invalid_email@mail.com',
                password: 'invalid_password',
            },
        };

        const httpResponse = sut.route(httpRequest);

        expect(httpResponse.statusCode).toBe(401);
    });
});

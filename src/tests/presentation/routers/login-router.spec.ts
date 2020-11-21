import MissingParamError from '../../../presentation/helpers/missing-param-error';
import LoginRouter from '../../../presentation/routers/login-router';

describe('Login Router', () => {
    test('Should return 400 if no email is provided', () => {
        const sut = new LoginRouter();
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
        const sut = new LoginRouter();
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
        const sut = new LoginRouter();
        const httpResponse = sut.route(<any>undefined);

        expect(httpResponse.statusCode).toBe(500);
    });

    test('Should return 500 if no httpRequest has no body', () => {
        const sut = new LoginRouter();
        const httpResponse = sut.route(<any>{});

        expect(httpResponse.statusCode).toBe(500);
    });
});

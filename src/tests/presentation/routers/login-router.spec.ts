/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
class LoginRouter {
    route(httpRequest: {
        body: { email: string; password: string };
    }): { statusCode: number; body: string | MissingParamError } {
        if (!httpRequest || !httpRequest.body) return HttpResponse.serverError();

        const { email, password } = httpRequest.body;

        if (!email) return HttpResponse.badRequest('email');
        if (!password) return HttpResponse.badRequest('password');

        return { statusCode: 200, body: 'ok' };
    }
}

class HttpResponse {
    static badRequest(paramName: string) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName),
        };
    }

    static serverError() {
        return {
            statusCode: 500,
            body: 'server error',
        };
    }
}

class MissingParamError extends Error {
    constructor(paramName: string) {
        super(`Missing param: ${paramName}`);
        this.name = 'MissingParamError';
    }
}

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

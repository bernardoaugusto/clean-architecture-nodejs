/* eslint-disable class-methods-use-this */
class LoginRouter {
    route(httpRequest: {
        body: { email: string; password: string };
    }): { statusCode: number } {
        const { email, password } = httpRequest.body;

        if (!email || !password) {
            return { statusCode: 400 };
        }

        return { statusCode: 200 };
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

        expect(httpResponse!.statusCode).toBe(400);
    });

    test('Should return 400 if no password is provided', () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
            },
        };

        const httpResponse = sut.route(<any>httpRequest);

        expect(httpResponse!.statusCode).toBe(400);
    });
});

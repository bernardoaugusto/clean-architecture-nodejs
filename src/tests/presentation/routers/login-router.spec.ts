/* eslint-disable class-methods-use-this */
class LoginRouter {
    route(httpRequest: {
        body: { email: string; password: string };
    }): { statusCode: number } | undefined {
        if (!httpRequest.body.email) {
            return { statusCode: 400 };
        }
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
});

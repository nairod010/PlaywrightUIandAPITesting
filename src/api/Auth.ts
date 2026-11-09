import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { User } from "../data/testData";

export class Auth {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async login(user: User): Promise<APIResponse> {
        return this.request.post('/auth/login', {data:user})
    }

    async getCurrentUser(acceessToken: string): Promise<APIResponse> {
        return this.request.get('/auth/me', {
            headers: {Authorization: `Bearer ${acceessToken}`}
        })
    }


}
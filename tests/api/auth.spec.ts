import type { APIResponse } from "@playwright/test";
import {test, expect} from '../../src/fixtures'
import { Auth } from "../../src/api/Auth";
import  {type LoginResponseBody ,type AuthUser, apiTestUser} from "../../src/data/testData";
import { decodeJwt, JWT_FORMAT } from "../../src/utils/jwt";
import { authUserSchema } from "../../src/data/schemas";
import { logData } from "../../src/utils/log";

test('Autentificarea prin API si validarea utilizatorului', async ({auth}) => {
    let accessToken = ''
    let loginBody: LoginResponseBody
    let loginResponse: APIResponse
    let authMeResponse: APIResponse
    let user: AuthUser

    await test.step('1. Autentifica utilizatorul printr-o cerere POST catre /auth/login', async () => {
        loginResponse = await auth.login(apiTestUser)
        expect(loginResponse.status()).toBe(200);
        loginBody = await loginResponse.json()
    })

    await test.step('2. Extrage tokenul JWT din campul acceessToken al raspunsului', async () => {
        accessToken = loginBody.accessToken
        expect(accessToken).toMatch(JWT_FORMAT)
    })

    await test.step('3. Trimite o cerere GET catre /auth/me folosind tokenul extras', async () => {
        authMeResponse = await auth.getCurrentUser(accessToken)
        expect(authMeResponse.status()).toBe(200)
        user = await authMeResponse.json()
    })

    await test.step('4. Verifica faptul ca valoarea campului username din raspuns este cel cu care ai facut autentificarea', async () => {
        expect(user.username).toBe(apiTestUser.username)
    })

    await test.step('5. Aserturi suplimentarea pentru validare', async () => {
        expect(loginResponse.headers()['content-type']).toContain('application/json')
        expect(authMeResponse.headers()['content-type']).toContain('application/json')
        expect(loginBody.refreshToken).toMatch(JWT_FORMAT)
        expect(user).toMatchObject(authUserSchema)
    })

    await test.step('6. Decode si Logare pentru JWT', async () => {
        await logData('JWT acceessToken', accessToken)
        const {header, payload} = decodeJwt(accessToken)

        await logData('JWT header', header)
        await logData('JWT paayload', payload)

        expect(header).toMatchObject({alg: 'HS256', typ: 'JWT'})
        expect(payload).toMatchObject({id: loginBody.id, username: apiTestUser.username})
        expect(Number(payload.exp) * 1000).toBeGreaterThan(Date.now())
    })
})
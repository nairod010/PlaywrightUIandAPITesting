import {test, expect} from '../../src/fixtures';
import {type ProductInfo, testCustomer} from '../../src/data/testData';

test('Sortarea produselor dupa pret' , async ({loginPage, inventoryPage}) => {

    await test.step('1. Autentificarea utilizatorului', async () => {
		await loginPage.goto();
		const credentials = await loginPage.getCredentials();
		await loginPage.login(credentials);
		await inventoryPage.expectLoaded();
	});


})
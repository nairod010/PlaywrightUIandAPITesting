import {test, expect} from '../../src/fixtures';
import {SortOptions} from '../../src/data/testData';
import { logData } from '../../src/utils/log';

test('Sortarea produselor dupa pret', async ({loginPage, inventoryPage}) => {
	let initialPrices: number[] = [];

	await test.step('1. Autentificarea utilizatorului', async () => {
		await loginPage.goto();
		const credentials = await loginPage.getCredentials();
		await loginPage.login(credentials);
		await inventoryPage.expectLoaded();
		initialPrices = await inventoryPage.getAllPrices();
	});

	await test.step('2. Sorteaza produsele in ordine crescatoare dupa pret si verifica daca afisarea este corecta', async () => {
		await inventoryPage.sortBy(SortOptions.priceAsc);

		const prices = await inventoryPage.getAllPrices();
		await logData('Preturi initiale',initialPrices);
		await logData('Preturile curente', prices);
		await logData('Preturi initiale sortate crescator', initialPrices.sort((a, b) => a - b));
		expect(prices).toEqual(initialPrices.toSorted((a, b) => a - b));
	});

	await test.step('3. Sorteaza produsele in ordine descrescatoare dupa pret si verifica daca afisarea este corecta', async () => {
		await inventoryPage.sortBy(SortOptions.priceDesc);

		const prices = await inventoryPage.getAllPrices();
		await logData('Preturi curente',prices);
		await logData('Preturi initiale sortate descrescator',initialPrices.sort((a, b) => b - a));
		expect(prices).toEqual(initialPrices.toSorted((a, b) => b - a));
	});
});

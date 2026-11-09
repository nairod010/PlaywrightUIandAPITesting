import {test} from '../../src/fixtures';

test('Verificarea textului realizate din selectii', async ({selectPage}) => {
    await test.step('Accesarea pagini', async () => {
		await selectPage.goto();
    })

	await test.step('Selectarea valorilor pentru realizarea textului', async () => {
		await selectPage.selectLanguage('JavaScript');
		await selectPage.selectCity('New York');
		await selectPage.selectVersion('Release 3.0 Beta');
		await selectPage.selectColors(['Purple']);
		await selectPage.selectFruits(['Date']);
	});

	await test.step('Se verifica textul', async () => {
		await selectPage.expectStatus(
			'selectLanguage: JavaScript | selectCity: New York | selectProduct: Release 3.0 Beta | selectColors: Purple | selectFruits: Date',
		);
	});
});

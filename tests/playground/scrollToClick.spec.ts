import {test} from '../../src/fixtures';

test('Apasarea tuturor butoanelor dupa derulare', async ({scrollToClickPage}) => {
    await test.step('Accesarea Pagini', async () => {
		await scrollToClickPage.goto();
    })

	await test.step('1. Deruleaza pagina, dupa caz, si apasa toate cele patru butoane disponibile.', async () => {
		await scrollToClickPage.clickAllButtons();
	});

	await test.step('2. Verifica mesajul final', async () => {
		await scrollToClickPage.expectAllButtonsClicked('All buttons clicked!');
	});
});

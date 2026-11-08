import {test, expect} from '../../src/fixtures';
import {type ProductInfo, testCustomer} from '../../src/data/testData';

test('Plasare comanda cu cele mai scumpe 3 produse', async ({loginPage, inventoryPage, cartPage, checkoutPage}) => {
	let allProducts: ProductInfo[] = [];
	let mostExpensive: ProductInfo[] = [];

	await test.step('1. Autentificarea utilizatorului', async () => {
		await loginPage.goto();
		const credentials = await loginPage.getCredentials();
		await loginPage.login(credentials);
		await inventoryPage.expectLoaded();
	});

	await test.step('2. Extragere din interfata a tuturor produselor disponibile(nume si pret)', async () => {
		allProducts = await inventoryPage.getAllProducts();
		expect(allProducts.length).toBeGreaterThan(0);
		console.table(allProducts);
	});

	await test.step('3. Identificarea celor mai scumpe trei produse', async () => {
		mostExpensive = inventoryPage.getMostExpensive(allProducts, 3);
		expect(mostExpensive).toHaveLength(3);
		console.table(mostExpensive);
	});

    await test.step('4. Adauga produsele identificate in cos.', async () => {
        for(const product of mostExpensive) {
            await inventoryPage.addProductToCart(product.name)
        }
        await inventoryPage.header.expectCartCount(3);
    })

    await test.step('5. Verifica existenta acestora in cos si corectitudinea preturilor afisate.', async () => {
        await inventoryPage.header.openCart()
        await cartPage.expectLoaded()

        const cartItems = await cartPage.getCartItems(mostExpensive.length)
        console.table(cartItems)
        expect(cartItems).toEqual(mostExpensive)
    })

    await test.step('6. Continua catre pagina de checkout si valideaza subtotalul (Item total), calculat pe baza preturilor extrase anterior.', async () => {
        await cartPage.checkout()
        await checkoutPage.fillInformation(testCustomer)

        let expectedTotal = 0
        for (const product of mostExpensive) {
            expectedTotal += product.price;
        }

        expect(await checkoutPage.getItemTotal()).toBe(expectedTotal);
    })

    await test.step('7. Plaseaza comanda si verifica afisarea mesajului de succes: Thank you for your order!.', async () => {
        await checkoutPage.finishOrder()
        await checkoutPage.expectOrderCompleted()
    })

    await test.step('8. Apasa butonul Back Home pentru a reveni in pagina de inventar.', async () => {
        await checkoutPage.backHomeButton.click();
        await inventoryPage.expectLoaded();
        await inventoryPage.header.expectCartCount(0)
    })
});

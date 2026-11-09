import {test} from '../../src/fixtures'


test('Interactiunea cu butonele din frame-uri', async ({framePage}) => {
    test.step('Accesarea pagini', async () => {
        await framePage.goto()
    })

    for (const {name, frame} of framePage.getFrames()) {
        await test.step(`1. Acceseaza frame-ul ${name}`, async () => {
            for (const button of framePage.getButtons(frame)) {
                await test.step(`Se apasa buttonul ${button.label} si se verifica textul afisat in frame`, async () => {
                    await framePage.clickAndExpectResult(frame, button)
                })
            }
        })
    }
})
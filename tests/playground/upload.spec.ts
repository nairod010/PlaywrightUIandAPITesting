import path from 'path';
import {test} from '../../src/fixtures';
import {uploadFiles} from '../../src/data/testData';

const uploadFolder = path.resolve(__dirname, '../../src/data/upload');

test('Incarcarea fisierelor', async ({uploadPage}) => {
    await test.step('Accesarea pagini', async () => {
		await uploadPage.goto();
    })

	await test.step('1. Incarca doua fisiere.', async () => {
		await uploadPage.browseFiles([path.join(uploadFolder, uploadFiles.browse)]);
		await uploadPage.expectFilesUploaded([uploadFiles.browse], '1 file(s) selected');

		await uploadPage.dragAndDropFiles([path.join(uploadFolder, uploadFiles.dragAndDrop)]);
	});

	await test.step('2. Verifica mesajul: 2 files selected', async () => {
		await uploadPage.expectFilesUploaded(
			[uploadFiles.browse, uploadFiles.dragAndDrop],
			'2 file(s) selected',
		);
	});
});

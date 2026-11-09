import {test} from "@playwright/test"

export async function logData(name: string, data: unknown) {
	const isText = typeof data === 'string';
	await test.info().attach(name, {
		body: isText ? data : JSON.stringify(data, null, 2),
		contentType: isText ? 'text/plain' : 'application/json',
	});

	if (isText) {
		console.log(`${name}: ${data}`);
	} else {
		console.log(`${name}:`);
		console.table(data);
	}
}

export function annotate(type: string, description: string) {
	test.info().annotations.push({type, description});
}
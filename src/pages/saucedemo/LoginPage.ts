import type {Page, Locator} from '@playwright/test';
import type {User} from '../../data/testData';

export class LoginPage {
	readonly page: Page;
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;
	readonly credentialsPanel: Locator;
	readonly passwordPanel: Locator;

	constructor(page: Page) {
		this.page = page;
		this.usernameInput = page.getByTestId('username');
		this.passwordInput = page.getByTestId('password');
		this.loginButton = page.getByTestId('login-button');
		this.credentialsPanel = page.getByTestId('login-credentials');
		this.passwordPanel = page.getByTestId('login-password');
	}

	async goto() {
		await this.page.goto('/');
	}

	async login(user: User) {
		await this.usernameInput.fill(user.username);
		await this.passwordInput.fill(user.password);
		await this.loginButton.click();
	}

	private async firstValue(panel: Locator): Promise<string> {
		const heading = (await panel.locator('h4').innerText()).trim();
		const lines = (await panel.innerText()).split('\n');
		for (const line of lines) {
			const text = line.trim();
			if (text !== '' && text !== heading) {
				return text;
			}
		}
		throw new Error('No value found in the credentials panels.');
	}

	async getCredentials(): Promise<User> {
		return {
			username: await this.firstValue(this.credentialsPanel),
			password: await this.firstValue(this.passwordPanel),
		};
	}
}

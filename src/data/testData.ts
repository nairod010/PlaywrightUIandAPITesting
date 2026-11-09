export type User = {username: string; password: string};
export type ProductInfo = {name: string; price: number};
export type Customer = {
	firstName: string;
	lastName: string;
	postalCode: string;
};

export type LoginResponseBody = {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	accessToken: string;
	refreshToken: string;
};

export type Address = {
	address: string;
	city: string;
	state: string;
	stateCode: string;
	postalCode: string;
	coordinates: {lat: number; lng: number};
	country: string;
};

export type AuthUser = {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: string;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: string;
	height: number;
	weight: number;
	eyeColor: string;
	hair: {color: string; type: string};
	ip: string;
	address: Address;
	macAddress: string;
	university: string;
	bank: {
		cardExpire: string;
		cardNumber: string;
		cardType: string;
		currency: string;
		iban: string;
	};
	company: {department: string; name: string; title: string; address: Address};
	ein: string;
	ssn: string;
	userAgent: string;
	crypto: {coin: string; wallet: string; network: string};
	role: string;
};

export type SortOption = {label: string; display: string};

export const SortOptions = {
	priceAsc: {label: 'lohi', display: 'Price (low to high)'},
	priceDesc: {label: 'hilo', display: 'Price (high to low)'},
} as const satisfies Record<string, SortOption>;

export const testCustomer: Customer = {
	firstName: 'Dorian',
	lastName: 'Blegu',
	postalCode: '000000',
};

export const uploadFiles = {
	browse: 'file_1.txt',
	dragAndDrop: 'file_2.txt',
};

export const apiTestUser: User = {
	username: 'emilys',
	password: 'emilyspass'
}

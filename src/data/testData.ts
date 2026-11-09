export type User = {username: string; password: string};
export type ProductInfo = {name: string; price: number};
export type Customer = {
	firstName: string;
	lastName: string;
	postalCode: string;
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

export const uploadFiles= {
    browse: 'file_1.txt', 
    dragAndDrop: 'file_2.txt'
}
export type User = {username: string; password: string};
export type ProductInfo = {name: string; price: number};
export type Customer = {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export const testCustomer: Customer = {
    firstName: "Dorian",
    lastName: "Blegu",
    postalCode: "000000"
}
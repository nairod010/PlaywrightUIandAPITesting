import {expect } from "@playwright/test"

const anyString = expect.any(String);
const anyNumber = expect.any(Number);

const addressSchema = {
	address: anyString,
	city: anyString,
	state: anyString,
	stateCode: expect.stringMatching(/^[A-Z]{2}$/),
	postalCode: expect.stringMatching(/^\d{5}$/),
	coordinates: {lat: anyNumber, lng: anyNumber},
	country: anyString,
};

export const authUserSchema = {
	id: anyNumber,
	firstName: anyString,
	lastName: anyString,
	maidenName: anyString,
	age: anyNumber,
	gender: expect.stringMatching(/^(male|female)$/),
	email: expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
	phone: expect.stringMatching(/^\+\d{1,3} \d{3}-\d{3}-\d{4}$/),
	username: anyString,
	password: anyString,
	birthDate: expect.stringMatching(/^\d{4}-\d{1,2}-\d{1,2}$/),
	image: expect.stringMatching(/^https:\/\/dummyjson\.com\/icon\/\w+\/128$/),
	bloodGroup: expect.stringMatching(/^(A|B|AB|O)[+-]$/),
	height: anyNumber,
	weight: anyNumber,
	eyeColor: anyString,
	hair: {color: anyString, type: anyString},
	ip: expect.stringMatching(/^(\d{1,3}\.){3}\d{1,3}$/),
	address: addressSchema,
	macAddress: expect.stringMatching(/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/i),
	university: anyString,
	bank: {
		cardExpire: expect.stringMatching(/^(0[1-9]|1[0-2])\/\d{2}$/),
		cardNumber: expect.stringMatching(/^\d{12,19}$/),
		cardType: anyString,
		currency: expect.stringMatching(/^[A-Z]{3}$/),
		iban: expect.stringMatching(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/),
	},
	company: {department: anyString, name: anyString, title: anyString, address: addressSchema},
	ein: expect.stringMatching(/^[\d-]+$/),
	ssn: expect.stringMatching(/^[\d-]+$/),
	userAgent: expect.stringContaining('Mozilla/5.0'),
	crypto: {
		coin: anyString,
		wallet: expect.stringMatching(/^0x[0-9a-f]{40}$/i),
		network: anyString,
	},
	role: expect.stringMatching(/^(admin|moderator|user)$/),
};
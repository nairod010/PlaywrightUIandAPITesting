export function castPriceToNumber(text: string): number {
	return Number(text.replace(/[^0-9.]/g, ''));
}

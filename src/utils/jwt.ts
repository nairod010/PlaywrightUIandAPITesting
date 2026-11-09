export type DecodedJwt = {
	header: Record<string, unknown>;
	payload: Record<string, unknown>;
	signature: string;
};

export const JWT_FORMAT = /^[\w-]+\.[\w-]+\.[\w-]+$/;

function decodeSegment(segment: string): Record<string, unknown> {
	return JSON.parse(Buffer.from(segment, 'base64url').toString('utf8'));
}

export function decodeJwt(token: string): DecodedJwt {
	const [header, payload, signature] = token.split('.');
	if (header === undefined || payload === undefined || signature === undefined) {
		throw new Error('JWT invalid lispeste unul sau mai multe puncte');
	}
	return {header: decodeSegment(header), payload: decodeSegment(payload), signature};
}

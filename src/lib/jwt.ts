import { jwtVerify, SignJWT } from "jose";

const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
const refreshSecret = new TextEncoder().encode(
	process.env.REFRESH_TOKEN_SECRET,
);

export async function signAccessToken(userId: number, sessionId: number) {
	return await new SignJWT({
		sub: userId.toString(),
		sid: sessionId,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("15m")
		.sign(accessSecret);
}
export async function signRefreshToken(userId: number) {
	return await new SignJWT({
		sub: userId.toString(),
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("30d")
		.sign(refreshSecret);
}

export async function verifyAccessToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, accessSecret);
		return payload;
	} catch {
		return null;
	}
}

export async function verifyRefreshToken(token: string) {
	const { payload } = await jwtVerify(token, refreshSecret);
	return payload;
}

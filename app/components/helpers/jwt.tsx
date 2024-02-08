import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}
const DefaultSignOption: SignOption = {
  expiresIn: "1h",
};
const secret = process.env.SECRET as string;

export const getDataFromToken = ({ token }: { token: string }) => {
  try {
    const decodedToken: any = jwt.verify(token, secret);
    return decodedToken;
  } catch (error: any) {
    return new Response(error?.message || `invalid token`, {
      status: error?.status || 401,
    });
  }
};

export function signJwtAccessToken(payload: JwtPayload, options?: SignOption) {
  const token = jwt.sign(payload, secret!, options || DefaultSignOption);
  return token;
}

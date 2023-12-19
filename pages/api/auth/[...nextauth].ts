import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "app/db/xata";

const client = new XataClient();

export const authConfig = {
  // @ts-ignore
  adapter: XataAdapter(client),
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
    }),
  ],
};
// @ts-ignore
export default NextAuth(authConfig);

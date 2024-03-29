import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    session: async ({ session, token }) => {
      token.image = token.picture;
      session.user = token as typeof session.user;

      return session;
    },
  },
});

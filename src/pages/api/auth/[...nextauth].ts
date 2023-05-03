import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import endPoints from "@/services/api";
import axios from "axios";
import { OptionsHeaders } from "@/utils/headers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "custom login",
      credentials: {
        code: { label: "Codigo", type: "string", placeholder: "Code" },
        username: {
          label: "Username",
          type: "string",
          placeholder: "username",
        },
        password: { label: "Codigo", type: "password", placeholder: "*******" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const { data }: any = await axios.post(
            endPoints.auth.login,
            {
              code: credentials!.code,
              username: credentials!.username,
              password: credentials!.password,
            },
            OptionsHeaders
          );

          return {
            id: data.id,
            name: data.user.username,
            email: data.user.email,
            accessToken: data.access_token,
            code: data.code,
            idCoordenadas: data.id_coordenada,
          };
        } catch (error: any) {
          return {
            error: "Datos incorrectos",
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/src/pages/auth/login.tsx",
  },
  jwt: {},
  session: {
    maxAge: 2592000, /// 30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        switch (account.type) {
          // case 'oauth':
          //   token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
          // break;

          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.user.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
});

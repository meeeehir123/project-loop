import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // ✅ JWT Strategy add kar di gayi hai
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and Password required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Incorrect password");
  }
console.log("USER FROM DB:", user);
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    role: user.role,
  };
},
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "supersecretsecret",
  pages: { signIn: "/login" },
  callbacks: {
  async jwt({ token, user }) {
  console.log("JWT CALLBACK USER:", user);
  console.log("JWT CALLBACK TOKEN:", token);

  if (user) {
    token.role = (user as any).role;
  }

  return token;
},

  async session({ session, token }) {
    if (session.user) {
      (session.user as any).role = token.role;
    }

    return session;
  },
},
};

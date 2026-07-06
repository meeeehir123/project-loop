// @ts-nocheck
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"; // Import add kiya

const authOptions = {
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
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        // 1. Phone + OTP Login
        if (credentials?.phone && credentials?.otp) {
          if (credentials.otp === "123456") {
            const user = await prisma.user.findUnique({ where: { phone: credentials.phone } });
            if (user) return { id: user.id, name: user.name, email: user.phone };
            
            const newUser = await prisma.user.create({
              data: { phone: credentials.phone, name: `User_${credentials.phone.slice(-4)}` }
            });
            return { id: newUser.id, name: newUser.name, email: newUser.phone };
          }
          throw new Error("Invalid OTP");
        }

        // 2. Email + Password Login
        if (credentials?.email && credentials?.password) {
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          
          if (!user) {
            throw new Error("User not found!");
          }

          // 1. Password check: Agar user ka password field null hai toh handle karo
          if (!user.password) {
             throw new Error("User has no password set!");
          }

          // 2. Hash compare
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          
          if (isMatch) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            // Debugging ke liye console log (Terminal mein check karna)
            console.log("Password mismatch for email:", credentials.email);
            throw new Error("Incorrect password!");
          }
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "supersecretsecret",
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
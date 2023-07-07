// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum
export enum Role {
  UESR = "user",
  PROVIDER = "provider",
  ADMIN = "admin",
  SUPERADMIN = "superadmin"
}
// common interface for JWT and Session
interface IUser extends DefaultUser {
  role?: Role;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

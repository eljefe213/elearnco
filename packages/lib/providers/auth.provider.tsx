"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { createContext, ReactNode, useContext } from "react";
import { SafeUser } from "schemas/auth/Auth";
import { ConditionalWrapperUI } from "ui";

export type AuthState = {
  user: SafeUser;
};

export const AuthContext = createContext<AuthState | null>(null);

export default function AuthProvider({
  children,
  session,
}: {
  children?: ReactNode;
  session: Session;
}) {
  return (
    <AuthContext.Provider value={{ user: session.user as SafeUser }}>
      <ConditionalWrapperUI
        condition={!!session}
        wrapper={(children) => (
          <SessionProvider session={session}>{children}</SessionProvider>
        )}
      >
        {children}
      </ConditionalWrapperUI>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "AuthContext does not exist. Did you forget to add the AuthProvider?"
    );
  return context;
};

export const useUser = () => {
  const { user } = useAuth();

  return user;
};

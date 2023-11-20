"use client";
import CustomSwager from "./api";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import { SafeUser } from "schemas/auth/Auth";
export default function CustomSwaggerPage() {
  const { data } = useSession();
  const user = data?.user as SafeUser & Role;
  const role = user?.role;

  if (!!data || !!user || role !== Role.ADMIN) return <>No authorize</>;

  return <CustomSwager />;
}

"use client";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { SafeUser } from "schemas/auth/Auth";

import CustomSwager from "./api";
export default function CustomSwaggerPage() {
  const { data } = useSession();
  const user = data?.user as SafeUser & Role;
  const role = user?.role;

  if (!!data || !!user || role !== Role.ADMIN) return <>No authorize</>;

  return <CustomSwager />;
}

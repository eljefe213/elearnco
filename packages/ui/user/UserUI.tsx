"use client";
import { User } from "@nextui-org/react";
import React from "react";

interface IProps {
  description: string;
  name: string;
  image: string;
}

export const UserUI = (user: IProps) => {
  const { name, description, image } = user;

  return (
    <User
      name={name}
      description={description}
      avatarProps={{
        src: `/avatars/${image}.svg`,
      }}
    />
  );
};

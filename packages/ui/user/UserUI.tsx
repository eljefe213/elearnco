"use client";
import { User } from "@nextui-org/react";

interface IProps {
  description: string;
  name: string;
  image: string;
}

export const UserUI = (user: IProps): JSX.Element => {
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

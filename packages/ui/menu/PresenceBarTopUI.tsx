"use client";
import { Avatar, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import React, { useEffect } from "react";


export const PresenceBarTopUI = (props) => {
  const [usernames] = [props];

  useEffect(() => {}, [usernames]);

  return (
    <Navbar height="2rem" maxWidth="full">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
         
          <p className="hidden sm:block font-bold text-inherit">Elearnco</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {Object.entries(usernames?.users)?.map(([clientId, username]) => {
          return (
            <Avatar
              key={clientId}
              size="sm"
              isBordered
              name={username ? username : "username"}
              color="primary"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            />
          );
        })}
        
      </NavbarContent>
    </Navbar>
  );
};

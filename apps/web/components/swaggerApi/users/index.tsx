import { Button } from "@nextui-org/react";
import { deleteUserFromApi, getUserFromApi, pathApiUser } from "lib";
import { useState } from "react";
import { SafeUser } from "schemas/auth/Auth";

import { generateTitle, setBlock,setSchema } from "../components";
import { CLASSNAME_BLOCK } from "../const";

const UsersApi = () => {
  // GET USER
  const [getParametersAddUser, setParametersAddUser] = useState<{userId: string}>({userId: "cln4kv8xc000h0989bop6u7k8"});
  const [getResultAUser, setResultAUser] = useState<SafeUser | null>({} as SafeUser);

  //DELETE USER
  const [getResultDeleteUser, setResultDeleteUser] = useState<SafeUser | null>({} as SafeUser);
  

  const _getUser = async (): Promise<void> => {
    const user = await getUserFromApi(getParametersAddUser.userId);
    if (user) setResultAUser(user);
  };

  const _deleteUser = async (): Promise<void> => {
    const user = await deleteUserFromApi(getParametersAddUser.userId);
    if (user) setResultDeleteUser(user);
  };

  

  return (
    <>
      {/* GET USER */}
      {generateTitle("GET", "Return a user", `${pathApiUser}/{id}`)}
      <div className={CLASSNAME_BLOCK}>
        {setSchema("Schema", getParametersAddUser, setParametersAddUser)}
        {setBlock("Parameters", getParametersAddUser)}
        {setBlock("Result", getResultAUser)}

        <Button onClick={_getUser}>Get user</Button>
      </div>
      {/* UPDATE USER */}
      {generateTitle("PATCH", "Update a user", `${pathApiUser}/{id}`)}
      <div className={CLASSNAME_BLOCK}>
      
      </div>
      {/* DELETE USER */}
      {generateTitle("DELETE", "Delete a user", `${pathApiUser}/{id}`)}
      <div className={CLASSNAME_BLOCK}>
      {setSchema("Schema", getParametersAddUser, setParametersAddUser)}
      {setBlock("Parameters", getParametersAddUser)}
      {setBlock("Result", getResultDeleteUser)}
      <Button onClick={_deleteUser}>Delete user</Button>
      </div>
    </>
  );
};

export default UsersApi;

import { SafeUser } from "schemas/auth/Auth";
import { apiDeleteUser, apiGetUser } from "../api.request";
import { toast } from "sonner";

export const pathApiUsers = "/api/users";
export const pathApiUser = "/api/user";

/**
 * Get a user 
 * @returns SafeUser | null
 */
export const getUserFromApi = async (id: string): Promise<SafeUser | null> => {
  const res = await apiGetUser(id);

  if (res.status === "success") {
    return res.data as unknown as SafeUser;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};

/**
 * Delete a user
 * @param id
 * @returns User | null
 */
export const deleteUserFromApi = async (
  id: string
): Promise<SafeUser | null> => {
  const res = await apiDeleteUser(id);
  if (res.status === "success") {
    toast.success("User deleted successfully!");
    return res.data as unknown as SafeUser;
  } else {
    toast.error(res as unknown as string);
    return null;
  }
};

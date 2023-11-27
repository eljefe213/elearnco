"use client";
import { apiValidate } from "lib/requests/api.request";
import { UserResponse } from "schemas";
import { ConfirmUI, LayoutUI, WallUI } from "ui";

const FeatureAuthValidate = () => {
  const authValidate = async (data): Promise<UserResponse> => {
    const response = await apiValidate(data);
    return response;
  };

  return (
    <LayoutUI className="flex gap-4 w-full">
      <WallUI className="hidden md:flex md:w-2/5" />
      <ConfirmUI authValidate={authValidate} className="w-full md:w-3/5" />
    </LayoutUI>
  );
};
export default FeatureAuthValidate;

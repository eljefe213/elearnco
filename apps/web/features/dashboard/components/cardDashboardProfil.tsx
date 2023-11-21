import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { EActionsUser } from "schemas/actions/enums";
import { SafeUser } from "schemas/auth/Auth";
import { useGlobalModalStore } from "store/modal";
//import { CardDashboardUI } from "ui/card/CardDashboardUI";

//TODO: Translation
const CardDashboardProfil = () => {
  const modalStore = useGlobalModalStore();
  const { data: user } = useSession();
  const _user = user?.user as unknown as SafeUser;

  const actionHandler = async (): Promise<void> => {
    if (user)
      modalStore.onOpen(EActionsUser.EDIT_PROFIL as string, { data: user });
  };

  return user ? <></> : <Spinner />;
};

export default CardDashboardProfil;
{
  /* <CardDashboardUI
      title={_user?.name as string}
      description={_user?.role as string}
      image={`/avatars/${_user?.image as string}.svg`}
      classNameImage = 'translate-y-50'
      bodyChildren={ <Button onClick={actionHandler} radius="full" size="sm">
      Edit
    </Button>}
    /> */
}

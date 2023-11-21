import { Spinner } from "@nextui-org/react";
import {
  getGreeting,
  getImageForSeason,
  getRandomMessage,
  messagesForCurrentSeason,
} from "lib/utils";
import { useSession } from "next-auth/react";
import { SafeUser } from "schemas/auth/Auth";

const GREETING = getGreeting();
const MESSAGE = getRandomMessage(messagesForCurrentSeason);
const IMAGE = getImageForSeason();

const CardDashboardWelcome = () => {
  const { data: user } = useSession();
  const _user = user?.user as unknown as SafeUser;

  return user ? <></> : <Spinner />;
};
{
  /* <CardDashboardUI
      title={`${GREETING}, ${_user?.name}`}
      description={MESSAGE}
      image={IMAGE}
      classNameImage=""
    /> */
}
export default CardDashboardWelcome;

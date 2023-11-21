import { useTranslations } from "next-intl";

const Cartridge = ({ txt }: { txt: string }) => {
  const t = useTranslations("home");
  const TXT = t(txt);

  return <p className="text-small text-white text-center ">{TXT}</p>;
};

export default Cartridge;
